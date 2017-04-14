/*

  # Changes in v1.2.3

  - Updated French translation. (Thanks to Gae and DDril)
  - Fixed message editor overlapping theme selector drop down.
  - Fixed the forum moving down when the custom theme option was chosen in the theme selector.
  - Fixed theme selector drop down causing a large amount of whitespace below the forum when placed in the footer.
  - Fixed accented and special characters becoming corrupted on non-utf8 forums when sent over AJAX. (Thanks to Milouze14 for testing this fix)

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.3';

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
                             .replace(/(#fae_theme_list{.*?)z-index:1;(.*?})/, '$1z-index:10;$2')
                             .replace("'a#fae_theme_picker", "'#footer_end #fae_theme_list,#page-footer #fae_theme_list{margin-top:-335px!important}'+\n'a#fae_theme_picker")
                             .replace(/(document\.write\('<style type="text\/css">#fa_theme_selector.*?)#fae_custom-theme.*?{(.*?)}(<\/style>'\);)/, '$1#fae_custom-theme {$2float:left; }$3'),

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


// French Language Patch
if (FAE.board_lang == 'Français') {
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
                               .replace(/Custom theme/g, 'Thème Personnalisé')
                               .replace('Dark Mode : ', 'Mode sombre :')
                               .replace('Light Mode : ', 'Mode clair :')
                               .replace('Copy Code', 'Copier le code')
                               .replace('Copied !', 'Copié !'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating French translation for all.js',
      type : 'POST',
       url : '',
      data : {}
    }
  ]);
}
