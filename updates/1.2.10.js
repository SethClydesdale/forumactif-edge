/*

  # Changes in v1.2.10

  - added Allow newsletters "Popular contents" to profile preferences.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.10';

FAE.update_step = [
  {
    info : 'Getting template profile_add_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_profil&t=701&l=profil&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        // update the template ONLY if the changes are not present
        if (/L_NEWSLETTER_AUTO_ACCEPT/.test(form.template.value)) {
          FAE.index = FAE.index + 2;
          FAE.log('The template profile_add_body.html already contains the necessary changes. Skipping template modifications...', 'font-weight:bold;');
          
        } else {
          FAE.step[FAE.index + 1].data.template = form.template.value
          .replace(/<span class="italic">{L_NEWSLETTER_ACCEPT_EXPLAIN}<\/span>\n						<\/dd>\n					<\/dl>/, '<span class="italic">{L_NEWSLETTER_ACCEPT_EXPLAIN}</span>\n						</dd>\n					</dl>\n                    <!-- BEGIN display_newsletter_auto -->\n                    <dl>\n                        <dt><label>{L_NEWSLETTER_AUTO_ACCEPT} :</label></dt>\n                        <dd>\n                            <label><input type="radio" name="newsletter_auto" value="1" {NEWSLETTER_AUTO_YES} />{L_YES}</label>\n                            <label><input type="radio" name="newsletter_auto" value="0" {NEWSLETTER_AUTO_NO} />{L_NO}</label>\n                            <br /><span class="italic">{L_NEWSLETTER_AUTO_ACCEPT_EXPLAIN}</span>\n                        </dd>\n                    </dl>\n                    <!-- END display_newsletter_auto -->')
        }
      }
    }
  },


  {
    info : 'Updating template profile_add_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_profil&extended_admin=1',
    data : {
             t : 701,
             l : 'profil',
      tpl_name : 'profile_add_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template profile_add_body.html',
    type : 'PUBLISH',
     tpl : 701
  }
];