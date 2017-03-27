/*

  # Changes in v1.2.1

  - Added Colors tab to the FAE Control Panel.
  - Added Welcome and Version Information messages to the FAE Control Panel.
  - Added translation support for new features that were introduced in v1.2.0.
  - Updated Spanish translation.
  - Updated Portuguese translation.
  - Co-Admins are now allowed to use the Configuration section of the FAE Control Panel.
  - Tidied up the Control Panel by placing each section into a tab.
  - Fixed <hr> style and size

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.1';

FAE.update_step = [
  {
    info : 'Getting forum stylesheet',
    type : 'GET',
     url : '/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[method="post"]', d)[0];

      if (form) {
        var rgb = window.getComputedStyle(document.body, null).getPropertyValue('background-color').replace(/rgb\(|\)|\s/g, '').split(',');

        FAE.step[FAE.index + 1].data = {
                edit_code : form.edit_code.value + '\n/* added in FAE v1.2.1 */\nhr { border:none; border-top:1px solid ' + ( Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000) > 125 ? '#CCC' : '#333' ) + '; }',
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


// Spanish Language Patch
if (FAE.board_lang == 'Español') {
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
                               .replace(/Custom theme/g, 'Estilo personalizado')
                               .replace('Dark Mode : ', 'Modo oscuro :')
                               .replace('Light Mode : ', 'Modo claro :')
                               .replace('Copy Code', 'Copiar código')
                               .replace('Copied !', '¡Copiado!'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating Spanish translation for all.js',
      type : 'POST',
       url : '',
      data : {}
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
                               .replace(/Custom theme/g, 'Tema Personalizado')
                               .replace('Dark Mode : ', 'Modo Escuro:')
                               .replace('Light Mode : ', 'Modo Claro:')
                               .replace('Copy Code', 'Copiar Código')
                               .replace('Copied !', 'Copiado!'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating Spanish translation for all.js',
      type : 'POST',
       url : '',
      data : {}
    }
  ]);
}
