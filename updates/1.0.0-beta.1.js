/*
  UPDATES DONE : 3/9

  TODO :
  X add View posts since last visit + other links that are missing in the index_box (DONE!)
  X add scrollbar to classic newest topics widget
  - add share / action in topics
  - add date / time + last visit to index_body
  - add additional padding or line-height to navigation in mobile media query
  X index chatbox on top is not of adequate height
  - http://fmdesign.forumotion.com/u1wall - pagination overflowing at bottom
  - http://fmdesign.forumotion.com/search?search_id=newposts - forum posted in is missing
  - implement translation functionality

*/

FAE.update_step = [

  {
    info : 'Getting forum stylesheet',
    type : 'GET',
     url : '/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[method="post"]', d)[0];

      FAE.step[FAE.index + 1].data = {
              edit_code : form.edit_code.value + '\n\n/* added in FAE v1.0.0-beta.1 */\n.linklist{margin:6px 0;padding-left:0}.linklist li{display:inline-block}\n#recent_topics_classical{max-height:200px;overflow-y:auto}\n.panel #chatbox_top{height:400px!important}',
                 submit : 'Submit'
      }
    }
  },


  {
    info : 'Adding new styles introduced in v1.0.0-beta.1'
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {}
  },


  {
    info : 'Getting template index_box.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=111&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      FAE.step[FAE.index + 1].data.template = form.template.value
                                              .replace('<!-- BEGIN catrow -->', '<ul id="search-links" class="linklist">\n	<!-- BEGIN switch_user_logged_in -->\n	<li><a href="{U_SEARCH_NEW}">{L_SEARCH_NEW}</a>&nbsp;&bull;&nbsp;</li>\n	<li><a href="{U_SEARCH_SELF}">{L_SEARCH_SELF}</a>&nbsp;&bull;&nbsp;</li>\n	<!-- END switch_user_logged_in -->\n	<li><a href="{U_SEARCH_UNANSWERED}">{L_SEARCH_UNANSWERED}</a></li>\n	<!-- BEGIN switch_user_logged_in -->\n	<li class="right"><a href="{U_MARK_READ}" accesskey="m">{L_MARK_FORUMS_READ}</a></li>\n	<!-- END switch_user_logged_in -->\n</ul>\n\n<!-- BEGIN catrow -->')
                                              .replace('<!-- END catrow -->', '<!-- END catrow -->\n\n<!-- BEGIN switch_on_index -->\n<ul id="stat-links" class="linklist">\n	<li><a href="{U_TODAY_ACTIVE}">{L_TODAY_ACTIVE}</a>&nbsp;&bull;&nbsp;</li>\n	<li><a href="{U_TODAY_POSTERS}">{L_TODAY_POSTERS}</a>&nbsp;&bull;&nbsp;</li>\n	<li class="last"><a href="{U_OVERALL_POSTERS}">{L_OVERALL_POSTERS}</a></li>\n	<!-- BEGIN switch_delete_cookies -->\n	<li class="right"><a href="{switch_on_index.switch_delete_cookies.U_DELETE_COOKIES}" rel="nofollow">{switch_on_index.switch_delete_cookies.L_DELETE_COOKIES}</a></li>\n	<!-- END switch_delete_cookies -->\n</ul>\n<!-- END switch_on_index -->');
    }
  },


  {
    info : 'Updating template index_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
           t : 111,
           l : 'main',
        name : 'index_box',
      submit : 'Save'
    }
  },


  {
    info : 'Publishing template index_box.html',
    type : 'PUBLISH',
     tpl : 111
  },


  {
    info : 'Getting template mod_recent_topics.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_portal&t=904&l=portal&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      FAE.step[FAE.index + 1].data.template = form.template.value
                                              .replace('<!-- BEGIN classical_row -->', '<!-- BEGIN classical_row -->\n  <div id="recent_topics_classical">')
                                              .replace('<!-- END classical_row -->', '  </div>\n<!-- END classical_row -->');
    }
  },


  {
    info : 'Updating template mod_recent_topics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
           t : 904,
           l : 'portal',
        name : 'mod_recent_topics',
      submit : 'Save'
    }
  },


  {
    info : 'Publishing template mod_recent_topics.html',
    type : 'PUBLISH',
     tpl : 904
  },
];
