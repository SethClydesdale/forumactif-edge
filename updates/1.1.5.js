/*

  # Changes in v1.1.5

  - Fixed hobbies width in memberlist from taking up the entire page.
  - Fixed large avatars overflowing their container in the user profile page.

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
                            '\n/* added in FAE v1.1.4 */\n#memberlist .avatar-mini+td{max-width:200px}\n#profile-advanced-right .module div[style="text-align:center;"] img:first-child{max-width:100%}',
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
      info : 'Updating Dutch translation.',
      type : 'GET',
       url : '/',
      func : function() {

        FAE.updateTranslation({
          oldFile : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/v1.1.4/lang/Dutch.js',
          newFile : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/lang/Dutch.js'
        });

      }
    }
  ]);

}
