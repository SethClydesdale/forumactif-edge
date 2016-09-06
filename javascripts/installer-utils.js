(function() {
  if (!window.FAE) {
    window.FAE = new Object();
  }

  FAE.raw = 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/';
  FAE.eGIF = 'http://illiweb.com/fa/empty.gif';
  FAE.delay = 1000;
  FAE.cp_lang = {};

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
        if (!$('#change-font-size', d)[0]) {
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
              '<option value="Italian">Italiano</option>'+
              '<option value="Romanian">Romana</option>'+
              '<option value="Vietnamese">Tiếng Việt</option>'+
            '</select>'+
            '<input id="fae_translate" type="button" value="Change language" />'+
          '</div><div class="clear"></div>'
        );

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


        // create and insert general settings
        $(opts).append('<div class="fae_cp_title clear" style="margin-top:24px;">General Settings</div>'+

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
            '<label for="fae_profil_dir-right"><input type="radio" id="fae_profil_dir-right" name="fae_profil_dir"> Right</label>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<input id="fae_update_general" type="button" value="Save changes" />'+
          '</div>'
        );

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
                           document.getElementById('fae_profil_dir-right').checked ? 'right' : 'left',
              profil_dir2 = profil_dir == 'left' ? 'right' : 'left',

              val,
              form;

          // assign style rules to variables
          width = '/*!FAE_WIDTH*/#page-body{width:' + ( width >= 100 ? 'auto;' : width + '%;margin:0 auto;' ) + '}';
          nav_dir = '/*!FAE_NAV_DIR*/#navbar{text-align:' + nav_dir + '}';
          logo_dir = '/*!FAE_LOGO_DIR*/#logo-desc{text-align:' + logo_dir + '}#logo{float:' + ( logo_dir == 'center' ? 'none' : logo_dir ) + '}';
          profil_dir = '/*!FAE_PROFIL_DIR*/.postprofile{float:' + profil_dir + ';margin-' + profil_dir + ':-300px;margin-' + profil_dir2 + ':0px}.post-inner{margin-' + profil_dir2 + ':0;margin-' + profil_dir + ':300px}';

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
              if (/\/\*!FAE_PROFIL_DIR\*\/\.postprofile\{float:.*?;.*?\}\.post-inner\{.*?\}/.test(form.edit_code.value)) {
                val = val.replace(/\/\*!FAE_PROFIL_DIR\*\/\.postprofile\{float:.*?;.*?\}\.post-inner\{.*?\}/, profil_dir);
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
        $(opts).append('<div class="fae_cp_title clear" style="margin-top:24px;">Theme Management</div>'+

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
          '</div>'
        );


        document.getElementById('fae_import_theme').onclick = function() {
          var select = document.getElementById('fae_selected_theme'),
              selected = select.options[select.selectedIndex],
              stylesheet = selected.value + ( document.getElementById('fae_theme_dir_rtl').checked ? '-rtl' : '' ) + ( document.getElementById('fae_theme_min_yes').checked ? '.min' : '' ) + '.css';

          if (confirm( (FAE.cp_lang.theme_management ? FAE.parse_vars(FAE.cp_lang.theme_management.fae_import_confirm, {
            '{THEME_NAME}' : selected.innerHTML

          }) : 'Are you sure you want to import the theme "' + selected.innerHTML + '" ?\\\n\\\nPlease make sure to back up your current stylesheet if you want to keep it, because it will be overwritten when this new theme is imported. Choose "Cancel" if you\'re not ready to import a new theme.').replace(/\\/g, '') )) {

            FAE.theme = {
              name : selected.innerHTML,
              stylesheet : stylesheet,
              color : document.getElementById('fae_selected_color').value,
              dark : /-dark/i.test(stylesheet),
              rtl : /-rtl/i.test(stylesheet)
            };

            $.get(FAE.raw + 'javascripts/change-theme.js', function(d) {
              FAE.script(d);
              FAE.next();
            });

            document.getElementById('fae_options').style.display = 'none';
          }
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
          title[2].innerHTML = FAE.cp_lang.general_settings.title;
          title[3].innerHTML = FAE.cp_lang.theme_management.title;

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

  // help link
  $('#fae_cp').append('<div style="margin-top:12px"><a href="https://github.com/SethClydesdale/forumactif-edge/wiki/FAE-Control-Panel-Guide" target="_blank" style="float:right;"><strong id="fae_cp_help">Help!</strong></a><div class="clear"></div></div>');

  // extra cp stylesheet
  $('head').append(
    '<style type="text/css">'+
      '.fae_cp_row { margin:6px 0; }'+
      '.fae_label { display:inline-block; width:200px; }'+
      '.fae_help_me { color:#FFF; font-size:18px; background:#69C; border-radius:100%; text-align:center; vertical-align:middle; display:inline-block; height:24px; line-height:24px; width:24px; margin:auto 3px; position:relative; cursor:help; }'+
      '.fae_help_tip { color:#333; font-size:12px; line-height:15px; background:#EEE; border:1px solid #CCC; border-radius:3px; display:inline-block; width:300px; padding:3px; position:absolute; visibility:hidden; z-index:1; }'+
      '#fae_cp label { margin-right:10px; display:inline-block; }'+
      '#fae_cp label input { vertical-align:text-bottom; }'+
      '.fae_help_me:hover .fae_help_tip { visibility:visible; }'+
      'body #fae_cp { color:#333; background:#F6F6F6; border:1px solid #CCC; margin:50px 25px; padding:12px; }'+
      '#fae_cp select, #fae_cp input { color:#333; background:#FFF; }'+
      '#fae_selected_color option:not([value="Default"]) { color:#FFF; }'+
    '</style>'
  );
}());
