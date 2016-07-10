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
    info : 'Getting fa_edge.css',
    type : 'GET',
     url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/fa_edge.css',
    func : function(d) {
      FAE.step[3].data.edit_code = d;
    }
  },


  /* -- STEP 3 -- */
  {
    info : 'Installing fa_edge.css',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {
      edit_code : '',
         submit : 'Submit'
    }
  },


  /* -- STEP 4 -- */
  {
    info : 'Getting and deleting all JavaScript files to prevent install errors',
    type : 'GET',
     url : 'mode=js&part=modules&sub=html',
    func : function(d) {
      var form = $('#pageListHtml', d),
          file = $('input[type="checkbox"]', form),
          i = 0,
          j = file.length;

      for (; i < j; i++) {
        file[i].checked = true;
      }

      $.post(form[0].action, form.serialize() + '&attachments_submit=Delete', function(d) {
        var confirmation = $('form[name="post"]', d);
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
               content : '',
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
               content : '',
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
               content : '',
                  mode : 'save',
                submit : 'Submit'
    }
  }
];

FAE.index = -1;
FAE.quota = FAE.step.length;

// proceed to and execute the next step in the installation
FAE.next = function() {
  if (++FAE.index >= FAE.quota) {
    FAE.log('Install has completed successfully!', 'color:#8B5;font-weight:bold;');

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

    }

  }

  FAE.progress();
};
