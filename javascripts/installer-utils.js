(function() {
  if (!window.FAE) {
    window.FAE = new Object();
  }

  FAE.raw = 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/';
  FAE.eGIF = 'http://illiweb.com/fa/empty.gif';

  FAE.logger = document.getElementById('fae_log');
  FAE.log = function(str, css) {
    FAE.logger.insertAdjacentHTML('beforeend', '<div class="fae_msg_log" ' + (css ? 'style="' + css + '"' : '') + '>' + str + '</div>');
    FAE.logger.scrollTop = 99999;
  };

  FAE.bar = document.getElementById('fae_progress');
  FAE.progress = function() {
    var percent = (FAE.index / FAE.quota * 100).toFixed(2);
    FAE.bar.innerHTML = '<div id="fae_prog_bar" style="width:' + percent + '%;"></div><span id="fae_prog_number">' + (percent == 100 ? 'COMPLETE!' : percent + '%') + '</span>';
  };

  // get update files and combine their steps into one array for consecutive execution
  FAE.getUpdates = function() {
    if (++FAE.update_index >= FAE.update_quota) {
      FAE.log('Updates are about to begin, please do not close this tab.');

      // get the update utilities and begin the update process
      $.get(FAE.raw + 'updates/utils.js', function(d) {
        FAE.script(d);
        FAE.next();
      });

    } else {
      FAE.log('Getting update instructions for version ' + FAE.update_queue[FAE.update_index] + '... (' + (FAE.update_index + 1) + '/' + FAE.update_queue.length + ')');

      $.get(FAE.raw + 'updates/' + FAE.update_queue[FAE.update_index] + '.js', function(d) {
        FAE.script(d);
        FAE.step = FAE.step.concat(FAE.update_step);
        FAE.getUpdates();

      }).error(function() {
        FAE.log('Update instructions for version ' + FAE.update_queue[FAE.update_index] + ' could not be found. Please <a href="https://github.com/SethClydesdale/forumactif-edge/issues/new" target="_blank">open a new issue</a> and provide this information for further assistance.', 'color:#E53;font-weight:bold;');
        FAE.getUpdates();
      });
    }
  };

  FAE.script = function(content) {
    var script = document.createElement('SCRIPT');
    script.type = 'text/javascript';
    script.text = content;
    document.body.appendChild(script);
  };

  // stuff that needs to be executed when the doc is ready
  $(function() {
    var admin = $('a[href^="/admin/"]')[0], // get the AP link so we can fetch the TID
        installed = document.getElementById('fa_edge');

    // only allow the founder to install the theme
    if (_userdata.user_id == 1 && admin) {
      FAE.tid = admin.href.replace(/.*?(&tid=.*)/, '$1'); // cache the tid
      document.getElementById('fae_actions').style.display = 'block';

      // Installation initialization
      document.getElementById('fae_install').onclick = function() {
        if (confirm('Are you sure you want to ' + ( installed ? 're' : '' ) + 'install Forumactif Edge? This will overwrite your current theme and delete your current JavaScripts. \\\n\\\nPlease make sure to backup all your personal content files such as CSS, Templates, and JavaScripts before proceeding. Click "Cancel" if you\'re not ready to install Forumactif Edge.'.replace(/\\/g, ''))) {

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

        document.getElementById('fae_install').value = 'Reinstall';

        $([uninstall, update]).show();

        // Uninstallation initialization
        uninstall.onclick = function() {
          if (confirm('Are you sure you want to uninstall Forumactif Edge? All CSS, JavaScript, and Template changes will be deleted ; The forum will be reverted to the default phpbb3 theme. \\\n\\\nPlease make sure to backup all your personal content files such as CSS, Templates, and JavaScripts before proceeding. Click "Cancel" if you don\'t want to uninstall Forumactif Edge yet.'.replace(/\\/g, ''))) {

            $.get(FAE.raw + 'javascripts/uninstall.js', function(d) {
              FAE.script(d);
              FAE.next();
            });

            document.getElementById('fae_options').style.display = 'none';
          }
        };


        // Check for updates
        update.onclick = function() {
          FAE.log('Checking for updates on Github...');
          document.getElementById('fae_options').style.display = 'none';

          $.get(FAE.raw + 'javascripts/version-data.js', function(d) {
            FAE.script(d.replace(/forumactif_edge_version_data/, 'fae_github_version_data'));
            FAE.version_string = d; // save version data for later so we can update the forum version info

            if (forumactif_edge_version_data.length < fae_github_version_data.length) {

              FAE.update_queue = fae_github_version_data.slice(forumactif_edge_version_data.length, fae_github_version_data.length);
              FAE.update_index = -1;
              FAE.update_quota = FAE.update_queue.length;

              FAE.log(FAE.update_queue.length + ' update' + ( i == 1 ? '' : 's' ) + ' found.');
              FAE.log('Preparing to fetch update instructions, please do not close this tab...');

              FAE.step = [];
              FAE.getUpdates();

            } else {
              FAE.log('Forumactif Edge is up to date!', 'color:#8B5;font-weight:bold;');
              document.getElementById('fae_options').style.display = 'block';
            }
          });
        };


        // create and insert translation button
        if (!FAE.board_lang) {
          FAE.board_lang = 'English'; // set the board lang to English if it is undefined
        }

        // create and insert the translation action
        $(document.getElementById('fae_options')).append(
          $('<div style="float:right;">'+
            '<select id="fae_selected_language">'+
              '<option value="' + FAE.raw + 'lang/English.js">English</option>'+
              '<option value="' + FAE.raw + 'lang/Français.js">Français</option>'+
            '</select>'+
            '<input id="fae_translate" type="button" value="Change language" />'+
          '</div>')[0]
        );

        // set the selected translation
        for (var a = document.getElementById('fae_selected_language').options, i = 0, j = a.length; i < j; i++) {
          if (FAE.board_lang == a[i].innerHTML) {
            a[i].selected = true;
            a[i].id = 'fae_current_language';
            break;
          }
        }

        // function to be executed when the translation button is clicked
        document.getElementById('fae_translate').onclick = function() {
          var select = document.getElementById('fae_selected_language'),
              current = document.getElementById('fae_current_language'),
              selected = select.options[select.selectedIndex];

          if (FAE.board_lang == selected.innerHTML) {
            return alert('Forumactif Edge is already in ' + selected.innerHTML + '. Please choose another language.');
          }

          if (confirm('Are you sure you want to change the language of Forumactif Edge to ' + selected.innerHTML + ' ?')) {
            FAE.log('Translation of Forumactif Edge will commence shortly. Please wait..');
            FAE.log('Getting ' + current.innerHTML + ' language data...');

            $.get(current.value, function(d) {
              FAE.log('Getting ' + selected.innerHTML + ' language data...');
              FAE.script(d.replace('FAE.lang', 'FAE.lang_current'));

              $.get(selected.value, function(d) {
                FAE.log('Language data has been loaded. The translation process will now begin, please do not close this tab.');
                FAE.script(d.replace('FAE.lang', 'FAE.lang_new'));

                $.get(FAE.raw + 'lang/translate.js', function(d) {
                  FAE.script(d);
                  FAE.next();
                });
              });
            });

          }
        };
      }

    } else {
      FAE.log('Only <a href="/u1">the founder</a> may use this control panel. Please contact them for assistance in installing Forumactif Edge.', 'color:#E53;font-weight:bold;');
    }
  });
}());
