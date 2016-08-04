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
    if (_userdata.user_id == 1 && admin) {
      FAE.tid = admin.href.replace(/.*?(&tid=.*)/, '$1'); // cache the tid
      document.getElementById('fae_actions').style.display = 'block';

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
              '<option value="Français">Français</option>'+
              '<option value="German">Deutsch</option>'+
              '<option value="Greek">Ελληνικά</option>'+
              '<option value="Italian">Italiano</option>'+
              '<option value="Romanian">Romana</option>'+
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


        // create and insert the theme switcher
        $(opts).append('<div class="fae_cp_title clear" style="margin-top:24px;">Theme Management</div>'+

          '<p id="fae_theme_desc">This section allows you to manage the default theme and colors for Forumactif Edge by importing a new theme from the Github repository.</p>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip">Select the type of theme you want to import.</span>'+
            '</span>'+
            '<span id="fae_label_theme" class="fae_label">Select a theme : </span>'+
            '<select id="fae_selected_theme">'+
              '<option value="fa_edge" selected>Edge Default</option>'+
              '<option value="fa_edge-dark">Edge Dark</option>'+
            '</select>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip">Select the default color for the chosen theme.</span>'+
            '</span>'+
            '<span id="fae_label_color" class="fae_label">Select a color : </span>'+
            '<select id="fae_selected_color">'+
              '<option value="Default" selected>Default</option>'+
              '<option value="Persian Red" style="background:#b22;">Persian Red</option>'+
              '<option value="Chestnut Rose" style="background:#b55;">Chestnut Rose</option>'+
              '<option value="Eunry" style="background:#b88;">Eunry</option>'+
              '<option value="Tuscany" style="background:#b52;">Tuscany</option>'+
              '<option value="Antique Brass" style="background:#b85;">Antique Brass</option>'+
              '<option value="Hokey Pokey" style="background:#b82;">Hokey Pokey</option>'+
              '<option value="Earls Green" style="background:#bb2;">Earls Green</option>'+
              '<option value="Laser" style="background:#bb5;">Laser</option>'+
              '<option value="Pine Glade" style="background:#bb8;">Pine Glade</option>'+
              '<option value="Celery" style="background:#8b2;">Celery</option>'+
              '<option value="Wild Willow" style="background:#8b5;">Wild Willow</option>'+
              '<option value="Atlantis" style="background:#5b2;">Atlantis</option>'+
              '<option value="Apple" style="background:#2b2;">Apple</option>'+
              '<option value="Mantis" style="background:#5b5;">Mantis</option>'+
              '<option value="De York" style="background:#8b8;">De York</option>'+
              '<option value="Mountain Meadow" style="background:#2b5;">Mountain Meadow</option>'+
              '<option value="Emerald" style="background:#5b8;">Emerald</option>'+
              '<option value="Shamrock" style="background:#2b8;">Shamrock</option>'+
              '<option value="Turquoise" style="background:#2bb;">Turquoise</option>'+
              '<option value="Downy" style="background:#5bb;">Downy</option>'+
              '<option value="Sinbad" style="background:#8bb;">Sinbad</option>'+
              '<option value="Curious Blue" style="background:#28b;">Curious Blue</option>'+
              '<option value="Danube" style="background:#58b;">Danube</option>'+
              '<option value="Mariner" style="background:#25b;">Mariner</option>'+
              '<option value="Governor Bay" style="background:#22b;">Governor Bay</option>'+
              '<option value="Blue Marguerite" style="background:#55b;">Blue Marguerite</option>'+
              '<option value="Blue Bell" style="background:#88b;">Blue Bell</option>'+
              '<option value="Purple Heart" style="background:#52b;">Purple Heart</option>'+
              '<option value="Amethyst" style="background:#85b;">Amethyst</option>'+
              '<option value="Purple" style="background:#82b;">Purple</option>'+
              '<option value="Cerise" style="background:#b2b;">Cerise</option>'+
              '<option value="Fuchsia Pink" style="background:#b5b;">Fuchsia Pink</option>'+
              '<option value="Lilac" style="background:#b8b;">Lilac</option>'+
              '<option value="Red Violet" style="background:#b28;">Red Violet</option>'+
              '<option value="Hopbush" style="background:#b58;">Hopbush</option>'+
              '<option value="Hibiscus" style="background:#b25;">Hibiscus</option>'+
            '</select>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip">Minified stylesheets take up less space, but aren\'t ideal for editing. If you want to edit the stylesheet of the selected theme, choose "No" instead.</span>'+
            '</span>'+
            '<span id="fae_label_min" class="fae_label">Minify Stylesheet : </span>'+
            '<label for="fae_theme_min_yes"><input type="radio" id="fae_theme_min_yes" name="fae_theme_min" value="1" checked> Yes</label>'+
            '<label for="fae_theme_min_no"><input type="radio" id="fae_theme_min_no" name="fae_theme_min" value="0"> No</label>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<span class="fae_help_me">?'+
              '<span class="fae_help_tip">Changes the theme\'s text direction from left-to-right (ltr) to right-to-left (rtl) for rtl scripts.</span>'+
            '</span>'+
            '<span id="fae_label_rtl" class="fae_label">Right-to-Left : </span>'+
            '<label for="fae_theme_dir_rtl"><input type="radio" id="fae_theme_dir_rtl" name="fae_theme_dir" value="1"> Yes</label>'+
            '<label for="fae_theme_dir_ltr"><input type="radio" id="fae_theme_dir_ltr" name="fae_theme_dir" value="0" checked> No</label>'+
          '</div>'+

          '<div class="fae_cp_row">'+
            '<input id="fae_change_css" type="button" value="Import theme" />'+
          '</div>'
        );


        document.getElementById('fae_change_css').onclick = function() {
          var select = document.getElementById('fae_selected_theme'),
              selected = select.options[select.selectedIndex],
              stylesheet = selected.value + ( document.getElementById('fae_theme_dir_rtl').checked ? '-rtl' : '' ) + ( document.getElementById('fae_theme_min_yes').checked ? '.min' : '' ) + '.css';

          if (confirm( 'Are you sure you want to import the theme "' + selected.innerHTML + '" ?\\\n\\\nPlease make sure to back up your current stylesheet if you want to keep it, because it will be overwritten when this new theme is imported. Choose "Cancel" if you\'re not ready to import a new theme.'.replace(/\\/g, '') )) {
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

          var title = $('.fae_cp_title', document.getElementById('fae_cp'));

          document.getElementById('fae_cp_main_title').innerHTML = FAE.cp_lang.fae_cp_main_title;
          document.getElementById('fae_cp_desc').innerHTML = FAE.cp_lang.fae_cp_desc;
          document.getElementById('fae_install').value = installed ? FAE.cp_lang.fae_reinstall : FAE.cp_lang.fae_install;
          document.getElementById('fae_uninstall').value = FAE.cp_lang.fae_uninstall;
          document.getElementById('fae_update').value = FAE.cp_lang.fae_update;
          document.getElementById('fae_translate').value = FAE.cp_lang.fae_translate;

          title[0].innerHTML = FAE.cp_lang.fae_log;
          title[1].innerHTML = FAE.cp_lang.fae_actions;
        });
      }

    } else {
      FAE.log(FAE.cp_lang.fae_err_not_founder || 'Only <a href="/u1">the founder</a> may use this control panel. Please contact them for assistance in installing Forumactif Edge.', 'color:#E53;font-weight:bold;');
    }
  });

  // help link
  $('#fae_cp').append('<div style="margin-top:12px"><a href="https://github.com/SethClydesdale/forumactif-edge/wiki/FAE-Control-Panel-Guide" target="_blank" style="float:right;"><strong>Help!</strong></a><div class="clear"></div></div>');

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
