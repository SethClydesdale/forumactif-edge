FAE.step = [
  {
    info : 'Getting ' + FAE.theme.stylesheet,
    type : 'GET',
     url : FAE.raw + 'css/' + FAE.theme.stylesheet,
    func : function(d) {
      FAE.step[FAE.index + 1].data.edit_code = d;
    }
  },


  {
    info : 'Installing ' + FAE.theme.stylesheet,
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {
         submit : 'Submit'
    }
  },


  {
    info : 'Installing images for "Mini-icons"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=icons&mode=icons&extended_admin=1',
    data : {
      i_icon_minicat : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/post-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/post-f10.png',
      i_icon_minicat_locked : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/lock-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/lock-f11.png',
      i_icon_minitime : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/clock-10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/clock-10.png',
      i_icon_minipost : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/post-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/post-f10.png',
      i_icon_minipost_lock : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/lock-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/lock-f11.png',
      i_icon_latest_reply : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/lastpo10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/lastpo10.png',
      i_icon_calendar : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/calend11.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/calend10.png',
      i_icon_tiny_topic : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/calend10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/calend11.png',
      i_icon_tiny_profile : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/birthd10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/birthd10.png',
      i_up_arrow : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/up-d-f10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/up-f10.png',
      i_down_arrow : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/down-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/down-f10.png',
      i_left_arrow : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/prev-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/prev-f10.png',
      i_right_arrow : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/next-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/next-f10.png',
      i_tabs_less : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/minus-10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/minus-11.png',
      i_tabs_more : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/plus-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/plus-f11.png',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Buttons"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=buttons&mode=buttons&extended_admin=1',
    data : {
      i_icon_attachment_see : 'http://i86.servimg.com/u/f86/18/21/41/30/show-a10.png',
      i_icon_attachment_download : 'http://i86.servimg.com/u/f86/18/21/41/30/downlo10.png',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Gallery"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=&mode=gallery&extended_admin=1',
    data : {
      link_public_galleries : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/public10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/public10.png',
      link_personal_galleries : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/person10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/person10.png',
      link_personal_gallery : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/user-g10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/user-g10.png',
      backup_folder : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/backup10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/backup10.png',
      icon_moderate : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/modera10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/modera10.png',
      icon_stats : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/statis10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/statis10.png',
      icon_left_arrow3 : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/prev-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/prev-f10.png',
      icon_right_arrow3 : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/next-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/next-f10.png',
      icon_first_arrow : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/first-10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/first-10.png',
      icon_last_arrow : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/last-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/last-f10.png',
      submit : 'Save'
    }
  }
];

FAE.index = -1;
FAE.quota = FAE.step.length;

// proceed to and execute the next step in the installation
FAE.next = function() {
  if (++FAE.index >= FAE.quota) {
    FAE.log(FAE.theme.name + ' has been imported successfully ! Please <a href="javascript:window.location.reload();">click here</a> to reload the page.', 'color:#8B5;font-weight:bold;');

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
  FAE.log('An error was encountered on step ' + FAE.index + ' (' + FAE.step[FAE.index].info + ') of the theme changing process. Please <a href="http://fmdesign.forumotion.com/t700-forumactif-edge-support#13923" target="_blank">open a new issue</a> and provide this information for further assistance.', 'color:#E53;font-weight:bold;');
  window.setTimeout(FAE.next, 1000);
};
