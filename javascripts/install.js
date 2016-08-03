// installation instructions
FAE.step = [

  {
    info : 'Changing forum version to phpbb3',
    type : 'POST',
     url : 'part=themes&sub=styles&mode=version&extended_admin=1',
    data : {
                 tpl : 'prosilver',
          keep_theme : 2,
                code : 1,
      change_version : 'Save'
    }
  },


  {
    info : 'Unoptimizing and deactivating default CSS',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {
      allow_css_perso : 0,
             css_base : 0,
         optimize_css : 0,
      submit_base_css : 'Save'
    }
  },


  {
    info : 'Getting fa_edge.min.css',
    type : 'GET',
     url : FAE.raw + 'css/fa_edge.min.css',
    func : function(d) {
      FAE.step[FAE.index + 1].data.edit_code = d;
    }
  },


  {
    info : 'Installing fa_edge.min.css',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {
         submit : 'Submit'
    }
  },


  {
    info : 'Getting and deleting all JavaScript files to prevent installation errors',
    type : 'GET',
     url : '/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid,
    func : function(d) {
      var form = $('#pageListHtml', d),
          file = $('input[type="checkbox"]', form),
          i = 0,
          j = file.length;

      if (form[0]) {
        for (; i < j; i++) {
          file[i].checked = true;
        }

        $.post(form[0].action, form.serialize() + '&attachments_submit=Delete', function(d) {
          var confirmation = $('form[method="post"]', d);
          $.post(confirmation[0].action, confirmation.serialize() + '&confirm=Yes');
        });
      }
    }
  },


  {
    info : 'Enabling JavaScript codes management',
    type : 'POST',
     url : 'part=modules&sub=html&mode=js_delete&extended_admin=1',
    data : {
      allow_js_module : 1,
          conf_submit : 'Save'
    }
  },


  {
    info : 'Getting all.js',
    type : 'GET',
     url : FAE.raw + 'javascripts/in-all-the-pages/all.js',
    func : function(d) {
      FAE.step[FAE.index + 1].data.content = d;
    }
  },


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


  {
    info : 'Getting homepage.js',
    type : 'GET',
     url : FAE.raw + 'javascripts/in-the-homepage/homepage.js',
    func : function(d) {
      FAE.step[FAE.index + 1].data.content = d;
    }
  },


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


  {
    info : 'Getting topics.js',
    type : 'GET',
     url : FAE.raw + 'javascripts/in-the-topics/topics.js',
    func : function(d) {
      FAE.step[FAE.index + 1].data.content = d;
    }
  },


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


  {
    info : 'Getting version-data.js',
    type : 'GET',
     url : FAE.raw + 'javascripts/version-data.js',
    func : function(d) {
      FAE.step[FAE.index + 1].data.content = d;
    }
  },


  {
    info : 'Installing version-data.js',
    type : 'POST',
     url : 'part=modules&sub=html&mode=js_edit&extended_admin=1',
    data : {
                 title : '[FA EDGE] VERSION-DATA.JS',
      'js_placement[]' : 'allpages',
                  mode : 'save',
                submit : 'Submit'
    }
  },


  {
    info : 'Getting template agreement.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/agreement.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template agreement.html',
    type : 'PUBLISH',
     tpl : 101
  },


  {
    info : 'Getting template buy_credits.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/buy_credits.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template buy_credits.html',
    type : 'PUBLISH',
     tpl : 105
  },


  {
    info : 'Getting template confirm_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/confirm_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template confirm_body.html',
    type : 'PUBLISH',
     tpl : 103
  },


  {
    info : 'Getting template error_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/error_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template error_body.html',
    type : 'PUBLISH',
     tpl : 106
  },


  {
    info : 'Getting template faq_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/faq_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template faq_body.html',
    type : 'PUBLISH',
     tpl : 107
  },


  {
    info : 'Getting template faq_dhtml.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/faq_dhtml.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template faq_dhtml.html',
    type : 'PUBLISH',
     tpl : 108
  },


  {
    info : 'Getting template greeting_popup.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/greeting_popup.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template greeting_popup.html',
    type : 'PUBLISH',
     tpl : 109
  },


  {
    info : 'Getting template index_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/index_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template index_body.html',
    type : 'PUBLISH',
     tpl : 110
  },


  {
    info : 'Getting template index_box.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/index_box.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template index_box.html',
    type : 'PUBLISH',
     tpl : 111
  },


  {
    info : 'Getting template jumpbox.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/jumpbox.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template jumpbox.html',
    type : 'PUBLISH',
     tpl : 112
  },


  {
    info : 'Getting template memberlist_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/memberlist_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template memberlist_body.html',
    type : 'PUBLISH',
     tpl : 113
  },


  {
    info : 'Getting template message_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/message_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template message_body.html',
    type : 'PUBLISH',
     tpl : 114
  },


  {
    info : 'Getting template overall_footer_begin.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/overall_footer_begin.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template overall_footer_begin.html',
    type : 'PUBLISH',
     tpl : 115
  },


  {
    info : 'Getting template overall_footer_end.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/overall_footer_end.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template overall_footer_end.html',
    type : 'PUBLISH',
     tpl : 133
  },


  {
    info : 'Getting template overall_header.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/overall_header.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template overall_header.html',
    type : 'PUBLISH',
     tpl : 116
  },


  {
    info : 'Getting template search_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/search_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template search_body.html',
    type : 'PUBLISH',
     tpl : 118
  },


  {
    info : 'Getting template search_results_posts.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/search_results_posts.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template search_results_posts.html',
    type : 'PUBLISH',
     tpl : 119
  },


  {
    info : 'Getting template search_results_topics.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/search_results_topics.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template search_results_topics.html',
    type : 'PUBLISH',
     tpl : 120
  },


  {
    info : 'Getting template topics_blog_box.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/topics_blog_box.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template topics_blog_box.html',
    type : 'PUBLISH',
     tpl : 130
  },


  {
    info : 'Getting template topics_list_box.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/topics_list_box.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template topics_list_box.html',
    type : 'PUBLISH',
     tpl : 124
  },


  {
    info : 'Getting template viewcomments_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/viewcomments_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template viewcomments_body.html',
    type : 'PUBLISH',
     tpl : 131
  },


  {
    info : 'Getting template viewforum_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/viewforum_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template viewforum_body.html',
    type : 'PUBLISH',
     tpl : 125
  },


  {
    info : 'Getting template viewonline_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/viewonline_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template viewonline_body.html',
    type : 'PUBLISH',
     tpl : 126
  },


  {
    info : 'Getting template viewtopic_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/viewtopic_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template viewtopic_body.html',
    type : 'PUBLISH',
     tpl : 127
  },

  {
    info : 'Getting template mod_chatbox.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_chatbox.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_chatbox.html',
    type : 'PUBLISH',
     tpl : 901
  },


  {
    info : 'Getting template mod_keywords.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_keywords.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_keywords.html',
    type : 'PUBLISH',
     tpl : 913
  },


  {
    info : 'Getting template mod_login.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_login.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_login.html',
    type : 'PUBLISH',
     tpl : 916
  },


  {
    info : 'Getting template mod_most_active_starters.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_most_active_starters.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_most_active_starters.html',
    type : 'PUBLISH',
     tpl : 919
  },


  {
    info : 'Getting template mod_most_active_topics.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_most_active_topics.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_most_active_topics.html',
    type : 'PUBLISH',
     tpl : 917
  },


  {
    info : 'Getting template mod_most_viewed_topics.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_most_viewed_topics.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_most_viewed_topics.html',
    type : 'PUBLISH',
     tpl : 918
  },


  {
    info : 'Getting template mod_news.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_news.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_news.html',
    type : 'PUBLISH',
     tpl : 902
  },


  {
    info : 'Getting template mod_poll.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_poll.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_poll.html',
    type : 'PUBLISH',
     tpl : 903
  },


  {
    info : 'Getting template mod_recent_topics.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_recent_topics.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_recent_topics.html',
    type : 'PUBLISH',
     tpl : 904
  },


  {
    info : 'Getting template mod_rss_feeds.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_rss_feeds.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_rss_feeds.html',
    type : 'PUBLISH',
     tpl : 915
  },


  {
    info : 'Getting template mod_search.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_search.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_search.html',
    type : 'PUBLISH',
     tpl : 905
  },


  {
    info : 'Getting template mod_social_bookmarking.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_social_bookmarking.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_social_bookmarking.html',
    type : 'PUBLISH',
     tpl : 914
  },


  {
    info : 'Getting template mod_statistics.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_statistics.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_statistics.html',
    type : 'PUBLISH',
     tpl : 906
  },


  {
    info : 'Getting template mod_top_post_users_month.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_top_post_users_month.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_top_post_users_month.html',
    type : 'PUBLISH',
     tpl : 921
  },


  {
    info : 'Getting template mod_top_post_users_week.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_top_post_users_week.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_top_post_users_week.html',
    type : 'PUBLISH',
     tpl : 920
  },


  {
    info : 'Getting template mod_top_posters.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_top_posters.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_top_posters.html',
    type : 'PUBLISH',
     tpl : 912
  },


  {
    info : 'Getting template mod_whoisonline.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_whoisonline.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template mod_whoisonline.html',
    type : 'PUBLISH',
     tpl : 907
  },


  {
    info : 'Getting template standard.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/standard.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


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


  {
    info : 'Publishing template standard.html',
    type : 'PUBLISH',
     tpl : 911
  },


  {
    info : 'Getting template album_cat_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_cat_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_cat_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 201,
             l : 'main',
      tpl_name : 'album_cat_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_cat_body.html',
    type : 'PUBLISH',
     tpl : 201
  },


  {
    info : 'Getting template album_cat_top10.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_cat_top10.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_cat_top10.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 202,
             l : 'main',
      tpl_name : 'album_cat_top10',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_cat_top10.html',
    type : 'PUBLISH',
     tpl : 202
  },


  {
    info : 'Getting template album_edit_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_edit_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_edit_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 203,
             l : 'main',
      tpl_name : 'album_edit_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_edit_body.html',
    type : 'PUBLISH',
     tpl : 203
  },


  {
    info : 'Getting template album_formsearch_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_formsearch_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_formsearch_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 204,
             l : 'main',
      tpl_name : 'album_formsearch_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_formsearch_body.html',
    type : 'PUBLISH',
     tpl : 204
  },


  {
    info : 'Getting template album_index_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_index_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_index_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 205,
             l : 'main',
      tpl_name : 'album_index_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_index_body.html',
    type : 'PUBLISH',
     tpl : 205
  },


  {
    info : 'Getting template album_modcp_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_modcp_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_modcp_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 206,
             l : 'main',
      tpl_name : 'album_modcp_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_modcp_body.html',
    type : 'PUBLISH',
     tpl : 206
  },


  {
    info : 'Getting template album_moderate_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_moderate_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_moderate_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 207,
             l : 'main',
      tpl_name : 'album_moderate_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_moderate_body.html',
    type : 'PUBLISH',
     tpl : 207
  },


  {
    info : 'Getting template album_nuffimage_box.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_nuffimage_box.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_nuffimage_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 208,
             l : 'main',
      tpl_name : 'album_nuffimage_box',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_nuffimage_box.html',
    type : 'PUBLISH',
     tpl : 208
  },


  {
    info : 'Getting template album_search_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_search_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_search_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 210,
             l : 'main',
      tpl_name : 'album_search_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_search_body.html',
    type : 'PUBLISH',
     tpl : 210
  },


  {
    info : 'Getting template album_showpage_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_showpage_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_showpage_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 211,
             l : 'main',
      tpl_name : 'album_showpage_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_showpage_body.html',
    type : 'PUBLISH',
     tpl : 211
  },


  {
    info : 'Getting template album_slideshow_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_slideshow_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_slideshow_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 212,
             l : 'main',
      tpl_name : 'album_slideshow_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_slideshow_body.html',
    type : 'PUBLISH',
     tpl : 212
  },


  {
    info : 'Getting template album_upload_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/gallery/album_upload_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template album_upload_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 213,
             l : 'main',
      tpl_name : 'album_upload_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template album_upload_body.html',
    type : 'PUBLISH',
     tpl : 213
  },


  {
    info : 'Getting template birthday_list_box.html',
    type : 'GET',
     url : FAE.raw + 'templates/calendar/birthday_list_box.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template birthday_list_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 401,
             l : 'main',
      tpl_name : 'birthday_list_box',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template birthday_list_box.html',
    type : 'PUBLISH',
     tpl : 401
  },


  {
    info : 'Getting template calendar_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/calendar/calendar_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template calendar_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 402,
             l : 'main',
      tpl_name : 'calendar_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template calendar_body.html',
    type : 'PUBLISH',
     tpl : 402
  },


  {
    info : 'Getting template calendar_box.html',
    type : 'GET',
     url : FAE.raw + 'templates/calendar/calendar_box.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template calendar_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 403,
             l : 'main',
      tpl_name : 'calendar_box',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template calendar_box.html',
    type : 'PUBLISH',
     tpl : 403
  },


  {
    info : 'Getting template calendar_overview_profil.html',
    type : 'GET',
     url : FAE.raw + 'templates/calendar/calendar_overview_profil.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template calendar_overview_profil.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 404,
             l : 'main',
      tpl_name : 'calendar_overview_profil',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template calendar_overview_profil.html',
    type : 'PUBLISH',
     tpl : 404
  },


  {
    info : 'Getting template calendar_overview_topic.html',
    type : 'GET',
     url : FAE.raw + 'templates/calendar/calendar_overview_topic.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template calendar_overview_topic.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 405,
             l : 'main',
      tpl_name : 'calendar_overview_topic',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template calendar_overview_topic.html',
    type : 'PUBLISH',
     tpl : 405
  },


  {
    info : 'Getting template calendar_scheduler_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/calendar/calendar_scheduler_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template calendar_scheduler_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 406,
             l : 'main',
      tpl_name : 'calendar_scheduler_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template calendar_scheduler_body.html',
    type : 'PUBLISH',
     tpl : 406
  },


  {
    info : 'Getting template groupcp_info_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/usergroups/groupcp_info_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template groupcp_info_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 801,
             l : 'main',
      tpl_name : 'groupcp_info_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template groupcp_info_body.html',
    type : 'PUBLISH',
     tpl : 801
  },


  {
    info : 'Getting template groupcp_pending_info.html',
    type : 'GET',
     url : FAE.raw + 'templates/usergroups/groupcp_pending_info.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template groupcp_pending_info.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 802,
             l : 'main',
      tpl_name : 'groupcp_pending_info',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template groupcp_pending_info.html',
    type : 'PUBLISH',
     tpl : 802
  },


  {
    info : 'Getting template groupcp_user_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/usergroups/groupcp_user_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template groupcp_user_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 803,
             l : 'main',
      tpl_name : 'groupcp_user_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template groupcp_user_body.html',
    type : 'PUBLISH',
     tpl : 803
  },


  {
    info : 'Getting template posting_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/posting_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template posting_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 501,
             l : 'main',
      tpl_name : 'posting_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template posting_body.html',
    type : 'PUBLISH',
     tpl : 501
  },


  {
    info : 'Getting template posting_poll_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/posting_poll_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template posting_poll_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 504,
             l : 'main',
      tpl_name : 'posting_poll_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template posting_poll_body.html',
    type : 'PUBLISH',
     tpl : 504
  },


  {
    info : 'Getting template posting_preview.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/posting_preview.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template posting_preview.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 505,
             l : 'main',
      tpl_name : 'posting_preview',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template posting_preview.html',
    type : 'PUBLISH',
     tpl : 505
  },


  {
    info : 'Getting template posting_topic_review.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/posting_topic_review.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template posting_topic_review.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 509,
             l : 'main',
      tpl_name : 'posting_topic_review',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template posting_topic_review.html',
    type : 'PUBLISH',
     tpl : 509
  },


  {
    info : 'Getting template privmsg_topic_review.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/privmsg_topic_review.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template privmsg_topic_review.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 510,
             l : 'main',
      tpl_name : 'privmsg_topic_review',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template privmsg_topic_review.html',
    type : 'PUBLISH',
     tpl : 510
  },


  {
    info : 'Getting template privmsgs_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/privmsgs_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template privmsgs_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 511,
             l : 'main',
      tpl_name : 'privmsgs_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template privmsgs_body.html',
    type : 'PUBLISH',
     tpl : 511
  },


  {
    info : 'Getting template privmsgs_popup.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/privmsgs_popup.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template privmsgs_popup.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 512,
             l : 'main',
      tpl_name : 'privmsgs_popup',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template privmsgs_popup.html',
    type : 'PUBLISH',
     tpl : 512
  },


  {
    info : 'Getting template privmsgs_preview.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/privmsgs_preview.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template privmsgs_preview.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 513,
             l : 'main',
      tpl_name : 'privmsgs_preview',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template privmsgs_preview.html',
    type : 'PUBLISH',
     tpl : 513
  },


  {
    info : 'Getting template privmsgs_read_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/privmsgs_read_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template privmsgs_read_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 514,
             l : 'main',
      tpl_name : 'privmsgs_read_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template privmsgs_read_body.html',
    type : 'PUBLISH',
     tpl : 514
  },


  {
    info : 'Getting template merge_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/moderation/merge_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template merge_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 601,
             l : 'main',
      tpl_name : 'merge_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template merge_body.html',
    type : 'PUBLISH',
     tpl : 601
  },


  {
    info : 'Getting template merge_select_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/moderation/merge_select_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template merge_select_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 602,
             l : 'main',
      tpl_name : 'merge_select_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template merge_select_body.html',
    type : 'PUBLISH',
     tpl : 602
  },


  {
    info : 'Getting template modcp_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/moderation/modcp_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template modcp_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 603,
             l : 'main',
      tpl_name : 'modcp_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template modcp_body.html',
    type : 'PUBLISH',
     tpl : 603
  },


  {
    info : 'Getting template modcp_move.html',
    type : 'GET',
     url : FAE.raw + 'templates/moderation/modcp_move.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template modcp_move.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 604,
             l : 'main',
      tpl_name : 'modcp_move',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template modcp_move.html',
    type : 'PUBLISH',
     tpl : 604
  },


  {
    info : 'Getting template modcp_split.html',
    type : 'GET',
     url : FAE.raw + 'templates/moderation/modcp_split.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template modcp_split.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 605,
             l : 'main',
      tpl_name : 'modcp_split',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template modcp_split.html',
    type : 'PUBLISH',
     tpl : 605
  },


  {
    info : 'Getting template modcp_viewip.html',
    type : 'GET',
     url : FAE.raw + 'templates/moderation/modcp_viewip.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template modcp_viewip.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 606,
             l : 'main',
      tpl_name : 'modcp_viewip',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template modcp_viewip.html',
    type : 'PUBLISH',
     tpl : 606
  },


  {
    info : 'Getting template report_list_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/moderation/report_list_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template report_list_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 607,
             l : 'main',
      tpl_name : 'report_list_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template report_list_body.html',
    type : 'PUBLISH',
     tpl : 607
  },


  {
    info : 'Getting template report_popup_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/moderation/report_popup_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template report_popup_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 608,
             l : 'main',
      tpl_name : 'report_popup_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template report_popup_body.html',
    type : 'PUBLISH',
     tpl : 608
  },


  {
    info : 'Getting template report_view_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/moderation/report_view_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template report_view_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 609,
             l : 'main',
      tpl_name : 'report_view_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template report_view_body.html',
    type : 'PUBLISH',
     tpl : 609
  },


  {
    info : 'Getting template profile_add_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/profile/profile_add_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template profile_add_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 701,
             l : 'main',
      tpl_name : 'profile_add_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template profile_add_body.html',
    type : 'PUBLISH',
     tpl : 701
  },


  {
    info : 'Getting template profile_avatar_gallery.html',
    type : 'GET',
     url : FAE.raw + 'templates/profile/profile_avatar_gallery.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template profile_avatar_gallery.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 702,
             l : 'main',
      tpl_name : 'profile_avatar_gallery',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template profile_avatar_gallery.html',
    type : 'PUBLISH',
     tpl : 702
  },


  {
    info : 'Getting template profile_edit_signature.html',
    type : 'GET',
     url : FAE.raw + 'templates/profile/profile_edit_signature.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template profile_edit_signature.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 704,
             l : 'main',
      tpl_name : 'profile_edit_signature',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template profile_edit_signature.html',
    type : 'PUBLISH',
     tpl : 704
  },


  {
    info : 'Getting template profile_send_email.html',
    type : 'GET',
     url : FAE.raw + 'templates/profile/profile_send_email.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template profile_send_email.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 705,
             l : 'main',
      tpl_name : 'profile_send_email',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template profile_send_email.html',
    type : 'PUBLISH',
     tpl : 705
  },


  {
    info : 'Getting template profile_send_pass.html',
    type : 'GET',
     url : FAE.raw + 'templates/profile/profile_send_pass.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template profile_send_pass.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 706,
             l : 'main',
      tpl_name : 'profile_send_pass',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template profile_send_pass.html',
    type : 'PUBLISH',
     tpl : 706
  },


  {
    info : 'Getting template profile_view_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/profile/profile_view_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template profile_view_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 708,
             l : 'main',
      tpl_name : 'profile_view_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template profile_view_body.html',
    type : 'PUBLISH',
     tpl : 708
  },


  {
    info : 'Getting template rpg_sheet.html',
    type : 'GET',
     url : FAE.raw + 'templates/profile/rpg_sheet.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template rpg_sheet.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 710,
             l : 'main',
      tpl_name : 'rpg_sheet',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template rpg_sheet.html',
    type : 'PUBLISH',
     tpl : 710
  },


  {
    info : 'Getting template rpg_sheet_edit.html',
    type : 'GET',
     url : FAE.raw + 'templates/profile/rpg_sheet_edit.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template rpg_sheet_edit.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 711,
             l : 'main',
      tpl_name : 'rpg_sheet_edit',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template rpg_sheet_edit.html',
    type : 'PUBLISH',
     tpl : 711
  },


  {
    info : 'Getting template overall_header.html (mobile)',
    type : 'GET',
     url : FAE.raw + 'templates/mobile-version/overall_header.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template overall_header.html (mobile)',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
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
        tpl : 1010,
     mobile : 1,
  },


  {
     info : 'Enabling custom templates',
     type : 'POST',
      url : 'mode=main&part=themes&sub=templates',
     data : {
       switchTemplates : 2,
                submit : 'Save'
     }
  },


  {
    info : 'Installing images for "General / explore"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=general&mode=general&extended_admin=1',
    data : {
      i_logo : 'http://illiweb.com/fa/logo/logo_en.png',
      i_background : FAE.eGIF,
      i_back_title : FAE.eGIF,
      i_back_catg : FAE.eGIF,
      i_back_catd : FAE.eGIF,
      i_vote_lcap : 'http://i86.servimg.com/u/f86/18/21/41/30/poll_c10.gif?poll=cap_l',
      i_voting_bar : 'http://i86.servimg.com/u/f86/18/21/41/30/poll_m10.gif?poll=m',
      i_vote_rcap : 'http://i86.servimg.com/u/f86/18/21/41/30/poll_c10.gif?poll=cap_r',
      i_icon_mini_index : FAE.eGIF,
      i_icon_mini_calendar : FAE.eGIF,
      i_icon_mini_gallery : FAE.eGIF,
      i_icon_mini_portal : FAE.eGIF,
      i_icon_mini_faq : FAE.eGIF,
      i_icon_mini_search : FAE.eGIF,
      i_icon_mini_members : FAE.eGIF,
      i_icon_mini_groups : FAE.eGIF,
      i_icon_mini_profile : FAE.eGIF,
      i_icon_mini_message : FAE.eGIF,
      i_icon_mini_new_message : FAE.eGIF,
      i_icon_mini_register : FAE.eGIF,
      i_icon_mini_login : FAE.eGIF,
      i_icon_mini_logout : FAE.eGIF,
      i_whosonline : FAE.eGIF,
      i_corners_left : FAE.eGIF,
      i_corners_right : FAE.eGIF,
      i_corners2_left : FAE.eGIF,
      i_corners2_right : FAE.eGIF,
      i_header_bg : FAE.eGIF,
      i_list_bg : FAE.eGIF,
      page : 'general',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Icons for the forum"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=forum&mode=forum&extended_admin=1',
    data : {
      i_category : 'http://illiweb.com/fa/empty.gif?type=category&state=old',
      i_category_new : 'http://illiweb.com/fa/empty.gif?type=category&state=new',
      i_category_locked : 'http://illiweb.com/fa/empty.gif?type=category&locked=true',
      i_folder_big : 'http://illiweb.com/fa/empty.gif?type=forum&state=old',
      i_folder_new_big : 'http://illiweb.com/fa/empty.gif?type=forum&state=new',
      i_folder_locked_big : 'http://illiweb.com/fa/empty.gif?type=forum&locked=true',
      page : 'forum',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Icons for topics"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=topics&mode=topics&extended_admin=1',
    data : {
      i_folder : 'http://illiweb.com/fa/empty.gif?type=topic&state=old',
      i_folder_new : 'http://illiweb.com/fa/empty.gif?type=topic&state=new',
      i_folder_new_hot : 'http://illiweb.com/fa/empty.gif?type=topic&state=new&hot=true',
      i_folder_lock : 'http://illiweb.com/fa/empty.gif?type=topic&state=old&locked=true',
      i_folder_lock_new : 'http://illiweb.com/fa/empty.gif?type=topic&state=new&locked=true',
      i_folder_hot : 'http://illiweb.com/fa/empty.gif?type=topic&state=old&hot=true',
      i_folder_announce : 'http://illiweb.com/fa/empty.gif?type=announcement&state=old',
      i_folder_announce_new : 'http://illiweb.com/fa/empty.gif?type=announcement&state=new',
      i_folder_global_announce : 'http://illiweb.com/fa/empty.gif?type=global&state=old',
      i_folder_global_announce_new : 'http://illiweb.com/fa/empty.gif?type=global&state=new',
      i_folder_sticky : 'http://illiweb.com/fa/empty.gif?type=pinned&state=old',
      i_folder_sticky_new : 'http://illiweb.com/fa/empty.gif?type=pinned&state=new',
      i_topic_delete : 'http://i86.servimg.com/u/f86/18/21/41/30/delete11.png?color=primary&size=s',
      i_topic_lock : 'http://i86.servimg.com/u/f86/18/21/41/30/lock-f10.png?color=primary&size=s',
      i_topic_merge : 'http://i86.servimg.com/u/f86/18/21/41/30/merge-10.png?color=primary&size=s',
      i_topic_move : 'http://i86.servimg.com/u/f86/18/21/41/30/move-f10.png?color=primary&size=s',
      i_topic_split : 'http://i86.servimg.com/u/f86/18/21/41/30/split-10.png?color=primary&size=s',
      i_topic_trashcan : 'http://i86.servimg.com/u/f86/18/21/41/30/basket10.png?color=primary&size=s',
      i_topic_unlock : 'http://i86.servimg.com/u/f86/18/21/41/30/unlock10.png?color=primary&size=s',
      page : 'topics',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Mini-icons"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=icons&mode=icons&extended_admin=1',
    data : {
      i_icon_minicat : 'http://i86.servimg.com/u/f86/18/21/41/30/post-f10.png',
      i_icon_minicat_new : 'http://i86.servimg.com/u/f86/18/21/41/30/post-n10.png',
      i_icon_minicat_locked : 'http://i86.servimg.com/u/f86/18/21/41/30/lock-f11.png',
      i_icon_minitime : 'http://i86.servimg.com/u/f86/18/21/41/30/clock-10.png',
      i_icon_minipost : 'http://i86.servimg.com/u/f86/18/21/41/30/post-f10.png',
      i_icon_minipost_new : 'http://i86.servimg.com/u/f86/18/21/41/30/post-n10.png',
      i_icon_minipost_lock : 'http://i86.servimg.com/u/f86/18/21/41/30/lock-f11.png',
      i_icon_minipost_participate : 'http://i86.servimg.com/u/f86/18/21/41/30/partic10.png',
      i_icon_latest_reply : 'http://i86.servimg.com/u/f86/18/21/41/30/lastpo10.png',
      i_icon_newest_reply : 'http://i86.servimg.com/u/f86/18/21/41/30/lastpo11.png',
      i_icon_calendar : 'http://i86.servimg.com/u/f86/18/21/41/30/calend10.png',
      i_icon_tiny_topic : 'http://i86.servimg.com/u/f86/18/21/41/30/calend11.png',
      i_icon_tiny_profile : 'http://i86.servimg.com/u/f86/18/21/41/30/birthd10.png',
      i_icon_gender_male : 'http://i86.servimg.com/u/f86/18/21/41/30/male-f10.png',
      i_icon_gender_female : 'http://i86.servimg.com/u/f86/18/21/41/30/female10.png',
      i_up_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/up-f10.png',
      i_down_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/down-f10.png',
      i_left_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/prev-f10.png',
      i_right_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/next-f10.png',
      i_tabs_less : 'http://i86.servimg.com/u/f86/18/21/41/30/minus-11.png',
      i_tabs_more : 'http://i86.servimg.com/u/f86/18/21/41/30/plus-f11.png',
      i_icon_mini_online : 'http://i86.servimg.com/u/f86/18/21/41/30/online10.png',
      i_icon_mini_offline : 'http://i86.servimg.com/u/f86/18/21/41/30/offlin10.png',
      page : 'icons',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Buttons"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=buttons&mode=buttons&extended_admin=1',
    data : {
      i_post : 'http://i86.servimg.com/u/f86/18/21/41/30/new-to11.png?color=primary&size=m',
      i_reply : 'http://i86.servimg.com/u/f86/18/21/41/30/post-r10.png?color=primary&size=m',
      i_reply_locked : 'http://i86.servimg.com/u/f86/18/21/41/30/locked11.png?color=secondary&size=m',
      i_icon_quote : 'http://i86.servimg.com/u/f86/18/21/41/30/quote-12.png?color=primary&size=s',
      i_icon_multiquote_off : 'http://i86.servimg.com/u/f86/18/21/41/30/multi-10.png?color=primary&size=s',
      i_icon_multiquote_on : 'http://i86.servimg.com/u/f86/18/21/41/30/multi-10.png?color=secondary&size=s',
      i_icon_thanks_off : 'http://i86.servimg.com/u/f86/18/21/41/30/thanks11.png?color=primary&size=s',
      i_icon_thanks_on : 'http://i86.servimg.com/u/f86/18/21/41/30/thanks11.png?color=secondary&size=s',
      i_icon_edit : 'http://i86.servimg.com/u/f86/18/21/41/30/edit-e11.png?color=primary&size=s',
      i_icon_delete : 'http://i86.servimg.com/u/f86/18/21/41/30/delete10.png?color=primary&size=s',
      i_icon_ip : 'http://i86.servimg.com/u/f86/18/21/41/30/ip-f10.png?color=primary&size=s',
      i_icon_report : 'http://i86.servimg.com/u/f86/18/21/41/30/report10.png?color=primary&size=s',
      i_icon_report_new : 'http://i86.servimg.com/u/f86/18/21/41/30/report10.png?color=secondary&size=s',
      i_icon_report_locked : 'http://i86.servimg.com/u/f86/18/21/41/30/report12.png?color=secondary&size=s',
      i_icon_lock_report : 'http://i86.servimg.com/u/f86/18/21/41/30/report12.png?color=primary&size=s',
      i_icon_unlock_report : 'http://i86.servimg.com/u/f86/18/21/41/30/report13.png?color=primary&size=s',
      i_icon_search : FAE.eGIF,
      i_icon_profile : 'http://i86.servimg.com/u/f86/18/21/41/30/profil12.png?color=primary&size=s',
      i_icon_www : 'http://i86.servimg.com/u/f86/18/21/41/30/websit10.png?color=primary&size=s',
      i_icon_email : 'http://i86.servimg.com/u/f86/18/21/41/30/email-10.png?color=primary&size=s',
      i_icon_pm : 'http://i86.servimg.com/u/f86/18/21/41/30/pm-f11.png?color=primary&size=s',
      i_icon_fb : 'http://i86.servimg.com/u/f86/18/21/41/30/facebo11.png?color=primary&size=s',
      i_icon_twitter : 'http://i86.servimg.com/u/f86/18/21/41/30/twitte10.png?color=primary&size=s',
      i_icon_pinterest : 'http://i86.servimg.com/u/f86/18/21/41/30/pinter10.png?color=primary&size=s',
      i_icon_aim : 'http://i86.servimg.com/u/f86/18/21/41/30/aim-f10.png?color=primary&size=s',
      i_icon_icq_add : 'http://i86.servimg.com/u/f86/18/21/41/30/icq-f10.png?color=primary&size=s',
      i_icon_msnm : 'http://i86.servimg.com/u/f86/18/21/41/30/msn-f10.png?color=primary&size=s',
      i_icon_yim : 'http://i86.servimg.com/u/f86/18/21/41/30/yahoo-10.png?color=primary&size=s',
      i_icon_skype : 'http://i86.servimg.com/u/f86/18/21/41/30/skype-10.png?color=primary&size=s',
      i_icon_online : FAE.eGIF,
      i_msg_newpost : 'http://i86.servimg.com/u/f86/18/21/41/30/new-pm10.png?color=primary&size=m',
      i_msg_inbox : FAE.eGIF,
      i_msg_sentbox : FAE.eGIF,
      i_msg_outbox : FAE.eGIF,
      i_msg_savebox : FAE.eGIF,
      i_icon_ajax_edit : 'http://i86.servimg.com/u/f86/18/21/41/30/edit-f10.png',
      i_icon_ajax_valid : 'http://i86.servimg.com/u/f86/18/21/41/30/valid-10.png',
      i_icon_attachment_see : 'http://i86.servimg.com/u/f86/18/21/41/30/show-a10.png',
      i_icon_attachment_download : 'http://i86.servimg.com/u/f86/18/21/41/30/downlo10.png',
      page : 'buttons',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Gallery"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=&mode=gallery&extended_admin=1',
    data : {
      upload_pic : 'http://i86.servimg.com/u/f86/18/21/41/30/upload10.png?color=primary&size=m',
      link_public_galleries : 'http://i86.servimg.com/u/f86/18/21/41/30/public10.png',
      link_personal_galleries : 'http://i86.servimg.com/u/f86/18/21/41/30/person10.png',
      link_personal_gallery : 'http://i86.servimg.com/u/f86/18/21/41/30/user-g10.png',
      backup_folder : 'http://i86.servimg.com/u/f86/18/21/41/30/backup10.png',
      icon_moderate : 'http://i86.servimg.com/u/f86/18/21/41/30/modera10.png',
      icon_stats : 'http://i86.servimg.com/u/f86/18/21/41/30/statis10.png',
      icon_left_arrow3 : 'http://i86.servimg.com/u/f86/18/21/41/30/prev-f10.png',
      icon_right_arrow3 : 'http://i86.servimg.com/u/f86/18/21/41/30/next-f10.png',
      rating_star : 'http://i86.servimg.com/u/f86/18/21/41/30/star-f10.png',
      rating_star_empty : 'http://i86.servimg.com/u/f86/18/21/41/30/star-e10.png',
      icon_first_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/first-10.png',
      icon_last_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/last-f10.png',
      submit : 'Save'
    }
  },


  {
    info : 'Updating Structure and Hierarchy',
    type : 'POST',
     url : 'part=themes&sub=index&mode=1&extended_admin=1',
    data : {
      splited_categories : 4,
      last_topic_title : 1,
      last_topic_avatar : 1,
      last_topic_title_length : 16,
      sub_level_links : 2,
      moderators_links : 0,
      display_viewonline : 1,
      display_viewonline_bots : 1,
      menu_id : 0,
      mod_id : 1,
      sub_id : 1,
      submit : 'Save'
    }
  },


  {
    info : 'Updating Headers and Navigation',
    type : 'POST',
     url : 'part=themes&sub=index&mode=navbar&extended_admin=1',
    data : {
      logo_position : 0,
      show_sitename : 1,
      show_icon_only : 0,
      menu_position : 0,
      mode : 'header',
      submit : 'Save'
    }
  },


  {
     info : 'Creating navigation link for control panel',
     type : 'GET',
      url : '/admin/index.forum?part=themes&sub=index&mode=navbar&extended_admin=1&tid=' + FAE.tid,
     func : function(d) {
       for (var a = $('fieldset tr', d), i = 0, j = a.length, regex = new RegExp('FAE Control Panel|' + window.location.pathname, 'ig'), hit = false; i < j; i++) {
         if (regex.test(a[i].innerHTML)) {
           hit = true;
           break;
         }
       }

       if (!hit) {
         $.post('/admin/index.forum?part=themes&sub=index&mode=navbar&tid=' + FAE.tid, {
           navbar_menu : 'FAE Control Panel',
           navbar_image : '',
           navbar_text : 'FAE Control Panel',
           navbar_url : window.location.pathname,
           navbar_admin : true,
           action : 'insert',
           submit : 'Save'
         });
       }

     }
  },


  {
    info : 'Resynchronizing forum',
    type : 'POST',
     url : 'mode=general&part=general&sub=general',
    data : {
      resync : 'on',
      submit : 'Save'
    }
  }
];

FAE.index = -1;
FAE.quota = FAE.step.length;

// proceed to and execute the next step in the installation
FAE.next = function() {
  if (++FAE.index >= FAE.quota) {
    FAE.log('Installation of Forumactif Edge has been completed successfully!', 'color:#8B5;font-weight:bold;');
    FAE.log('When you\'re finished, please <a href="javascript:window.location.reload();">click here</a> to reload the page and experience your forum in a whole new way!');

  } else {
    var step = FAE.step[FAE.index];
    FAE.log(step.info + '...');

    if (step.type == 'POST') {
      $.post('/admin/index.forum?' + step.url + FAE.tid, step.data, function() {
        window.setTimeout(FAE.next, FAE.delay);
      }).error(FAE.error);

    } else if (step.type == 'GET') {
      $.get(step.url, function(d) {
        step.func(d);
        window.setTimeout(FAE.next, FAE.delay);
      }).error(FAE.error);

    } else if (step.type == 'PUBLISH') {
      $.get('/admin/index.forum?part=themes&sub=templates&mode=edit_main&main_mode=edit&extended_admin=1&t=' + step.tpl + '&l=' + ( step.mobile ? 'mobile' : 'main' ) + '&pub=1&tid=' + FAE.tid, function() {
        window.setTimeout(FAE.next, FAE.delay);
      }).error(FAE.error);
    }

  }

  FAE.progress();
};

// handler in case of any errors in the installation process
FAE.error = function() {
  FAE.log('An error was encountered on step ' + FAE.index + ' (' + FAE.step[FAE.index].info + ') of the installation process. Please <a href="http://fmdesign.forumotion.com/t700-forumactif-edge-support#13923" target="_blank">open a new issue</a> and provide this information for further assistance.', 'color:#E53;font-weight:bold;');
  window.setTimeout(FAE.next, 1000);
};
