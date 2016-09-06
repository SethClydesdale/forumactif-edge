/*

  # Changes in v1.1.2

  - Fixed erroneous installations by preventing usage of the control panel in "Preview HTML Page" mode.
  - Fixed blurry and rough looking fonts by updating Roboto Font Family to support 400i, 700, and 700i fonts.
  - Fixed username variable for the thanked message in the Greek translation.
  - Updated French translations.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.1.2';

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
                            .replace('https://fonts.googleapis.com/css?family=Roboto', 'https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i'),
                   submit : 'Submit'
        };
      }

    }
  },


  {
    info : 'Updating Roboto font family',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {}
  }
];


// French Language Patch
if (FAE.board_lang == 'Français') {

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
                               .replace('<div class="thanked-message"><i class="fa fa-thumbs-up"></i> {USERNAME} has been thanked by the topic starter !</div>', '<div class="thanked-message"><i class="fa fa-thumbs-up"></i> {USERNAME} a été remercié par le créateur du sujet !</div>'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating French translation for topics.js',
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
                                                  .replace(/<div id="fa_ticker_title" class="title">Announcements<\/div>/g, '<div id="fa_ticker_title" class="title">Annonces</div>');
        }

      }
    },


    {
      info : 'Updating French translation for template overall_header.html',
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
                               .replace('{USER_NAME}', '{USERNAME}'),

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
    }
  ]);

}
