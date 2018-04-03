/*

  # Changes in v1.2.7

  - fixed large avatars overflowing the toolbar welcome menu.
  - fixed the design of polls in topics, making them less messy more concise.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.7';

FAE.update_step = [
  {
    info : 'Getting forum stylesheet',
    type : 'GET',
     url : '/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[method="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data = {
          edit_code : form.edit_code.value.replace('#fa_usermenu img{max-width:120px;max-height:120px}', '#fa_usermenu img{max-width:120px!important;max-height:120px!important}') + '\n/* added in FAE v1.2.7 */.polls dl{margin:0;padding:5px 0}.polls dt{text-align:right}.polls dd{display:inline-block;margin:0;padding:0 5px;width:10%}',
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