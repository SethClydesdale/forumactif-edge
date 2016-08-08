/*

  # Changes in v1.0.2

  - Added title attribute to classical recent topics widget so that the title can still be read when it overflows the container and gets cut off.
  - Added additional check to ensure that the founder is logged into the admin panel before the control panel can be used. This fixes an error some founders encountered with the security option "Confirm password to administration access"
  - Added margin between "go to page" link in pagination so it's not touching the page buttons.
  - Fixed alignment of pagination elements so it's to the right.
  - Fixed display of image resizer text. The icons were out of alignment on some scripts, such as RTL.
  - Fixed a bug in the theme selector which would occur for some members when the board language was changed.
  - Corrected various translations for the Arabic language. (thanks to Michael_vx & Gin NeOs)

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.0.2';

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
                edit_code : form.edit_code.value + '/* added in FAE v1.0.2 */\n.pagination{text-align:right}\na[href="javascript:Pagination();"]{margin:0 6px}',
                   submit : 'Submit'
        };
      }

    }
  },


  {
    info : 'Adding updated styles for v1.0.2',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {}
  },


  {
    info : 'Getting template mod_recent_topics.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_portal&t=904&l=portal&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('<a href="{classical_row.recent_topic_row.U_TITLE}">', '<a href="{classical_row.recent_topic_row.U_TITLE}" title="{classical_row.recent_topic_row.L_TITLE}">');
      }
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
    info : 'Locating all.js',
    type : 'GET',
     url : '/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid,
    func : function(d) {
      for (var row = $('#listJs tr', d), i = 0, j = row.length, regex = /\[FA EDGE\] ALL\.JS/; i < j; i++) {
        if (regex.test(row[i].innerHTML)) {
          FAE.step[FAE.index + 1].url = $('a', row[i])[1].href;
          break;
        }
      }
    }
  },


  {
    info : 'Getting all.js',
    type : 'GET',
     url : '',
    func : function(d) {
      var form = $('#formenvoi', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].url = form.action.replace(/^.*?\/admin\/index\.forum\?|&tid=.*$/g, '');
        FAE.step[FAE.index + 1].data = {
                     title : '[FA EDGE] ALL.JS',
          'js_placement[]' : 'allpages',
                   content : form.content.value
                             .replace('.fa_img_resizer a { margin:0 3px; }', '.fa_img_resizer a { display:inline-block; margin:0 3px; }')
                             .replace("selector.id = 'fa_theme_selector';", "  if (!fa_theme_color.palette[fa_theme_color.selected]) {\n    for (i in fa_theme_color.palette) {\n      fa_theme_color.selected = i;\n      my_setcookie('fa_theme_color', i, true);\n      break;\n    }\n  }\n\nselector.id = 'fa_theme_selector';"),

                      mode : 'save',
                      page : form.page.value,
                    submit : 'Submit'
        };
      }

    }
  },


  {
    info : 'Updating all.js',
    type : 'POST',
     url : '',
    data : {}
  }
];


// Arabic Language Patch
if (FAE.board_lang == 'العربية') {

  FAE.update_step = FAE.update_step.concat([
    {
      info : 'Locating all.js',
      type : 'GET',
       url : '/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid,
      func : function(d) {
        for (var row = $('#listJs tr', d), i = 0, j = row.length, regex = /\[FA EDGE\] ALL\.JS/; i < j; i++) {
          if (regex.test(row[i].innerHTML)) {
            FAE.step[FAE.index + 1].url = $('a', row[i])[1].href;
            break;
          }
        }
      }
    },


    {
      info : 'Getting all.js',
      type : 'GET',
       url : '',
      func : function(d) {
        var form = $('#formenvoi', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].url = form.action.replace(/^.*?\/admin\/index\.forum\?|&tid=.*$/g, '');
          FAE.step[FAE.index + 1].data = {
                       title : '[FA EDGE] ALL.JS',
            'js_placement[]' : 'allpages',
                     content : form.content.value
                               .replace('<i class="fa fa-search-plus"></i> تصغير الصورة', '<i class="fa fa-search-plus"></i> تكبير الصورة')
                               .replace('<i class="fa fa-search-minus"></i> تكبير الصورة', '<i class="fa fa-search-plus"></i> تصغير الصورة')
                               .replace('<i class="fa fa-external-link"></i> عرض الحجم بالكامل', '<i class="fa fa-external-link"></i> عرض المقاسات الاصليه'),

                        mode : 'save',
                        page : form.page.value,
                      submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Updating Arabic translations for all.js',
      type : 'POST',
       url : '',
      data : {}
    },


    {
      info : 'Getting template viewtopic_body.html',
      type : 'GET',
       url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=127&l=main&extended_admin=1' + FAE.tid,
      func : function(d) {
        var form = $('form[name="post"]', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].data.template = form.template.value
                                                  .replace('<h2 class="lor_maintitle">انشئ حساب جديد او سجل دخولك لتترك رد</h2>', '<h2 class="lor_maintitle">للمشاركة انت بحاجه الى تسجيل الدخول او التسجيل</h2>')
                                                  .replace('<p class="lor_maindesc">لابد يكون لديك عضوية لتستطيع الرد سجل.</p>', '<p class="lor_maindesc">يجب ان تعرف نفسك بتسجيل الدخول او بالاشتراك معنا للمشاركة</p>')
                                                  .replace('<p class="lor_subdesc">انضم الينا عالمنا الآنز فعملية التسجيل سهله جدا !</p>', '<p class="lor_subdesc">انضم الينا لن يستغرق منك الا ثوانى معدودة!</p>')
                                                  .replace('<h3 class="lor_subtitle">الدخول</h3>', '<h3 class="lor_subtitle">تسجيل الدخول</h3>')
                                                  .replace('<p class="lor_subdesc">لديك عضوية؟ لا يوجد مشكلة سجل من هنا.</p>', '<p class="lor_subdesc">ليس لديك عضويه ؟ بضع ثوانى فقط لتسجيل حساب</p>')
                                                  .replace('<a href="/login" class="button1">الدخول</a>', '<a href="/login" class="button1">تسجيل الدخول</a>');
        }

      }
    },


    {
      info : 'Updating Arabic translations for template viewtopic_body.html',
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
      info : 'Getting template viewcomments_body.html',
      type : 'GET',
       url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=131&l=main&extended_admin=1' + FAE.tid,
      func : function(d) {
        var form = $('form[name="post"]', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].data.template = form.template.value
                                                  .replace('<h2 class="lor_maintitle">انشئ حساب جديد او سجل دخولك لتترك رد</h2>', '<h2 class="lor_maintitle">للمشاركة انت بحاجه الى تسجيل الدخول او التسجيل</h2>')
                                                  .replace('<p class="lor_maindesc">لابد يكون لديك عضوية لتستطيع الرد سجل.</p>', '<p class="lor_maindesc">يجب ان تعرف نفسك بتسجيل الدخول او بالاشتراك معنا للمشاركة</p>')
                                                  .replace('<p class="lor_subdesc">انضم الينا عالمنا الآنز فعملية التسجيل سهله جدا !</p>', '<p class="lor_subdesc">انضم الينا لن يستغرق منك الا ثوانى معدودة!</p>')
                                                  .replace('<h3 class="lor_subtitle">الدخول</h3>', '<h3 class="lor_subtitle">تسجيل الدخول</h3>')
                                                  .replace('<p class="lor_subdesc">لديك عضوية؟ لا يوجد مشكلة سجل من هنا.</p>', '<p class="lor_subdesc">ليس لديك عضويه ؟ بضع ثوانى فقط لتسجيل حساب</p>')
                                                  .replace('<a href="/login" class="button1">الدخول</a>', '<a href="/login" class="button1">تسجيل الدخول</a>');
        }

      }
    },


    {
      info : 'Updating Arabic translations for template viewcomments_body.html',
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
    }
  ]);

}
