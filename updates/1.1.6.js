/*

  # Changes in v1.1.6

  - Updated Font Awesome from 4.6.3 to 4.7.0
  - Fixed and updated Addthis share module in the topics
  - Fixed share button margin and alignment above the topics
  - Fixed who is online icon alignment

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.1.6';
FAE.RTL = (FAE.board_lang == 'العربية' || FAE.board_lang == 'עברית') ? true : false;

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
                            .replace('https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css')
                            .replace('@import url(http://ct1.addthis.com/static/r07/widget110.css);', '') +
                            '\n/* added in FAE v1.1.6 */\n.topic-actions>p.right,.topic-actions>p.right>span{margin:0 3px}.topic-actions>.pagination{margin:3px}\n#i_whosonline{float:' + ( FAE.RTL ? 'right' : 'left' ) + ';margin-' + ( FAE.RTL ? 'left' : 'right' ) + ':6px}#i_whosonline[src$="empty.gif"]{display:none}#wio_activity .txt-content>br:last-child{clear:both}',
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
    info : 'Getting template viewtopic_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=127&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace("    _atc.cwait = 0;\n    $('.addthis_button').mouseup(function(){\n        if ($('#at15s').css('display') == 'block') {\n            addthis_close();\n        }\n    });", '')
                                                .replace('http://www.addthis.com/bookmark.php?v=250&amp;pub=forumotion', '#')
                                                .replace('{JS_DIR}addthis/addthis_widget.js', '//s7.addthis.com/js/300/addthis_widget.js#pubid=forumotion');
      }
    }
  },


  {
    info : 'Updating template viewtopic_body.html',
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
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=131&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace("    _atc.cwait = 0;\n    $('.addthis_button').mouseup(function(){\n        if ($('#at15s').css('display') == 'block') {\n            addthis_close();\n        }\n    });", '')
                                                .replace('http://www.addthis.com/bookmark.php?v=250&amp;pub=forumotion', '#')
                                                .replace('{JS_DIR}addthis/addthis_widget.js', '//s7.addthis.com/js/300/addthis_widget.js#pubid=forumotion');
      }
    }
  },


  {
    info : 'Updating template viewcomments_body.html',
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
];
