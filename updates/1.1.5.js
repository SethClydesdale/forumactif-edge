/*

  # Changes in v1.1.5

  - Fixed "humor" width in memberlist from taking up the entire page.
  - Fixed large avatars overflowing their container in the user profile page.
  - Updated Arabic translation.
  - Updated Portuguese translation.
  - Updated Dutch translation.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.1.5';

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
                            '\n/* added in FAE v1.1.5 */\n#memberlist .avatar-mini+td{max-width:250px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\n#profile-advanced-right .module div[style="text-align:center;"] img:first-child{max-width:100%}',
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
  }
];


// Dutch Language Patch
if (FAE.board_lang == 'Dutch') {

  FAE.update_step = FAE.update_step.concat([
    {
      info : 'Getting old Dutch translation',
      type : 'GET',
       url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/v1.1.4/lang/Dutch.js',
      func : function(d) {
        FAE.script(d.replace('FAE.lang', 'FAE.lang_current'));
      }
    },

    {
      info : 'Getting new Dutch translation',
      type : 'GET',
       url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/lang/Dutch.js',
      func : function(d) {
        FAE.script(d.replace('FAE.lang', 'FAE.lang_new'));
      }
    },

    {
      info : 'Update for the Dutch translation has been queued.',
      type : 'GET',
       url : FAE.raw + 'lang/translate.js',
      func : function(d) {
        FAE.script(
          d.replace('FAE.step', 'FAE.new_step')
           .replace('FAE.index = -1', 'FAE.faux_index = -1')
           .replace('FAE.quota = FAE.step.length', 'FAE.faux_quota = FAE.step.length')
           .replace('FAE.next = function', 'FAE.faux_next = function')
           .replace('FAE.error = function', 'FAE.faux_error = function')
        );

        FAE.step = FAE.step.concat(FAE.new_step);
        FAE.quota = FAE.step.length;
      }
    }
  ]);

}


// Arabic Language Patch
if (FAE.board_lang == 'العربية') {

  FAE.update_step = FAE.update_step.concat([
    {
      info : 'Getting old Arabic translation',
      type : 'GET',
       url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/v1.1.4/lang/Arabic.js',
      func : function(d) {
        FAE.script(d.replace('FAE.lang', 'FAE.lang_current'));
      }
    },

    {
      info : 'Getting new Arabic translation',
      type : 'GET',
       url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/lang/Arabic.js',
      func : function(d) {
        FAE.script(d.replace('FAE.lang', 'FAE.lang_new'));
      }
    },

    {
      info : 'Update for the Arabic translation has been queued.',
      type : 'GET',
       url : FAE.raw + 'lang/translate.js',
      func : function(d) {
        FAE.script(
          d.replace('FAE.step', 'FAE.new_step')
           .replace('FAE.index = -1', 'FAE.faux_index = -1')
           .replace('FAE.quota = FAE.step.length', 'FAE.faux_quota = FAE.step.length')
           .replace('FAE.next = function', 'FAE.faux_next = function')
           .replace('FAE.error = function', 'FAE.faux_error = function')
        );

        FAE.step = FAE.step.concat(FAE.new_step);
        FAE.quota = FAE.step.length;
      }
    }
  ]);

}


// Portuguese Language Patch
if (FAE.board_lang == 'Português') {
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
                               .replace('<div class="title module_column_title">Widget Menu</div>', '<div class="title module_column_title">Menu Widget</div>')
                               .replace('Toggle widget menu', 'Alternar o widget menu')
                               .replace('Clique para ver completo', 'Clique para ver imagem completa'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating Portuguese translation for all.js',
      type : 'POST',
       url : '',
      data : {}
    },


    {
      info : 'Getting template viewtopic_body.html',
      type : 'GET',
       url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=127&l=main&extended_admin=1' + FAE.tid,
      func : function(d) {
        var form = $('form[name="post"]', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].data.template = form.template.value
                                                  .replace('<h2 class="lor_maintitle">Criar uma conta ou fazer login para responder</h2>', '<h2 class="lor_maintitle">Crie uma conta ou faça login para responder</h2>')
                                                  .replace('<h3 class="lor_subtitle">Logar</h3>', '<h3 class="lor_subtitle">Entrar</h3>')
                                                  .replace('<a href="/login" class="button1">Logar</a>', '<a href="/login" class="button1">Entrar</a>');
        }

      }
    },


    {
      info : 'Updating Portuguese translation for template viewtopic_body.html',
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
          FAE.step[FAE.index + 1].data.template = form.template.value
                                                  .replace('<h2 class="lor_maintitle">Criar uma conta ou fazer login para responder</h2>', '<h2 class="lor_maintitle">Crie uma conta ou faça login para responder</h2>')
                                                  .replace('<h3 class="lor_subtitle">Logar</h3>', '<h3 class="lor_subtitle">Entrar</h3>')
                                                  .replace('<a href="/login" class="button1">Logar</a>', '<a href="/login" class="button1">Entrar</a>');
        }

      }
    },


    {
      info : 'Updating Portuguese translation for template viewcomments_body.html',
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
