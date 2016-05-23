(function() {
  var FAE = {
    index : -1,

    step : [


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
        info : 'Getting all.js',
        type : 'GET',
         url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/javascripts/in-all-the-pages/all.js',
        func : function(d) {
          FAE.step[3].data.content = d;
        }
      },


      /* -- STEP 3 -- */
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


      /* -- STEP 4 -- */
      {
        info : 'Getting homepage.js',
        type : 'GET',
         url : 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/javascripts/in-the-homepage/homepage.js',
        func : function(d) {
          FAE.step[5].data.content = d;
        }
      },


      /* -- STEP 5 -- */
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
      }


    ],


    // proceed to and execute the next step in the installation
    next : function() {
      if (++FAE.index >= FAE.quota) {
        console.log('Install complete');

      } else {
        var step = FAE.step[FAE.index];
        console.log(step.info + '...');

        if (step.type == 'POST') {
          $.post('/admin/index.forum?' + step.url + FAE.tid, step.data, FAE.next);

        } else if (step.type == 'GET') {
          $.get(step.url, function(d) {
            step.func(d);
            FAE.next();
          });

        }

      }
    }


  };

  FAE.quota = FAE.step.length; // cache the step length
  window.FAE = FAE; // define FAE in the global namespace

  // stuff that needs to be execute when the doc is ready
  $(function() {
    var admin = $('a[href^="/admin/"]')[0]; // get the AP link so we can fetch the TID

    // only allow the founder to install the theme
    if (_userdata.user_id == 1 && admin) {
      FAE.tid = admin.href.replace(/.*?(&tid=.*)/, '$1'); // cache the tid
      FAE.next(); // begin installation
    }
  });
}());
