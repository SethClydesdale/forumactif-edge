/*

  # Changes in v1.0.0

  - Added theme manager to control panel
  - Added Arabic translation (Thanks to omarpop23)
  - Added Dutch translation (Thanks to Samantha)
  - Added German translation (Thanks to Bigtuber & schiggysboard)
  - Added Greek translation (Thanks to Luffy)
  - Added Italian translation (Thanks to Teo!)
  - Added Romanian translation (Thanks to SSYT)
  - Added new translation aliases for the logged out reply panel and FAE Control Panel
  - Added self-clearing to logo-desc for banners that use floats
  - Updated footer feedback link with more user-friendly version ( being shown a Github login wasn't good for non-github users )
  - Fixed Mark topics / Watch forum links that were hidden in sub-forums
  - Fixed unneccessary line wrapping in breadcrumbs
  - Fixed display of friends / foes list in friends and foes management
  - Fixed overflow of editor textarea while composing PMs
  - Fixed smiley box overflowing the message editor's container
  - Fixed placement of new post mini-icon in latest topics on mobile
  - Fixed portal overflowing page body on mobile
  - Fixed images in widgets social bookmarking and rss feed
  - Fixed double scroll bars appearing on the servimg image uploader in mobile
  - Fixed CSS link in minified stylesheet that was linking to the old file location
  - Fixed group color being applied to elements in messages with the class ".title"
  - Fixed default text editor height and width so it's useable for noscript users
  - Fixed and removed online indicator displaying in searches and pms
  - Fixed "go to page" button which was missing next to the pagination in topics
  - Fixed avatar erroneuously showing in topic review on mobile
  - Fixed missing "+" icon in dice rolls
  - Fixed breadcrumbs background missing in some portions of the forum
  - Fixed negative margin on titles in the gallery statistics
  - Fixed theme selector overlapping content when the search bar wasn't visible

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.0.0';

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
                            .replace('/master/fa_edge.css', '/master/css/fa_edge.css')
                            .replace('div[class]:first-child', 'div[class]:first-child:not(.breadcrumbs)')
                            .replace(/#cp-main\.mcp-main h1\{margin:0 0 10px\}|#cp-main\.mcp-main h1 \{ margin:0 0 10px 0; \}/, '') + '\n\n/* added in FAE v1.0.0 */\n#logo-desc:after,.postprofile dl:after{content:"";display:table;clear:both}\n.pagination a[href$="mark=topics"],.pagination a[href$="watch=forum"]{font-size:12px}\n.pagination a[href$="mark=topics"]:after,.pagination a[href$="watch=forum"]:after{content:" • ";color:#333}\n@media (min-width:0px) and (max-width:768px) {.sceditor-dropdown #obj_servimg,body .sceditor-dropdown>p{height:100%!important}.forum-lastpost a[href$="view=newest"]{position:absolute;top:50%;right:3px;margin-top:-6px}table.portal>tbody>tr>td{display:block;width:100%}}\n.breadcrumbs a{white-space:nowrap}\n.friends-foes-list{display:inline-block;text-align:right;width:200px;height:2em}\nbody .sceditor-container iframe,body .sceditor-container textarea{margin:0}\n#smiley-box iframe{width:100%!important}\ntable.portal{display:block;max-width:100%;overflow:auto}\n#text_editor_textarea{height:250px;width:90%}\nform[action^="/privmsg"] .postprofile dl:before,.search .postprofile dl:before,form[action^="/privmsg"]~.content-block .postprofile{display:none}\nform[action^="/privmsg"] .postprofile dl,.search .postprofile dl{margin-top:0}\na[href="javascript:Pagination();"]{font-size:12px}\n.sprite-tabs_more{background:url(http://i86.servimg.com/u/f86/18/21/41/30/plus-f11.png) no-repeat;height:11px;width:11px}\n#cp-main.mcp-main h1{margin:0 0 10px}',
                   submit : 'Submit'
        };
      }

    }
  },


  {
    info : 'Adding new styles introduced in v1.0.0',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {}
  },


  {
    info : 'Getting template overall_footer_end.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=133&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace(/https:\/\/github\.com\/SethClydesdale\/forumactif-edge\/issues\/new/g, 'http://fmdesign.forumotion.com/t701-forumactif-edge-suggestions-and-feedback#13925');
      }
    }
  },


  {
    info : 'Updating template overall_footer_end.html',
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
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=116&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('<!-- END switch_search_box -->', '<!-- END switch_search_box -->\n<div class="clear"></div>');
      }
    }
  },


  {
    info : 'Updating template overall_header.html',
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
    info : 'Getting template album_modcp_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=206&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('class="breadcrumbes"', 'class="breadcrumbs"');
      }
    }
  },


  {
    info : 'Updating template album_modcp_body.html',
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
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=207&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('class="breadcrumbes"', 'class="breadcrumbs"');
      }
    }
  },


  {
    info : 'Updating template album_moderate_body.html',
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
    info : 'Getting template album_upload_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=213&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('<!-- BEGIN switch_user_logged_in --><p class="right rightside">{LAST_VISIT_DATE}</p><!-- END switch_user_logged_in -->', '')
                                                .replace('<p>{CURRENT_TIME}</p>', '')
                                                .replace('class="topic-actions"', 'class="breadcrumbs"');
      }
    }
  },


  {
    info : 'Updating template album_upload_body.html',
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
    info : 'Getting template album_search_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=210&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('<!-- BEGIN switch_user_logged_in --><p class="right rightside">{LAST_VISIT_DATE}</p><!-- END switch_user_logged_in -->', '')
                                                .replace('<p>{CURRENT_TIME}</p>', '')
                                                .replace('class="topic-actions"', 'class="breadcrumbs"');
      }
    }
  },


  {
    info : 'Updating template album_search_body.html',
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
    info : 'Getting template mod_rss_feeds.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_portal&t=915&l=portal&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = '<style type="text/css">.mod_rss_feeds a img { background:url(http://illiweb.com/fa/rss_mod/sprite_rss_feeds.png) no-repeat scroll; height:17px; padding-bottom:2px; vertical-align:middle; width:91px }\n.mod_rss_feeds img.yahoo { background-position:0 0 }\n.mod_rss_feeds img.google-reader { background-position:-100px 0 }\n.mod_rss_feeds img.msn { background-position:-199px 0 }\n.mod_rss_feeds img.aol { background-position:-299px 0 }\n.mod_rss_feeds img.newsgator { background-position:-399px 0 }\n.mod_rss_feeds img.netvibes { background-position:-498px 0 }\n.mod_rss_feeds img.bloglines { background-position:-598px 0 }</style>\n\n' + form.template.value;
      }
    }
  },


  {
    info : 'Updating template mod_rss_feeds.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 915,
             l : 'portal',
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
    info : 'Getting template mod_social_bookmarking.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_portal&t=914&l=portal&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = '<style type="text/css">.mod_bookmarks a img { background:url(http://illiweb.com/fa/social_bookmarking/social_bookmarking_fa.png) no-repeat scroll; height:20px; vertical-align:middle; width:20px }\n.mod_bookmarks img.digg { background-position:-10px -47px }\n.mod_bookmarks img.delicious { background-position:-10px -8px }\n.mod_bookmarks img.reddit { background-position:-10px -359px }\n.mod_bookmarks img.slashdot { background-position:-10px -398px }\n.mod_bookmarks img.stumbleupon { background-position:-10px -476px }\n.mod_bookmarks img.furl { background-position:-10px -163px }\n.mod_bookmarks img.yahoo { background-position:-10px -554px }\n.mod_bookmarks img.google { background-position:-10px -204px }\n.mod_bookmarks img.blinklist { background-position:-10px -665px }\n.mod_bookmarks img.blogmarks { background-position:-10px -630px }\n.mod_bookmarks img.technorati { background-position:-10px -516px }</style>\n\n' + form.template.value;
      }
    }
  },


  {
    info : 'Updating template mod_social_bookmarking.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 914,
             l : 'portal',
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
    info : 'Locating topics.js',
    type : 'GET',
     url : '/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid,
    func : function(d) {
      for (var row = $('#listJs tr', d), i = 0, j = row.length, regex = /\[FA EDGE\] TOPICS\.JS/; i < j; i++) {
        if (regex.test(row[i].innerHTML)) {
          FAE.step[FAE.index + 1].url = $('a', row[i])[1].href;
          break;
        }
      }
    }
  },


  {
    info : 'Getting topics.js',
    type : 'GET',
     url : '',
    func : function(d) {
      var form = $('#formenvoi', d)[0],
          js = form.content.value;

      FAE.step[FAE.index + 1].url = form.action.replace(/^.*?\/admin\/index\.forum\?|&tid=.*$/g, '');
      FAE.step[FAE.index + 1].data = {
                   title : '[FA EDGE] TOPICS.JS',
        'js_placement[]' : 'viewtopic',
                 content : js.replace('title = $(\'.title\', a[i]);', 'title = $(\'.title:first\', a[i]);'),

                    mode : 'save',
                    page : form.page.value,
                  submit : 'Submit'
      };
    }
  },


  {
    info : 'Updating topics.js',
    type : 'POST',
     url : '',
    data : {}
  }
];
