/*

  # Changes in v1.2.4

  - Updated Arabic translation. (Thaks to amghidh and Michael_vx)
  - Updated Italian translation. (Thanks to Niko)
  - Updated Romanian translation (Thanks to SSYT)
  - Fixed theme selector not coloring visited links.
  - Fixed window scrolling when adding / moving a new theme in plugin management.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.4';
FAE.shouldTranslate = false;

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
                             .replace("{ color:' + palette[3] + '; }", ", a:link, a:visited { color:' + palette[3] + '; }"),

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


// Arabic Language Patch
if (FAE.board_lang == 'العربية') {
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
                               .replace(/Custom theme/g, 'ستايل مخصص')
                               .replace('Dark Mode : ', 'الوضع الليلي:')
                               .replace('Light Mode : ', 'الوضع المضىء:')
                               .replace('Copy Code', 'نسخ الكود')
                               .replace('Copied !', 'تم النسخ !'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating Arabic translation for all.js',
      type : 'POST',
       url : '',
      data : {}
    }
  ]);
}


// Italian Language Patch
if (FAE.board_lang == 'Italiano') {
  FAE.shouldTranslate = true;

  FAE.update_step = FAE.update_step.concat([
    {
      info : 'Getting old translation file...',
      type : 'GET',
      url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/8eff7a842f0895282bd88ac7e52fe6582432723d/lang/Italian.js',
      func : function (d) {
        FAE.script(d.replace('FAE.lang', 'FAE.lang_current'));
      }
    },


    {
      info : 'Getting latest translation file...',
      type : 'GET',
      url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/lang/Italian.js',
      func : function (d) {
        FAE.script(d.replace('FAE.lang', 'FAE.lang_new'));
      }
    }
  ]);
}

// Romanian Language Patch
if (FAE.board_lang == 'Romana') {
  FAE.shouldTranslate = true;

  FAE.update_step = FAE.update_step.concat([
    {
      info : 'Getting old translation file...',
      type : 'GET',
      url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/8eff7a842f0895282bd88ac7e52fe6582432723d/lang/Romanian.js',
      func : function (d) {
        FAE.script(d.replace('FAE.lang', 'FAE.lang_current'));
      }
    },


    {
      info : 'Getting latest translation file...',
      type : 'GET',
      url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/lang/Romanian.js',
      func : function (d) {
        FAE.script(d.replace('FAE.lang', 'FAE.lang_new'));
      }
    }
  ]);
}


// Perform a full-scale translation, except for images
if (FAE.shouldTranslate) {

  // pass a string to be translated from lang_x to lang_y
  FAE.translate = function(o, str) {
    var i;

    for (i in o.from) {
      if (o.from[i] != o.to[i]) {
        str = str.replace(new RegExp(o.from[i].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'gm'), o.to[i]);
      }
    }

    return str;
  };

  FAE.update_step = FAE.update_step.concat([
    {
      info : 'Getting forum stylesheet',
      type : 'GET',
       url : '/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid,
      func : function(d) {
        var form = $('form[method="post"]', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].data.edit_code = FAE.translate({
            from : FAE.lang_current.css,
              to : FAE.lang_new.css
          }, form.edit_code.value);
        }
      }
    },


    {
      info : 'Translating and updating stylesheet',
      type : 'POST',
       url : 'part=themes&sub=logos&mode=css&extended_admin=1',
      data : {
        submit : 'Submit'
      }
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
        var form = $('#formenvoi', d)[0],
            js = form.content.value,
            regex = /FAE\.board_lang = '.*?';/,
            new_lang = 'FAE.board_lang = \'' + FAE.lang_new.language + '\';';

        if (!regex.test(js)) {
          js += new_lang;
        } else {
          js = js.replace(regex, new_lang);
        }

        FAE.step[FAE.index + 1].url = form.action.replace(/^.*?\/admin\/index\.forum\?|&tid=.*$/g, '');
        FAE.step[FAE.index + 1].data = {
                     title : '[FA EDGE] ALL.JS',
          'js_placement[]' : 'allpages',
                   content : FAE.translate({
                     from : FAE.lang_current.javascripts['[FA EDGE] ALL.JS'],
                       to : FAE.lang_new.javascripts['[FA EDGE] ALL.JS']
                   }, js),

                      mode : 'save',
                      page : form.page.value,
                    submit : 'Submit'
        };

        my_setcookie('fa_theme_color', ''); // purge selected theme to prevent error
      }
    },


    {
      info : 'Translating all.js',
      type : 'POST',
       url : '',
      data : {}
    },


    {
      info : 'Locating topics.js',
      type : 'GET',
       url : '/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid,
      func : function(d) {
        for (var row = $('#listJs tr', d), i = 0, j = row.length, regex = /\[FA EDGE\] TOPICS\.JS/; i < j; i++) {
          if (regex.test(row[i].innerHTML)) {
            FAE.step[FAE.index + 1].url = $('a', row[i])[1].href;
            break;
          }
        }
      }
    },


    {
      info : 'Getting topics.js',
      type : 'GET',
       url : '',
      func : function(d) {
        var form = $('#formenvoi', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].url = form.action.replace(/^.*?\/admin\/index\.forum\?|&tid=.*$/g, '');
          FAE.step[FAE.index + 1].data = {
                       title : '[FA EDGE] TOPICS.JS',
            'js_placement[]' : 'viewtopic',
                     content : FAE.translate({
                       from : FAE.lang_current.javascripts['[FA EDGE] TOPICS.JS'],
                         to : FAE.lang_new.javascripts['[FA EDGE] TOPICS.JS']
                     }, form.content.value),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }
      }
    },


    {
      info : 'Translating topics.js',
      type : 'POST',
       url : '',
      data : {}
    },


    {
      info : 'Getting template overall_header.html',
      type : 'GET',
       url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=116&l=main&extended_admin=1' + FAE.tid,
      func : function(d) {
        var form = $('form[name="post"]', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].data.template = FAE.translate({
            from : FAE.lang_current.templates['overall_header.html'],
              to : FAE.lang_new.templates['overall_header.html']
          }, form.template.value);
        }

      }
    },


    {
      info : 'Translating and updating template overall_header.html',
      type : 'POST',
       url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
      data : {
               t : 116,
               l : 'main',
        tpl_name : 'overall_header',
          submit : 'Save'
      }
    },


    {
      info : 'Publishing template overall_header.html',
      type : 'PUBLISH',
       tpl : 116
    },


    {
      info : 'Getting template overall_footer_end.html',
      type : 'GET',
       url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=133&l=main&extended_admin=1' + FAE.tid,
      func : function(d) {
        var form = $('form[name="post"]', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].data.template = FAE.translate({
            from : FAE.lang_current.templates['overall_footer_end.html'],
              to : FAE.lang_new.templates['overall_footer_end.html']
          }, form.template.value);
        }

      }
    },


    {
      info : 'Translating and updating template overall_footer_end.html',
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
      info : 'Getting template viewtopic_body.html',
      type : 'GET',
       url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=127&l=main&extended_admin=1' + FAE.tid,
      func : function(d) {
        var form = $('form[name="post"]', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].data.template = FAE.translate({
            from : FAE.lang_current.templates.logged_out_reply,
              to : FAE.lang_new.templates.logged_out_reply
          }, form.template.value);
        }

      }
    },


    {
      info : 'Translating and updating template viewtopic_body.html',
      type : 'POST',
       url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
      data : {
               t : 127,
               l : 'main',
        tpl_name : 'viewtopic_body',
          submit : 'Save'
      }
    },


    {
      info : 'Publishing template viewtopic_body.html',
      type : 'PUBLISH',
       tpl : 127
    },


    {
      info : 'Getting template viewcomments_body.html',
      type : 'GET',
       url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=131&l=main&extended_admin=1' + FAE.tid,
      func : function(d) {
        var form = $('form[name="post"]', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].data.template = FAE.translate({
            from : FAE.lang_current.templates.logged_out_reply,
              to : FAE.lang_new.templates.logged_out_reply
          }, form.template.value);
        }

      }
    },


    {
      info : 'Translating and updating template viewcomments_body.html',
      type : 'POST',
       url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
      data : {
               t : 131,
               l : 'main',
        tpl_name : 'viewcomments_body',
          submit : 'Save'
      }
    },


    {
      info : 'Publishing template viewcomments_body.html',
      type : 'PUBLISH',
       tpl : 131
    }
  ]);
}
