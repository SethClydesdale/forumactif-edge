/*

  # Changes in v1.2.9

  - Updated the profile_add_body template to include the data export option in the edit profile page. This will allow members to download the information and content that they have published on the forum.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.9';

FAE.update_step = [
  {
    info : 'Getting template profile_add_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_profil&t=701&l=profil&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        // update the template ONLY if the GDPR changes are not present
        if (/rgpd_generate_or_download/.test(form.template.value)) {
          FAE.step[FAE.index + 1].data.template = form.template.value;
          
        } else {
          FAE.step[FAE.index + 1].data.template = form.template.value
          .replace('<!-- END switch_informations_menu -->', '\n				<!-- BEGIN rgpd_generate_or_download -->\n				<div class="content-block">\n					<h1 class="title">{switch_informations_menu.RGPD_ACTION_TITLE}</h1>\n                    <div class="txt-content">\n                        <fieldset>\n                            <dl>\n                                <dt><label>{switch_informations_menu.rgpd_generate_or_download.RGPD_ACTION_LABEL} :</label></dt>\n                                <dd>\n                                    <a href="{switch_informations_menu.rgpd_generate_or_download.RGPD_ACTION_LINK}" class="button1">{switch_informations_menu.rgpd_generate_or_download.RGPD_ACTION_CONTENT}</a><br />\n                                    {switch_informations_menu.rgpd_generate_or_download.RGPD_ACTION_EXPLAIN}\n                                </dd>\n                            </dl>\n                        </fieldset>\n                    </div>\n				</div>\n				<!-- END rgpd_generate_or_download -->\n				<!-- BEGIN rgpd_await_export -->\n				<div class="content-block">\n					<h1 class="title">{switch_informations_menu.RGPD_ACTION_TITLE}</h1>\n                    <div class="txt-content">\n                        <fieldset>\n                            <p>{switch_informations_menu.rgpd_await_export.RGPD_AWAIT_EXPORT}</p>\n                        </fieldset>\n                    </div>\n				</div>\n				<!-- END rgpd_await_export -->\n				<!-- END switch_informations_menu -->')
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