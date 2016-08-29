/*

  # Changes in v1.1.0

  - Added new section "General Settings" to FAE Control Panel.
  - Added a "thank you" message to thanked posts.
  - Added 74 new theme colors.
  - Added new logo image for base installation.
  - Added new translation aliases for overall_header, topics.js, general settings, and theme management.
  - Added Filipino translation. (thanks to Wilson)
  - Added Hebrew translation. (thanks to Valoish)
  - Added Vietnamese translation. (thanks to Lorem)
  - Added Arabic translation for Control Panel. (thanks to omarpop23)
  - Added Greek translation for Control Panel. (thanks to Luffy)
  - Added complete French translation. (thanks to DDril)
  - Fixed alignment of some elements for RTL scripts.
  - Fixed position of topic icons by placing them before the topic title.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.1.0';

// General Updates
FAE.update_step = [
  {
    info : 'Locating topics.js',
    type : 'GET',
     url : '/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid,
    func : function(d) {
      for (var row = $('#listJs tr', d), i = 0, j = row.length, regex = /\[FA EDGE\] TOPICS\.JS/; i < j; i++) {
        if (regex.test(row[i].innerHTML)) {
          FAE.step[FAE.index + 1].url = $('a', row[i])[1].href;
          break;
        }
      }
    }
  },


  {
    info : 'Getting topics.js',
    type : 'GET',
     url : '',
    func : function(d) {
      var form = $('#formenvoi', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].url = form.action.replace(/^.*?\/admin\/index\.forum\?|&tid=.*$/g, '');
        FAE.step[FAE.index + 1].data = {
                     title : '[FA EDGE] TOPICS.JS',
          'js_placement[]' : 'viewtopic',
                   content : form.content.value
                             .replace('** 02. profile_field_classifier', '** 02. profile_field_classifier\n** 03. thanked_post_message') +
                             '/* -- 03. thanked_post_message -- */\n$(function() {\n  var thanked = $(\'#main-content > .post[style*="background-color"]\')[0];\n\n  if (thanked) {\n    thanked.className += \' thanked-post\';\n    thanked.style.backgroundColor = \'\';\n\n    thanked.insertAdjacentHTML(\n      \'beforeend\',\n      \'<div class="thanked-message"><i class="fa fa-thumbs-up"></i> {USERNAME} has been thanked by the topic starter !</div>\'\n      .replace(\'{USERNAME}\', $(thanked).find(\'.username\').text())\n    );\n\n    $(\'head\').append(\'<style type="text/css">\'+\n      \'.thanked-post .thanked-message { color:#FFF; font-size:13px; background:#8B5; margin:10px -1px -1px -1px; padding:0px 15px; height:45px; line-height:45px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }\'+\n      \'.thanked-message .fa-thumbs-up { font-size:20px; margin-right:5px; vertical-align:-2px; }\'+\n\n      \'@media (min-width:0px) and (max-width:768px) {\'+\n        \'.thanked-post { padding-bottom:116px; }\'+\n        \'.thanked-post .thanked-message { position:absolute; bottom:0; left:0; right:0; }\'+\n        \'.thanked-post .postbody .profile-icons { bottom:44px; }\'+\n      \'}\'+\n    \'</style>\');\n  }\n});',

                      mode : 'save',
                      page : form.page.value,
                    submit : 'Submit'
        };
      }

    }
  },


  {
    info : 'Updating topics.js',
    type : 'POST',
     url : '',
    data : {}
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
                             .replace("['#D47', '#C36', '#B25', '#903', '#523'] // hue 340", "['#D47', '#C36', '#B25', '#903', '#523'], // hue 340\n               'Silver' : ['#DDD', '#CCC', '#BBB', '#999', '#555'], // hue 000\n           'Dusty Gray' : ['#AAA', '#999', '#888', '#666', '#444'], // hue 000\n            'Dove Gray' : ['#777', '#666', '#555', '#333', '#333'], // hue 000\n           'Mine Shaft' : ['#444', '#333', '#222', '#000', '#222'], // hue 000\n        'Christmas Red' : ['#C33', '#B22', '#A11', '#800', '#522'], // hue 000\n            'Coral Red' : ['#F55', '#F44', '#E33', '#C11', '#622'], // hue 000\n               'Bazaar' : ['#A88', '#977', '#866', '#644', '#433'], // hue 000\n          'Brandy Rose' : ['#C99', '#B88', '#A77', '#855', '#544'], // hue 000\n             'Cinnabar' : ['#F54', '#E43', '#D32', '#B10', '#622'], // hue 005\n                'Crail' : ['#A65', '#B54', '#A43', '#821', '#532'], // hue 008\n             'Flamingo' : ['#F64', '#E53', '#D42', '#B20', '#632'], // hue 010\n           'Red Damask' : ['#E75', '#D64', '#C53', '#A31', '#532'], // hue 013\n              'Tabasco' : ['#A42', '#931', '#820', '#300', '#421'], // hue 015\n                'Paarl' : ['#B64', '#A53', '#942', '#720', '#432'], // hue 017\n        'Cape Palliser' : ['#B75', '#A64', '#953', '#731', '#432'], // hue 020\n         'Hot Cinnamon' : ['#E73', '#D62', '#C51', '#A30', '#532'], // hue 021\n         'Blaze Orange' : ['#F71', '#F60', '#E50', '#C30', '#630'], // hue 024\n              'Pumpkin' : ['#F82', '#F71', '#E60', '#C40', '#631'], // hue 025\n           'Raw Sienna' : ['#D95', '#C84', '#B73', '#951', '#542'], // hue 029\n            'Earthtone' : ['#753', '#642', '#531', '#310', '#321'], // hue 029\n             'Cinnamon' : ['#950', '#840', '#730', '#510', '#420'], // hue 030\n            'Americano' : ['#987', '#876', '#765', '#543', '#433'], // hue 030\n               'Coffee' : ['#876', '#765', '#654', '#432', '#432'], // hue 030\n                'Brown' : ['#A61', '#950', '#840', '#620', '#420'], // hue 033\n            'Sandy Tan' : ['#EC9', '#DB8', '#CA7', '#A85', '#554'], // hue 035\n               'Sienna' : ['#764', '#653', '#542', '#320', '#332'], // hue 039\n               'Shadow' : ['#986', '#875', '#764', '#542', '#433'], // hue 040\n            'Buttercup' : ['#FB2', '#EA1', '#D90', '#B70', '#641'], // hue 041\n           'Tulip Tree' : ['#FC4', '#EB3', '#DA2', '#B80', '#652'], // hue 043\n         'Golden Grass' : ['#EB3', '#DA2', '#C91', '#A70', '#542'], // hue 043\n                'Pizza' : ['#DA2', '#C91', '#B80', '#960', '#541'], // hue 043\n            'Reef Gold' : ['#B93', '#A82', '#971', '#750', '#442'], // hue 045\n              'Avocado' : ['#997', '#886', '#775', '#553', '#443'], // hue 060\n           'Camouflage' : ['#552', '#441', '#330', '#110', '#221'], // hue 060\n                'Olive' : ['#990', '#880', '#770', '#550', '#440'], // hue 060\n            'Pea Green' : ['#8A3', '#792', '#681', '#460', '#341'], // hue 077\n           'Chartreuse' : ['#9E1', '#8D0', '#7C0', '#5A0', '#450'], // hue 083\n     'Forumactif Green' : ['#9D4', '#8C3', '#7B2', '#590', '#452'], // hue 086\n          'Dollar Bill' : ['#9C6', '#8B5', '#7A4', '#582', '#453'], // hue 090\n            'Asparagus' : ['#8B6', '#7A5', '#694', '#472', '#343'], // hue 095\n         'Forest Green' : ['#393', '#282', '#171', '#050', '#242'], // hue 120\n      'Christmas Green' : ['#171', '#060', '#050', '#030', '#030'], // hue 120\n                 'Envy' : ['#9B9', '#8A8', '#797', '#575', '#454'], // hue 120\n               'Spruce' : ['#7D8', '#6C7', '#5B6', '#394', '#353'], // hue 130\n         'Bottle Green' : ['#2B4', '#1A3', '#092', '#070', '#142'], // hue 133\n          'Aqua Forest' : ['#7B8', '#6A7', '#596', '#374', '#343'], // hue 135\n               'Meadow' : ['#3B6', '#2A5', '#194', '#072', '#243'], // hue 142\n            'Sea Green' : ['#496', '#385', '#274', '#052', '#243'], // hue 144\n               'Amazon' : ['#486', '#375', '#264', '#042', '#233'], // hue 150\n          'Blue Lagoon' : ['#5CB', '#4BA', '#3A9', '#187', '#254'], // hue 171\n                 'Teal' : ['#199', '#088', '#077', '#055', '#044'], // hue 180\n           'Blue Chill' : ['#29A', '#189', '#078', '#056', '#144'], // hue 187\n             'Cerulean' : ['#1BE', '#0AD', '#09C', '#07A', '#045'], // hue 193\n        'Deep Cerulean' : ['#18B', '#07A', '#069', '#047', '#034'], // hue 198\n           'Slate Gray' : ['#89A', '#789', '#678', '#456', '#344'], // hue 210\n       'Azure Radiance' : ['#18F', '#07F', '#06E', '#04C', '#036'], // hue 212\n                'Azure' : ['#46B', '#35A', '#249', '#027', '#234'], // hue 222\n                'Comet' : ['#668', '#557', '#446', '#224', '#334'], // hue 240\n       'Amethyst Smoke' : ['#BAC', '#A9B', '#98A', '#768', '#445'], // hue 270\n               'Affair' : ['#85A', '#749', '#638', '#416', '#324'], // hue 276\n                'Mauve' : ['#EBF', '#DAF', '#C9E', '#A79', '#546'], // hue 276\n             'Lavendar' : ['#C8E', '#B7D', '#A6C', '#84A', '#535'], // hue 279\n                'Disco' : ['#926', '#815', '#704', '#501', '#413'], // hue 326\n       'Carnation Pink' : ['#FAD', '#F9C', '#E8B', '#C69', '#645'], // hue 330\n          'French Rose' : ['#F59', '#E48', '#D37', '#B15', '#624'], // hue 337\n               'Claret' : ['#824', '#713', '#602', '#400', '#312'], // hue 340\n             'Bordeaux' : ['#713', '#602', '#501', '#300', '#301'], // hue 340\n       'Tickle Me Pink' : ['#F9B', '#F8A', '#E79', '#C57', '#645'], // hue 343\n             'Burgundy' : ['#913', '#802', '#701', '#500', '#401'], // hue 345\n                'Blush' : ['#E68', '#D57', '#C46', '#A24', '#534'], // hue 345\n      'Wild Watermelon' : ['#F68', '#F57', '#E46', '#C24', '#634'], // hue 348\n             'Amaranth' : ['#F46', '#E35', '#D24', '#B02', '#623'], // hue 350\n            'Mauvelous' : ['#FAB', '#F9A', '#E89', '#967', '#645'], // hue 351\n     'Alizarin Crimson' : ['#F34', '#E23', '#D12', '#B00', '#622'] // hue 355")
                             .replace('** 09. update_notifier', '** 09. update_notifier\n** 10. topic_icon_formatter') +
                             '/* -- 10. topic_icon_formatter -- */\n$(function() {\n  var a = $(\'.forum-info[style*="background-image"]\'),\n      i = 0,\n      j = a.length;\n\n  if (j) {\n    for (; i < j; i++) {\n        a[i].insertAdjacentHTML(\'afterbegin\', \'<img class="topic-icon" src="\' + a[i].style.backgroundImage.replace(/.*?url\\((.*?)\\).*/, \'$1\').replace(/\'|"/g, \'\') + \'" />\');\n        a[i].style.backgroundImage = \'\';\n    }\n\n    $(\'head\').append(\'<style type="text/css">.topic-icon{vertical-align:middle;margin:0 3px;}</style>\');\n  }\n});',

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


// RTL Language Updates
if (FAE.board_lang == 'العربية' || FAE.board_lang == 'עברית') {

  FAE.update_step = FAE.update_step.concat([
    {
      info : 'Getting forum stylesheet',
      type : 'GET',
       url : '/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid,
      func : function(d) {
        var form = $('form[method="post"]', d)[0];

        if (form) {
          FAE.step[FAE.index + 1].data = {
                  edit_code : form.edit_code.value + '\n/* added in FAE v1.1.0 - For RTL scripts only */\n.forum-lastpost div[style="float:left;"]{float:right!important}',
                     submit : 'Submit'
          };
        }

      }
    },


    {
      info : 'Adding updated styles for RTL scripts',
      type : 'POST',
       url : 'part=themes&sub=logos&mode=css&extended_admin=1',
      data : {}
    }
  ]);

}
