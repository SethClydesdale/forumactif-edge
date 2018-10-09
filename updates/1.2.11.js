/*

  # Changes in v1.2.11

  - fixed endless redirections on the mobile version that was caused by a script that disables the mobile version.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.11';

FAE.update_step = [
  {
    info : 'Getting template overall_header.html (mobile)',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_mobile&t=1010&l=mobile&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        // update the template ONLY if the changes are not present
        if (/_mobile_version/.test(form.template.value)) {
          FAE.index = FAE.index + 2;
          FAE.log('The template overall_header.html (mobile) already contains the necessary changes. Skipping template modifications...', 'font-weight:bold;');
          
        } else {
          FAE.step[FAE.index + 1].data.template = form.template.value
          .replace(/<script type="text\/javascript">\(function\(\) \{[\s\S]*?\}\(\)\);<\/script>/, '<script type="text/javascript">(function() {\n    my_setcookie(\'_mobile_version\', \'0\', true);\n    window.location.reload();\n  }());</script>')
        }
      }
    }
  },


  {
    info : 'Updating template overall_header.html (mobile)',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_mobile&extended_admin=1',
    data : {
             t : 1010,
             l : 'mobile',
      tpl_name : 'overall_header',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template overall_header.html (mobile)',
    type : 'PUBLISH',
     tpl : 1010
  }
];