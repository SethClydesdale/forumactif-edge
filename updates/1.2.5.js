/*

  # Changes in v1.2.5

  - Added pre-installation options to the FAE Control Panel.
  - Upgraded image resources to HTTPS ; this will currently only affect new installations and theme changes. 
  - Fixed Control Panel not appearing when a JavaScript error occurred in JS Codes Management.
  - Fixed Copy Code button leaving selection after contents were copied.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.2.5';

FAE.update_step = [
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
                             .replace(
                               /(target.*?function.*?\(copy\).*?{[\s\S]*?}),[\s\S]*?text.*?function.*?\(copy\).*?{[\s\S]*?}\);/,
                               "$1\n      }).on('success', function (e) {\n        var copy = e.trigger;\n \n        if (copy.innerHTML != fae_copyCode.copied) {\n          copy.innerHTML = fae_copyCode.copied;\n          copy.className += ' fae_copied';\n \n          window.setTimeout(function() {\n            copy.innerHTML = fae_copyCode.copy;\n            copy.className = copy.className.replace('fae_copied', '');\n          }, 1000);\n        }\n \n        e.clearSelection();\n      });"
                             ),

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
