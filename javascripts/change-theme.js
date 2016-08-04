FAE.step = [
  {
    info : 'Getting ' + FAE.theme.stylesheet,
    type : 'GET',
     url : FAE.raw + 'css/' + FAE.theme.stylesheet,
    func : function(d) {
      var color_palette = FAE.color_palette[FAE.theme.color],
          theme_palette = FAE.theme_palette[FAE.theme.name],
          i, j;

      if (color_palette) {
        for (i = 0, j = color_palette.length; i < j; i++) {
          d = d.replace(new RegExp(theme_palette[i], 'gim'), color_palette[i]);
        }
      }

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
      i_icon_minicat_new : 'http://i86.servimg.com/u/f86/18/21/41/30/post-n10.png',
      i_icon_minicat_locked : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/lock-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/lock-f11.png',
      i_icon_minitime : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/clock-10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/clock-10.png',
      i_icon_minipost : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/post-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/post-f10.png',
      i_icon_minipost_new : 'http://i86.servimg.com/u/f86/18/21/41/30/post-n10.png',
      i_icon_minipost_lock : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/lock-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/lock-f11.png',
      i_icon_minipost_participate : 'http://i86.servimg.com/u/f86/18/21/41/30/partic10.png',
      i_icon_latest_reply : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/lastpo10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/lastpo10.png',
      i_icon_newest_reply : 'http://i86.servimg.com/u/f86/18/21/41/30/lastpo11.png',
      i_icon_calendar : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/calend11.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/calend10.png',
      i_icon_tiny_topic : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/calend10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/calend11.png',
      i_icon_tiny_profile : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/birthd10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/birthd10.png',
      i_icon_gender_male : 'http://i86.servimg.com/u/f86/18/21/41/30/male-f10.png',
      i_icon_gender_female : 'http://i86.servimg.com/u/f86/18/21/41/30/female10.png',
      i_up_arrow : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/up-d-f10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/up-f10.png',
      i_down_arrow : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/down-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/down-f10.png',
      i_left_arrow : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/prev-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/prev-f10.png',
      i_right_arrow : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/next-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/next-f10.png',
      i_tabs_less : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/minus-10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/minus-11.png',
      i_tabs_more : FAE.theme.dark ? 'http://i35.servimg.com/u/f35/18/21/41/30/plus-d10.png' : 'http://i86.servimg.com/u/f86/18/21/41/30/plus-f11.png',
      i_icon_mini_online : 'http://i86.servimg.com/u/f86/18/21/41/30/online10.png',
      i_icon_mini_offline : 'http://i86.servimg.com/u/f86/18/21/41/30/offlin10.png',
      page : 'icons',
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

FAE.theme_palette = {
  'Edge Default' : ['#7AD', '#69C', '#58B', '#369', '#345'],
  'Edge Dark' : ['#D44', '#C33', '#B22', '#900', '#522']
};

FAE.color_palette = {
      'Persian Red' : ['#D44', '#C33', '#B22', '#900', '#522'],
    'Chestnut Rose' : ['#D77', '#C66', '#B55', '#933', '#533'],
            'Eunry' : ['#DAA', '#C99', '#B88', '#966', '#544'],
          'Tuscany' : ['#D64', '#C63', '#B52', '#930', '#532'],
    'Antique Brass' : ['#DA7', '#C96', '#B85', '#963', '#543'],
      'Hokey Pokey' : ['#DA4', '#C93', '#B82', '#960', '#542'],
      'Earls Green' : ['#DD4', '#CC3', '#BB2', '#990', '#552'],
            'Laser' : ['#DD7', '#CC6', '#BB5', '#993', '#553'],
       'Pine Glade' : ['#DDA', '#CC9', '#BB8', '#996', '#554'],
           'Celery' : ['#AD4', '#9C3', '#8B2', '#690', '#452'],
      'Wild Willow' : ['#AD7', '#9C6', '#8B5', '#693', '#453'],
         'Atlantis' : ['#7D4', '#6C3', '#5B2', '#390', '#352'],
            'Apple' : ['#4D4', '#3C3', '#2B2', '#090', '#252'],
           'Mantis' : ['#7D7', '#6C6', '#5B5', '#393', '#353'],
          'De York' : ['#ADA', '#9C9', '#8B8', '#696', '#454'],
  'Mountain Meadow' : ['#4D7', '#3C6', '#2B5', '#093', '#253'],
          'Emerald' : ['#7DA', '#6C9', '#5B8', '#396', '#354'],
         'Shamrock' : ['#4DA', '#3C9', '#2B8', '#096', '#254'],
        'Turquoise' : ['#4DD', '#3CC', '#2BB', '#099', '#255'],
            'Downy' : ['#7DD', '#6CC', '#5BB', '#399', '#355'],
           'Sinbad' : ['#ADD', '#9CC', '#8BB', '#699', '#455'],
     'Curious Blue' : ['#4AD', '#39C', '#28B', '#069', '#245'],
           'Danube' : ['#7AD', '#69C', '#58B', '#369', '#345'],
          'Mariner' : ['#47D', '#36C', '#25B', '#039', '#235'],
     'Governor Bay' : ['#44D', '#33C', '#22B', '#009', '#225'],
  'Blue Marguerite' : ['#77D', '#66C', '#55B', '#339', '#335'],
        'Blue Bell' : ['#AAD', '#99C', '#88B', '#669', '#445'],
     'Purple Heart' : ['#74D', '#63C', '#52B', '#309', '#325'],
         'Amethyst' : ['#A7D', '#96C', '#85B', '#639', '#435'],
           'Purple' : ['#A4D', '#93C', '#82B', '#609', '#425'],
           'Cerise' : ['#D4D', '#C3C', '#B2B', '#909', '#525'],
     'Fuchsia Pink' : ['#D7D', '#C6C', '#B5B', '#939', '#535'],
            'Lilac' : ['#DAD', '#C9C', '#B8B', '#969', '#545'],
       'Red Violet' : ['#D4A', '#C39', '#B28', '#906', '#524'],
          'Hopbush' : ['#D7A', '#C69', '#B58', '#936', '#534'],
         'Hibiscus' : ['#D47', '#C36', '#B25', '#903', '#523']
};

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
