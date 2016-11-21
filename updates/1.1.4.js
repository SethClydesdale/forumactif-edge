/*

  # Changes in v1.1.4

  - Updated CSS selectors in the theme switcher so that it affects the classified ad forums.
  - Updated Dutch translations. (Thanks to Joost)
  - Fixed alignment of various texts for classified ads.
  - Fixed inability to access the FAE Control Panel due to design change of the Admin Panel.
  - Fixed display of posts in mobile version once general settings have been applied.
  - Removed "Posts" texts under stats for classified ad forums.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.1.4';

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
                edit_code : form.edit_code.value +
                            '\n/* added in FAE v1.1.4 */\n@media (min-width:0px) and (max-width:768px){.post-inner{margin:0!important}.postprofile{margin:-10px 0 10px 0!important;float:none!important}}',
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
                             .replace("{ background-color:' + palette[1] + '; }", ", .forumbg li.header { background-color:' + palette[1] + '; }"),

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


// Dutch Language Patch
if (FAE.board_lang == 'Dutch') {

  FAE.update_step = FAE.update_step.concat([
    {
      info : 'Getting template overall_header.html',
      type : 'GET',
       url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=116&l=main&extended_admin=1' + FAE.tid,
      func : function(d) {
        var form = $('form[name="post"]', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].data.template = form.template.value
                                                  .replace(/<div id="fa_ticker_title" class="title">Announcements<\/div>/g, '<div id="fa_ticker_title" class="title">Mededelingen</div>');
        }

      }
    },


    {
      info : 'Updating Dutch translation for template overall_header.html',
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
