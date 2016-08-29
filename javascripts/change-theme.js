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
    'Silver' : ['#DDD', '#CCC', '#BBB', '#999', '#555'], // hue 000
  'Dusty Gray' : ['#AAA', '#999', '#888', '#666', '#444'], // hue 000
  'Dove Gray' : ['#777', '#666', '#555', '#333', '#333'], // hue 000
  'Mine Shaft' : ['#444', '#333', '#222', '#000', '#222'], // hue 000
  'Persian Red' : ['#D44', '#C33', '#B22', '#900', '#522'], // hue 000
  'Christmas Red' : ['#C33', '#B22', '#A11', '#800', '#522'], // hue 000
  'Coral Red' : ['#F55', '#F44', '#E33', '#C11', '#622'], // hue 000
  'Chestnut Rose' : ['#D77', '#C66', '#B55', '#933', '#533'], // hue 000
     'Eunry' : ['#DAA', '#C99', '#B88', '#966', '#544'], // hue 000
  'Brandy Rose' : ['#C99', '#B88', '#A77', '#855', '#544'], // hue 000
    'Bazaar' : ['#A88', '#977', '#866', '#644', '#433'], // hue 000
  'Cinnabar' : ['#F54', '#E43', '#D32', '#B10', '#622'], // hue 005
     'Crail' : ['#A65', '#B54', '#A43', '#821', '#532'], // hue 008
  'Flamingo' : ['#F64', '#E53', '#D42', '#B20', '#632'], // hue 010
  'Red Damask' : ['#E75', '#D64', '#C53', '#A31', '#532'], // hue 013
   'Tabasco' : ['#A42', '#931', '#820', '#300', '#421'], // hue 015
     'Paarl' : ['#B64', '#A53', '#942', '#720', '#432'], // hue 017
  'Cape Palliser' : ['#B75', '#A64', '#953', '#731', '#432'], // hue 020
   'Tuscany' : ['#D64', '#C63', '#B52', '#930', '#532'], // hue 020
  'Hot Cinnamon' : ['#E73', '#D62', '#C51', '#A30', '#532'], // hue 021
  'Blaze Orange' : ['#F71', '#F60', '#E50', '#C30', '#630'], // hue 024
   'Pumpkin' : ['#F82', '#F71', '#E60', '#C40', '#631'], // hue 025
  'Antique Brass' : ['#DA7', '#C96', '#B85', '#963', '#543'], // hue 029
  'Raw Sienna' : ['#D95', '#C84', '#B73', '#951', '#542'], // hue 029
  'Earthtone' : ['#753', '#642', '#531', '#310', '#321'], // hue 029
  'Americano' : ['#987', '#876', '#765', '#543', '#433'], // hue 030
    'Coffee' : ['#876', '#765', '#654', '#432', '#432'], // hue 030
  'Cinnamon' : ['#950', '#840', '#730', '#510', '#420'], // hue 030
     'Brown' : ['#A61', '#950', '#840', '#620', '#420'], // hue 033
  'Sandy Tan' : ['#EC9', '#DB8', '#CA7', '#A85', '#554'], // hue 035
  'Hokey Pokey' : ['#DA4', '#C93', '#B82', '#960', '#542'], // hue 039
    'Sienna' : ['#764', '#653', '#542', '#320', '#332'], // hue 039
    'Shadow' : ['#986', '#875', '#764', '#542', '#433'], // hue 040
  'Buttercup' : ['#FB2', '#EA1', '#D90', '#B70', '#641'], // hue 041
  'Tulip Tree' : ['#FC4', '#EB3', '#DA2', '#B80', '#652'], // hue 043
  'Golden Grass' : ['#EB3', '#DA2', '#C91', '#A70', '#542'], // hue 043
     'Pizza' : ['#DA2', '#C91', '#B80', '#960', '#541'], // hue 043
  'Reef Gold' : ['#B93', '#A82', '#971', '#750', '#442'], // hue 045
     'Olive' : ['#990', '#880', '#770', '#550', '#440'], // hue 060
  'Camouflage' : ['#552', '#441', '#330', '#110', '#221'], // hue 060
   'Avocado' : ['#997', '#886', '#775', '#553', '#443'], // hue 060
  'Earls Green' : ['#DD4', '#CC3', '#BB2', '#990', '#552'], // hue 060
     'Laser' : ['#DD7', '#CC6', '#BB5', '#993', '#553'], // hue 060
  'Pine Glade' : ['#DDA', '#CC9', '#BB8', '#996', '#554'], // hue 060
  'Pea Green' : ['#8A3', '#792', '#681', '#460', '#341'], // hue 077
    'Celery' : ['#AD4', '#9C3', '#8B2', '#690', '#452'], // hue 080
  'Chartreuse' : ['#9E1', '#8D0', '#7C0', '#5A0', '#450'], // hue 083
  'Forumactif Green' : ['#9D4', '#8C3', '#7B2', '#590', '#452'], // hue 086
  'Dollar Bill' : ['#9C6', '#8B5', '#7A4', '#582', '#453'], // hue 090
  'Wild Willow' : ['#AD7', '#9C6', '#8B5', '#693', '#453'], // hue 090
  'Asparagus' : ['#8B6', '#7A5', '#694', '#472', '#343'], // hue 095
  'Atlantis' : ['#7D4', '#6C3', '#5B2', '#390', '#352'], // hue 100
  'Forest Green' : ['#393', '#282', '#171', '#050', '#242'], // hue 120
  'Christmas Green' : ['#171', '#060', '#050', '#030', '#030'], // hue 120
     'Apple' : ['#4D4', '#3C3', '#2B2', '#090', '#252'], // hue 120
    'Mantis' : ['#7D7', '#6C6', '#5B5', '#393', '#353'], // hue 120
   'De York' : ['#ADA', '#9C9', '#8B8', '#696', '#454'], // hue 120
      'Envy' : ['#9B9', '#8A8', '#797', '#575', '#454'], // hue 120
    'Spruce' : ['#7D8', '#6C7', '#5B6', '#394', '#353'], // hue 130
  'Bottle Green' : ['#2B4', '#1A3', '#092', '#070', '#142'], // hue 133
  'Aqua Forest' : ['#7B8', '#6A7', '#596', '#374', '#343'], // hue 135
  'Mountain Meadow' : ['#4D7', '#3C6', '#2B5', '#093', '#253'], // hue 140
    'Meadow' : ['#3B6', '#2A5', '#194', '#072', '#243'], // hue 142
  'Sea Green' : ['#496', '#385', '#274', '#052', '#243'], // hue 144
    'Amazon' : ['#486', '#375', '#264', '#042', '#233'], // hue 150
   'Emerald' : ['#7DA', '#6C9', '#5B8', '#396', '#354'], // hue 150
  'Shamrock' : ['#4DA', '#3C9', '#2B8', '#096', '#254'], // hue 160
  'Blue Lagoon' : ['#5CB', '#4BA', '#3A9', '#187', '#254'], // hue 171
  'Turquoise' : ['#4DD', '#3CC', '#2BB', '#099', '#255'], // hue 180
     'Downy' : ['#7DD', '#6CC', '#5BB', '#399', '#355'], // hue 180
    'Sinbad' : ['#ADD', '#9CC', '#8BB', '#699', '#455'], // hue 180
      'Teal' : ['#199', '#088', '#077', '#055', '#044'], // hue 180
  'Blue Chill' : ['#29A', '#189', '#078', '#056', '#144'], // hue 187
  'Cerulean' : ['#1BE', '#0AD', '#09C', '#07A', '#045'], // hue 193
  'Deep Cerulean' : ['#18B', '#07A', '#069', '#047', '#034'], // hue 198
  'Curious Blue' : ['#4AD', '#39C', '#28B', '#069', '#245'], // hue 200
  'Slate Gray' : ['#89A', '#789', '#678', '#456', '#344'], // hue 210
    'Danube' : ['#7AD', '#69C', '#58B', '#369', '#345'], // hue 210
  'Azure Radiance' : ['#18F', '#07F', '#06E', '#04C', '#036'], // hue 212
   'Mariner' : ['#47D', '#36C', '#25B', '#039', '#235'], // hue 220
     'Azure' : ['#46B', '#35A', '#249', '#027', '#234'], // hue 222
  'Governor Bay' : ['#44D', '#33C', '#22B', '#009', '#225'], // hue 240
  'Blue Marguerite' : ['#77D', '#66C', '#55B', '#339', '#335'], // hue 240
  'Blue Bell' : ['#AAD', '#99C', '#88B', '#669', '#445'], // hue 240
     'Comet' : ['#668', '#557', '#446', '#224', '#334'], // hue 240
  'Purple Heart' : ['#74D', '#63C', '#52B', '#309', '#325'], // hue 260
  'Amethyst' : ['#A7D', '#96C', '#85B', '#639', '#435'], // hue 270
  'Amethyst Smoke' : ['#BAC', '#A9B', '#98A', '#768', '#445'], // hue 270
     'Mauve' : ['#EBF', '#DAF', '#C9E', '#A79', '#546'], // hue 276
    'Affair' : ['#85A', '#749', '#638', '#416', '#324'], // hue 276
    'Purple' : ['#A4D', '#93C', '#82B', '#609', '#425'], // hue 279
  'Lavendar' : ['#C8E', '#B7D', '#A6C', '#84A', '#535'], // hue 279
    'Cerise' : ['#D4D', '#C3C', '#B2B', '#909', '#525'], // hue 300
  'Fuchsia Pink' : ['#D7D', '#C6C', '#B5B', '#939', '#535'], // hue 300
     'Lilac' : ['#DAD', '#C9C', '#B8B', '#969', '#545'], // hue 300
  'Red Violet' : ['#D4A', '#C39', '#B28', '#906', '#524'], // hue 321
     'Disco' : ['#926', '#815', '#704', '#501', '#413'], // hue 326
  'Carnation Pink' : ['#FAD', '#F9C', '#E8B', '#C69', '#645'], // hue 330
   'Hopbush' : ['#D7A', '#C69', '#B58', '#936', '#534'], // hue 331
  'French Rose' : ['#F59', '#E48', '#D37', '#B15', '#624'], // hue 337
  'Hibiscus' : ['#D47', '#C36', '#B25', '#903', '#523'], // hue 340
    'Claret' : ['#824', '#713', '#602', '#400', '#312'], // hue 340
  'Bordeaux' : ['#713', '#602', '#501', '#300', '#301'], // hue 340
  'Tickle Me Pink' : ['#F9B', '#F8A', '#E79', '#C57', '#645'], // hue 343
  'Burgundy' : ['#913', '#802', '#701', '#500', '#401'], // hue 345
     'Blush' : ['#E68', '#D57', '#C46', '#A24', '#534'], // hue 345
  'Wild Watermelon' : ['#F68', '#F57', '#E46', '#C24', '#634'], // hue 348
  'Amaranth' : ['#F46', '#E35', '#D24', '#B02', '#623'], // hue 350
  'Mauvelous' : ['#FAB', '#F9A', '#E89', '#967', '#645'], // hue 351
  'Alizarin Crimson' : ['#F34', '#E23', '#D12', '#B00', '#622'] // hue 355
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
