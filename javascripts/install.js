// installation instructions
FAE.step = [
  /* -- STEP 0 -- */
  {
    info : 'Changing forum version to phpbb3',
    type : 'POST',
     url : 'part=themes&sub=styles&mode=version&extended_admin=1',
    data : {
                 tpl : 'prosilver',
          keep_theme : 2,
      change_version : 'Save'
    }
  },


  /* -- STEP 1 -- */
  {
    info : 'Unoptimizing and deactivating default CSS',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {
             css_base : 0,
         optimize_css : 0,
      submit_base_css : 'Save'
    }
  },


  /* -- STEP 2 -- */
  {
    info : 'Getting fa_edge.min.css',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/fa_edge.min.css',
    func : function(d) {
      FAE.step[3].data.edit_code = d;
    }
  },


  /* -- STEP 3 -- */
  {
    info : 'Installing fa_edge.min.css',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {
         submit : 'Submit'
    }
  },


  /* -- STEP 4 -- */
  {
    info : 'Getting and deleting all JavaScript files to prevent installation errors',
    type : 'GET',
     url : '/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid,
    func : function(d) {
      var form = $('#pageListHtml', d),
          file = $('input[type="checkbox"]', form),
          i = 0,
          j = file.length;

      for (; i < j; i++) {
        file[i].checked = true;
      }

      $.post(form[0].action, form.serialize() + '&attachments_submit=Delete', function(d) {
        var confirmation = $('form[method="post"]', d);
        $.post(confirmation[0].action, confirmation.serialize() + '&confirm=Yes');
      });
    }
  },


  /* -- STEP 5 -- */
  {
    info : 'Enabling JavaScript codes management',
    type : 'POST',
     url : 'part=modules&sub=html&mode=js_delete&extended_admin=1&tid=58b8b351201e3d8925cba62d506c0bb7',
    data : {
      allow_js_module : 1,
          conf_submit : 'Save'
    }
  },


  /* -- STEP 6 -- */
  {
    info : 'Getting all.js',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/javascripts/in-all-the-pages/all.js',
    func : function(d) {
      FAE.step[7].data.content = d;
    }
  },


  /* -- STEP 7 -- */
  {
    info : 'Installing all.js',
    type : 'POST',
     url : 'part=modules&sub=html&mode=js_edit&extended_admin=1',
    data : {
                 title : '[FA EDGE] ALL.JS',
      'js_placement[]' : 'allpages',
                  mode : 'save',
                submit : 'Submit'
    }
  },


  /* -- STEP 8 -- */
  {
    info : 'Getting homepage.js',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/javascripts/in-the-homepage/homepage.js',
    func : function(d) {
      FAE.step[9].data.content = d;
    }
  },


  /* -- STEP 9 -- */
  {
    info : 'Installing homepage.js',
    type : 'POST',
     url : 'part=modules&sub=html&mode=js_edit&extended_admin=1',
    data : {
                 title : '[FA EDGE] HOMEPAGE.JS',
      'js_placement[]' : 'index',
                  mode : 'save',
                submit : 'Submit'
    }
  },


  /* -- STEP 10 -- */
  {
    info : 'Getting topics.js',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/javascripts/in-the-topics/topics.js',
    func : function(d) {
      FAE.step[11].data.content = d;
    }
  },


  /* -- STEP 11 -- */
  {
    info : 'Installing topics.js',
    type : 'POST',
     url : 'part=modules&sub=html&mode=js_edit&extended_admin=1',
    data : {
                 title : '[FA EDGE] TOPICS.JS',
      'js_placement[]' : 'viewtopic',
                  mode : 'save',
                submit : 'Submit'
    }
  },


  /* -- STEP 12 -- */
  {
    info : 'Getting template agreement.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/agreement.html',
    func : function(d) {
      FAE.step[13].data.template = d;
    }
  },


  /* -- STEP 13 -- */
  {
    info : 'Installing template agreement.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 101,
             l : 'main',
      tpl_name : 'agreement',
        submit : 'Save'
    }
  },


  /* -- STEP 14 -- */
  {
    info : 'Publishing template agreement.html',
    type : 'PUBLISH',
     tpl : 101
  },


  /* -- STEP 15 -- */
  {
    info : 'Getting template buy_credits.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/buy_credits.html',
    func : function(d) {
      FAE.step[16].data.template = d;
    }
  },


  /* -- STEP 16 -- */
  {
    info : 'Installing template buy_credits.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 105,
             l : 'main',
      tpl_name : 'buy_credits',
        submit : 'Save'
    }
  },


  /* -- STEP 17 -- */
  {
    info : 'Publishing template buy_credits.html',
    type : 'PUBLISH',
     tpl : 105
  },


  /* -- STEP 18 -- */
  {
    info : 'Getting template confirm_body.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/confirm_body.html',
    func : function(d) {
      FAE.step[19].data.template = d;
    }
  },


  /* -- STEP 19 -- */
  {
    info : 'Installing template confirm_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 103,
             l : 'main',
      tpl_name : 'confirm_body',
        submit : 'Save'
    }
  },


  /* -- STEP 20 -- */
  {
    info : 'Publishing template confirm_body.html',
    type : 'PUBLISH',
     tpl : 103
  },


  /* -- STEP 21 -- */
  {
    info : 'Getting template error_body.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/error_body.html',
    func : function(d) {
      FAE.step[22].data.template = d;
    }
  },


  /* -- STEP 22 -- */
  {
    info : 'Installing template error_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 106,
             l : 'main',
      tpl_name : 'error_body',
        submit : 'Save'
    }
  },


  /* -- STEP 23 -- */
  {
    info : 'Publishing template error_body.html',
    type : 'PUBLISH',
     tpl : 106
  },


  /* -- STEP 24 -- */
  {
    info : 'Getting template faq_body.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/faq_body.html',
    func : function(d) {
      FAE.step[25].data.template = d;
    }
  },


  /* -- STEP 25 -- */
  {
    info : 'Installing template faq_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 107,
             l : 'main',
      tpl_name : 'faq_body',
        submit : 'Save'
    }
  },


  /* -- STEP 26 -- */
  {
    info : 'Publishing template faq_body.html',
    type : 'PUBLISH',
     tpl : 107
  },


  /* -- STEP 27 -- */
  {
    info : 'Getting template faq_dhtml.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/faq_dhtml.html',
    func : function(d) {
      FAE.step[28].data.template = d;
    }
  },


  /* -- STEP 28 -- */
  {
    info : 'Installing template faq_dhtml.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 108,
             l : 'main',
      tpl_name : 'faq_dhtml',
        submit : 'Save'
    }
  },


  /* -- STEP 29 -- */
  {
    info : 'Publishing template faq_dhtml.html',
    type : 'PUBLISH',
     tpl : 108
  },


  /* -- STEP 30 -- */
  {
    info : 'Getting template greeting_popup.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/greeting_popup.html',
    func : function(d) {
      FAE.step[31].data.template = d;
    }
  },


  /* -- STEP 31 -- */
  {
    info : 'Installing template greeting_popup.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 109,
             l : 'main',
      tpl_name : 'greeting_popup',
        submit : 'Save'
    }
  },


  /* -- STEP 32 -- */
  {
    info : 'Publishing template greeting_popup.html',
    type : 'PUBLISH',
     tpl : 109
  },


  /* -- STEP 33 -- */
  {
    info : 'Getting template index_body.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/index_body.html',
    func : function(d) {
      FAE.step[34].data.template = d;
    }
  },


  /* -- STEP 34 -- */
  {
    info : 'Installing template index_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 110,
             l : 'main',
      tpl_name : 'index_body',
        submit : 'Save'
    }
  },


  /* -- STEP 35 -- */
  {
    info : 'Publishing template index_body.html',
    type : 'PUBLISH',
     tpl : 110
  },


  /* -- STEP 36 -- */
  {
    info : 'Getting template index_box.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/index_box.html',
    func : function(d) {
      FAE.step[37].data.template = d;
    }
  },


  /* -- STEP 37 -- */
  {
    info : 'Installing template index_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 111,
             l : 'main',
      tpl_name : 'index_box',
        submit : 'Save'
    }
  },


  /* -- STEP 38 -- */
  {
    info : 'Publishing template index_box.html',
    type : 'PUBLISH',
     tpl : 111
  },


  /* -- STEP 39 -- */
  {
    info : 'Getting template jumpbox.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/jumpbox.html',
    func : function(d) {
      FAE.step[40].data.template = d;
    }
  },


  /* -- STEP 40 -- */
  {
    info : 'Installing template jumpbox.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 112,
             l : 'main',
      tpl_name : 'jumpbox',
        submit : 'Save'
    }
  },


  /* -- STEP 41 -- */
  {
    info : 'Publishing template jumpbox.html',
    type : 'PUBLISH',
     tpl : 112
  },


  /* -- STEP 42 -- */
  {
    info : 'Getting template memberlist_body.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/memberlist_body.html',
    func : function(d) {
      FAE.step[43].data.template = d;
    }
  },


  /* -- STEP 43 -- */
  {
    info : 'Installing template memberlist_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 113,
             l : 'main',
      tpl_name : 'memberlist_body',
        submit : 'Save'
    }
  },


  /* -- STEP 44 -- */
  {
    info : 'Publishing template memberlist_body.html',
    type : 'PUBLISH',
     tpl : 113
  },


  /* -- STEP 45 -- */
  {
    info : 'Getting template message_body.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/message_body.html',
    func : function(d) {
      FAE.step[46].data.template = d;
    }
  },


  /* -- STEP 46 -- */
  {
    info : 'Installing template message_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 114,
             l : 'main',
      tpl_name : 'message_body',
        submit : 'Save'
    }
  },


  /* -- STEP 47 -- */
  {
    info : 'Publishing template message_body.html',
    type : 'PUBLISH',
     tpl : 114
  },


  /* -- STEP 48 -- */
  {
    info : 'Getting template overall_footer_begin.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/overall_footer_begin.html',
    func : function(d) {
      FAE.step[49].data.template = d;
    }
  },


  /* -- STEP 49 -- */
  {
    info : 'Installing template overall_footer_begin.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 115,
             l : 'main',
      tpl_name : 'overall_footer_begin',
        submit : 'Save'
    }
  },


  /* -- STEP 50 -- */
  {
    info : 'Publishing template overall_footer_begin.html',
    type : 'PUBLISH',
     tpl : 115
  },


  /* -- STEP 51 -- */
  {
    info : 'Getting template overall_footer_end.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/overall_footer_end.html',
    func : function(d) {
      FAE.step[52].data.template = d;
    }
  },


  /* -- STEP 52 -- */
  {
    info : 'Installing template overall_footer_end.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 133,
             l : 'main',
      tpl_name : 'overall_footer_end',
        submit : 'Save'
    }
  },


  /* -- STEP 53 -- */
  {
    info : 'Publishing template overall_footer_end.html',
    type : 'PUBLISH',
     tpl : 133
  },


  /* -- STEP 54 -- */
  {
    info : 'Getting template overall_header.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/overall_header.html',
    func : function(d) {
      FAE.step[55].data.template = d;
    }
  },


  /* -- STEP 55 -- */
  {
    info : 'Installing template overall_header.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 116,
             l : 'main',
      tpl_name : 'overall_header',
        submit : 'Save'
    }
  },


  /* -- STEP 56 -- */
  {
    info : 'Publishing template overall_header.html',
    type : 'PUBLISH',
     tpl : 116
  },


  /* -- STEP 57 -- */
  {
    info : 'Getting template search_body.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/search_body.html',
    func : function(d) {
      FAE.step[58].data.template = d;
    }
  },


  /* -- STEP 58 -- */
  {
    info : 'Installing template search_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 118,
             l : 'main',
      tpl_name : 'search_body',
        submit : 'Save'
    }
  },


  /* -- STEP 59 -- */
  {
    info : 'Publishing template search_body.html',
    type : 'PUBLISH',
     tpl : 118
  },


  /* -- STEP 60 -- */
  {
    info : 'Getting template search_results_posts.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/search_results_posts.html',
    func : function(d) {
      FAE.step[61].data.template = d;
    }
  },


  /* -- STEP 61 -- */
  {
    info : 'Installing template search_results_posts.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 119,
             l : 'main',
      tpl_name : 'search_results_posts',
        submit : 'Save'
    }
  },


  /* -- STEP 62 -- */
  {
    info : 'Publishing template search_results_posts.html',
    type : 'PUBLISH',
     tpl : 119
  },


  /* -- STEP 63 -- */
  {
    info : 'Getting template search_results_topics.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/search_results_topics.html',
    func : function(d) {
      FAE.step[64].data.template = d;
    }
  },


  /* -- STEP 64 -- */
  {
    info : 'Installing template search_results_topics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 120,
             l : 'main',
      tpl_name : 'search_results_topics',
        submit : 'Save'
    }
  },


  /* -- STEP 65 -- */
  {
    info : 'Publishing template search_results_topics.html',
    type : 'PUBLISH',
     tpl : 120
  },


  /* -- STEP 66 -- */
  {
    info : 'Getting template topics_blog_box.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/topics_blog_box.html',
    func : function(d) {
      FAE.step[67].data.template = d;
    }
  },


  /* -- STEP 67 -- */
  {
    info : 'Installing template topics_blog_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 130,
             l : 'main',
      tpl_name : 'topics_blog_box',
        submit : 'Save'
    }
  },


  /* -- STEP 68 -- */
  {
    info : 'Publishing template topics_blog_box.html',
    type : 'PUBLISH',
     tpl : 130
  },


  /* -- STEP 69 -- */
  {
    info : 'Getting template topics_list_box.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/topics_list_box.html',
    func : function(d) {
      FAE.step[70].data.template = d;
    }
  },


  /* -- STEP 70 -- */
  {
    info : 'Installing template topics_list_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 124,
             l : 'main',
      tpl_name : 'topics_list_box',
        submit : 'Save'
    }
  },


  /* -- STEP 71 -- */
  {
    info : 'Publishing template topics_list_box.html',
    type : 'PUBLISH',
     tpl : 124
  },


  /* -- STEP 72 -- */
  {
    info : 'Getting template viewcomments_body.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/viewcomments_body.html',
    func : function(d) {
      FAE.step[73].data.template = d;
    }
  },


  /* -- STEP 73 -- */
  {
    info : 'Installing template viewcomments_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 131,
             l : 'main',
      tpl_name : 'viewcomments_body',
        submit : 'Save'
    }
  },


  /* -- STEP 74 -- */
  {
    info : 'Publishing template viewcomments_body.html',
    type : 'PUBLISH',
     tpl : 131
  },


  /* -- STEP 75 -- */
  {
    info : 'Getting template viewforum_body.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/viewforum_body.html',
    func : function(d) {
      FAE.step[76].data.template = d;
    }
  },


  /* -- STEP 76 -- */
  {
    info : 'Installing template viewforum_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 125,
             l : 'main',
      tpl_name : 'viewforum_body',
        submit : 'Save'
    }
  },


  /* -- STEP 77 -- */
  {
    info : 'Publishing template viewforum_body.html',
    type : 'PUBLISH',
     tpl : 125
  },


  /* -- STEP 78 -- */
  {
    info : 'Getting template viewonline_body.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/viewonline_body.html',
    func : function(d) {
      FAE.step[79].data.template = d;
    }
  },


  /* -- STEP 79 -- */
  {
    info : 'Installing template viewonline_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 126,
             l : 'main',
      tpl_name : 'viewonline_body',
        submit : 'Save'
    }
  },


  /* -- STEP 80 -- */
  {
    info : 'Publishing template viewonline_body.html',
    type : 'PUBLISH',
     tpl : 126
  },


  /* -- STEP 81 -- */
  {
    info : 'Getting template viewtopic_body.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/general/viewtopic_body.html',
    func : function(d) {
      FAE.step[82].data.template = d;
    }
  },


  /* -- STEP 82 -- */
  {
    info : 'Installing template viewtopic_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 127,
             l : 'main',
      tpl_name : 'viewtopic_body',
        submit : 'Save'
    }
  },


  /* -- STEP 83 -- */
  {
    info : 'Publishing template viewtopic_body.html',
    type : 'PUBLISH',
     tpl : 127
  },

  /* -- STEP 84 -- */
  {
    info : 'Getting template mod_chatbox.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_chatbox.html',
    func : function(d) {
      FAE.step[85].data.template = d;
    }
  },


  /* -- STEP 85 -- */
  {
    info : 'Installing template mod_chatbox.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 901,
             l : 'main',
      tpl_name : 'mod_chatbox',
        submit : 'Save'
    }
  },


  /* -- STEP 86 -- */
  {
    info : 'Publishing template mod_chatbox.html',
    type : 'PUBLISH',
     tpl : 901
  },


  /* -- STEP 87 -- */
  {
    info : 'Getting template mod_keywords.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_keywords.html',
    func : function(d) {
      FAE.step[88].data.template = d;
    }
  },


  /* -- STEP 88 -- */
  {
    info : 'Installing template mod_keywords.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 913,
             l : 'main',
      tpl_name : 'mod_keywords',
        submit : 'Save'
    }
  },


  /* -- STEP 89 -- */
  {
    info : 'Publishing template mod_keywords.html',
    type : 'PUBLISH',
     tpl : 913
  },


  /* -- STEP 90 -- */
  {
    info : 'Getting template mod_login.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_login.html',
    func : function(d) {
      FAE.step[91].data.template = d;
    }
  },


  /* -- STEP 91 -- */
  {
    info : 'Installing template mod_login.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 916,
             l : 'main',
      tpl_name : 'mod_login',
        submit : 'Save'
    }
  },


  /* -- STEP 92 -- */
  {
    info : 'Publishing template mod_login.html',
    type : 'PUBLISH',
     tpl : 916
  },


  /* -- STEP 93 -- */
  {
    info : 'Getting template mod_most_active_starters.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_most_active_starters.html',
    func : function(d) {
      FAE.step[94].data.template = d;
    }
  },


  /* -- STEP 94 -- */
  {
    info : 'Installing template mod_most_active_starters.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 919,
             l : 'main',
      tpl_name : 'mod_most_active_starters',
        submit : 'Save'
    }
  },


  /* -- STEP 95 -- */
  {
    info : 'Publishing template mod_most_active_starters.html',
    type : 'PUBLISH',
     tpl : 919
  },


  /* -- STEP 96 -- */
  {
    info : 'Getting template mod_most_active_topics.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_most_active_topics.html',
    func : function(d) {
      FAE.step[97].data.template = d;
    }
  },


  /* -- STEP 97 -- */
  {
    info : 'Installing template mod_most_active_topics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 917,
             l : 'main',
      tpl_name : 'mod_most_active_topics',
        submit : 'Save'
    }
  },


  /* -- STEP 98 -- */
  {
    info : 'Publishing template mod_most_active_topics.html',
    type : 'PUBLISH',
     tpl : 917
  },


  /* -- STEP 99 -- */
  {
    info : 'Getting template mod_most_viewed_topics.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_most_viewed_topics.html',
    func : function(d) {
      FAE.step[100].data.template = d;
    }
  },


  /* -- STEP 100 -- */
  {
    info : 'Installing template mod_most_viewed_topics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 918,
             l : 'main',
      tpl_name : 'mod_most_viewed_topics',
        submit : 'Save'
    }
  },


  /* -- STEP 101 -- */
  {
    info : 'Publishing template mod_most_viewed_topics.html',
    type : 'PUBLISH',
     tpl : 918
  },


  /* -- STEP 102 -- */
  {
    info : 'Getting template mod_news.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_news.html',
    func : function(d) {
      FAE.step[103].data.template = d;
    }
  },


  /* -- STEP 103 -- */
  {
    info : 'Installing template mod_news.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 902,
             l : 'main',
      tpl_name : 'mod_news',
        submit : 'Save'
    }
  },


  /* -- STEP 104 -- */
  {
    info : 'Publishing template mod_news.html',
    type : 'PUBLISH',
     tpl : 902
  },


  /* -- STEP 105 -- */
  {
    info : 'Getting template mod_poll.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_poll.html',
    func : function(d) {
      FAE.step[106].data.template = d;
    }
  },


  /* -- STEP 106 -- */
  {
    info : 'Installing template mod_poll.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 903,
             l : 'main',
      tpl_name : 'mod_poll',
        submit : 'Save'
    }
  },


  /* -- STEP 107 -- */
  {
    info : 'Publishing template mod_poll.html',
    type : 'PUBLISH',
     tpl : 903
  },


  /* -- STEP 108 -- */
  {
    info : 'Getting template mod_recent_topics.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_recent_topics.html',
    func : function(d) {
      FAE.step[109].data.template = d;
    }
  },


  /* -- STEP 109 -- */
  {
    info : 'Installing template mod_recent_topics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 904,
             l : 'main',
      tpl_name : 'mod_recent_topics',
        submit : 'Save'
    }
  },


  /* -- STEP 110 -- */
  {
    info : 'Publishing template mod_recent_topics.html',
    type : 'PUBLISH',
     tpl : 904
  },


  /* -- STEP 111 -- */
  {
    info : 'Getting template mod_rss_feeds.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_rss_feeds.html',
    func : function(d) {
      FAE.step[112].data.template = d;
    }
  },


  /* -- STEP 112 -- */
  {
    info : 'Installing template mod_rss_feeds.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 915,
             l : 'main',
      tpl_name : 'mod_rss_feeds',
        submit : 'Save'
    }
  },


  /* -- STEP 113 -- */
  {
    info : 'Publishing template mod_rss_feeds.html',
    type : 'PUBLISH',
     tpl : 915
  },


  /* -- STEP 114 -- */
  {
    info : 'Getting template mod_search.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_search.html',
    func : function(d) {
      FAE.step[115].data.template = d;
    }
  },


  /* -- STEP 115 -- */
  {
    info : 'Installing template mod_search.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 905,
             l : 'main',
      tpl_name : 'mod_search',
        submit : 'Save'
    }
  },


  /* -- STEP 116 -- */
  {
    info : 'Publishing template mod_search.html',
    type : 'PUBLISH',
     tpl : 905
  },


  /* -- STEP 117 -- */
  {
    info : 'Getting template mod_social_bookmarking.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_social_bookmarking.html',
    func : function(d) {
      FAE.step[118].data.template = d;
    }
  },


  /* -- STEP 118 -- */
  {
    info : 'Installing template mod_social_bookmarking.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 914,
             l : 'main',
      tpl_name : 'mod_social_bookmarking',
        submit : 'Save'
    }
  },


  /* -- STEP 119 -- */
  {
    info : 'Publishing template mod_social_bookmarking.html',
    type : 'PUBLISH',
     tpl : 914
  },


  /* -- STEP 120 -- */
  {
    info : 'Getting template mod_statistics.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_statistics.html',
    func : function(d) {
      FAE.step[121].data.template = d;
    }
  },


  /* -- STEP 121 -- */
  {
    info : 'Installing template mod_statistics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 906,
             l : 'main',
      tpl_name : 'mod_statistics',
        submit : 'Save'
    }
  },


  /* -- STEP 122 -- */
  {
    info : 'Publishing template mod_statistics.html',
    type : 'PUBLISH',
     tpl : 906
  },


  /* -- STEP 123 -- */
  {
    info : 'Getting template mod_top_post_users_month.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_top_post_users_month.html',
    func : function(d) {
      FAE.step[124].data.template = d;
    }
  },


  /* -- STEP 124 -- */
  {
    info : 'Installing template mod_top_post_users_month.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 921,
             l : 'main',
      tpl_name : 'mod_top_post_users_month',
        submit : 'Save'
    }
  },


  /* -- STEP 125 -- */
  {
    info : 'Publishing template mod_top_post_users_month.html',
    type : 'PUBLISH',
     tpl : 921
  },


  /* -- STEP 126 -- */
  {
    info : 'Getting template mod_top_post_users_week.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_top_post_users_week.html',
    func : function(d) {
      FAE.step[127].data.template = d;
    }
  },


  /* -- STEP 127 -- */
  {
    info : 'Installing template mod_top_post_users_week.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 920,
             l : 'main',
      tpl_name : 'mod_top_post_users_week',
        submit : 'Save'
    }
  },


  /* -- STEP 128 -- */
  {
    info : 'Publishing template mod_top_post_users_week.html',
    type : 'PUBLISH',
     tpl : 920
  },


  /* -- STEP 129 -- */
  {
    info : 'Getting template mod_top_posters.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_top_posters.html',
    func : function(d) {
      FAE.step[130].data.template = d;
    }
  },


  /* -- STEP 130 -- */
  {
    info : 'Installing template mod_top_posters.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 912,
             l : 'main',
      tpl_name : 'mod_top_posters',
        submit : 'Save'
    }
  },


  /* -- STEP 131 -- */
  {
    info : 'Publishing template mod_top_posters.html',
    type : 'PUBLISH',
     tpl : 912
  },


  /* -- STEP 132 -- */
  {
    info : 'Getting template mod_whoisonline.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/mod_whoisonline.html',
    func : function(d) {
      FAE.step[133].data.template = d;
    }
  },


  /* -- STEP 133 -- */
  {
    info : 'Installing template mod_whoisonline.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 907,
             l : 'main',
      tpl_name : 'mod_whoisonline',
        submit : 'Save'
    }
  },


  /* -- STEP 134 -- */
  {
    info : 'Publishing template mod_whoisonline.html',
    type : 'PUBLISH',
     tpl : 907
  },


  /* -- STEP 135 -- */
  {
    info : 'Getting template standard.html',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/templates/portal/standard.html',
    func : function(d) {
      FAE.step[136].data.template = d;
    }
  },


  /* -- STEP 136 -- */
  {
    info : 'Installing template standard.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 911,
             l : 'main',
      tpl_name : 'standard',
        submit : 'Save'
    }
  },


  /* -- STEP 137 -- */
  {
    info : 'Publishing template standard.html',
    type : 'PUBLISH',
     tpl : 911
  }
];

FAE.index = -1;
FAE.quota = FAE.step.length;

// proceed to and execute the next step in the installation
FAE.next = function() {
  if (++FAE.index >= FAE.quota) {
    FAE.log('Install has completed successfully!', 'color:#8B5;font-weight:bold;');
    FAE.log('When you\'re finished, please <a href="javascript:window.location.reload();">click here</a> to reload the page.');

  } else {
    var step = FAE.step[FAE.index];
    FAE.log(step.info + '...');

    if (step.type == 'POST') {
      $.post('/admin/index.forum?' + step.url + FAE.tid, step.data, FAE.next).error(function() {
        FAE.log('An error was encountered on step "' + step.info + '"', 'color:#E53;font-weight:bold;');
        FAE.next();
      });

    } else if (step.type == 'GET') {
      $.get(step.url, function(d) {
        step.func(d);
        FAE.next();
      }).error(function() {
        FAE.log('An error was encountered on step "' + step.info + '"', 'color:#E53;font-weight:bold;');
        FAE.next();
      });

    } else if (step.type == 'PUBLISH') {
      $.get('/admin/index.forum?part=themes&sub=templates&mode=edit_main&main_mode=edit&extended_admin=1&t=' + step.tpl + '&l=main&pub=1&tid=' + FAE.tid, FAE.next).error(function() {
        FAE.log('An error was encountered on step "' + step.info + '"', 'color:#E53;font-weight:bold;');
        FAE.next();
      });;
    }

  }

  FAE.progress();
};
