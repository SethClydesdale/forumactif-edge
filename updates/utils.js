// final update steps ; update version manifest on forum + number on footer
FAE.step = FAE.step.concat([

  // Find where the version data file is being stored
  {
    info : 'Locating version-data.js',
    type : 'GET',
     url : '/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid,
    func : function(d) {
      for (var row = $('#listJs tr', d), i = 0, j = row.length, regex = /\[FA EDGE\] VERSION-DATA\.JS/; i < j; i++) {
        if (regex.test(row[i].innerHTML)) {
          FAE.step[FAE.index + 1].url = $('a', row[i])[1].href;
          break;
        }
      }
    }
  },


  // get the version-data file
  {
    info : 'Getting version-data.js',
    type : 'GET',
     url : '',
    func : function(d) {
      var form = $('#formenvoi', d)[0];

      FAE.step[FAE.index + 1].url = form.action.replace(/^.*?\/admin\/index\.forum\?|&tid=.*$/g, '');
      FAE.step[FAE.index + 1].data = {
                   title : '[FA EDGE] VERSION-DATA.JS',
        'js_placement[]' : 'allpages',
                 content : FAE.version_string,
                    mode : 'save',
                    page : form.page.value,
                  submit : 'Submit'
      };
    }
  },


  // update the contents of version-data.js
  {
    info : 'Updating version-data.js',
    type : 'POST',
     url : '',
    data : {}
  },


  // get the overall_footer_end template
  {
    info : 'Getting overall_footer_end.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=133&l=main&extended_admin=1' + FAE.tid,
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = $('form[name="post"]', d)[0].template.value.replace(/<span id="fae_version">.*?<\/span>/, '<span id="fae_version">' + FAE.update_queue[FAE.update_queue.length - 1] + '<\/span>');
    }
  },


  // update the overall_footer_end template with the new version number
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


  // publish the template
  {
    info : 'Publishing template overall_footer_end.html',
    type : 'PUBLISH',
     tpl : 133
  },


  // resync the forum
  {
    info : 'Resynchronizing forum',
    type : 'POST',
     url : 'mode=general&part=general&sub=general',
    data : {
      resync : 'on',
      submit : 'Save'
    }
  }
]);


FAE.index = -1;
FAE.quota = FAE.step.length;

// proceed to and execute the next step update instruction
FAE.next = function() {
  if (++FAE.index >= FAE.quota) {
    FAE.log('Forumactif Edge has been updated successfully!', 'color:#8B5;font-weight:bold;');
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

    } else if (step.type == 'PUBLISH') {
      $.get('/admin/index.forum?part=themes&sub=templates&mode=edit_main&main_mode=edit&extended_admin=1&t=' + step.tpl + '&l=' + ( step.mobile ? 'mobile' : 'main' ) + '&pub=1&tid=' + FAE.tid, function() {
        window.setTimeout(FAE.next, FAE.delay);
      }).error(FAE.error);
    }

  }

  FAE.progress();
};

// handler in case of any errors in the installation process
FAE.error = function() {
  FAE.log('An error was encountered on step ' + FAE.index + ' (' + FAE.step[FAE.index].info + ') of the update process. Please <a href="http://fmdesign.forumotion.com/t700-forumactif-edge-support#13923" target="_blank">open a new issue</a> and provide this information for further assistance.', 'color:#E53;font-weight:bold;');
  window.setTimeout(FAE.next, FAE.delay);
};
