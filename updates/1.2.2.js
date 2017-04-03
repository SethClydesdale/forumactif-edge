/*

  # Changes in v1.2.2

  - Added Russian translation. (Thanks to Ivan)
  - Updated Greek translation. (Thanks to Van-Helsing)
  - Updated FAE Control Panel to support your selected theme settings.
  - Updated the theme selector UI.
  - Fixed theme colors not showing in the theme selector on Firefox.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.2';

FAE.update_step = [
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
                             .replace('body.insertBefore(selector, body.firstChild);', 'body.insertBefore(selector, body.firstChild);\n\n/* THEME CHANGER UI */\nif (fa_theme_color.selector) {\n  var frag = document.createDocumentFragment();\n\n  // create the theme picker\n  window.fae_theme_picker = document.createElement(\'A\');\n  fae_theme_picker.href = \'#\';\n  fae_theme_picker.dataset.selectedIndex = fa_theme_color.selector.selectedIndex;\n  fae_theme_picker.innerHTML = fa_theme_color.selector.options[fa_theme_color.selector.selectedIndex].innerHTML;\n  fae_theme_picker.style.width = fa_theme_color.selector.getBoundingClientRect().width - 12 + \'px\';\n  fae_theme_picker.style.backgroundColor = fa_theme_color.selector.style.backgroundColor;\n  fae_theme_picker.style.borderColor = fa_theme_color.selector.style.borderColor;\n  fae_theme_picker.id = \'fae_theme_picker\';\n  fae_theme_picker.onclick = function () {\n    return false;\n  };\n\n  // show / hide the theme picker on click\n  document.addEventListener(\'click\', function (e) {\n    var that = e.target;\n\n    if (that.id == \'fae_theme_picker\') {\n\n      if (fae_theme_list.className == \'theme_list_hidden\') {\n        var offset = that.getBoundingClientRect(),\n            selected = fae_theme_list.querySelector(\'[data-index="\' + fae_theme_picker.dataset.selectedIndex + \'"]\');\n\n        fae_theme_list.className = \'\';\n        fae_theme_list.style.left = offset.left + \'px\';\n        fae_theme_list.style.marginTop = offset.height + 1 + \'px\';\n\n        fae_hover_theme(selected);\n        fae_theme_list.scrollTop = (selected.offsetTop - fae_theme_list.getBoundingClientRect().height) + (selected.getBoundingClientRect().height + 2);\n\n      } else {\n        fae_theme_list.className = \'theme_list_hidden\';\n      }\n\n    } else if (!fae_theme_list.className) {\n      fae_theme_list.className = \'theme_list_hidden\';\n    }\n  });\n\n  // change the theme when the up or down arrows are pressed\n  fae_theme_picker.onkeydown = function (e) {\n    var index = +fae_theme_picker.dataset.selectedIndex;\n        next = fae_theme_list.querySelector(\'[data-index="\' + (e.keyCode == 38 ? index - 1 : e.keyCode == 40 ? index + 1 : index) + \'"]\');\n\n    if (next && next.className != \'pseudo-hover\') {\n      next.click();\n      fae_hover_theme(next);\n    }\n\n    return false;\n  };\n\n  // hover the selected option / last hovered option\n  window.fae_hover_theme = function (that) {\n    var hovered = document.querySelector(\'.pseudo-hover\');\n\n    if (hovered) {\n      hovered.className = \'\';\n    }\n\n    that.className = \'pseudo-hover\';\n  };\n\n  // change the theme picker style when the custom theme is changed\n  document.getElementById(\'fae_custom-theme\').addEventListener(\'change\', function () {\n    fae_theme_picker.style.backgroundColor = fa_theme_color.selector.style.backgroundColor;\n    fae_theme_picker.style.borderColor = fa_theme_color.selector.style.borderColor;\n  });\n\n\n  // create the theme list\n  window.fae_theme_list = document.createElement(\'DIV\');\n  fae_theme_list.id = \'fae_theme_list\';\n  fae_theme_list.className = \'theme_list_hidden\';\n  fae_theme_list.style.width = fa_theme_color.selector.getBoundingClientRect().width + \'px\';\n\n  // prevent unwanted window scrolling when the theme list has been scrolled all the way from the top or bottom\n  fae_theme_list.onwheel = function (e) {\n    if ((fae_theme_list.scrollTop == (fae_theme_list.scrollHeight - fae_theme_list.clientHeight) && e.deltaY > 0) || fae_theme_list.scrollTop == 0 && e.deltaY < 0) {\n      return false;\n    }\n  };\n\n  // hide the theme list on scroll\n  window.addEventListener(\'scroll\', function () {\n    if (!fae_theme_list.className) {\n      fae_theme_list.className = \'theme_list_hidden\';\n    }\n  });\n\n  // get the original theme options and create new options for the updated UI\n  for (var opts = fa_theme_color.selector.options, i = 0, j = opts.length, option; i < j; i++) {\n    option = document.createElement(\'A\');\n    option.href = \'#\';\n    option.dataset.index = i;\n    option.innerHTML = opts[i].innerHTML;\n    option.style.color = opts[i].style.color || \'#FFF\';\n    option.style.backgroundColor = opts[i].style.backgroundColor;\n\n    // apply the selected theme to both the new UI and hidden select element\n    option.onclick = function () {\n      var color = fa_theme_color.selector.options[this.dataset.index];\n\n      color.selected = true;\n      fae_theme_picker.innerHTML = fa_theme_color.selector.value;\n      fae_theme_picker.dataset.selectedIndex = this.dataset.index;\n\n      fa_theme_color.change(color.value);\n\n      fae_theme_picker.style.backgroundColor = fa_theme_color.selector.style.backgroundColor;\n      fae_theme_picker.style.borderColor = fa_theme_color.selector.style.borderColor;\n\n      fae_theme_list.className = \'theme_list_hidden\';\n      fae_theme_picker.focus();\n\n      return false;\n    };\n\n    // update selected option on hover\n    option.onmouseover = function () {\n      fae_hover_theme(this);\n    };\n\n    fae_theme_list.appendChild(option);\n  }\n\n  // add the theme picker, list, and style to the document\n  frag.appendChild(fae_theme_picker);\n  frag.appendChild(fae_theme_list);\n\n  $(\'head\').append(\n    \'<style type="text/css">\'+\n      \'a#fae_theme_picker{color:#FFF;font-size:13px;font-family:Arial;background:#999;border:1px solid #888;position:relative;display:inline-block;padding:6px;margin:1px;float:left;text-decoration:none;outline:none;}\'+\n      \'#fae_theme_picker:after{content:"\\\f0dd";font-family:FontAwesome;position:absolute;right:4px}\'+\n      \'#fae_theme_list{background:#FFF;border:1px solid rgba(0,0,0,.175);position:absolute;max-height:335px;overflow:auto;overflow-x:hidden;z-index:1;white-space:nowrap;visibility:visible}\'+\n      \'#fae_theme_list.theme_list_hidden{visibility:hidden}\'+\n      \'#fae_theme_list a{font-family:Arial;display:block;padding:6px;text-decoration:none}\'+\n      \'#fae_theme_list a.pseudo-hover{color:#FFF!important;background:#28F!important}\'+\n      \'@media (max-width: 768px) and (min-width: 0px) {body #fae_theme_picker{float:right;width:240px !important;margin:0 0 6px}body #fae_theme_list{width:252px !important}}\'+\n    \'</style>\'\n  );\n\n  fa_theme_color.selector.parentNode.insertBefore(frag, fa_theme_color.selector);\n  fa_theme_color.selector.style.display = \'none\'; // hide to original theme selector element\n}\n'),

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


// Portuguese Language Patch
if (FAE.board_lang == 'Ελληνικά') {
  FAE.update_step = FAE.update_step.concat([
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
                               .replace(/Custom theme/g, 'Προσαρμοσμένο θέμα')
                               .replace('Dark Mode : ', 'Νυχτερινή λειτουργία :')
                               .replace('Light Mode : ', 'Λειτουργία ημέρας :')
                               .replace('Copy Code', 'Αντιγραφή κώδικα')
                               .replace('Copied !', 'Αντιγράφηκε'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating Greek translation for all.js',
      type : 'POST',
       url : '',
      data : {}
    }
  ]);
}
