/******************************
** ======= FUNCTIONS ======= **
*******************************
** 00. fa_initForumModules
** 01. fa_navactif
** 02. fa_theme_changer
** 03. pseudoInputs
** 04. toolbar search mod
** 05. fae_sticky_nav_panel
** 06. image resizer
** 07. fae_toggle_category
** 08. sticky_nav_notifications
** 09. update_notifier
** 10. topic_icon_formatter
******************************/

// IMPORTANT DATA (DO NOT DELETE)
if (!window.FAE) {
  window.FAE = new Object();
}

FAE.board_lang = 'English';


/* -- 00. fa_initForumModules -- */
// initiate the toggler for the widget columns
function fa_initForumModules(column_id) {
  var column = document.getElementById(column_id), menu;

  if (column) {
    column.insertAdjacentHTML('afterbegin', '<div class="title module_column_title">Widget Menu</div>');

    menu = document.createElement('A');
    menu.href = '#';
    menu.title = 'Toggle widget menu';
    menu.className = 'widget_menu column_button_' + column_id + ' color-secondary';

    menu.onclick = function() {
      var column = document.getElementById(/left/.test(this.className) ? 'left' : 'right');

      $([this, column])[/active/.test(this.className) ? 'removeClass' : 'addClass']('active');
      return false;
    };

    document.body.appendChild(menu);
  }
};

// give active panels a very high z-index so they display above other panels and buttons
// forumotion replaces any z-index above 1000 w/999 in the stylesheet, so this must be applied via JS
document.write('<style type="text/css">'+
  '.module_column, .widget_menu { z-index:30000; }'+
  '.module_column.active, .widget_menu.active { z-index:99999; }'+
'</style>');


/* -- 01. fa_navactif -- */
// finds the currently active navigation item and adds a classname to it.
function fa_navactif() {
  for (var cleanURI = window.location.href.replace(/\?.*|#.*/, ''), a = document.getElementById('page-header').getElementsByTagName('A'), i = 0, j = a.length; i < j; i++) {
    if (/mainmenu/.test(a[i].className) && cleanURI == a[i].href.replace(/\?.*|#.*/,'')) {
      a[i].className+=' fa_navactif';
      break;
    }
  }
  $('.mainmenu[href="/search"]').removeAttr('onclick');
};


/* -- 02. fa_theme_changer -- */
// theme selector for the forum
(function() {
  window.fa_theme_color = {
    selected : my_getcookie('fa_theme_color') || 'Select a theme',

    palette : {
       'Select a theme' : [],
         'Random theme' : [],
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
    },

    change : function(color) {
      var head = document.getElementsByTagName('HEAD')[0],
          style = document.getElementById('fa_theme_style');

      my_setcookie('fa_theme_color', color, true);

      if (color != 'Select a theme') {
        fa_theme_color.selected = color == 'Random theme' ? fa_theme_color.palette['Random theme'][Math.floor(Math.random() * fa_theme_color.palette['Random theme'].length)] : color;
        fa_theme_color.selector.style.backgroundColor = fa_theme_color.palette[fa_theme_color.selected][1];
        fa_theme_color.selector.style.borderColor = fa_theme_color.palette[fa_theme_color.selected][2];
        fa_theme_color.selector.firstChild.innerHTML = 'Default theme';

        if (style) head.removeChild(style);
        $(head).append('<style type="text/css" id="fa_theme_style">' + fa_theme_color.css() + '</style>');

      } else {
        if (style) {
          head.removeChild(style);
        }
        fa_theme_color.selector.style.backgroundColor = '#999';
        fa_theme_color.selector.style.borderColor = '#888';
        fa_theme_color.selector.firstChild.innerHTML = 'Select a theme';
      }
    },

    css : function() {
      var palette = fa_theme_color.palette[fa_theme_color.selected];
      return '.color-primary, .title, h2.u, .h3, .inner h1.page-title, .mainmenu:after, .forumline tbody .catHead, form.search-form input.search-keywords, input.search-button, .pagination span a, a.button1, a.button2, button.button2, input.button1, input.button2, input.button, #profile-advanced-add a, img[src*="?poll"], .fa_pseudo_radio:after, #tabs, body div.sceditor-dropdown .button, .codebox dt, blockquote cite, .sceditor-container .sceditor-toolbar, body #fa_toolbar, body #fa_toolbar_hidden, body #fa_toolbar #fa_right #notif_list li.see_all, #fae_sticky_nav_panel a:after, img[src*="color=primary"], .table1 thead th, .breadcrumbs, input[type="button"], input[type="submit"], input[type="reset"], input[type="file"] { background-color:' + palette[1] + '; }'+
             '#cp-main h1:not(.title) { background-color:' + palette[1] + '; }'+
             '.pagination span a:hover, a.button1:hover, a.button2:hover, button.button2:hover, input.button1:hover, input.button2:hover, input.button:hover, #profile-advanced-add a:hover, input.search-button:hover, body div.sceditor-dropdown .button:hover, img[src*="color=primary"]:hover, input[type="button"]:hover, input[type="submit"]:hover, input[type="reset"]:hover, input[type="file"]:hover { background-color:' + palette[2] + '; }'+
             '.pagination span a:active, .pagination span a:focus, .pagination span strong, a.button1:active, a.button2:active, button.button2:active, input.button1:active, input.button2:active, input.button:active, input[type="button"]:active, input[type="submit"]:active, input[type="reset"]:active, input[type="file"]:active, a.button1:focus, a.button2:focus, button.button2:focus, input.button1:focus, input.button2:focus, input.button:focus, input.search-button:focus, #tabs a:after, body div.sceditor-dropdown .button:active, body div.sceditor-dropdown .button:focus, body #fa_search #fa_textarea, body #fa_search #fa_magnifier, img[src*="color=primary"]:active, input[type="button"]:focus, input[type="submit"]:focus, input[type="reset"]:focus, input[type="file"]:focus { background-color:' + palette[3] + '; }'+
             '.fa_pseudo_checkbox:after, h2.post-content, h3.post-content, h4.post-content { color:' + palette[1] + '; }'+
             'img[src*="?poll"], .sceditor-container .sceditor-toolbar, .sceditor-container .sceditor-group, body #fa_toolbar, body #fa_toolbar_hidden { border-color:' + palette[2] + '; }'+
             '.color-secondary, .forum-status[style*="locked=true"], img[src*="color=secondary"] { background-color:' + palette[4] + '; }'+
             '.forum-status[style*="state=new"] { background-color:' + palette[0] + '; }'+
             'form.search-form { background-color:' + palette[2] + '; }'+
             'form.search-form input.search-keywords, input.search-button { border-color:' + palette[0] + '!important; }'+
             'input[type="text"]:hover, input.post:hover, input.inputbox:hover, textarea:hover, select:hover, input[type="text"]:focus, input.post:focus, input.inputbox:focus, textarea:focus, select:focus, body div.sceditor-dropdown input:focus, body div.sceditor-dropdown textarea:focus, .fa_pseudo_checkbox:hover, .fa_pseudo_radio:hover, .sceditor-container, h2.post-content, h3.post-content, h4.post-content, .lastpost-avatar, #wio_new_avatar, .avatar-mini img, .avatar { border-color:' + palette[1] + ' !important; }'+
             'a { color:' + palette[3] + '; }'+
             'a:hover, a:active { color:' + palette[2] + '; }'+
             '::selection { background-color:' + palette[1] + '; } ::-moz-selection { background-color:' + palette[1] + '; }'+
             '::-webkit-scrollbar-thumb, ::-webkit-scrollbar-button:single-button { background-color:' + palette[1] + '; }'+
             '::-webkit-scrollbar-thumb:hover, ::-webkit-scrollbar-button:single-button:hover { background-color:' + palette[2] + '; }'+
             '::-webkit-scrollbar-thumb:active, ::-webkit-scrollbar-button:single-button:active { background-color:' + palette[3] + '; }';
    }
  };

  var selector = document.createElement('SELECT'),
      frag = document.createDocumentFragment(),
      opt,
      color,
      i;

  if (!fa_theme_color.palette[fa_theme_color.selected]) {
    for (i in fa_theme_color.palette) {
      fa_theme_color.selected = i;
      my_setcookie('fa_theme_color', i, true);
      break;
    }
  }

  selector.id = 'fa_theme_selector';
  selector.onchange = function() {
    fa_theme_color.change(this.value);
  };

  for (i in fa_theme_color.palette) {
    opt = document.createElement('OPTION');
    color = /Random theme|Select a theme/.test(i) ? ['#FFF', '#000'] : [fa_theme_color.palette[i][2], ''];

    if (!/Random theme|Select a theme/.test(i)) {
      fa_theme_color.palette['Random theme'][fa_theme_color.palette['Random theme'].length] = i;
    }

    opt.value = i;
    opt.innerHTML = i;
    opt.selected = fa_theme_color.selected == i ? true : false;
    opt.style.backgroundColor = color[0];
    opt.style.color = color[1];

    frag.appendChild(opt);
  }

  selector.appendChild(frag);

  document.write('<style type="text/css">#fa_theme_selector { color:#FFF; border:1px solid transparent; float:left; outline:none; }</style>');

  fa_theme_color.selector = selector;
  fa_theme_color.change(fa_theme_color.selected);

  $(function() {
    var body = document.getElementById('page-body');
    body.insertBefore(selector, body.firstChild);
  });
}());


/* -- 03. pseudoInputs -- */
// function to hide all checkboxes / radios and replace them with pseudo inputs
$(function() {
  for (var input = document.getElementsByTagName('INPUT'), i = 0, j = input.length, type; i < j; i++) {
    type = input[i].type;
    if (/radio|checkbox/i.test(type)) {
      input[i].className += ' fa_input_hidden';
      input[i].insertAdjacentHTML('afterend', '<span class="fa_pseudo_' + type + '" onclick="this.previousSibling.click(); return false;"/>');
    }
  }
});


/* -- 04. toolbar search mod -- */
// gives the search bar a placeholder and attaches an event handler to the button
window.fa_textarea_placeholer = 'Search...';

$(function(){
  $(function() {
    var fa_magnifier = document.getElementById('fa_magnifier'),
        fa_textarea = document.getElementById('fa_textarea');

    if (fa_magnifier) {
      fa_magnifier.onclick = function() {
        this.parentNode.submit();
      };
    }

    if (fa_textarea) {
      fa_textarea.value = fa_textarea_placeholer;

      fa_textarea.onfocus = function() {
        if (this.value == fa_textarea_placeholer) {
          this.value = '';
        }
      };

      fa_textarea.onblur = function() {
        if (!this.value) {
          this.value = fa_textarea_placeholer;
        }
      };

    }

  });
});


/* -- 05. fae_sticky_nav_panel -- */
// adds a sticky navigation for quick use when the navbar isn't visible
$(function() {
  window.fae_sticky = {
            // various user options
            navbar : 'navbar',
          position : 'left',
             title : 'Quick Navigation',
           tooltip : 'Toggle quick navigation',
    additionalHTML : '<div class="nav-actions"><a href="javascript:fae_sticky.copyURL();" title="Copy BBCode URL"><i class="fa fa-link"></i></a>' + ( _userdata.user_level == 1 ? '<a href="/admin" title="Admin Panel"><i class="fa fa-wrench"></i></a>' : '' ) + '<a href="#top" title="Top of page"><i class="fa fa-chevron-up"></i></a><a href="#bottom" title="Bottom of page"><i class="fa fa-chevron-down"></i></a></div>',
     alwaysVisible : false,

    // copy page URL as bbcode
    copyURL : function() {
      window.prompt('Copy the BBCode URL below. (CTRL+C)', '[url=' + window.location + ']' + document.title + '[/url]');
    },

    // listen for changes in the navbar's bottom rect
    scroll : function() {
      var rect = fae_sticky.navbar.getBoundingClientRect(),
          position = fae_sticky.node[0].style[fae_sticky.position];

      if (rect.bottom <= fae_sticky.offset[fae_sticky.tb_state] && position == '-30px') {
        fae_sticky.node[0].style[fae_sticky.position] = '';
      } else if (rect.bottom > fae_sticky.offset[fae_sticky.tb_state] && position != '-30px') {
        fae_sticky.node[0].style[fae_sticky.position] = '-30px';
        $(fae_sticky.node).removeClass('active');
      }
    },

    // offsets for when the toolbar is hidden / shown
    offset : {
      fa_hide : 0,
      fa_show : 30
    }
  };

  // nodes used in the module
  fae_sticky.node = [
    // button
    $('<a class="widget_menu column_button_' + fae_sticky.position + ' color-secondary" />').attr({
       href : '#',
         id : 'fa_sticky_nav_button',
      style : fae_sticky.position + ':-30px;',
      title : fae_sticky.tooltip

    }).click(function() {
      $(fae_sticky.node)[/active/.test(this.className) ? 'removeClass' : 'addClass']('active');
      return false;
    })[0],

    // panel
    $('<div id="fae_sticky_nav_panel" class="module_column column_' + fae_sticky.position + ' color-secondary" />')
    .html('<div class="title module_column_title">' + fae_sticky.title + '</div><div class="module_inner"></div>')[0]
  ];

  fae_sticky.navbar = document.getElementById(fae_sticky.navbar); // get the old navbar

  // then clone its contents and add it to the sticky panel
  $('.module_inner', fae_sticky.node[1]).append($('a.mainmenu', fae_sticky.navbar).clone()).append(fae_sticky.additionalHTML);
  $(document.body).append(fae_sticky.node);

  if (!fae_sticky.alwaysVisible) {
    fae_sticky.tb_state = my_getcookie('toolbar_state') || (_userdata.activate_toolbar ? 'fa_show' : 'fa_hide');
    fae_sticky.scroll();

    $(window).scroll(fae_sticky.scroll);

    $(function() {
      $('#fa_hide, #fa_show').click(function() {
        fae_sticky.tb_state = this.id;
      });
    });
  } else {
    fae_sticky.node[0].style.left = '';
  }
});


/* -- 06. image resizer -- */
(function() {
  window.fa_img_resizer = {
    max_width : 400, // maximum image width (400px)
    max_height : 250, // maximum image height (250px)

    selector : '.postbody .content img, .mod_news img, .message-text img', // where images should be resized

    options : {
            bar : true, // resized image options bar
        toggler : true, // Enlarge / Reduce Image
      full_size : true, // Show full size
       download : false, // Download image link
       lightbox : true // lightbox effect
    },

    // texts
    lang : {
      full_size : '<i class="fa fa-external-link"></i> Show full size',
        enlarge : '<i class="fa fa-search-plus"></i> Enlarge image',
         reduce : '<i class="fa fa-search-minus"></i> Reduce image',
       download : '<i class="fa fa-download"></i> Download image',
       tooltip : 'Click to view full image'
    },

    // resize all images inside the "resizeIn" elements
    resize : function() {
      for (var a = $(fa_img_resizer.selector), i = 0, j = a.length; i < j; i++) {
        if (!a[i].alt && (a[i].naturalWidth > fa_img_resizer.max_width || a[i].naturalHeight > fa_img_resizer.max_height)) {
          a[i].className += ' fa_img_reduced';

          // make the image a "link" if it's not wrapper with one
          if (fa_img_resizer.options.lightbox && a[i].parentNode.tagName != 'A') {
            a[i].style.cursor = 'pointer';
            a[i].title = fa_img_resizer.lang.tooltip;

            a[i].onclick = function() {
              fa_img_resizer.lightbox(this);
            };
          }

          // create the resize bar
          if (fa_img_resizer.options.bar) {
            (a[i].parentNode.tagName == 'A' ? a[i].parentNode : a[i]).insertAdjacentHTML('beforebegin',
              '<div class="fa_img_resizer" style="width:' + (a[i].width - 8) + 'px;">'+
                (fa_img_resizer.options.toggler ? '<a class="fa_img_enlarge" href="#" onclick="fa_img_resizer.toggle(this); return false;">' + fa_img_resizer.lang.enlarge + '</a>' : '')+
                (fa_img_resizer.options.full_size ? '<a class="fa_img_full" href="/viewimage.forum?u=' + a[i].src + '" target="_blank">' + fa_img_resizer.lang.full_size + '</a>' : '')+
                (fa_img_resizer.options.download && !/Firefox/.test(navigator.userAgent) && 'download' in document.createElement('A') ? '<a class="fa_img_download" href="' + a[i].src + '" target="_blank" download>' + fa_img_resizer.lang.download + '</a>' : '' )+
              '</div>'
            );
          }
        }
      }
    },

    // toggle between enlarged and reduced image sizes
    toggle : function(that) {
      var img = that.parentNode.nextSibling;

      if (img.tagName == 'A') {
        img = img.getElementsByTagName('IMG')[0];
      }

      if (/fa_img_reduced/.test(img.className)) {
        that.innerHTML = fa_img_resizer.lang.reduce;
        that.className = 'fa_img_reduce';
        img.className = img.className.replace(/fa_img_reduced/, 'fa_img_enlarged');
      } else {
        that.innerHTML = fa_img_resizer.lang.enlarge;
        that.className = 'fa_img_enlarge';
        img.className = img.className.replace(/fa_img_enlarged/, 'fa_img_reduced');
      }

      that.parentNode.style.width = img.width - 8 + 'px';
    },

    // lightbox effect
    lightbox : function(that) {
      var frag = document.createDocumentFragment(),
          overlay = $('<div id="fa_img_lb_overlay" />')[0],
          img = $('<img id="fa_img_lb_image" src="' + that.src + '" />')[0];

      overlay.onclick = fa_img_resizer.kill_lightbox;
      img.onclick = fa_img_resizer.kill_lightbox;

      frag.appendChild(overlay);
      frag.appendChild(img);
      document.body.appendChild(frag);
      document.body.style.overflow = 'hidden';

      img.style.marginTop = '-' + (img.height / 2) + 'px';
      img.style.marginLeft = '-' + (img.width / 2) + 'px';
    },

    // kill the lightbox
    kill_lightbox : function() {
      var overlay = document.getElementById('fa_img_lb_overlay'),
          img = document.getElementById('fa_img_lb_image');

      overlay && document.body.removeChild(overlay);
      img && document.body.removeChild(img);
      document.body.style.overflow = '';
    }
  };

  // write styles into the document head
  document.write(
    '<style type="text/css">'+
      fa_img_resizer.selector + ', .fa_img_reduced { max-width:' + fa_img_resizer.max_width + 'px; max-height:' + fa_img_resizer.max_height + 'px; }'+
      '.fa_img_enlarged { max-width:100% !important; max-height:100% !important; }'+
      '.fa_img_resizer { font-size:12px; text-align:left; padding:3px; margin:3px 0; background:#FFF; border:1px solid #CCC; }'+
      '.fa_img_resizer a { display:inline-block; margin:0 3px; }'+
      '.fa_img_resizer i { font-size:14px; vertical-align:middle; }'+
      '#fa_img_lb_overlay { background:rgba(0, 0, 0, 0.7); position:fixed; top:0; right:0; bottom:0; left:0; z-index:999999; cursor:pointer; }'+
      '#fa_img_lb_image { max-height:100%; max-width:100%; position:fixed; left:50%; top:50%; z-index:9999999; cursor:pointer; }'+
    '</style>'
  );

  // begin modifying images when the page is loaded
  $(window).load(fa_img_resizer.resize);

  // kill forumactif's image resizer
  if (window.resize_images) {
    window.resize_images = function() {
      return false;
    };
  }
}());


/* -- 07. fae_toggle_category -- */
function fae_toggle_category(that) {
  var next = that.nextSibling;
  that.className = 'title ';

  if (next.style.display == 'none') {
    next.style.display = '';
    that.className += 'c_hide';
    my_setcookie('fae_' + next.id, 'shown');
  } else {
    next.style.display = 'none';
    that.className += 'c_show';
    my_setcookie('fae_' + next.id, 'hidden');
  }
};


/* -- 08. sticky_nav_notifications -- */
$(function() {
  if (_userdata.session_logged_in) {
    var nav = document.getElementById('fae_sticky_nav_panel'),
        a = $('<a class="mainmenu" href="/profile?mode=editprofile&page_profil=notifications">Notifications</a>')[0];

    if (nav) {
      $('a[href="/privmsg?folder=inbox"]', nav).after(a);

      $.get('/notification.forum', function(o) {
        if (o && o.unread) {
          a.insertAdjacentHTML('beforeend', ' <span id="sticky_notif_unread">(' + o.unread + ')</span>');
        }
      }, 'json');
    }
  }
});


/* -- 09. update_notifier -- */
$(function() {
  if (_userdata.user_id == 1 && !my_getcookie('fae_update_alerted')) {

    $.get('https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/javascripts/version-data.js', function(d) {
      var script = document.createElement('SCRIPT');
      script.type = 'text/javascript';
      script.text = d.replace(/forumactif_edge_version_data/, 'fae_github_version_data');
      document.body.appendChild(script);

      if (forumactif_edge_version_data.length < fae_github_version_data.length) {
        alert('An update has been found for Forumactif Edge. When you\'re ready, please proceed to your FAE Control Panel and click "Check for updates" to begin the update process.');
      }

      my_setcookie('fae_update_alerted', '1');
    });

  }
});


/* -- 10. topic_icon_formatter -- */
$(function() {
  var a = $('.forum-info[style*="background-image"]'),
      i = 0,
      j = a.length;

  if (j) {
    for (; i < j; i++) {
      a[i].insertAdjacentHTML('afterbegin', '<img class="topic-icon" src="' + a[i].style.backgroundImage.replace(/.*?url\((.*?)\).*/, '$1').replace(/'|"/g, '') + '" />');
      a[i].style.backgroundImage = '';
    }

    $('head').append('<style type="text/css">.topic-icon{vertical-align:middle;margin:0 3px;}</style>');
  }
});
