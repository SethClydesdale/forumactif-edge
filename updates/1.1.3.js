/*

  # Changes in v1.1.3

  - Added support for classified ads
  - Added Hungarian translation. (thanks to mimóza)
  - Updated Italian translation. (thanks to Teo!)
  - Fixed extra spacing on links in the quick navigation.
  - Fixed breadcrumbs style in searches.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.1.3';

// General Updates
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
                            .replace('@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css);', '@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css);@import url(https://dl.dropboxusercontent.com/s/rdhg16v1gk8icap/classified_ads-min.css);') +
                            '\n/* added in FAE v1.1.3 */\n#fae_sticky_nav_panel a img[src$="empty.gif"]{display:none}',
                   submit : 'Submit'
        };
      }

    }
  },


  {
    info : 'Patching in updated styles',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {}
  },


  {
    info : 'Getting template viewforum_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=125&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('<div class="pagination">', '<div class="pagination">\n<!-- BEGIN show_plus_menu -->')
                                                .replace('{PAGINATION}', '<!-- END show_plus_menu -->\n{PAGINATION}');
      }
    }
  },


  {
    info : 'Updating template viewforum_body.html',
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
    info : 'Getting template profile_send_email.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=705&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('<fieldset class="fields2">', '<fieldset class="fields2">\n<!-- BEGIN switch_profile_email -->')
                                                .replace('<!-- BEGIN switch_tell_friend -->', '    <!-- END switch_profile_email -->\n    <!-- BEGIN switch_ad_email -->\n    <dl>\n        <dt><label>{switch_ad_email.L_YOUR_EMAIL}</label></dt>\n        <dd><input type="text" name="email" value="{switch_ad_email.V_YOUR_EMAIL}" {switch_ad_email.DISABLE_YOUR_EMAIL} class="inputbox narrow" /></dd>\n    </dl>\n    <dl>\n        <dt><label>{switch_ad_email.L_YOUR_NAME}</label></dt>\n        <dd><input type="text" name="username" value="{switch_ad_email.V_YOUR_NAME}" {switch_ad_email.DISABLE_YOUR_NAME} class="inputbox narrow" /></dd>\n    </dl>\n    <!-- END switch_ad_email -->\n<!-- BEGIN switch_tell_friend -->')
                                                .replace('value="{SUBJECT}"', 'value="{SUBJECT}" {SUBJECT_READ_ONLY}');
      }
    }
  },


  {
    info : 'Updating template profile_send_email.html',
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
    info : 'Getting template index_box.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=111&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('<!-- BEGIN avatar -->', '          <!-- BEGIN ads -->\n          							<span class="AD_LastPA">\n                                          <span class="lastpost-avatar"><img src="{catrow.forumrow.ads.IMG}" alt="{catrow.forumrow.ads.TITLE}" /></span>\n                                          <span class="AD_LastInfos">\n                                              <b><a href="{catrow.forumrow.ads.LINK}">{catrow.forumrow.ads.TITLE}</a></b><br />\n                                              {catrow.forumrow.ads.DATE}<br />\n                                              {catrow.forumrow.ads.LOCATION}\n                                          </span>\n          							</span>\n          <!-- END ads -->\n<!-- BEGIN avatar -->');
      }
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
    info : 'Getting template search_results_topics.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=120&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('<div class="topic-actions">', '<div class="breadcrumbs">');
      }
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


// Italian Language Patch
if (FAE.board_lang == 'Italiano') {

  FAE.update_step = FAE.update_step.concat([
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
        var form = $('#formenvoi', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].url = form.action.replace(/^.*?\/admin\/index\.forum\?|&tid=.*$/g, '');
          FAE.step[FAE.index + 1].data = {
                       title : '[FA EDGE] TOPICS.JS',
            'js_placement[]' : 'viewtopic',
                     content : form.content.value
                               .replace('<div class="thanked-message"><i class="fa fa-thumbs-up"></i> {USERNAME} has been thanked by the topic starter !</div>', '<div class="thanked-message"><i class="fa fa-thumbs-up"></i> {USERNAME} è stato ringraziato dall\\\'autore di questo topic !</div>'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating Italian translation for topics.js',
      type : 'POST',
       url : '',
      data : {}
    },


    {
      info : 'Getting template overall_header.html',
      type : 'GET',
       url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=116&l=main&extended_admin=1' + FAE.tid,
      func : function(d) {
        var form = $('form[name="post"]', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].data.template = form.template.value
                                                  .replace(/<div id="fa_ticker_title" class="title">Announcements<\/div>/g, '<div id="fa_ticker_title" class="title">Annuncio</div>');
        }

      }
    },


    {
      info : 'Updating Italian translation for template overall_header.html',
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
    }
  ]);

}
