/*

  # Changes in v1.2.8

  - updated template general/agreement to reflect GDPR changes.
  - fixed alignment of GDPR checkbox for newsletter agreement on step 2 of registration.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.8';

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
          // unminified
          .replace(' { content:""; display:table; clear:both; }', ', fieldset dl:after { content:""; display:table; clear:both; }')
          // minified
          .replace('{content:"";display:table;clear:both}', ',fieldset dl:after{content:"";display:table;clear:both}'),
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
    info : 'Getting template agreement.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=101&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
        // add new form tag
        .replace('<!-- END switch_fb_explain -->', '<!-- END switch_fb_explain -->\n<form method="GET" id="frmAgreement" action="{U_AGREE_OVER13}">')
        // close the form tag
        .replace(/<\/div>\n$/, '</form>\n</div>\n')
        // add in new checkboxes
        .replace('{MY_RULES}<br />', '{MY_RULES}<br />\n            <div align="center">\n                <div style="text-align:justify; display:inline-block;" align="justify">\n                    <input type="hidden" name="step" value="2" />\n                    <p>\n                        <input type="checkbox" name="agreement" id="frmAgreeChkAgree" value="1" data-validation="required"/> <label for="frmAgreeChkAgree">{AGREE_CONDITIONS}</label> <br />\n                    </p>\n                    <p>\n                        <input type="checkbox" name="privacy" id="frmAgreeChkPrivacy" value="1" data-validation="required"/> <label for="frmAgreeChkPrivacy">{AGREE_PRIVACY}</label>\n                    </p>\n                </div>\n            </div>')
        // replace old agreement buttons
        .replace(/<a class="button1 cgu-buttons" href="{U_AGREE_OVER13}">{AGREE_OVER_13}<\/a>&nbsp;&nbsp;\n[\s\S]*?<a class="button2 cgu-buttons" href="{U_INDEX}">{DO_NOT_AGREE}<\/a>/, '<input type="submit" value="{AGREE_OVER_13}" class="button1 cgu-buttons" />')
      }
    }
  },


  {
    info : 'Updating template agreement.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 101,
             l : 'main',
      tpl_name : 'agreement',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template agreement.html',
    type : 'PUBLISH',
     tpl : 101
  }
];