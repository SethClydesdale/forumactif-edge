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
      $.post('/admin/index.forum?' + step.url + FAE.tid, step.data, FAE.next);

    } else if (step.type == 'GET') {
      $.get(step.url, function(d) {
        step.func(d);
        FAE.next();
      });

    } else if (step.type == 'PUBLISH') {
      $.get('/admin/index.forum?part=themes&sub=templates&mode=edit_main&main_mode=edit&extended_admin=1&t=' + step.tpl + '&l=main&pub=1&tid=' + FAE.tid, FAE.next);
    }

  }

  FAE.progress();
};
