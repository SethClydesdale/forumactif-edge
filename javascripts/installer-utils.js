(function() {
  if (!window.FAE) {
    window.FAE = new Object();
  }

  FAE.maintenance = false;
  FAE.cp_rev = '1.2.2';
  FAE.raw = 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/';
  FAE.eGIF = 'http://illiweb.com/fa/empty.gif';
  FAE.delay = 1000;
  FAE.cp_lang = {};
  FAE.colorSupport = document.createElement('INPUT');

  try {
    FAE.colorSupport.type = 'color';
    FAE.colorSupport = true;
  } catch (error) {
    FAE.colorSupport.type = false;
  }

  // parse variables in strings for translations
  FAE.parse_vars = function(str, o) {
    var i;

    for (i in o) {
      str = str.replace(new RegExp(i, 'gm'), o[i]);
    }

    return str;
  };

  // log messages to the logger so the user knows what's going on
  FAE.logger = document.getElementById('fae_log');
  FAE.log = function(str, css) {
    FAE.logger.insertAdjacentHTML('beforeend', '<div class="fae_msg_log" ' + (css ? 'style="' + css + '"' : '') + '>' + str + '</div>');
    FAE.logger.scrollTop = 99999;
  };

  // increase size of progress bar
  FAE.bar = document.getElementById('fae_progress');
  FAE.progress = function() {
    var percent = (FAE.index / FAE.quota * 100).toFixed(2);
    FAE.bar.innerHTML = '<div id="fae_prog_bar" style="width:' + percent + '%;"></div><span id="fae_prog_number">' + (percent == 100 ? (FAE.cp_lang.fae_install_complete || 'COMPLETE!') : percent + '%') + '</span>';
  };


  // util for performing manual translations via console using two files
  FAE.update_translation = function (o) {
    FAE.log('Getting old translation file...')
    $.get(o.old_file, function(d) {
      FAE.script(d.replace('FAE.lang', 'FAE.lang_current'));

      FAE.log('Getting new translation file...')
      $.get(o.new_file, function(d) {
        FAE.log(FAE.cp_lang.fae_translate_loaded || 'Language data has been loaded. The translation process will now begin, please do not close this tab.');
        FAE.script(d.replace('FAE.lang', 'FAE.lang_new'));

        $.get(FAE.raw + 'lang/translate.js', function(d) {
          FAE.script(d);
          FAE.next();
        });
      });
    });
  };


  // get update files and combine their steps into one array for consecutive execution
  FAE.getUpdates = function() {
    if (++FAE.update_index >= FAE.update_quota) {
      FAE.log(FAE.cp_lang.fae_update_start || 'Updates are about to begin, please do not close this tab.');

      // get the update utilities and begin the update process
      $.get(FAE.raw + 'updates/utils.js', function(d) {
        FAE.script(d);
        FAE.next();
      });

    } else {
      FAE.log(FAE.cp_lang.fae_update_fetch ? FAE.parse_vars(FAE.cp_lang.fae_update_fetch, {
        '{VERSION_STRING}' : FAE.update_queue[FAE.update_index],
        '{UPDATE_MIN}' : FAE.update_index + 1,
        '{UPDATE_MAX}' : FAE.update_queue.length

      }) : 'Getting update instructions for version ' + FAE.update_queue[FAE.update_index] + '... (' + (FAE.update_index + 1) + '/' + FAE.update_queue.length + ')');

      $.get(FAE.raw + 'updates/' + FAE.update_queue[FAE.update_index] + '.js', function(d) {
        FAE.script(d);

        FAE.log(FAE.cp_lang.fae_update_notes ? FAE.parse_vars(FAE.cp_lang.fae_update_notes, {
          '{RELEASE_TAG}' : FAE.update_tag,
          '{VERSION_STRING}' : FAE.update_queue[FAE.update_index]

        }) : 'Please <a href="' + FAE.update_tag + '" target="_blank">Click here</a> to view the changes made in version ' + FAE.update_queue[FAE.update_index] + '.');

        FAE.step = FAE.step.concat(FAE.update_step);
        FAE.getUpdates();

      }).error(function() {
        FAE.log(FAE.cp_lang.fae_update_error ? FAE.parse_vars(FAE.cp_lang.fae_update_error, {
          '{VERSION_STRING}' : FAE.update_queue[FAE.update_index]

        }) : 'Update instructions for version ' + FAE.update_queue[FAE.update_index] + ' could not be found. Please <a href="http://fmdesign.forumotion.com/t700-forumactif-edge-support#13923" target="_blank">open a new issue</a> and provide this information for further assistance.', 'color:#E53;font-weight:bold;');

        FAE.getUpdates();
      });
    }
  };

  // create and execute script
  FAE.script = function(content) {
    var script = document.createElement('SCRIPT');
    script.type = 'text/javascript';
    script.text = content;
    document.body.appendChild(script);
  };

  // stuff that needs to be executed when the doc is ready
  $(function() {
    var admin = $('a[href^="/admin/"]').not('.mainmenu')[0], // get the AP link so we can fetch the TID
        installed = document.getElementById('fa_edge');

    // only allow the founder to install the theme
    if (_userdata.user_id == 1 && admin && !/page_html\?mode=preview/.test(window.location.href)) {
      FAE.tid = admin.href.replace(/.*?(&tid=.*)/, '$1'); // cache the tid
      document.getElementById('fae_actions').style.display = 'block';


      // to prevent errors, make sure that the administration panel is accessible before proceeding.
      // this check is mainly for forums that have the security option "Confirm password to administration access" enabled
      $.get('/admin/index.forum', function(d) {
        if (!$('#page-body > #tabs', d)[0]) {
          FAE.log('Error : You have not logged into your <a href="/admin/index.forum">administration panel</a>. Please log in so that you can use the FAE Control Panel. <a href="https://github.com/SethClydesdale/forumactif-edge/wiki/Frequently-Asked-Questions#wiki-wrapper" target="_blank" style="font-weight:normal;"><em>(What is this?)</em></a>', 'color:#E53;font-weight:bold;');
          document.getElementById('fae_options').style.display = 'none';
        }
      });


      // Installation initialization
      document.getElementById('fae_install').onclick = function() {
        if (confirm( (FAE.cp_lang.fae_install_warning ? FAE.parse_vars(FAE.cp_lang.fae_install_warning, {
          '{INSTALL}' : installed ?  FAE.cp_lang.fae_reinstall : FAE.cp_lang.fae_install

        }) : 'Are you sure you want to ' + ( installed ? 're' : '' ) + 'install Forumactif Edge? This will overwrite your current theme and delete your current JavaScripts. \\\n\\\nPlease make sure to backup all your personal content files such as CSS, Templates, and JavaScripts before proceeding. Click "Cancel" if you\'re not ready to install Forumactif Edge.').replace(/\\/g, '') )) {

          $.get(FAE.raw + 'javascripts/install.js', function(d) {
            FAE.script(d);
            FAE.next();
          });

          document.getElementById('fae_options').style.display = 'none';
        }
      };

      // extra actions for when the theme is installed.
      if (installed) {
        var uninstall = document.getElementById('fae_uninstall'),
            update = document.getElementById('fae_update');

        document.getElementById('fae_install').value = FAE.cp_lang.reinstall || 'Reinstall';

        $([uninstall, update]).show();

        // Uninstallation initialization
        uninstall.onclick = function() {
          if (confirm( (FAE.cp_lang.fae_uninstall_warning || 'Are you sure you want to uninstall Forumactif Edge? All CSS, JavaScript, and Template changes will be deleted ; The forum will be reverted to the default phpbb3 theme. \\\n\\\nPlease make sure to backup all your personal content files such as CSS, Templates, and JavaScripts before proceeding. Click "Cancel" if you don\'t want to uninstall Forumactif Edge yet.').replace(/\\/g, '') )) {

            $.get(FAE.raw + 'javascripts/uninstall.js', function(d) {
              FAE.script(d);
              FAE.next();
            });

            document.getElementById('fae_options').style.display = 'none';
          }
        };


        // Check for updates
        update.onclick = function() {
          FAE.log(FAE.cp_lang.fae_update_check || 'Checking for updates on Github...');
          document.getElementById('fae_options').style.display = 'none';

          $.get(FAE.raw + 'javascripts/version-data.js', function(d) {
            FAE.script(d.replace(/forumactif_edge_version_data/, 'fae_github_version_data'));
            FAE.version_string = d; // save version data for later so we can update the forum version info

            if (forumactif_edge_version_data.length < fae_github_version_data.length) {

              FAE.update_queue = fae_github_version_data.slice(forumactif_edge_version_data.length, fae_github_version_data.length);
              FAE.update_index = -1;
              FAE.update_quota = FAE.update_queue.length;

              FAE.log(FAE.update_queue.length + ' update' + ( i == 1 ? '' : 's' ) + ' found.');
              FAE.log(FAE.cp_lang.fae_update_prepare || 'Preparing to fetch update instructions, please do not close this tab...');

              FAE.step = [];
              FAE.getUpdates();

            } else {
              FAE.log(FAE.cp_lang.fae_update_good || 'Forumactif Edge is up to date!', 'color:#8B5;font-weight:bold;');
              document.getElementById('fae_options').style.display = 'block';
            }
          });
        };


        // create and insert translation button
        if (!FAE.board_lang) {
          FAE.board_lang = 'English'; // set the board lang to English if it is undefined
        }

        var opts = document.getElementById('fae_options'),
            actdiv = $('<div style="float:left;" />');

        $('#fae_install, #fae_uninstall, #fae_update').appendTo(actdiv);
        $(opts).prepend(actdiv);

        // create and insert the translation action
        $(opts).append(
          '<div style="float:right;">'+
            '<select id="fae_selected_language">'+
              '<option value="Arabic">العربية</option>'+
              '<option value="Dutch">Dutch</option>'+
              '<option value="English">English</option>'+
              '<option value="Filipino">Tagalog</option>'+
              '<option value="Français">Français</option>'+
              '<option value="German">Deutsch</option>'+
              '<option value="Greek">Ελληνικά</option>'+
              '<option value="Hebrew">עברית</option>'+
              '<option value="Hungarian">Hungarian</option>'+
              '<option value="Italian">Italiano</option>'+
              '<option value="Portuguese">Português</option>'+
              '<option value="Romanian">Romana</option>'+
              '<option value="Spanish">Español</option>'+
              '<option value="Vietnamese">Tiếng Việt</option>'+
              '<option value="ADD">Submit a New Translation</option>'+
            '</select>'+
            '<input id="fae_translate" type="button" value="Change language" />'+
          '</div><div class="clear"></div>'
        );

        document.getElementById('fae_selected_language').onchange = function () {
          var button = document.getElementById('fae_translate');

          if (this.value == 'ADD') {
            button.dataset.original = button.value;
            button.value = 'Submit';
          } else if (button.dataset.original && button.value != button.dataset.original) {
            button.value = button.dataset.original;
          }
        };

        // set the selected translation
        for (var a = document.getElementById('fae_selected_language').options, i = 0, j = a.length; i < j; i++) {
          if (FAE.board_lang == a[i].innerHTML) {
            a[i].selected = true;
            a[i].id = 'fae_current_language';
            a[i].parentNode.insertBefore(a[i], a[0]);
            a[0].insertAdjacentHTML('afterend', '<optgroup label="----------------"></optgroup>');
            break;
          }
        }

        // function to be executed when the translation button is clicked
        document.getElementById('fae_translate').onclick = function() {

          var select = document.getElementById('fae_selected_language'),
              current = document.getElementById('fae_current_language'),
              selected = select.options[select.selectedIndex];

          if (select.value == 'ADD') {
            if (confirm("You've chosen to submit a new translation. If this is correct, please click 'OK' and proceed to the translation page, otherwise click 'cancel' and choose another language.")) {
              window.location.href = 'http://fmdesign.forumotion.com/t706-forumactif-edge-translations#13996';
            }

            return;
          }

          if (FAE.board_lang == selected.innerHTML) {
            return alert(FAE.cp_lang.fae_translate_same ? FAE.parse_vars(FAE.cp_lang.fae_translate_same, {
              '{LANG}' : selected.innerHTML

            }) : 'Forumactif Edge is already in ' + selected.innerHTML + '. Please choose another language.');
          }

          if (confirm(FAE.cp_lang.fae_translate_warning ? FAE.parse_vars(FAE.cp_lang.fae_translate_warning, {
            '{LANG}' : selected.innerHTML

          }) : 'Are you sure you want to change the language of Forumactif Edge to ' + selected.innerHTML + ' ?')) {

            FAE.log(FAE.cp_lang.fae_translate_start || 'Translation of Forumactif Edge will commence shortly. Please wait..');
            FAE.log(FAE.cp_lang.fae_translate_get ? FAE.parse_vars(FAE.cp_lang.fae_translate_get, {
              '{LANG}' : current.innerHTML

            }) : 'Getting ' + current.innerHTML + ' language data...');

            $.get(FAE.raw + 'lang/' + current.value + '.js', function(d) {
              FAE.log(FAE.cp_lang.fae_translate_get ? FAE.parse_vars(FAE.cp_lang.fae_translate_get, {
                '{LANG}' : selected.innerHTML

              }) : 'Getting ' + selected.innerHTML + ' language data...');

              FAE.script(d.replace('FAE.lang', 'FAE.lang_current'));

              $.get(FAE.raw + 'lang/' + selected.value + '.js', function(d) {
                FAE.log(FAE.cp_lang.fae_translate_loaded || 'Language data has been loaded. The translation process will now begin, please do not close this tab.');
                FAE.script(d.replace('FAE.lang', 'FAE.lang_new'));

                $.get(FAE.raw + 'lang/translate.js', function(d) {
                  FAE.script(d);
                  FAE.next();
                });
              });
            });

            document.getElementById('fae_options').style.display = 'none';
          }
        };


        // insert category toggle bar
        $(opts).append(
          '<div class="fae_cp_title" id="fae_title-configuration" style="margin-top:24px;">Configuration</div>'+

          '<p id="fae_nav_desc">Clicking the buttons below will take you to different sections of the control panel, which allow you to manage the Configuration of Forumactif Edge. Go ahead and explore each of these sections, so you can get started on personalizing your theme. If you need more information, <a href="https://github.com/SethClydesdale/forumactif-edge/wiki/FAE-Control-Panel-Guide" target="_blank">click here</a> to view the control panel guide.</p>'+

          '<div id="fae_cp_navbar">'+
            '<input type="button" value="General Settings" data-tab="category-general" style="background-color:#8B5;" />'+
            '<input type="button" value="Colors" data-tab="category-color" />'+
            '<input type="button" value="Theme Management" data-tab="category-theme" />'+
            '<input type="button" value="Plugin Management" data-tab="category-plugin" />'+
          '</div>'
        );

        $('#fae_cp_navbar input').click(function() {
          document.querySelector('#fae_options [id^="category-"][style*="block"]').style.display = 'none';
          document.querySelector('#fae_cp_navbar [style*="background-color"]').style.backgroundColor = '';

          document.getElementById(this.dataset.tab).style.display = 'block';
          this.style.backgroundColor = '#8B5';

          return false;
        });


        // create and insert general settings
        $(opts).append('<div id="category-general" style="display:block;">'+

          '<div class="fae_cp_title" id="fae_title-general_settings" style="margin-top:24px;">General Settings</div>'+

          '<p id="fae_gen_desc">This section allows you to manage the general settings of Forumactif Edge.</p>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip" id="fae_gen_tip-width">Drag the slider to adjust the width of the forum.</span>'+
            '</span>'+
            '<span id="fae_label-width" class="fae_label">Forum width : </span>'+
            '<input id="fae_forum_width" type="range" min="30" max="100" value="100" style="vertical-align:middle;" /> <span id="fae_fw_percent">100%</span>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip" id="fae_gen_tip-navbar">Position of the navbar links.</span>'+
            '</span>'+
            '<span id="fae_label-navbar" class="fae_label">Navbar position : </span>'+
            '<label for="fae_nav_dir-left"><input type="radio" id="fae_nav_dir-left" name="fae_nav_dir" checked> Left</label>'+
            '<label for="fae_nav_dir-center"><input type="radio" id="fae_nav_dir-center" name="fae_nav_dir"> Center</label>'+
            '<label for="fae_nav_dir-right"><input type="radio" id="fae_nav_dir-right" name="fae_nav_dir"> Right</label>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip" id="fae_gen_tip-logo">Position of the forum logo.</span>'+
            '</span>'+
            '<span id="fae_label-logo" class="fae_label">Logo position : </span>'+
            '<label for="fae_logo_dir-left"><input type="radio" id="fae_logo_dir-left" name="fae_logo_dir" checked> Left</label>'+
            '<label for="fae_logo_dir-center"><input type="radio" id="fae_logo_dir-center" name="fae_logo_dir"> Center</label>'+
            '<label for="fae_logo_dir-right"><input type="radio" id="fae_logo_dir-right" name="fae_logo_dir"> Right</label>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip" id="fae_gen_tip-profile">Position of the post profile in topics.</span>'+
            '</span>'+
            '<span id="fae_label-profile" class="fae_label">Profile position : </span>'+
            '<label for="fae_profil_dir-left"><input type="radio" id="fae_profil_dir-left" name="fae_profil_dir" checked> Left</label>'+
            '<label for="fae_profil_dir-center"><input type="radio" id="fae_profil_dir-center" name="fae_profil_dir"> Center</label>'+
            '<label for="fae_profil_dir-right"><input type="radio" id="fae_profil_dir-right" name="fae_profil_dir"> Right</label>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<input id="fae_update_general" type="button" value="Save changes" />'+
          '</div>'+
        '</div>');

        // update the percentage counter
        document.getElementById('fae_forum_width')[/trident/i.test(window.navigator.userAgent) ? 'onchange' : 'oninput'] = function() {
          document.getElementById('fae_fw_percent').innerHTML = this.value + '%';
        };

        // get existing settings from the stylesheet
        $.get('/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid, function(d) {
          var form = $('form[method="post"]', d)[0],
              width,
              dir;

          if (form) {

            // page width
            if (/\/\*!FAE_WIDTH\*\/#page-body\{width:\d+%;.*?\}/.test(form.edit_code.value)) {
              width = form.edit_code.value.match(/\/\*!FAE_WIDTH\*\/#page-body\{width:(\d+)%;.*?\}/)[1];

              document.getElementById('fae_forum_width').value = width;
              document.getElementById('fae_fw_percent').innerHTML = width + '%';
            } else {
              document.getElementById('fae_forum_width').value = 100;
              document.getElementById('fae_fw_percent').innerHTML = '100%';
            }

            // navbar position
            if (/\/\*!FAE_NAV_DIR\*\/#navbar\{text-align:.*?\}/.test(form.edit_code.value)) {
              dir = form.edit_code.value.match(/\/\*!FAE_NAV_DIR\*\/#navbar\{text-align:(.*?)\}/)[1];
              document.getElementById('fae_nav_dir-' + dir.toLowerCase()).checked = true;
            }

            // logo position
            if (/\/\*!FAE_LOGO_DIR\*\/#logo-desc\{text-align:.*?\}#logo\{float:.*?\}/.test(form.edit_code.value)) {
              dir = form.edit_code.value.match(/\/\*!FAE_LOGO_DIR\*\/#logo-desc\{text-align:(.*?)\}#logo\{float:.*?\}/)[1];
              document.getElementById('fae_logo_dir-' + dir.toLowerCase()).checked = true;
            }

            // profile position
            if (/\/\*!FAE_PROFIL_DIR\*\/\.postprofile\{float:.*?;.*?\}\.post-inner\{.*?\}/.test(form.edit_code.value)) {
              dir = form.edit_code.value.match(/\/\*!FAE_PROFIL_DIR\*\/\.postprofile\{float:(.*?);.*?\}\.post-inner\{.*?\}/)[1];
              document.getElementById('fae_profil_dir-' + dir.toLowerCase()).checked = true;
            } else if (/\/\*!FAE_PROFIL_DIR\*\/\.post-inner\{margin:0!important\}/.test(form.edit_code.value)) {
              document.getElementById('fae_profil_dir-center').checked = true;
            }

          }
        });


        // update the general settings
        document.getElementById('fae_update_general').onclick = function() {
          FAE.log(FAE.cp_lang.general_settings ? FAE.cp_lang.general_settings.fae_gen_updating : 'Updating general settings..');
          FAE.quota = 2;
          FAE.index = 0;
          FAE.progress();

          var width = +document.getElementById('fae_forum_width').value,

              nav_dir = document.getElementById('fae_nav_dir-left').checked ? 'left' :
                        document.getElementById('fae_nav_dir-center').checked ? 'center' :
                        document.getElementById('fae_nav_dir-right').checked ? 'right' : 'left',

              logo_dir = document.getElementById('fae_logo_dir-left').checked ? 'left' :
                         document.getElementById('fae_logo_dir-center').checked ? 'center' :
                         document.getElementById('fae_logo_dir-right').checked ? 'right' : 'left',

              profil_dir = document.getElementById('fae_profil_dir-left').checked ? 'left' :
                           document.getElementById('fae_profil_dir-center').checked ? 'center' :
                           document.getElementById('fae_profil_dir-right').checked ? 'right' : 'left',
              profil_dir2 = profil_dir == 'left' ? 'right' : 'left',

              val,
              form;

          // assign style rules to variables
          width = '/*!FAE_WIDTH*/#page-body{width:' + ( width >= 100 ? 'auto;' : width + '%;margin:0 auto;' ) + '}';
          nav_dir = '/*!FAE_NAV_DIR*/#navbar{text-align:' + nav_dir + '}';
          logo_dir = '/*!FAE_LOGO_DIR*/#logo-desc{text-align:' + logo_dir + '}#logo{float:' + ( logo_dir == 'center' ? 'none' : logo_dir ) + '}';
          profil_dir = '/*!FAE_PROFIL_DIR*/' + (
            profil_dir == 'center' ?
            '.post-inner{margin:0!important}.postprofile{width:100%;margin:-10px 0 10px!important;float:none!important}.postprofile dl{width:100%;border:none;border-bottom:1px solid rgba(0,0,0,.2);padding-top:3px}.field-info,.postprofile dt{width:auto}.postprofile dt,.user-avatar{float:left;white-space:nowrap}.postprofile .username{display:inline-block;padding-top:8px}.field-info{float:right;text-align:left}.profile-field .label,.profile-field .value{display:inline}.contact-info{text-align:left;clear:both}.profile-field,.user-avatar{margin:0 3px}.user-avatar img{max-height:100px;max-width:100px}'
            :
            '.postprofile{float:' + profil_dir + ';margin-' + profil_dir + ':-300px;margin-' + profil_dir2 + ':0px}.post-inner{margin-' + profil_dir2 + ':0;margin-' + profil_dir + ':300px}'
          ) + '/*!END_FAE_PROFIL_DIR*/';

          // get the stylesheet
          $.get('/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid, function(d) {
            form = $('form[method="post"]', d)[0];
            FAE.index = 1;
            FAE.progress();

            if (form) {
              val = form.edit_code.value;

              // update stylesheet with new FORUM WIDTH rule
              if (/\/\*!FAE_WIDTH\*\/#page-body\{.*?\}/.test(form.edit_code.value)) {
                val = val.replace(/\/\*!FAE_WIDTH\*\/#page-body\{.*?\}/, width);
              } else {
                val += '\n' + width;
              }

              // update stylesheet with new NAVBAR POSITION rule
              if (/\/\*!FAE_NAV_DIR\*\/#navbar\{text-align:.*?\}/.test(form.edit_code.value)) {
                val = val.replace(/\/\*!FAE_NAV_DIR\*\/#navbar\{text-align:.*?\}/, nav_dir);
              } else {
                val += '\n' + nav_dir;
              }

              // update stylesheet with new LOGO POSITION rule
              if (/\/\*!FAE_LOGO_DIR\*\/#logo-desc\{text-align:.*?\}#logo\{float:.*?\}/.test(form.edit_code.value)) {
                val = val.replace(/\/\*!FAE_LOGO_DIR\*\/#logo-desc\{text-align:.*?\}#logo\{float:.*?\}/, logo_dir);
              } else {
                val += '\n' + logo_dir;
              }


              // update stylesheet with new PROFILE POSITION rule
              if (/\/\*!FAE_PROFIL_DIR\*\/\.postprofile\{float:.*?;.*?\}\.post-inner\{.*?\}|\/\*!FAE_PROFIL_DIR\*\/.*?\/\*!END_FAE_PROFIL_DIR\*\//.test(form.edit_code.value)) {
                val = val.replace(/\/\*!FAE_PROFIL_DIR\*\/\.postprofile\{float:.*?;.*?\}\.post-inner\{.*?\}|\/\*!FAE_PROFIL_DIR\*\/.*?\/\*!END_FAE_PROFIL_DIR\*\//, profil_dir);
              } else {
                val += '\n' + profil_dir;
              }

              // update the stylesheet
              $.post('/admin/index.forum?part=themes&sub=logos&mode=css&extended_admin=1&tid=' + FAE.tid, {
                edit_code : val,
                submit : 'Save'

              }, function(d) {
                FAE.index = 2;
                FAE.progress();

                FAE.log(FAE.cp_lang.general_settings ? FAE.cp_lang.general_settings.fae_gen_updated : 'General settings have been updated successfully !', 'font-weight:bold;color:#8B5;');
                FAE.log('Please <a href="javascript:window.location.reload();">click here</a> to reload the page.');
              });

            }
          });

          document.getElementById('fae_options').style.display = 'none';
        };


        // create and insert the theme switcher
        $(opts).append('<div id="category-theme" style="display:none;">'+
          '<div class="fae_cp_title" id="fae_title-theme_management" style="margin-top:24px;">Theme Management</div>'+

          '<p id="fae_theme_desc">This section allows you to manage the default theme and colors for Forumactif Edge by importing a new theme from the Github repository.</p>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip" id="fae_theme_tip-theme">Select the type of theme you want to import.</span>'+
            '</span>'+
            '<span id="fae_label-theme" class="fae_label">Select a theme : </span>'+
            '<select id="fae_selected_theme">'+
              '<option value="fa_edge" selected>Edge Default</option>'+
              '<option value="fa_edge-dark">Edge Dark</option>'+
            '</select>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip" id="fae_theme_tip-color">Select the default color for the chosen theme.</span>'+
            '</span>'+
            '<span id="fae_label-color" class="fae_label">Select a color : </span>'+
            '<select id="fae_selected_color">'+
              '<option value="Default" selected>Default</option>'+
              '<option value="Custom">Custom color</option>'+
              '<option value="Silver" style="background-color: rgb(187, 187, 187);">Silver</option>'+
              '<option value="Dusty Gray" style="background-color: rgb(136, 136, 136);">Dusty Gray</option>'+
              '<option value="Dove Gray" style="background-color: rgb(85, 85, 85);">Dove Gray</option>'+
              '<option value="Mine Shaft" style="background-color: rgb(34, 34, 34);">Mine Shaft</option>'+
              '<option value="Persian Red" style="background-color: rgb(187, 34, 34);">Persian Red</option>'+
              '<option value="Christmas Red" style="background-color: rgb(170, 17, 17);">Christmas Red</option>'+
              '<option value="Coral Red" style="background-color: rgb(238, 51, 51);">Coral Red</option>'+
              '<option value="Chestnut Rose" style="background-color: rgb(187, 85, 85);">Chestnut Rose</option>'+
              '<option value="Eunry" style="background-color: rgb(187, 136, 136);">Eunry</option>'+
              '<option value="Brandy Rose" style="background-color: rgb(170, 119, 119);">Brandy Rose</option>'+
              '<option value="Bazaar" style="background-color: rgb(136, 102, 102);">Bazaar</option>'+
              '<option value="Cinnabar" style="background-color: rgb(221, 51, 34);">Cinnabar</option>'+
              '<option value="Crail" style="background-color: rgb(170, 68, 51);">Crail</option>'+
              '<option value="Flamingo" style="background-color: rgb(221, 68, 34);">Flamingo</option>'+
              '<option value="Red Damask" style="background-color: rgb(204, 85, 51);">Red Damask</option>'+
              '<option value="Tabasco" style="background-color: rgb(136, 34, 0);">Tabasco</option>'+
              '<option value="Paarl" style="background-color: rgb(153, 68, 34);">Paarl</option>'+
              '<option value="Cape Palliser" style="background-color: rgb(153, 85, 51);">Cape Palliser</option>'+
              '<option value="Tuscany" style="background-color: rgb(187, 85, 34);">Tuscany</option>'+
              '<option value="Hot Cinnamon" style="background-color: rgb(204, 85, 17);">Hot Cinnamon</option>'+
              '<option value="Blaze Orange" style="background-color: rgb(238, 85, 0);">Blaze Orange</option>'+
              '<option value="Pumpkin" style="background-color: rgb(238, 102, 0);">Pumpkin</option>'+
              '<option value="Antique Brass" style="background-color: rgb(187, 136, 85);">Antique Brass</option>'+
              '<option value="Raw Sienna" style="background-color: rgb(187, 119, 51);">Raw Sienna</option>'+
              '<option value="Earthtone" style="background-color: rgb(85, 51, 17);">Earthtone</option>'+
              '<option value="Americano" style="background-color: rgb(119, 102, 85);">Americano</option>'+
              '<option value="Coffee" style="background-color: rgb(102, 85, 68);">Coffee</option>'+
              '<option value="Cinnamon" style="background-color: rgb(119, 51, 0);">Cinnamon</option>'+
              '<option value="Brown" style="background-color: rgb(136, 68, 0);">Brown</option>'+
              '<option value="Sandy Tan" style="background-color: rgb(204, 170, 119);">Sandy Tan</option>'+
              '<option value="Hokey Pokey" style="background-color: rgb(187, 136, 34);">Hokey Pokey</option>'+
              '<option value="Sienna" style="background-color: rgb(85, 68, 34);">Sienna</option>'+
              '<option value="Shadow" style="background-color: rgb(119, 102, 68);">Shadow</option>'+
              '<option value="Buttercup" style="background-color: rgb(221, 153, 0);">Buttercup</option>'+
              '<option value="Tulip Tree" style="background-color: rgb(221, 170, 34);">Tulip Tree</option>'+
              '<option value="Golden Grass" style="background-color: rgb(204, 153, 17);">Golden Grass</option>'+
              '<option value="Pizza" style="background-color: rgb(187, 136, 0);">Pizza</option>'+
              '<option value="Reef Gold" style="background-color: rgb(153, 119, 17);">Reef Gold</option>'+
              '<option value="Olive" style="background-color: rgb(119, 119, 0);">Olive</option>'+
              '<option value="Camouflage" style="background-color: rgb(51, 51, 0);">Camouflage</option>'+
              '<option value="Avocado" style="background-color: rgb(119, 119, 85);">Avocado</option>'+
              '<option value="Earls Green" style="background-color: rgb(187, 187, 34);">Earls Green</option>'+
              '<option value="Laser" style="background-color: rgb(187, 187, 85);">Laser</option>'+
              '<option value="Pine Glade" style="background-color: rgb(187, 187, 136);">Pine Glade</option>'+
              '<option value="Pea Green" style="background-color: rgb(102, 136, 17);">Pea Green</option>'+
              '<option value="Celery" style="background-color: rgb(136, 187, 34);">Celery</option>'+
              '<option value="Chartreuse" style="background-color: rgb(119, 204, 0);">Chartreuse</option>'+
              '<option value="Forumactif Green" style="background-color: rgb(119, 187, 34);">Forumactif Green</option>'+
              '<option value="Dollar Bill" style="background-color: rgb(119, 170, 68);">Dollar Bill</option>'+
              '<option value="Wild Willow" style="background-color: rgb(136, 187, 85);">Wild Willow</option>'+
              '<option value="Asparagus" style="background-color: rgb(102, 153, 68);">Asparagus</option>'+
              '<option value="Atlantis" style="background-color: rgb(85, 187, 34);">Atlantis</option>'+
              '<option value="Forest Green" style="background-color: rgb(17, 119, 17);">Forest Green</option>'+
              '<option value="Christmas Green" style="background-color: rgb(0, 85, 0);">Christmas Green</option>'+
              '<option value="Apple" style="background-color: rgb(34, 187, 34);">Apple</option>'+
              '<option value="Mantis" style="background-color: rgb(85, 187, 85);">Mantis</option>'+
              '<option value="De York" style="background-color: rgb(136, 187, 136);">De York</option>'+
              '<option value="Envy" style="background-color: rgb(119, 153, 119);">Envy</option>'+
              '<option value="Spruce" style="background-color: rgb(85, 187, 102);">Spruce</option>'+
              '<option value="Bottle Green" style="background-color: rgb(0, 153, 34);">Bottle Green</option>'+
              '<option value="Aqua Forest" style="background-color: rgb(85, 153, 102);">Aqua Forest</option>'+
              '<option value="Mountain Meadow" style="background-color: rgb(34, 187, 85);">Mountain Meadow</option>'+
              '<option value="Meadow" style="background-color: rgb(17, 153, 68);">Meadow</option>'+
              '<option value="Sea Green" style="background-color: rgb(34, 119, 68);">Sea Green</option>'+
              '<option value="Amazon" style="background-color: rgb(34, 102, 68);">Amazon</option>'+
              '<option value="Emerald" style="background-color: rgb(85, 187, 136);">Emerald</option>'+
              '<option value="Shamrock" style="background-color: rgb(34, 187, 136);">Shamrock</option>'+
              '<option value="Blue Lagoon" style="background-color: rgb(51, 170, 153);">Blue Lagoon</option>'+
              '<option value="Turquoise" style="background-color: rgb(34, 187, 187);">Turquoise</option>'+
              '<option value="Downy" style="background-color: rgb(85, 187, 187);">Downy</option>'+
              '<option value="Sinbad" style="background-color: rgb(136, 187, 187);">Sinbad</option>'+
              '<option value="Teal" style="background-color: rgb(0, 119, 119);">Teal</option>'+
              '<option value="Blue Chill" style="background-color: rgb(0, 119, 136);">Blue Chill</option>'+
              '<option value="Cerulean" style="background-color: rgb(0, 153, 204);">Cerulean</option>'+
              '<option value="Deep Cerulean" style="background-color: rgb(0, 102, 153);">Deep Cerulean</option>'+
              '<option value="Curious Blue" style="background-color: rgb(34, 136, 187);">Curious Blue</option>'+
              '<option value="Slate Gray" style="background-color: rgb(102, 119, 136);">Slate Gray</option>'+
              '<option value="Danube" style="background-color: rgb(85, 136, 187);">Danube</option>'+
              '<option value="Azure Radiance" style="background-color: rgb(0, 102, 238);">Azure Radiance</option>'+
              '<option value="Mariner" style="background-color: rgb(34, 85, 187);">Mariner</option>'+
              '<option value="Azure" style="background-color: rgb(34, 68, 153);">Azure</option>'+
              '<option value="Governor Bay" style="background-color: rgb(34, 34, 187);">Governor Bay</option>'+
              '<option value="Blue Marguerite" style="background-color: rgb(85, 85, 187);">Blue Marguerite</option>'+
              '<option value="Blue Bell" style="background-color: rgb(136, 136, 187);">Blue Bell</option>'+
              '<option value="Comet" style="background-color: rgb(68, 68, 102);">Comet</option>'+
              '<option value="Purple Heart" style="background-color: rgb(85, 34, 187);">Purple Heart</option>'+
              '<option value="Amethyst" style="background-color: rgb(136, 85, 187);">Amethyst</option>'+
              '<option value="Amethyst Smoke" style="background-color: rgb(153, 136, 170);">Amethyst Smoke</option>'+
              '<option value="Mauve" style="background-color: rgb(204, 153, 238);">Mauve</option>'+
              '<option value="Affair" style="background-color: rgb(102, 51, 136);">Affair</option>'+
              '<option value="Purple" style="background-color: rgb(136, 34, 187);">Purple</option>'+
              '<option value="Lavendar" style="background-color: rgb(170, 102, 204);">Lavendar</option>'+
              '<option value="Cerise" style="background-color: rgb(187, 34, 187);">Cerise</option>'+
              '<option value="Fuchsia Pink" style="background-color: rgb(187, 85, 187);">Fuchsia Pink</option>'+
              '<option value="Lilac" style="background-color: rgb(187, 136, 187);">Lilac</option>'+
              '<option value="Red Violet" style="background-color: rgb(187, 34, 136);">Red Violet</option>'+
              '<option value="Disco" style="background-color: rgb(119, 0, 68);">Disco</option>'+
              '<option value="Carnation Pink" style="background-color: rgb(238, 136, 187);">Carnation Pink</option>'+
              '<option value="Hopbush" style="background-color: rgb(187, 85, 136);">Hopbush</option>'+
              '<option value="French Rose" style="background-color: rgb(221, 51, 119);">French Rose</option>'+
              '<option value="Hibiscus" style="background-color: rgb(187, 34, 85);">Hibiscus</option>'+
              '<option value="Claret" style="background-color: rgb(102, 0, 34);">Claret</option>'+
              '<option value="Bordeaux" style="background-color: rgb(85, 0, 17);">Bordeaux</option>'+
              '<option value="Tickle Me Pink" style="background-color: rgb(238, 119, 153);">Tickle Me Pink</option>'+
              '<option value="Burgundy" style="background-color: rgb(119, 0, 17);">Burgundy</option>'+
              '<option value="Blush" style="background-color: rgb(204, 68, 102);">Blush</option>'+
              '<option value="Wild Watermelon" style="background-color: rgb(238, 68, 102);">Wild Watermelon</option>'+
              '<option value="Amaranth" style="background-color: rgb(221, 34, 68);">Amaranth</option>'+
              '<option value="Mauvelous" style="background-color: rgb(238, 136, 153);">Mauvelous</option>'+
              '<option value="Alizarin Crimson" style="background-color: rgb(221, 17, 34);">Alizarin Crimson</option>'+
            '</select>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip" id="fae_theme_tip-minify">Minified stylesheets take up less space, but aren\'t ideal for editing. If you want to edit the stylesheet of the selected theme, choose "No" instead.</span>'+
            '</span>'+
            '<span id="fae_label-minify" class="fae_label">Minify Stylesheet : </span>'+
            '<label for="fae_theme_min_yes"><input type="radio" id="fae_theme_min_yes" name="fae_theme_min" value="1" checked> Yes</label>'+
            '<label for="fae_theme_min_no"><input type="radio" id="fae_theme_min_no" name="fae_theme_min" value="0"> No</label>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip" id="fae_theme_tip-rtl">Changes the theme\'s text direction from left-to-right (ltr) to right-to-left (rtl) for rtl scripts.</span>'+
            '</span>'+
            '<span id="fae_label-rtl" class="fae_label">Right-to-Left : </span>'+
            '<label for="fae_theme_dir_rtl"><input type="radio" id="fae_theme_dir_rtl" name="fae_theme_dir" value="1"> Yes</label>'+
            '<label for="fae_theme_dir_ltr"><input type="radio" id="fae_theme_dir_ltr" name="fae_theme_dir" value="0" checked> No</label>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<input id="fae_import_theme" type="button" value="Import theme" />'+
          '</div>'+
        '</div>');


        var selector = document.getElementById('fae_selected_color'),
            picker = document.createElement('INPUT');

        picker.id = 'fae_custom_color';

        try {
          picker.type = 'color';
        } catch (error) {
          picker.type = 'text';
        }

        picker.value = '#6699CC';
        picker.style.display = 'none';

        FAE.custom_color = ['#7AD', '#69C', '#58B', '#369', '#345'];

        picker.onchange = function () {
          var val = this.value.toUpperCase();

          FAE.custom_color = [
            fae_editColor(val, +1),
            val,
            fae_editColor(val, -1),
            fae_editColor(val, -3),
            fae_editColor(val, 'darken')
          ];
        };

        selector.parentNode.appendChild(picker);
        selector.onchange = function () {
          var picker = document.getElementById('fae_custom_color');

          if (this.value == 'Custom') {
            picker.style.display = '';
          } else {
            picker.style.display = 'none';
          }
        };

        document.getElementById('fae_import_theme').onclick = function() {
          var select = document.getElementById('fae_selected_theme'),
              selected = select.options[select.selectedIndex],
              stylesheet = selected.value + ( document.getElementById('fae_theme_dir_rtl').checked ? '-rtl' : '' ) + ( document.getElementById('fae_theme_min_yes').checked ? '.min' : '' ) + '.css';

          if (confirm( (FAE.cp_lang.theme_management ? FAE.parse_vars(FAE.cp_lang.theme_management.fae_import_confirm, {
            '{THEME_NAME}' : selected.innerHTML

          }) : 'Are you sure you want to import the theme "' + selected.innerHTML + '" ?\\\n\\\nPlease make sure to back up your current stylesheet if you want to keep it, because it will be overwritten when this new theme is imported. Choose "Cancel" if you\'re not ready to import a new theme.').replace(/\\/g, '') )) {

            // reset dark mode cookies and clear sessionStorage
            my_setcookie('fae_light-switch', '', true);
            my_setcookie('fae_light-switch-mode', '', true);

            if (window.sessionStorage) {
              window.sessionStorage.faeLightSwitch = '';
            }

            // theme settings
            FAE.theme = {
              name : selected.innerHTML,
              stylesheet : stylesheet,
              color : document.getElementById('fae_selected_color').value,
              dark : /-dark/i.test(stylesheet),
              rtl : /-rtl/i.test(stylesheet)
            };

            $.get(FAE.raw + 'javascripts/change-theme.js', function(d) {
              FAE.script(d);
              FAE.color_palette['Custom'] = FAE.custom_color;

              FAE.next();
            });

            document.getElementById('fae_options').style.display = 'none';
          }
        };


        // create and insert colors manager
        $(opts).append('<div id="category-color" style="display:none;">'+

          '<div class="fae_cp_title" id="fae_title-colors" style="margin-top:24px;">Colors</div>'+

          '<p id="fae_colors_desc">This section allows you to change the colors of your forum theme. Select a color from below and preview the result in the window on the right to get started. When you are finished, click "Save Changes" to apply your new colors.</p>'+

          '<div class="fae_options_column">'+

            '<h3 class="post-content">Primary Colors</h3>'+
            '<p id="fae_colors_desc2">The options below allow you to adjust the 5 primary color shades for Forumactif Edge.</p>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-p1" class="fae_label">Primary Color 1 : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#6699CC" class="fae_color_picker" />' : '')+
                '<input id="fae_color-p1" type="text" value="#6699CC" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-p2" class="fae_label">Primary Color 2 : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#77AADD" class="fae_color_picker" />' : '')+
                '<input id="fae_color-p2" type="text" value="#77AADD" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-p3" class="fae_label">Primary Color 3 : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#5588BB" class="fae_color_picker" />' : '')+
                '<input id="fae_color-p3" type="text" value="#5588BB" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-p4" class="fae_label">Primary Color 4 : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#336699" class="fae_color_picker" />' : '')+
                '<input id="fae_color-p4" type="text" value="#336699" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-p5" class="fae_label">Primary Color 5 : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#334455" class="fae_color_picker" />' : '')+
                '<input id="fae_color-p5" type="text" value="#334455" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+
            '<br/>'+


            '<h3 class="post-content">General Colors</h3>'+
            '<p id="fae_colors_desc3">The options below allow you to change various colors of the forum.</p>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-bg1" class="fae_label">Main Background Color 1 : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#FFFFFF" class="fae_color_picker" />' : '')+
                '<input id="fae_color-bg1" type="text" value="#FFFFFF" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-bg2" class="fae_label">Main Background Color 2 : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#EEEEEE" class="fae_color_picker" />' : '')+
                '<input id="fae_color-bg2" type="text" value="#EEEEEE" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-m1" class="fae_label">Main Border Color : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#CCCCCC" class="fae_color_picker" />' : '')+
                '<input id="fae_color-m1" type="text" value="#CCCCCC" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-bg3" class="fae_label">Vote Bar / Checkbox Color : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#CCCCCC" class="fae_color_picker" />' : '')+
                '<input id="fae_color-bg3" type="text" value="#CCCCCC" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-bg4" class="fae_label">Forum Read / Offline Color : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#999999" class="fae_color_picker" />' : '')+
                '<input id="fae_color-bg4" type="text" value="#999999" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-bg5" class="fae_label">Online Color : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#88BB55" class="fae_color_picker" />' : '')+
                '<input id="fae_color-bg5" type="text" value="#88BB55" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-bg6" class="fae_label">Row Hover Color : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#FFFFFF" class="fae_color_picker" />' : '')+
                '<input id="fae_color-bg6" type="text" value="#FFFFFF" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-m2" class="fae_label">Scrollbar Background Color : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#DDDDDD" class="fae_color_picker" />' : '')+
                '<input id="fae_color-m2" type="text" value="#DDDDDD" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+
            '<br/>'+


            '<h3 class="post-content">Font Settings</h3>'+
            '<p id="fae_colors_desc3">The options below allow you to change the font color, size, and family, of the forum.</p>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-f0" class="fae_label">Text Color : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#333333" class="fae_color_picker" />' : '')+
                '<input id="fae_color-f0" type="text" value="#333333" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-f5" class="fae_label">Link Color : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#336699" class="fae_color_picker" />' : '')+
                '<input id="fae_color-f5" type="text" value="#336699" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-f6" class="fae_label">Visited Link Color : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#336699" class="fae_color_picker" />' : '')+
                '<input id="fae_color-f6" type="text" value="#336699" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-f7" class="fae_label">Hover Link Color : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#6699CC" class="fae_color_picker" />' : '')+
                '<input id="fae_color-f7" type="text" value="#6699CC" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-f8" class="fae_label">Active Link Color : </span>'+
              '<span class="fae_colors">'+
                (FAE.colorSupport ? '<input type="color" value="#77AADD" class="fae_color_picker" />' : '')+
                '<input id="fae_color-f8" type="text" value="#77AADD" maxlength="7" class="fae_text_input" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-f1" class="fae_label">Main Font Size : </span>'+
              '<span class="fae_colors">'+
                '<input id="fae_color-f1" type="text" value="12px" class="fae_text_input" data-ignore="true" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-f2" class="fae_label">Main Font Face : </span>'+
              '<span class="fae_colors">'+
                '<input id="fae_color-f2" type="text" value="Roboto, Helvetica Neue, Helvetica, Arial, sans-serif" class="fae_text_input max" data-ignore="true" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-f3" class="fae_label">Title Font Face : </span>'+
              '<span class="fae_colors">'+
                '<input id="fae_color-f3" type="text" value="Trebuchet MS, Arial, Verdana, Sans-serif" class="fae_text_input max" data-ignore="true" />'+
              '</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span id="fae_label-color-f4" class="fae_label">Code Font Face : </span>'+
              '<span class="fae_colors">'+
                '<input id="fae_color-f4" type="text" value="Monaco, DejaVu Sans Mono, Bitstream Vera Sans Mono, Lucida Console, monospace" class="fae_text_input max" data-ignore="true" />'+
              '</span>'+
            '</div>'+
            '<br/>'+

          '</div>'+

          '<div class="fae_options_column">'+
            '<h3 class="post-content" style="margin-left:3px;">Preview</h3>'+
            '<iframe id="fae_colors_preview" src="/forum"></iframe>'+
          '</div>'+

          '<div class="fae_cp_row clear">'+
            '<input id="fae_save_colors" type="button" value="Save Changes" />'+
            '<input id="fae_default_colors" type="button" value="Revert Back to Default Colors" />'+
          '</div>'+
        '</div>');


        // helper function to build our CSS string
        function fae_compileColors () {
              // primary colors
          var p1 = document.getElementById('fae_color-p1').value,
              p2 = document.getElementById('fae_color-p2').value,
              p3 = document.getElementById('fae_color-p3').value,
              p4 = document.getElementById('fae_color-p4').value,
              p5 = document.getElementById('fae_color-p5').value,

              // font config
              f0 = document.getElementById('fae_color-f0').value,
              f1 = [document.getElementById('fae_color-f1').value],
              f2 = document.getElementById('fae_color-f2').value,
              f3 = document.getElementById('fae_color-f3').value,
              f4 = document.getElementById('fae_color-f4').value,
              f5 = document.getElementById('fae_color-f5').value,
              f6 = document.getElementById('fae_color-f6').value,
              f7 = document.getElementById('fae_color-f7').value,
              f8 = document.getElementById('fae_color-f8').value,

              // background colors
              bg1 = document.getElementById('fae_color-bg1').value,
              bg2 = document.getElementById('fae_color-bg2').value,
              bg3 = document.getElementById('fae_color-bg3').value,
              bg4 = document.getElementById('fae_color-bg4').value,
              bg5 = document.getElementById('fae_color-bg5').value,
              bg6 = document.getElementById('fae_color-bg6').value,

              // misc
              m1 = document.getElementById('fae_color-m1').value,
              m2 = document.getElementById('fae_color-m2').value,

              empty = 'transparent',
              int;

          bg1 = bg1 == '#' ? empty : bg1;
          p1 = p1 == '#' ? empty : p1;
          p2 = p2 == '#' ? empty : p2;
          p3 = p3 == '#' ? empty : p3;
          p4 = p4 == '#' ? empty : p4;
          m1 = m1 == '#' ? empty : m1;
          m2 = m2 == '#' ? empty : m2;

          f1[1] = f1[0].replace(/.*?(\d+).*/, '$1');
          f1[2] = f1[0].replace(/.*?([^0-9\.]+).*/, '$1');

          return '/*!FAE_COLORS*/\n'+

          // primary colors
          '.color-primary, .title, h2.u, .h3, .inner h1.page-title, .mainmenu:after, .forumline tbody .catHead, form.search-form input.search-keywords, input.search-button, .pagination span a, a.button1, a.button2, button.button2, input.button1, input.button2, input.button, #profile-advanced-add a, img[src*="?poll"], .fa_pseudo_radio:after, #tabs, body div.sceditor-dropdown .button, .codebox dt, blockquote cite, .sceditor-container .sceditor-toolbar, body #fa_toolbar, body #fa_toolbar_hidden, body #fa_toolbar #fa_right #notif_list li.see_all, #fae_sticky_nav_panel a:after, img[src*="color=primary"], .table1 thead th, .breadcrumbs, input[type="button"], input[type="submit"], input[type="reset"], input[type="file"], .forumbg li.header, #chatbox_header, body #chatbox_footer { background-color:/*!FAE_P1*/' + p1 + '/*FAE_P1!*/; }'+
         '#cp-main h1:not(.title) { background-color:' + p1 + '; }'+
         '.pagination span a:hover, a.button1:hover, a.button2:hover, button.button2:hover, input.button1:hover, input.button2:hover, input.button:hover, #profile-advanced-add a:hover, input.search-button:hover, body div.sceditor-dropdown .button:hover, img[src*="color=primary"]:hover, input[type="button"]:hover, input[type="submit"]:hover, input[type="reset"]:hover, input[type="file"]:hover { background-color:/*!FAE_P3*/' + p3 + '/*FAE_P3!*/; }'+
         '.pagination span a:active, .pagination span a:focus, .pagination span strong, a.button1:active, a.button2:active, button.button2:active, input.button1:active, input.button2:active, input.button:active, input[type="button"]:active, input[type="submit"]:active, input[type="reset"]:active, input[type="file"]:active, a.button1:focus, a.button2:focus, button.button2:focus, input.button1:focus, input.button2:focus, input.button:focus, input.search-button:focus, #tabs a:after, body div.sceditor-dropdown .button:active, body div.sceditor-dropdown .button:focus, body #fa_search #fa_textarea, body #fa_search #fa_magnifier, img[src*="color=primary"]:active, input[type="button"]:focus, input[type="submit"]:focus, input[type="reset"]:focus, input[type="file"]:focus { background-color:/*!FAE_P4*/' + p4 + '/*FAE_P4!*/; }'+
         '.fa_pseudo_checkbox:after, h2.post-content, h3.post-content, h4.post-content, .codebox .fae_copy-code:before { color:' + p1 + '; }'+
         'img[src*="?poll"], .sceditor-container .sceditor-toolbar, .sceditor-container .sceditor-group, body #fa_toolbar, body #fa_toolbar_hidden { border-color:' + p3 + '; }'+
         '.color-secondary, .forum-status[style*="locked=true"], img[src*="color=secondary"] { background-color:/*!FAE_P5*/' + ( p5 == '#' ? empty : p5 ) + '/*FAE_P5!*/; }'+
         '.forum-status[style*="state=new"] { background-color:/*!FAE_P2*/' + p2 + '/*FAE_P2!*/; }'+
         'form.search-form { background-color:' + p3 + '; }'+
         'form.search-form input.search-keywords, input.search-button { border-color:' + p2 + '!important; }'+
         'input[type="text"]:hover, input.post:hover, input.inputbox:hover, textarea:hover, select:hover, input[type="text"]:focus, input.post:focus, input.inputbox:focus, textarea:focus, select:focus, body div.sceditor-dropdown input:focus, body div.sceditor-dropdown textarea:focus, .fa_pseudo_checkbox:hover, .fa_pseudo_radio:hover, .sceditor-container, h2.post-content, h3.post-content, h4.post-content, .lastpost-avatar, #wio_new_avatar, .avatar-mini img, .avatar, #chatbox, #chatbox_members, #chatbox_members > h4.away, #chatbox_members > ul.away-users, body #chatbox .cb-avatar { border-color:' + p1 + ' !important; }'+
         '::selection { background-color:' + p1 + '; } ::-moz-selection { background-color:' + p1 + '; }'+
         '::-webkit-scrollbar-thumb, ::-webkit-scrollbar-button:single-button { background-color:' + p1 + '; }'+
         '::-webkit-scrollbar-thumb:hover, ::-webkit-scrollbar-button:single-button:hover { background-color:' + p3 + '; }'+
         '::-webkit-scrollbar-thumb:active, ::-webkit-scrollbar-button:single-button:active { background-color:' + p4 + '; }'+

          // font config
          '.color-tertiary, .content-block, .panel, .module, .lor_maintitle, .lor_subtitle, .lor_maindesc, .lor_subdesc, .forum-block, .addthis_button:after, .pagination a[href$="mark=topics"]:after, .pagination a[href$="watch=forum"]:after, input[type="text"], input.inputbox, input.post, textarea, select, body div.sceditor-dropdown input, body div.sceditor-dropdown textarea, body .sceditor-container textarea, html body.chatbox { color:/*!FAE_F0*/' + ( f0 == '#' ? empty : f0 ) + '/*FAE_F0!*/; }'+
          'fieldset dt label, fieldset dt span, fieldset dt { color:' + ( f0 == '#' ? empty : f0 ) + '!important; }'+
          'fieldset dl:hover dt label, fieldset dl:hover dt span, fieldset dl:hover dt { color:' + ( f0 == '#' ? empty : fae_editColor(f0, -3) ) + '!important; }'+
          'a { color:/*!FAE_F5*/' + ( f5 == '#' ? empty : f5 ) + '/*FAE_F5!*/; }'+
          'a:visited { color:/*!FAE_F6*/' + ( f6 == '#' ? empty : f6 ) + '/*FAE_F6!*/; }'+
          'a:hover { color:/*!FAE_F7*/' + ( f7 == '#' ? empty : f7 ) + '/*FAE_F7!*/; }'+
          'a:active { color:/*!FAE_F8*/' + ( f8 == '#' ? empty : f8 ) + '/*FAE_F8!*/; }'+

          'body, #navbar .mainmenu, #tabs a, .forum-category .title, .traffic-exchange .title, .profile-field .label, .profile-field .value, .addthis_button, a[href="javascript:showhide(document.getElementById(\'plus_menu\'))"], #plus_menu, .pagination a[href$="mark=topics"], .pagination a[href$="watch=forum"], a[href="javascript:Pagination();"], .breadcrumbs a { font-size:/*!FAE_F1*/' + f1[0] + '/*FAE_F1!*/; }'+ // 12px
          '.lor_maintitle, .lor_subtitle { font-size:' + ( f1[1] * 3 + f1[2] ) + '; }'+ // 36px
          '#site-title, #site-title h1 { font-size:' + ( f1[1] * 2 + f1[2] ) + '; }'+ // 24px
          '.wio_value strong { font-size:' + ( f1[1] * 1.835 + f1[2] ) + '; }'+ // 22px
          '.post .post-number, .post .title h2 { font-size:' + ( f1[1] * 1.75 + f1[2] ) + '; }'+ // 21px
          '.lor_subtitle { font-size:' + ( f1[1] * 1.67 + f1[2] ) + '; }'+ // 20px
          '.vote .vote-button-plus, .vote .vote-button-minus, .breadcrumbs a:after { font-size:' + ( f1[1] * 1.5 + f1[2] ) + '; }'+ // 18px
          '.pagination span a, .pagination span strong { font-size:' + ( f1[1] * 12 * 1.42 + f1[2] ) + '; }'+ // 17px
          '.forum-stats .number, input.search-button, .breadcrumbs a:first-child:before, #chatbox_members:after { font-size:' + ( f1[1] * 1.335 + f1[2] ) + '; }'+ // 16px
          '.forum-category .title:after, .traffic-exchange .title:after, .topic-info .pagination a, form.search-form input.search-keywords { font-size:' + ( f1[1] * 1.25 + f1[2] ) + '; }'+ // 15px
          '#privmsgs-menu, .codebox dt, blockquote cite, .attachbox > dt, #wio_newest_inner:before, #wio_newest_user strong, #wio_groups a, .pwd_img, .vote_num, a.forumtitle, a.topictitle, .lor_maindesc, .lor_subdesc, #fae_sticky_nav_panel a, .title, h2.u, .h3, .inner h1.page-title, #cp-main h1:not(.title) { font-size:' + ( f1[1] * 1.17 + f1[2] ) + '; }'+ // 14px
          '.post .content, .wio_stats:after, a.button1, a.button2, button.button2, input.button1, input.button2, input.button, #profile-advanced-add a, body div.sceditor-dropdown .button, input[type="button"], input[type="submit"], input[type="reset"], input[type="file"] { font-size:' + ( f1[1] * 1.085 + f1[2] ) + '; }'+ // 13px

          'body, body #fa_toolbar { font-family:/*!FAE_F2*/' + f2 + '/*FAE_F2!*/; }'+
          'h2.post-content, h3.post-content, h4.post-content, #navbar .mainmenu, #tabs a, .title, h2.u, .h3, .inner h1.page-title, #cp-main h1:not(.title) { font-family:/*!FAE_F3*/' + f3 + '/*FAE_F3!*/; }'+
          '.codebox code { font-family:/*!FAE_F4*/' + f4 + '/*FAE_F4!*/; }'+

          // background colors
          '.color-tertiary, html body.chatbox, .lor_panel, .jqmWindow, .gallery, .postprofile dl, .module #calendar .table1 td:not([class*="row"]), input[type="text"], input.inputbox, input.post, textarea, select, body div.sceditor-dropdown input, body div.sceditor-dropdown textarea, .fa_pseudo_checkbox, .fa_pseudo_radio, #profile-advanced-details .panel > .inner > ol > li, .lastpost-avatar, .avatar-mini img, .avatar, #wio_new_avatar, body .sceditor-container textarea, .codebox, blockquote, .attachbox, body #chatbox_contextmenu, body #chatbox .cb-avatar, body #chatbox_contextmenu, .info-gallery { background-color:/*!FAE_BG1*/' + bg1 + '/*FAE_BG1!*/; }'+
          '.content-block, .panel, .module, .forum-block-inner, #plus_menu, .table1, .forumline { background-color:/*!FAE_BG2*/' + ( bg2 == '#' ? empty : bg2 ) + '/*FAE_BG2!*/; }'+
          '.vote .vote-bar, .vote .vote-no-bar, .fa_pseudo_radio:before { background-color:/*!FAE_BG3*/' + ( bg3 == '#' ? empty : bg3 ) + '/*FAE_BG3!*/; }'+
          '.forum-status, .forum-status[style*="state=old"], .postprofile dl:before { background-color:/*!FAE_BG4*/' + ( bg4 == '#' ? empty : bg4 ) + '/*FAE_BG4!*/; }'+
          '.online .postprofile dl:before { background-color:/*!FAE_BG5*/' + ( bg5 == '#' ? empty : bg5 ) + '/*FAE_BG5!*/; }'+
          '.forum-block:hover .forum-block-inner { background-color:/*!FAE_BG6*//*HEX:' + bg6 + '*/' + ( bg6 == '#' ? empty : 'rgba(' + ( [(int = parseInt(bg6.slice(1), 16)) >> 16 & 255, int >> 8 & 255, int & 255].join() ) + ',0.8)' ) + '/*FAE_BG6!*/; }'+

          // misc
          '.content-block, .panel, .module, .lor_panel, .jqmWindow, .gallery, .info-gallery, .postprofile dl, hr, #plus_menu, .forumline, .ucp-main .table1, .forum-block, .table1 tbody td, .forumline tbody td, .forumline tbody th, .module #calendar .table1, .module #calendar .table1 th, input[type="text"], input.inputbox, input.post, textarea, select, body div.sceditor-dropdown input, body div.sceditor-dropdown textarea, .fa_pseudo_checkbox, .fa_pseudo_radio, .codebox, blockquote, .attachbox, #profile-advanced-details .panel > .inner > ol > li, body #fa_menulist, body #fa_toolbar #fa_right #notif_list { border-color:/*!FAE_M1*/' + m1 + '/*FAE_M1!*/; }'+
          '#fa_menulist:before, #notif_list:before { border-bottom-color:' + m1 + '; }'+
          '::-webkit-scrollbar-track { background-color:/*!FAE_M2*/' + m2 + '/*FAE_M2!*/; }'+
          '::-webkit-scrollbar-thumb { border-color:' + m2 + '; }'+

          // responsive rules
          '@media (min-width:0px) and (max-width:768px) {'+
            '.postprofile dl { border-bottom:1px solid ' + m1 + '; }'+
            '.postbody .profile-icons { background:' + bg1 + '; border-top:1px solid ' + m1 + '; }'+
          '}'+

          '\n/*FAE_COLORS!*/';
        };


        // helper function to update preview frame
        function fae_colorPreview () {
          var frame = document.getElementById('fae_colors_preview'),
              head;

          try {
            head = $('head', frame.contentDocument || frame.contentWindow.document);

            $('#fae_stylesheet_preview', head).remove();
            head.append('<style id="fae_stylesheet_preview" type="text/css">' + fae_compileColors() + '</style>');

          } catch (error) {
            console.log(error);
          }
        };


        // bind events to color and text inputs
        for (var a = document.querySelectorAll('.fae_colors input'), i = 0, j = a.length; i < j; i++) {
          switch (a[i].type) {
            case 'color' :
              a[i].onchange = function () {
                this.nextSibling.value = this.value.toUpperCase();
                fae_colorPreview();
              };
              break;

            case 'text' :
              a[i].oninput = function () {
                if (!this.dataset.ignore) {
                  if (this.value == 0) {
                    this.value = '#';
                  }

                  this.previousSibling.value = this.value;
                }

                fae_colorPreview();
              };
              break;

            case 'checkbox' :
              a[i].onchange = function () {
                var prev = this.previousSibling;

                if (!this.checked) {
                  prev.disabled = true;
                  prev.previousSibling.disabled = true;
                } else {
                  prev.disabled = false;
                  prev.previousSibling.disabled = false;
                }

                fae_colorPreview();
              };
              break;
          }
        }


        // reapply preview when the frame is reloaded
        document.getElementById('fae_colors_preview').onload = fae_colorPreview;


        // get existing settings from the stylesheet
        $.get('/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid, function(d) {
          var css = $('form[method="post"]', d)[0];

          if (css) {
            css = css.edit_code.value;

            for (var a = document.querySelectorAll('[id^="fae_color-"]'), i = 0, j = a.length, id, color, input; i < j; i++) {
              try {
                id = a[i].id.replace(/fae_color-/, '');
                input = document.getElementById('fae_color-' + id);
                color = css.match(new RegExp('/\\*!FAE_' + id.toUpperCase() + '\\*/([\\s\\S]+)/\\*FAE_' + id.toUpperCase() + '!\\*/'))[1];

                input.value = color == 'transparent' ? '#' : color.replace(/\/\*HEX:(.*?)\*\/rgba.*/, '$1');
                input.previousSibling.value = input.value;
              } catch (e) {}
            }
          }
        });


        // update the forum's colors
        $('#fae_save_colors, #fae_default_colors').click(function() {
          var save = this.id == 'fae_save_colors';

          if (save || confirm('Are you sure you want to delete your custom color settings, and revert back to the default forum colors?')) {

            FAE.log(save ? 'Updating the forum colors..' : 'Reverting back to default color settings..');
            FAE.quota = 2;
            FAE.index = 0;
            FAE.progress();

            // get the stylesheet
            $.get('/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid, function(d) {
              var form = $('form[method="post"]', d)[0],
                  val, regex;

              FAE.index = 1;
              FAE.progress();

              if (form) {
                val = form.edit_code.value;
                regex = /\/\*!FAE_COLORS\*\/[\s\S]+\/\*FAE_COLORS!\*\//;

                if (regex.test(val)) {
                  val = val.replace(regex, '');
                }

                // update the stylesheet
                $.post('/admin/index.forum?part=themes&sub=logos&mode=css&extended_admin=1&tid=' + FAE.tid, {
                  edit_code : val + (save ? '\n' + fae_compileColors() : ''),
                  submit : 'Save'

                }, function(d) {
                  FAE.index = 2;
                  FAE.progress();

                  FAE.log(save ? 'Forum colors have been updated successfully !' : 'Forum colors have been changed back to their default settings !', 'font-weight:bold;color:#8B5;');
                  FAE.log('Please <a href="javascript:window.location.reload();">click here</a> to reload the page.');
                });

              }
            });

            document.getElementById('fae_options').style.display = 'none';
          }
        });



        // create and insert the plugin manager
        $(opts).append('<div id="category-plugin" style="display:none;">'+

          '<div class="fae_cp_title" id="fae_title-plugin_management" style="margin-top:24px;">Plugin Management</div>'+

          '<p id="fae_plugin_desc">This section allows you to manage the settings of core-plugins for Forumactif Edge.</p>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip" id="fae_theme_tip-qnp">Position of the Quick Navigation side menu.</span>'+
            '</span>'+
            '<span id="fae_label-qnp" class="fae_label">Quick Navigation Position : </span>'+
            '<label for="fae_qnp_left"><input type="radio" id="fae_qnp_left" name="fae_qnp" value="1" checked> Left</label>'+
            '<label for="fae_qnp_right"><input type="radio" id="fae_qnp_right" name="fae_qnp" value="0"> Right</label>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip" id="fae_theme_tip-qns">By default the Quick Navigation only shows when the navbar is out of view. Enabling this option will allow the Quick Navigation to always be visible.</span>'+
            '</span>'+
            '<span id="fae_label-qns" class="fae_label">Always show Quick Navigation : </span>'+
            '<label for="fae_qns_yes"><input type="radio" id="fae_qns_yes" name="fae_qns" value="1"> Yes</label>'+
            '<label for="fae_qns_no"><input type="radio" id="fae_qns_no" name="fae_qns" value="0" checked> No</label>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip" id="fae_theme_tip-tso">This tool allows you to edit the theme selector list, giving you the option to add, delete, and edit themes.</span>'+
            '</span>'+
            '<span id="fae_label-tso" class="fae_label">Theme Selector Options : </span>'+
            '<div id="fae_themer">'+
              '<div id="fae_theme_options"></div>'+
              ''+
              '<input id="fae_themer_add" type="button" value="New Theme"/>'+
              '<input id="fae_themer_import" type="button" value="Import Default"/>'+
            '</div>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<input id="fae_save_plugins" type="button" value="Save Changes" />'+
          '</div>'+
        '</div>');


        // get existing settings from ALL.JS
        $.get('/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid, function (d) {
          for (var row = $('#listJs tr', d), i = 0, j = row.length, regex = /\[FA EDGE\] ALL\.JS/, all; i < j; i++) {
            if (regex.test(row[i].innerHTML)) {
              all = $('a', row[i])[1].href;
              break;
            }
          }

          if (all) {

            $.get(all, function (d) {
              var form = $('#formenvoi', d)[0],
                  js;

              if (form) {
                js = form.content.value;

                document.getElementById('fae_qnp_' + (/position : 'right'/.test(js) ? 'right' : 'left')).checked = true;
                document.getElementById('fae_qns_' + (/alwaysVisible : true,/.test(js) ? 'yes' : 'no')).checked = true;
              }
            });

          }
        });

        // build theme color manager
        function fae_compileThemes (msg, obj, init) {
          var opts = document.getElementById('fae_theme_options'),
              html = '', k, c;

          opts.innerHTML = msg;

          if (init) {
            window.fae_themeList = '';
          }

          for (k in obj) {
            if (obj[k].length == 5 && k != 'Custom theme') {
              c = obj[k][1];
              html += '<div class="theme_opt"><input class="color_block fae_color_picker" type="' + (FAE.colorSupport ? 'color' : 'text') + '" value="' + (c.length == 4 ? '#' + c.charAt(1) + c.charAt(1) + c.charAt(2) + c.charAt(2) + c.charAt(3) + c.charAt(3) : c) + '"/><input class="color_name fae_text_input" type="text" value="' + k + '"/><i class="fa fa-times" title="Delete Theme"></i><i class="fa fa-sort-up" title="Move Up"></i><i class="fa fa-sort-desc" title="Move Down"></i></div>';
            } else if (init) {
              fae_themeList += '"' + k + '" : [' + ( obj[k].length == 5 ? "cc ? fae_editColor(cc, +1) : '#77AADD', cc || '#6699CC', cc ? fae_editColor(cc, -1) : '#5588BB', cc ? fae_editColor(cc, -3) : '#336699', cc ? fae_editColor(cc, 'darken') : '#334455'" : '' ) + '],\n';
            }
          }

          opts.innerHTML = html;
        };

        fae_compileThemes('Compiling themes, please wait...', fa_theme_color.palette, true);


        // add a new random theme
        document.getElementById('fae_themer_add').onclick = function () {
          var hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'],
              opts = document.getElementById('fae_theme_options'),
              i = 0,
              color = '#';

          while (i < 6) {
            color += hex[Math.floor(Math.random() * hex.length)];
            i++
          }

          opts.insertAdjacentHTML('beforeend', '<div class="theme_opt"><input class="color_block fae_color_picker" type="' + (FAE.colorSupport ? 'color' : 'text') + '" value="' + color + '"/><input class="color_name fae_text_input" type="text" value="New Theme ' + document.querySelectorAll('.theme_opt').length + '"/><i class="fa fa-times" title="Delete Theme"></i><i class="fa fa-sort-up" title="Move Up"></i><i class="fa fa-sort-desc" title="Move Down"></i></div>');
          opts.lastChild.scrollIntoView();
        };

        // theme option events
        $(document).on('click', '.theme_opt .fa', function (e) {
          var that = e.target,
              opts = document.getElementById('fae_theme_options'),
              next;

          switch (that.className) {
            case 'fa fa-times' :
              opts.removeChild(that.parentNode);
              break;

            case 'fa fa-sort-up' :
              opts.insertBefore(that.parentNode, that.parentNode.previousSibling);
              break;

            case 'fa fa-sort-desc' :
              next = that.parentNode.nextSibling.nextSibling;
              next ? opts.insertBefore(that.parentNode, next) : opts.appendChild(that.parentNode);
              break;
          }

          that.parentNode.scrollIntoView();
        });


        // import default themes
        document.getElementById('fae_themer_import').onclick = function () {
          if (confirm('Do you want to import the default theme list from Github ?')) {
            var that = this;

            that.disabled = true;
            document.getElementById('fae_theme_options').innerHTML = 'Contacting Github, please wait...';

            $.get(FAE.raw + 'javascripts/in-all-the-pages/all.js', function(d) {
              FAE.script(
                'fae_default_themes = {' +
                  d.match(/palette : {[\s\S]*?'.*?' : \[\],[\s\S]*?'.*?' : \[\],([\s\S]*?)}/)[1] +
                '}'
              );
              fae_compileThemes('Compiling themes, please wait...', fae_default_themes);
            });

            window.setTimeout(function() {
              that.disabled = false;
            }, 10000);
          }
        };


        // submit plugin settings on click
        document.getElementById('fae_save_plugins').onclick = function () {
          var qnp = document.getElementById('fae_qnp_right').checked ? 'right' : 'left',
              qns = document.getElementById('fae_qns_yes').checked ? true : false;

          FAE.log('Locating [FA EDGE] ALL.JS...');
          FAE.quota = 3;
          FAE.index = 0;
          FAE.progress();

          $.get('/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid, function (d) {
            for (var row = $('#listJs tr', d), i = 0, j = row.length, regex = /\[FA EDGE\] ALL\.JS/, all; i < j; i++) {
              if (regex.test(row[i].innerHTML)) {
                all = $('a', row[i])[1].href;
                break;
              }
            }

            if (all) {
              FAE.log('[FA EDGE] ALL.JS found !');
              FAE.log('Getting [FA EDGE] ALL.JS...');
              FAE.index = 1;
              FAE.progress();

              $.get(all, function (d) {
                var form = $('#formenvoi', d)[0];

                if (form) {
                  FAE.log('Updating your plugins...');
                  FAE.index = 2;
                  FAE.progress();

                  for (var a = document.querySelectorAll('.theme_opt'), i = 0, j = a.length, input, val; i < j; i ++) {
                    input = a[i].getElementsByTagName('INPUT');
                    val = input[0].value;

                    fae_themeList += '"' + input[1].value + '" : ["' + ( fae_editColor(val, +1) + '", "' + val + '", "' + fae_editColor(val, -1) + '", "' + fae_editColor(val, -3) + '", "' + fae_editColor(val, 'darken') ) + '"]' + (i + 1 == j ? '' : ',') + '\n';
                  }

                  $.post(form.action, {
                               title : '[FA EDGE] ALL.JS',
                    'js_placement[]' : 'allpages',
                             content : form.content.value
                                       .replace(/position : '.*?'/, "position : '" + qnp + "'") // quick nav position
                                       .replace(/alwaysVisible : .*?,/, "alwaysVisible : " + qns + ",") // quick nav visibility
                                       .replace(/palette : {[\s\S]*?}/, 'palette : {\n' + fae_themeList + '\n}'), // theme selector
                                mode : 'save',
                                page : form.page.value,
                              submit : 'Submit'

                  }, function (d) {
                    FAE.log('Plugins have been updated successfully !', 'font-weight:bold;color:#8B5;');
                    FAE.log('Please <a href="javascript:window.location.reload();">click here</a> to reload the page.');
                    FAE.index = 3;
                    FAE.progress();
                  });

                } else {
                  FAE.log('Error getting "[FA EDGE] ALL.JS", please try again or contact <a href="http://fmdesign.forumotion.com/f32-support" target="_blank">the support</a> for more information.', 'color:#E53;font-weight:bold;');
                  FAE.log('Please <a href="javascript:window.location.reload();">click here</a> to reload the page.');
                }
              });


            } else {
              FAE.log('"[FA EDGE] ALL.JS" could not be found. Please make sure that you did not rename the original ALL.JS file, contact <a href="http://fmdesign.forumotion.com/f32-support" target="_blank">the support</a> for more information.', 'color:#E53;font-weight:bold;');
              FAE.log('Please <a href="javascript:window.location.reload();">click here</a> to reload the page.');
            }

          });

          document.getElementById('fae_options').style.display = 'none';
        };


        // setup and begin translation of control panel
        $.get(FAE.raw + 'lang/' + document.getElementById('fae_selected_language').value + '.js', function(d) {
          FAE.script(d.replace('FAE.lang', 'FAE.cp_lang'));
          FAE.cp_lang = FAE.cp_lang.fae_cp;

          var cp = document.getElementById('fae_cp'),
              title = $('.fae_cp_title', cp),
              a, i, j;

          // MAIN CP TRANSLATION
          document.getElementById('fae_cp_main_title').innerHTML = FAE.cp_lang.fae_cp_main_title;
          document.getElementById('fae_cp_desc').innerHTML = FAE.cp_lang.fae_cp_desc;
          document.getElementById('fae_cp_help').innerHTML = FAE.cp_lang.help;
          document.getElementById('fae_install').value = installed ? FAE.cp_lang.fae_reinstall : FAE.cp_lang.fae_install;
          document.getElementById('fae_uninstall').value = FAE.cp_lang.fae_uninstall;
          document.getElementById('fae_update').value = FAE.cp_lang.fae_update;
          document.getElementById('fae_translate').value = FAE.cp_lang.fae_translate;

          // TITLES
          title[0].innerHTML = FAE.cp_lang.fae_log;
          title[1].innerHTML = FAE.cp_lang.fae_actions;
          document.getElementById('fae_title-general_settings').innerHTML = FAE.cp_lang.general_settings.title;
          document.getElementById('fae_title-theme_management').innerHTML = FAE.cp_lang.theme_management.title;

          // LABELS
          for (a = $('label', cp), i = 0, j = a.length; i < j; i++) {
            a[i].innerHTML = a[i].innerHTML.replace(/\s\w+$/, FAE.cp_lang[$(a[i]).text().toLowerCase().slice(1)]);
          }

          // GENERAL SETTINGS
          for (i in FAE.cp_lang.general_settings) {
            a = document.getElementById(i);
            if (a) {
              a[a.tagName == 'INPUT' ? 'value' : 'innerHTML'] = FAE.cp_lang.general_settings[i];
            }
          }

          // THEME MANAGEMENT
          for (i in FAE.cp_lang.theme_management) {
            a = document.getElementById(i);
            if (a) {
              a[a.tagName == 'INPUT' ? 'value' : 'innerHTML'] = FAE.cp_lang.theme_management[i];
            }
          }

        });
      }

    } else if (/page_html\?mode=preview/.test(window.location.href)) {
      FAE.log(FAE.cp_lang.fae_err_no_preview || 'The Forumactif Edge Control Panel cannot be used in preview mode. Please go to Admin Panel > Modules > HTML pages management and click the magnifying glass (<img src="http://illiweb.com/fa/admin/icones/voir.png" style="vertical-align:middle;"/>) for this page once you\'ve saved it.', 'color:#E53;font-weight:bold;');

    } else {
      FAE.log(FAE.cp_lang.fae_err_not_founder || 'Only <a href="/u1">the founder</a> may use this control panel. Please contact them for assistance in installing Forumactif Edge.', 'color:#E53;font-weight:bold;');
    }
  });

  // help link and version
  $('#fae_cp').append(
    '<div style="margin-top:12px">'+
      '<span style="float:left;">faecp-v' + FAE.cp_rev + '</span>'+
      '<a href="https://github.com/SethClydesdale/forumactif-edge/wiki/FAE-Control-Panel-Guide" target="_blank" style="float:right;"><strong id="fae_cp_help">Help!</strong></a>'+
      '<div class="clear"></div>'+
    '</div>'
  );

  if (FAE.maintenance) {
    $('#fae_cp').prepend('<div id="fae_maintenance"><i class="fa fa-warning"></i>Maintenance is currently being performed on the Control Panel. Don\'t worry if you notice anything strange, we\'ll get things back to normal shortly. For more information, please read about "<a href="https://github.com/SethClydesdale/forumactif-edge/wiki/Maintenance" target="_blank">Maintenance</a>" on our wiki.</div>');
  }

  // extra cp stylesheet
  $('head').append(
    '<style type="text/css">'+
      '.fae_cp_row { margin:6px 0; }'+
      '.fae_label { display:inline-block; width:200px; vertical-align:top; margin-top:5px; }'+
      '.fae_help_me { color:#FFF; font-size:18px; background:#69C; border-radius:100%; text-align:center; vertical-align:top; display:inline-block; height:24px; line-height:24px; width:24px; margin:auto 3px; position:relative; cursor:help; }'+
      '.fae_help_tip { color:#333; font-size:12px; line-height:15px; background:#EEE; border:1px solid #CCC; border-radius:3px; display:inline-block; width:300px; padding:3px; position:absolute; visibility:hidden; z-index:1; }'+
      '#fae_cp label { margin-right:10px; display:inline-block; }'+
      '#fae_cp label input { vertical-align:text-bottom; }'+
      '.fae_help_me:hover .fae_help_tip { visibility:visible; }'+
      'body #fae_cp { color:#333; background:#F6F6F6; border:1px solid #CCC; margin:50px 25px; padding:12px; }'+
      '#fae_custom_color { padding:0; vertical-align:middle; }'+
      '#fae_cp select, #fae_cp input { color:#333; background:#FFF; }'+
      '#fae_selected_color option:not([value="Default"]):not([value="Custom"]) { color:#FFF; }'+
      '#fae_maintenance { color:#333; font-size:16px; font-weight:bold; text-align:center; background:#EB3; padding:16px 12px; margin:-13px -13px 12px -13px; }'+
      '#fae_maintenance i { font-size:28px; vertical-align:-4px; margin-right:6px; }'+
      '#fae_maintenance a { color:#666; text-decoration:underline; }'+
      '#fae_maintenance a:hover { color:#000; text-decoration:none; }'+
      '#fae_themer { display:inline-block; }'+
      '#fae_themer_add { background:#8B5 !important; }'+
      '#fae_themer_add:hover { background:#7A4 !important; }'+
      '#fae_options [disabled] { opacity:0.5; }'+
      '#fae_theme_options { height:153px; border:1px solid #CCC; overflow:auto; margin-bottom:3px; padding:6px; width:100%; white-space:nowrap; }'+
      '#fae_options .fae_color_picker { background:none !important; border:1px solid transparent; padding:0; margin-right:3px; }'+
      '#fae_options .fae_color_picker:hover { border-color:#69C; }'+
      '#fae_options .fae_text_input { color:#333; background:#FFF !important; border:1px solid #CCC; cursor:text; }'+
      '#fae_options .fae_text_input:hover, #fae_theme_options .color_name:focus { border-color:#69C; }'+
      '.theme_opt i { color:#FFF; font-size:16px; text-align:center; display:inline-block; vertical-align:middle; height:20px; width:20px; line-height:20px; border-radius:20px; margin:0 3px; cursor:pointer; transition:200ms; }'+
      '.theme_opt i.fa-times { background:#E53; }'+
      '.theme_opt i[class*="sort"] { background:#69C; }'+
      '.theme_opt i.fa-times { line-height:19px; }'+
      '.theme_opt i.fa-sort-up { line-height:26px; }'+
      '.theme_opt i.fa-sort-desc { line-height:14px; }'+
      '.theme_opt:first-child i.fa-sort-up, .theme_opt:last-child i.fa-sort-desc { display:none; }'+
      '.theme_opt i:hover { transform:scale(1.2); }'+
      '.fae_options_column { float:left; width:50%; }'+
      '.fae_colors .fae_text_input { width:75px; }'+
      '.fae_colors .fae_text_input.max { width:30%; }'+
      '#fae_colors_preview { border:1px solid rgba(0, 0, 0, 0.2); width:99%; margin:0 3px; height:900px; }'+
    '</style>'
  );
}());

function fae_editColor (str, op) {
  var letter = { 'F' : 15, 'E' : 14, 'D' : 13, 'C' : 12, 'B' : 11, 'A' : 10 },
      hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'],
      neg = [0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6];

  str = str.toUpperCase().split('');

  for (var i = 1; i < 7; i++) {
    if (letter[str[i]]) {
      str[i] = letter[str[i]];
    } else {
      str[i] = +str[i];
    }

    if (op == 'darken') {
      str[i] = neg[str[i]];
    } else {
      str[i] += op;
    }

    if (str[i] > 15) {
      str[i] = 15;
    } else if (str[i] < 0) {
      str[i] = 0;
    }

    str[i] = hex[str[i]];
  }

  return str.join('');
};
