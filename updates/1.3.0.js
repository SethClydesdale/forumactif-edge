/*

  # Changes in v1.3.0

  - added "Last Posts" search link to the index which allows you to view the latest posts via /latest.
  - added warning to FAE CP when performing an operation such as installing, updating, etc. This will help prevent accidental data loss caused by navigating to another page during an operation.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.3.0';

FAE.update_step = [
  {
    info : 'Getting template idex_box.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=111&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        // update the template ONLY if the changes are not present
        if (/href="\/latest"/.test(form.template.value)) {
          FAE.index = FAE.index + 2;
          FAE.log('The template idex_box.html already contains the necessary changes. Skipping template modifications...', 'font-weight:bold;');
          
        } else {
          FAE.step[FAE.index + 1].data.template = form.template.value
          .replace('<ul id="search-links" class="linklist">', '<ul id="search-links" class="linklist">\n  	<li><a href="/latest">{L_LASTPOST}</a>&nbsp;&bull;&nbsp;</li>')
        }
      }
    }
  },


  {
    info : 'Updating template idex_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 111,
             l : 'main',
      tpl_name : 'idex_box',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template idex_box.html',
    type : 'PUBLISH',
     tpl : 111
  }
];