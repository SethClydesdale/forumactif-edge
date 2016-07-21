/*

  # Changes in v1.0.0-beta.1

  - Added ability to translate forumactif edge in the control panel
  - Added view posts since last visit + other links that were missing on the index
  - Added date / time + last visit to the index
  - Added sub-forums in topic searches
  - Added scroll bar to the classical recent topics widget
  - Added additional line-height to navigation as to make scrolling easier on mobile
  - Fixed share / action buttons that were hidden in topics
  - Fixed height of chatbox on top of the index so that it's equal to the chatbox on the bottom ( 400px )
  - Fixed pagination overflowing in profiles

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.0.0-beta.1';

FAE.update_step = [

  {
    info : 'Getting forum stylesheet',
    type : 'GET',
     url : '/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[method="post"]', d)[0];

      FAE.step[FAE.index + 1].data = {
              edit_code : '@import url(http://ct1.addthis.com/static/r07/widget110.css);' + form.edit_code.value + '\n\n/* added in FAE v1.0.0-beta.1 */\n.linklist{margin:6px 0;padding-left:0}.linklist li{display:inline-block}\n#recent_topics_classical{max-height:250px;overflow-y:auto;overflow-x:hidden;text-overflow:ellipsis;white-space:nowrap}\n.panel #chatbox_top{height:400px!important}\n#cp-main .pagination{float:none;text-align:right}\n@media (min-width:0px) and (max-width:768px){#navbar .mainmenu,#tabs a{line-height:50px}}\n#at-whatsthis{right:0}\n.addthis_button,a[href="javascript:showhide(document.getElementById(\'plus_menu\'))"],#plus_menu{font-size:12px}\n.addthis_button:after{content:" • ";color:#333;}\n#plus_menu{background:#EEE;border:1px solid #CCC;padding:3px}\n#logo-desc{padding:60px 30px 30px 30px}\n#site-title,#site-title h1{font-size:24px;font-weight:normal}',
                 submit : 'Submit'
      }
    }
  },


  {
    info : 'Adding new styles introduced in v1.0.0-beta.1',
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
      tpl_name : 'index_box',
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
      tpl_name : 'mod_recent_topics',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template mod_recent_topics.html',
    type : 'PUBLISH',
     tpl : 904
  },


  {
    info : 'Getting template index_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=110&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      FAE.step[FAE.index + 1].data.template = form.template.value
                                              .replace('{BOARD_INDEX}', '<div id="board_time_table">\n  <p id="board_current_time" class="left">{CURRENT_TIME}</p>\n  <!-- BEGIN switch_user_logged_in --><p id="board_last_visit" class="right">{LAST_VISIT_DATE}</p><!-- END switch_user_logged_in -->\n  <div class="clear"></div>\n</div>\n{BOARD_INDEX}');
    }
  },


  {
    info : 'Updating template index_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 110,
             l : 'main',
      tpl_name : 'index_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template index_body.html',
    type : 'PUBLISH',
     tpl : 110
  },


  {
    info : 'Getting template search_results_topics.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=120&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      FAE.step[FAE.index + 1].data.template = form.template.value
                                              .replace('<strong>{searchresults.TOPIC_AUTHOR}</strong>', '<strong>{searchresults.TOPIC_AUTHOR}</strong> {searchresults.L_IN} <a href="{searchresults.U_VIEW_FORUM}">{searchresults.FORUM_NAME}</a>');
    }
  },


  {
    info : 'Updating template search_results_topics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 120,
             l : 'main',
      tpl_name : 'search_results_topics',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template search_results_topics.html',
    type : 'PUBLISH',
     tpl : 120
  }
];
