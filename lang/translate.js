// translation instructions
FAE.step = [
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
    info : 'Translating and updating button images',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=buttons&mode=buttons&extended_admin=1',
    data : FAE.lang_new.images.buttons
  },


  {
    info : 'Translating and updating gallery images',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=&mode=gallery&extended_admin=1',
    data : {
      upload_pic : FAE.lang_new.images.gallery.upload_pic,
      submit : 'Save'
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
  },


  {
    info : 'Resynchronizing forum',
    type : 'POST',
     url : 'mode=general&part=general&sub=general',
    data : {
      resync : 'on',
      submit : 'Save'
    }
  }
];


FAE.index = -1;
FAE.quota = FAE.step.length;

// proceed to and execute the next step in the translation
FAE.next = function() {
  if (++FAE.index >= FAE.quota) {
    FAE.log('Forumactif Edge has been translated successfully!', 'color:#8B5;font-weight:bold;');
    FAE.log('When you\'re finished, please <a href="javascript:window.location.reload();">click here</a> to reload the page.');

  } else {
    var step = FAE.step[FAE.index];
    FAE.log(step.info + '...');

    if (step.type == 'POST') {
      $.post('/admin/index.forum?' + step.url + FAE.tid, step.data, function() {
        window.setTimeout(FAE.next, FAE.delay);
      }).error(FAE.error);

    } else if (step.type == 'GET') {
      $.get(step.url, function(d) {
        step.func(d);
        window.setTimeout(FAE.next, FAE.delay);
      }).error(FAE.error);

    } else if (step.type == 'PUBLISH') {
      $.get('/admin/index.forum?part=themes&sub=templates&mode=edit_main&main_mode=edit&extended_admin=1&t=' + step.tpl + '&l=' + ( step.mobile ? 'mobile' : 'main' ) + '&pub=1&tid=' + FAE.tid, function() {
        window.setTimeout(FAE.next, FAE.delay);
      }).error(FAE.error);
    }

  }

  FAE.progress();
};

// handler in case of any errors
FAE.error = function() {
  FAE.log('An error was encountered on step ' + FAE.index + ' (' + FAE.step[FAE.index].info + ') of the translation process. Please <a href="http://fmdesign.forumotion.com/t700-forumactif-edge-support#13923" target="_blank">open a new issue</a> and provide this information for further assistance.', 'color:#E53;font-weight:bold;');
  window.setTimeout(FAE.next, FAE.delay);
};


// pass a string to be translated from lang_x to lang_y
FAE.translate = function(o, str) {
  var i;

  for (i in o.from) {
    str = str.replace(new RegExp(o.from[i].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'gm'), o.to[i]);
  }

  return str;
};
