/*

  # Changes in v1.2.13

  - fixed missing elements in the search form

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.13';

FAE.update_step = [
  {
    info : 'Getting template search_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=118&l=profil&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        // update the template ONLY if the changes are not present
        if (/<!-- BEGIN switch_search_full_text -->/.test(form.template.value)) {
          FAE.index = FAE.index + 2;
          FAE.log('The template search_body.html already contains the necessary changes. Skipping template modifications...', 'font-weight:bold;');
          
        } else {
          FAE.step[FAE.index + 1].data.template = form.template.value
          .replace(/<dd><label for="any">/, '<!-- BEGIN switch_search_full_text -->\n            <dd><label for="text"><input id="text" type="radio" name="search_by" value="text" checked="checked" /> {switch_search_full_text.L_SEARCH_BY_TEXT}</label></dd>\n            <dd><label for="subject"><input id="subject" type="radio" name="search_by" value="subject" /> {switch_search_full_text.L_SEARCH_BY_SUBJECT}</label></dd>\n            <!-- END switch_search_full_text -->\n            <!-- BEGIN switch_search_terms -->\n			<dd><label for="any">')
          
          .replace(/\{L_SEARCH_ALL_TERMS\}<\/label><\/dd>/, '{switch_search_terms.L_SEARCH_ALL_TERMS}</label></dd>\n            <!-- END switch_search_terms -->')
          
          .replace('{L_SEARCH_ALL_TERMS}', '{switch_search_terms.L_SEARCH_ANY_TERMS}')
        }
      }
    }
  },


  {
    info : 'Updating template search_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 118,
             l : 'main',
      tpl_name : 'search_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template search_body.html',
    type : 'PUBLISH',
     tpl : 118
  }
];