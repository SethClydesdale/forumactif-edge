/*

  # Changes in v1.2.0

  - Added "Custom theme" option to Theme Selector and Theme Management.
  - Added Dark Mode (or Light Mode, depending on your forum theme) to the footer of the forum.
  - Added "Copy Code" button to the [code] bbcode that automatically copies the code contents upon clicking the button.
  - Added support for selected theme settings in local frames. (Changing the forum theme now changes the theme of the Chatbox, Emoticons, etc..)
  - Added classname ".forum-description" to the forum description on the index. (This should prevent the forum images from floating into other content, such as the sub-forum links)
  - Added classname ".forum-moderators" to the moderator link list on the index.
  - Added classname ".sub-forum-links" to the sub-forum link list on the index.
  - Added a maintenance message to the control panel, so you know when maintenance is being performed on it.
  - Added a new section to the FAE Control Panel for managing plugins.
  - Added "center" option for profiles in the control panel under General Settings.
  - Added "Submit a New Translation" option to the control panel translator, so it's easier to learn how to submit translations.
  - Added Spanish translation. (Thanks to Laura)
  - Optimized Facebook Connect module.
  - Fixed codebox displaying "Hidden:" label when inside the [hide] tags.
  - Fixed quick navigation not displaying when alwaysVisible was enabled and the menu was on the right.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.0';

// General Updates
FAE.update_step = [
  {
    info : 'Getting forum stylesheet',
    type : 'GET',
     url : '/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[method="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data = {
                edit_code : form.edit_code.value
                            .replace('.hidecode dt:after', '.hidecode > dt:after'),
                   submit : 'Submit'
        };
      }

    }
  },


  {
    info : 'Patching in updated styles',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {}
  },


  {
    info : 'Getting template index_box.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=111&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('          {catrow.forumrow.L_LINKS}{catrow.forumrow.LINKS}\n          <strong>{forumrow.L_SUBFORUM_STR}</strong> {forumrow.SUBFORUMS}', '          <div class="sub-forum-links">{catrow.forumrow.L_LINKS}{catrow.forumrow.LINKS}\n          <strong>{forumrow.L_SUBFORUM_STR}</strong> {forumrow.SUBFORUMS}</div>')
                                                .replace('{catrow.forumrow.switch_moderators_links.L_MODERATOR}{catrow.forumrow.switch_moderators_links.MODERATORS}', '<div class="forum-moderators">{catrow.forumrow.switch_moderators_links.L_MODERATOR}{catrow.forumrow.switch_moderators_links.MODERATORS}</div>')
                                                .replace('{catrow.forumrow.FORUM_DESC}', '<div class="forum-description">{catrow.forumrow.FORUM_DESC}<div class="clear"></div></div>');
      }
    }
  },


  {
    info : 'Updating template index_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 111,
             l : 'main',
      tpl_name : 'index_box',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template index_box.html',
    type : 'PUBLISH',
     tpl : 111
  },


  {
    info : 'Getting template index_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=110&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace(/<!-- BEGIN switch_fb_connect -->[\s\S]*?<!-- END switch_fb_connect -->/g, '')
                                                .replace(/\{S_HIDDEN_FIELDS\}<input class="mainoption button1" type="submit" name="login" value="\{L_LOGIN\}" \/>/g, '   {S_HIDDEN_FIELDS}<input class="mainoption button1" type="submit" name="login" value="{L_LOGIN}" />\n    <!-- BEGIN switch_social_login -->\n    <div class="social_btn">\n        <!-- BEGIN fb_connect -->\n        <div class="fb-login-button"></div>\n        <!-- END fb_connect -->\n        &nbsp;\n    </div>\n    <!-- END switch_social_login -->')
      }
    }
  },


  {
    info : 'Updating template index_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 110,
             l : 'main',
      tpl_name : 'index_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template index_body.html',
    type : 'PUBLISH',
     tpl : 110
  },


  {
    info : 'Getting template profile_add_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=701&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace(/<!-- BEGIN switch_fb_account_not_linked -->[\s\S]*?<!-- END switch_fb_account_not_linked -->/g, '              <!-- BEGIN switch_fb_account_not_linked -->\n              <div class="fb-login-button" onlogin="facebook_link">{switch_preferences_menu.switch_fb_connect.switch_fb_account_not_linked.L_FB_LOGIN_BUTTON}</div>\n              <!-- END switch_fb_account_not_linked -->')
                                                .replace(/<\/script>\n<!-- BEGIN switch_preferences_menu -->[\s\S]*?<!-- END switch_preferences_menu -->/, '</script>')
      }
    }
  },


  {
    info : 'Updating template profile_add_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 701,
             l : 'main',
      tpl_name : 'profile_add_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template profile_add_body.html',
    type : 'PUBLISH',
     tpl : 701
  },


  {
    info : 'Getting template mod_login.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=916&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace(/<!-- BEGIN switch_fb_connect_login -->[\s\S]*?<!-- END switch_fb_connect_login -->/g, '')
                                                .replace(/<!-- BEGIN switch_fb_widget_login -->[\s\S]*?<!-- END switch_fb_widget_login -->/, '')
                                                .replace(/			<dd><input type="submit" name="login" tabindex="6" value="\{L_LOGIN\}" class="button1" \/><\/dd>\n		<\/dl>/, '			<dd><input type="submit" name="login" tabindex="6" value="{L_LOGIN}" class="button1" /></dd>\n		</dl>\n    <!-- BEGIN switch_social_login -->\n    <dl>\n        <dt>&nbsp;</dt>\n        <dd><div class="fb_or_widget left">{switch_login.switch_social_login.L_OR}</div></dd>\n    </dl>\n    <dl>\n        <dt>&nbsp;</dt>\n        <dd>\n            <div class="social_btn left">\n                <!-- BEGIN fb_connect -->\n                <div class="fb-login-button"></div>\n                <!-- END fb_connect -->\n            </div>\n        </dd>\n    </dl>\n    <!-- END switch_social_login -->')
                                                .replace('<p align="center"><input type="submit" name="login" tabindex="6" value="{L_LOGIN}" class="button1" /></p>', '<p align="center"><input type="submit" name="login" tabindex="6" value="{L_LOGIN}" class="button1" /></p>\n  <!-- BEGIN switch_social_login -->\n  <div class="mt10 center">\n      <div class="social_btn">\n          <div class="fb_or">{switch_login_small.switch_social_login.L_OR}</div><br />\n          <!-- BEGIN fb_connect -->\n          <div class="fb-login-button"></div>\n          <!-- END fb_connect -->\n      </div>\n  </div>\n  <!-- END switch_social_login -->')
      }
    }
  },


  {
    info : 'Updating template mod_login.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 916,
             l : 'main',
      tpl_name : 'mod_login',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template mod_login.html',
    type : 'PUBLISH',
     tpl : 916
  },


  {
    info : 'Getting overall_footer_end.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=133&l=main&extended_admin=1' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace("https://github.com/SethClydesdale/forumactif-edge", "https://sethclydesdale.github.io/forumactif-edge/")
                                                .replace(/<!-- BEGIN switch_facebook_login -->[\s\S]*?<!-- END switch_facebook_logout_TMP -->/, '<!-- BEGIN switch_facebook_login -->\n<div id="fb-root"></div>\n<script type="text/javascript">\n    $(document).ready( function() {\n        $(\'div.fb-login-button, span.fb-login-button\').attr({\n            "data-scope": "{switch_facebook_login.FB_SCOPE}",\n            "data-max-rows": "{switch_facebook_login.FB_MAX_ROWS}",\n            "data-size": "{switch_facebook_login.FB_BUTTON_SIZE}",\n            "data-show-faces": "{switch_facebook_login.FB_SHOW_FACES}",\n            "data-auto-logout-link": "{switch_facebook_login.FB_AUTO_LOGOUT}"\n        });\n \n        $(\'div.fb-login-button, span.fb-login-button\').each(function() {\n            if(typeof $(this).attr(\'onlogin\') == typeof undefined || $(this).attr(\'onlogin\') === false) {\n                $(this).attr(\'onlogin\', \'{switch_facebook_login.FB_ONLOGIN}\');\n            }\n            if($(this).html() == \'\') {\n                $(this).html(\'{switch_facebook_login.FB_LABEL}\');\n            }\n        });\n \n \n        FB.init({\n            appId  : "{switch_facebook_login.FB_APP_ID}",\n            cookie  : {switch_facebook_login.FB_COOKIE},\n            xfbml  : {switch_facebook_login.FB_XFBML},\n            oauth  : {switch_facebook_login.FB_OAUTH},\n            version : \'{switch_facebook_login.FB_VERSION}\'\n        });\n \n        (function(d, s, id){\n            var js, fjs = d.getElementsByTagName(s)[0];\n            if (d.getElementById(id)) {return;}\n            js = d.createElement(s); js.id = id;\n            js.src = "//connect.facebook.net/{switch_facebook_login.FB_LOCAL}/sdk.js";\n            fjs.parentNode.insertBefore(js, fjs);\n        }(document, \'script\', \'facebook-jssdk\'));\n \n    });\n    function onLoginFB() {\n        window.location.replace(\'{switch_facebook_login.FB_ONLOGIN_URL}\')\n    }\n</script>\n<!-- END switch_facebook_login -->')
      }
    }
  },


  {
    info : 'Updating template overall_footer_end.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 133,
             l : 'main',
      tpl_name : 'overall_footer_end',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template overall_footer_end.html',
    type : 'PUBLISH',
     tpl : 133
  },


  {
    info : 'Locating all.js',
    type : 'GET',
     url : '/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid,
    func : function(d) {
      for (var row = $('#listJs tr', d), i = 0, j = row.length, regex = /\[FA EDGE\] ALL\.JS/; i < j; i++) {
        if (regex.test(row[i].innerHTML)) {
          FAE.step[FAE.index + 1].url = $('a', row[i])[1].href;
          break;
        }
      }
    }
  },


  {
    info : 'Getting all.js',
    type : 'GET',
     url : '',
    func : function(d) {
      var form = $('#formenvoi', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].url = form.action.replace(/^.*?\/admin\/index\.forum\?|&tid=.*$/g, '');
        FAE.step[FAE.index + 1].data = {
                     title : '[FA EDGE] ALL.JS',
          'js_placement[]' : 'allpages',
                   content : form.content.value
                             // main comments
                             .replace('******************************/', '** 11. dark mode\n** 12. copy code button\n** 13. local frame styler\n******************************/')

                             // quick navbar modifications
                             .replace("fae_sticky.node[0].style.left = '';", "fae_sticky.node[0].style[fae_sticky.position] = '';")

                             // theme selector modifications
                             .replace("{ color:' + palette[1] + '; }", ", .codebox .fae_copy-code:before { color:' + palette[1] + '; }")
                             .replace("{ background-color:' + palette[1] + '; }", ", #chatbox_header, body #chatbox_footer { background-color:' + palette[1] + '; }")
                             .replace("{ border-color:' + palette[1] + ' !important; }", ", #chatbox, #chatbox_members, #chatbox_members > h4.away, #chatbox_members > ul.away-users, body #chatbox .cb-avatar { border-color:' + palette[1] + ' !important; }")
                             .replace("	  window.fa_theme_color = {", "  var cc = my_getcookie('fae_custom-theme');\n\n  window.fa_theme_color = {")
                             .replace(/'(.*?)' : \[\],/, "'$1' : [],\n         'Custom theme' : [ cc ? fae_editColor(cc, +1) : '#77AADD', cc || '#6699CC', cc ? fae_editColor(cc, -1) : '#5588BB', cc ? fae_editColor(cc, -3) : '#336699', cc ? fae_editColor(cc, 'darken') : '#334455' ],")
                             .replace(/color != '(.*?)'/, "color != $1 && color != 'Custom theme'")
                             .replace("if (style) head.removeChild(style);", "if (style) head.removeChild(style);\n        fa_theme_color.picker.style.display = 'none';")
                             .replace(/else \{\n        if \(style\) \{\n          head\.removeChild\(style\);\n        \}/, "else if (color == 'Custom theme') {\n        fa_theme_color.selected = 'Custom theme';\n\n        if (style) {\n          head.removeChild(style);\n        }\n\n        var val = fa_theme_color.picker.value.toUpperCase();\n        my_setcookie('fae_custom-theme', val, true);\n\n        fa_theme_color.picker.style.display = '';\n        fa_theme_color.selector.style.backgroundColor = val;\n        fa_theme_color.selector.style.borderColor = fae_editColor(val, -1);\n\n        window.fa_theme_color.palette['Custom theme'] = [\n          fae_editColor(val, +1),\n          val,\n          fae_editColor(val, -1),\n          fae_editColor(val, -3),\n          fae_editColor(val, 'darken')\n        ];\n\n        $(head).append('<style type=\"text/css\" id=\"fa_theme_style\">' + fa_theme_color.css() + '</style>');\n\n      } else {\n        if (style) {\n          head.removeChild(style);\n        }")
                             .replace("fa_theme_color.selector.style.backgroundColor = '#999';", "        fa_theme_color.picker.style.display = 'none';\n\n        fa_theme_color.selector.style.backgroundColor = '#999';")
                             .replace("var selector = document.createElement('SELECT'),", "var selector = document.createElement('SELECT'),\n      picker = document.createElement('INPUT'),")
                             .replace(/  selector\.onchange = function\(\) \{\n    fa_theme_color\.change\(this\.value\);\n  \};/, "  selector.onchange = function() {\n    fa_theme_color.change(this.value);\n  };\n\n  picker.id = 'fae_custom-theme';\n\n  try {\n    picker.type = 'color';\n  } catch (error) {\n    picker.type = 'text';\n  }\n\n  picker.value = cc || '#6699CC';\n  picker.style.display = my_getcookie('fae_custom-theme') ? '' : 'none';\n  picker.onchange = function () {\n    fa_theme_color.change('Custom theme');\n  };")
                             .replace(/\/(.*?)\|(.*?)\/\.test\(i\)/g, "/$1|$2|Custom theme/.test(i)")
                             .replace("#fa_theme_selector { color:#FFF; border:1px solid transparent; float:left; outline:none; }", "#fa_theme_selector { color:#FFF; border:1px solid transparent; float:left; outline:none; } #fae_custom-theme { margin:3px; }")
                             .replace("fa_theme_color.selector = selector;", "fa_theme_color.selector = selector;\n  fa_theme_color.picker = picker;")
                             .replace("	    body.insertBefore(selector, body.firstChild);", "    body.insertBefore(picker, body.firstChild);\n    body.insertBefore(selector, body.firstChild);")
                             .replace(/body\.insertBefore\(selector, body\.firstChild\);\n  \}\);\n\}\(\)\);/, "body.insertBefore(selector, body.firstChild);\n  });\n}());\n\nfunction fae_editColor (str, op) {\n  var letter = { 'F' : 15, 'E' : 14, 'D' : 13, 'C' : 12, 'B' : 11, 'A' : 10 },\n      hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'],\n      neg = [0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6];\n\n  str = str.toUpperCase().split('');\n\n  for (var i = 1; i < 7; i++) {\n    if (letter[str[i]]) {\n      str[i] = letter[str[i]];\n    } else {\n      str[i] = +str[i];\n    }\n\n    if (op == 'darken') {\n      str[i] = neg[str[i]];\n    } else {\n      str[i] += op;\n    }\n\n    if (str[i] > 15) {\n      str[i] = 15;\n    } else if (str[i] < 0) {\n      str[i] = 0;\n    }\n\n    str[i] = hex[str[i]];\n  }\n\n  return str.join('');\n};") +

                             // dark mode
                             '\n/* -- 11. dark mode -- */\n(function() {\n  window.fae_lightSwitchMode = my_getcookie(\'fae_light-switch-mode\') || \'dark\';\n\n  document.write(\'<style type="text/css">#fae_light-switch-container{margin:6px 0}#fae_light-switch-label{font-weight:700;vertical-align:middle}#fae_light-switch{background-color:rgba(0,0,0,.25);vertical-align:middle;display:inline-block;position:relative;height:26px;width:56px;border-radius:20px;cursor:pointer;overflow:hidden}#fae_light-switch>input{display:none}#fae_light-switch>div{background-color:rgba(255,255,255,.5);position:absolute;top:3px;left:3px;height:20px;width:20px;border-radius:20px;transition:.4s;font-size:13px;font-weight:700;line-height:22px}#fae_light-switch>div:before{content:"ON";margin-left:-24px;color:transparent;transition:.4s}#fae_light-switch>div:after{content:"OFF";margin-left:30px;color:rgba(255,255,255,.5);transition:.4s}#fae_light-switch>input:checked+div{background-color:#FFF;left:33px}#fae_light-switch>input:checked+div:before{color:#FFF}#fae_light-switch>input:checked+div:after{color:transparent}</style>\');\n\n  var footer = \'.footer-links.left\',\n\n      cookie = my_getcookie(\'fae_light-switch\'),\n      rgb,\n      button,\n      container,\n\n      changeTheme = function (cookie) {\n        var button = document.querySelector(\'#fae_light-switch input\');\n\n        if ((button && button.checked) || cookie == \'on\') {\n          my_setcookie(\'fae_light-switch\', \'on\', true);\n\n          if (window.sessionStorage && window.sessionStorage.faeLightSwitch) {\n            $(\'head\').append(\'<style type="text/css" id="fae_light-switch-css">\' + window.sessionStorage.faeLightSwitch + \'</style>\');\n          } else {\n            $.get(\'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/css/dark-mode/\' + fae_lightSwitchMode + \'-mode.min.css\', function (d) {\n              $(\'head\').append(\'<style type="text/css" id="fae_light-switch-css">\' + d + \'</style>\');\n\n              if (window.sessionStorage) {\n                window.sessionStorage.faeLightSwitch = d;\n              }\n            });\n          }\n\n        } else {\n          var css = document.getElementById(\'fae_light-switch-css\');\n\n          my_setcookie(\'fae_light-switch\', \'off\', true);\n\n          if (css) {\n            document.head.removeChild(css);\n          }\n        }\n      };\n\n  cookie && changeTheme(cookie);\n\n  $(function() {\n    if (!my_getcookie(\'fae_light-switch-mode\')) {\n      rgb = window.getComputedStyle(document.body, null).getPropertyValue(\'background-color\').replace(/rgb\(|\)|\s/g, \'\').split(\',\');\n      fae_lightSwitchMode = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000) > 125 ? \'dark\' : \'light\';\n\n      my_setcookie(\'fae_light-switch-mode\', fae_lightSwitchMode, true);\n    }\n\n    footer = document.querySelector(footer);\n\n    if (footer) {\n      button = document.createElement(\'LABEL\');\n      button.id = \'fae_light-switch\';\n      button.innerHTML = \'<input type="checkbox" \' + (cookie == \'on\' ? \'checked="true"\' : \'\') + \'/><div></div>\';\n      button.firstChild.onchange = changeTheme;\n\n      container = document.createElement(\'DIV\');\n      container.id = \'fae_light-switch-container\';\n      container.innerHTML = \'<span id="fae_light-switch-label">\' + (fae_lightSwitchMode == \'dark\' ? \'Dark Mode : \' : \'Light Mode : \') + \'</span>\';\n\n      container.appendChild(button);\n      footer.appendChild(container);\n    }\n  });\n}());\n' +

                             // copy code button
                             '\n/* -- 12. copy code button -- */\n$.getScript(\'https://cdn.jsdelivr.net/clipboard.js/1.5.16/clipboard.min.js\', function() {\n  window.fae_copyCode = {\n    copy : \'Copy Code\',\n    copied : \'Copied !\'\n  };\n\n  $(function() {\n    var a = $(\'.codebox dt\').not(\'.spoiler > dt, .hidecode > dt\'),\n        i = 0,\n        j = a.length;\n\n    if (a[0]) {\n      $(\'head\').append(\'<style type="text/css">.fae_copy-code{float:right;cursor:pointer}.fae_copy-code:before{content:"\\f0ea";font-size:13px;font-family:FontAwesome;text-align:center;color:#69C;background:#FFF;border-radius:100%;display:inline-block;width:19px;height:19px;line-height:19px;margin:-1px 3px 0 3px}.codebox .fae_copy-code:hover:before{color:#EB5}.codebox .fae_copy-code.fae_copied:before{content:"\\f00c";font-weight:700;color:#8B5}</style>\');\n\n      for (; i < j; i++) {\n        a[i].insertAdjacentHTML(\'beforeend\', \'<span class="fae_copy-code">\' + fae_copyCode.copy + \'</span>\');\n      }\n\n      new Clipboard(\'.fae_copy-code\',{\n        target : function (copy) {\n          if (copy.innerHTML != fae_copyCode.copied) {\n            return $(copy).closest(\'.codebox\').find(\'code\')[0];\n          }\n        },\n\n        text : function (copy) {\n          if (copy.innerHTML != fae_copyCode.copied) {\n            copy.innerHTML = fae_copyCode.copied;\n            copy.className += \' fae_copied\';\n\n            window.setTimeout(function() {\n              copy.innerHTML = fae_copyCode.copy;\n              copy.className = copy.className.replace(\'fae_copied\', \'\');\n            }, 1000);\n          }\n        }\n      });\n    }\n\n  });\n});\n' +

                             // local frame styler
                             '\n/* -- 13. local frame styler -- */\n// global function for getting local iframes\nfunction fae_styleLocalFrames () {\n  var frame = $(\'iframe[src^="/"], object[data^="/"]\'),\n      i = 0,\n      j = frame.length;\n\n  for (; i < j; i++) {\n    try {\n      var head = $(\'head\', frame[i].contentDocument || frame[i].contentWindow.document);\n\n      $(\'#fa_theme_style, #fae_light-switch-css\', head).remove();\n      head.append($(\'#fa_theme_style, #fae_light-switch-css\').clone());\n\n    } catch (error) {\n      window.console && console.log(error);\n    }\n  }\n\n};\n\n\n// waits for frames to load (such as chatbox and smilies) and then applies preferred styles to them\n$(window).load(function() {\n  fae_styleLocalFrames();\n  $(\'iframe[src^="/"]\').on(\'load\', fae_styleLocalFrames);\n  $(\'object[data^="/"]\').attr(\'onload\', \'fae_styleLocalFrames();\');\n  $(\'#fae_custom-theme, #fa_theme_selector, #fae_light-switch input\').on(\'change\', fae_styleLocalFrames);\n});\n',

                      mode : 'save',
                      page : form.page.value,
                    submit : 'Submit'
        };
      }

    }
  },


  {
    info : 'Updating all.js',
    type : 'POST',
     url : '',
    data : {}
  }
];
