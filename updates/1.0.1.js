/*

  # Changes in v1.0.1

  - Fixed major sticky footer bug on mobile devices and some browsers.
  - Fixed breadcrumbs exceeding page width on mobile.
  - Fixed unusually large overflow that was visible while splitting a topic with a lot of posts.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.0.1';

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
                            .replace('flex:1', 'flex:1 0 auto')
                            .replace(/\.breadcrumbs a(?:\s\{|\{)/, '.breadcrumbs a {display:inline-block;'),
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
    info : 'Getting template modcp_split.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=605&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data.template = form.template.value
                                                .replace('<span class="corners-bottom"><span></span></span></div>', '</div>')
                                                .replace('<div id="topicreview">', '<div class="content-block" style="height:500px;position:relative;margin:15px;">\n<div id="topicreview" style="position:absolute;top:0;left:0;right:0;bottom:0;">');
      }
    }
  },


  {
    info : 'Updating template modcp_split.html',
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
  }
];
