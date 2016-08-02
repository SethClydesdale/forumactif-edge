// uninstallation instructions
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
    info : 'Optimizing CSS',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {
      allow_css_perso : 0,
             css_base : 1,
         optimize_css : 1,
      submit_base_css : 'Save'
    }
  },


  {
    info : 'Getting and deleting all JavaScript files to prevent errors on the forum',
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


  {
    info : 'Deleting template agreement.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 101,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template buy_credits.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 105,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template confirm_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 103,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template error_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 106,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template faq_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 107,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template faq_dhtml.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 108,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template greeting_popup.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 109,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template index_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 110,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template index_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 111,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template jumpbox.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 112,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template memberlist_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 113,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mentions_tooltip.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 134,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template message_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 114,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template overall_footer_begin.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 115,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template overall_footer_end.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 133,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template overall_header.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 116,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template search_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 118,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template search_results_posts.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 119,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template search_results_topics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 120,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template search_username.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 121,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template simple_footer.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 122,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template simple_header.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 123,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template topics_blog_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 130,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template topics_list_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 124,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template viewcomments_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 131,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template viewforum_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 125,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template viewonline_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 126,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template viewtopic_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 127,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template viewtopic_poll_ballot.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 128,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template viewtopic_poll_result.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 129,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_chatbox.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 901,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_keywords.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 913,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_login.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 916,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_most_active_starters.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 919,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_most_active_topics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 917,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_most_viewed_topics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 918,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_news.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 902,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_poll.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 903,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_recent_topics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 904,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_rss_feeds.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 915,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_search.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 905,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_social_bookmarking.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 914,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_statistics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 906,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_top_post_users_month.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 921,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_top_post_users_week.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 920,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_top_posters.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 912,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template mod_whoisonline.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 907,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template standard.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 911,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_cat_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 201,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_cat_top10.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 202,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_edit_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 203,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_formsearch_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 204,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_index_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 205,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_modcp_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 206,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_moderate_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 207,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_nuffimage_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 208,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_search_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 210,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_showpage_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 211,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_slideshow_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 212,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template album_upload_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 213,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template birthday_list_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 401,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template calendar_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 402,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template calendar_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 403,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template calendar_overview_profil.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 404,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template calendar_overview_topic.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 405,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template calendar_scheduler_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 406,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template groupcp_info_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 801,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template groupcp_pending_info.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 802,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template groupcp_user_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 803,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template posting_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 501,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template posting_poll_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 504,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template posting_preview.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 505,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template posting_topic_review.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 509,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template privmsg_topic_review.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 510,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template privmsgs_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 511,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template privmsgs_popup.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 512,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template privmsgs_preview.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 513,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template privmsgs_read_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 514,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template merge_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 601,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template merge_select_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 602,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template modcp_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 603,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template modcp_move.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 604,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template modcp_split.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 605,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template modcp_viewip.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 606,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template report_list_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 607,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template report_popup_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 608,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template report_view_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 609,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template profile_add_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 701,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template profile_avatar_gallery.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 702,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template profile_edit_signature.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 704,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template profile_send_email.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 705,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template profile_send_pass.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 706,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template profile_view_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 708,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template rpg_sheet.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 710,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template rpg_sheet_edit.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'main',
            t : 711,
      confirm : 'Yes'
    }
  },


  {
    info : 'Deleting template overall_header.html (mobile)',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
            l : 'mobile',
            t : 1010,
      confirm : 'Yes'
    }
  },


  {
     info : 'Deleting control panel navigation link',
     type : 'GET',
      url : '/admin/index.forum?part=themes&sub=index&mode=navbar&extended_admin=1&tid=' + FAE.tid,
     func : function(d) {
       for (var a = $('fieldset tr', d), i = 0, j = a.length, regex = new RegExp('FAE Control Panel|' + window.location.pathname, 'ig'); i < j; i++) {
         if (regex.test(a[i].innerHTML)) {
           $.get('/admin/' + $('a[href="#"]', a[i]).attr('onclick').replace(/.*?href='(.*?)'.*/, '$1'));
           break;
         }
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

// proceed to and execute the next step in the uninstall
FAE.next = function() {
  if (++FAE.index >= FAE.quota) {
    FAE.log('Uninstallation of Forumactif Edge has been completed successfully!', 'color:#8B5;font-weight:bold;');
    FAE.log('When you\'re finished, please <a href="javascript:window.location.reload();">click here</a> to reload the page.');

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
    }

  }

  FAE.progress();
};

// handler in case of any errors in the uninstallation process
FAE.error = function() {
  FAE.log('An error was encountered on step ' + FAE.index + ' (' + FAE.step[FAE.index].info + ') of the uninstallation process. Please <a href="http://fmdesign.forumotion.com/t700-forumactif-edge-support#13923" target="_blank">open a new issue</a> and provide this information for further assistance.', 'color:#E53;font-weight:bold;');
  window.setTimeout(FAE.next, FAE.delay);
};
