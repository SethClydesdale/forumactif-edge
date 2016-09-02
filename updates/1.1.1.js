/*

  # Changes in v1.1.1

  - Fixed display of "New PM" image in profiles on mobile. (it no longer overlaps the navigation)
  - Fixed forum width slider in General Settings, so that 100% returns the forum to the standard width.
  - Updated translation functionality in control panel.
  - Updated German translations.
  - Updated Greek translations.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.1.1';

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
                edit_code : form.edit_code.value + '\n/* added in FAE v1.1.1 */\n@media (max-width:768px) {#new-message-link{position:static;float:left;margin-top:11px}}',
                   submit : 'Submit'
        };
      }

    }
  },


  {
    info : 'Adding updated styles for v1.1.1',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {}
  }
];


// German Language Patch
if (FAE.board_lang == 'Deutsch') {

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
                               .replace('Es wurde ein Update für Forumactif Edge gefunden. Wenn Sie bereit sind, gehen Sie bitte zu Ihrem FAE Bedienungsfeld und klicken Sie auf "Nach Updates überprüfen", um den Update-Prozess zu starten.', 'Es wurde ein Update für Forumactif Edge gefunden. Wenn Sie bereit sind, gehen Sie bitte zu Ihrem FAE-Bedienungsfeld und klicken Sie auf "Nach Updates überprüfen", um den Update-Prozess zu starten.'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating Deutsch translation for all.js',
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
                     content : form.content.value
                               .replace('<div class="thanked-message"><i class="fa fa-thumbs-up"></i> {USERNAME} has been thanked by the topic starter !</div>', '<div class="thanked-message"><i class="fa fa-thumbs-up"></i> Der Autor hat sich bei {USERNAME} bedankt!</div>'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating Deutsch translation for topics.js',
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
          FAE.step[FAE.index + 1].data.template = form.template.value
                                                  .replace(/<div id="fa_ticker_title" class="title">Announcements<\/div>/g, '<div id="fa_ticker_title" class="title">Bekanntmachungen</div>');
        }

      }
    },


    {
      info : 'Updating Deutsch translation for template overall_header.html',
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
    }
  ]);

}


// Greek Language Patch
if (FAE.board_lang == 'Ελληνικά') {

  FAE.update_step = FAE.update_step.concat([
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
                     content : form.content.value
                               .replace('<div class="thanked-message"><i class="fa fa-thumbs-up"></i> {USERNAME} has been thanked by the topic starter !</div>', '<div class="thanked-message"><i class="fa fa-thumbs-up"></i> {USER_NAME} έχει λάβει το Ευχαριστώ του συγγραφέα !</div>'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating Greek translation for topics.js',
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
          FAE.step[FAE.index + 1].data.template = form.template.value
                                                  .replace(/<div id="fa_ticker_title" class="title">Announcements<\/div>/g, '<div id="fa_ticker_title" class="title">Ανακοινώσεις</div>');
        }

      }
    },


    {
      info : 'Updating Greek translation for template overall_header.html',
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
    }
  ]);

}
