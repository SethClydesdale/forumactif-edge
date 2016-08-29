/******************************
** ======= FUNCTIONS ======= **
*******************************
** 00. group_color
** 01. ajax_reputation_counter
** 02. profile_field_classifier
** 03. thanked_post_message
******************************/


/* -- 00. group_color -- */
$(function() {
  for (var a = $('.post'), i = 0, j = a.length, color, rgb, title; i < j; i++) {
    color = $('.postprofile dt .username span[style*="color"]', a[i])[0];

    if (color) {
      title = $('.title:first', a[i]);

      color = color.style.color;
      rgb = color.replace(/rgb\(|\)|\s/g, '').split(',');
      rgb = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000) > 125 ? '#000' : '#FFF';

      title.css({
        color : rgb,
        background : color
      });

      $('a', title[0]).attr('style', 'color:' + rgb + ' !important;');
    }
  }
});


/* -- 01. ajax_reputation_counter -- */
$(function(){
  for (var vote = $('.vote'), i = 0, j = vote.length, bar, total, percent, n_pos, n_neg; i < j; i++) {
    bar = $('.vote-bar', vote[i])[0];

    if (bar) {
      total = +bar.title.replace(/.*?\((\d+).*/, '$1');
      percent = +bar.title.replace(/.*?(\d+)%.*/, '$1');

      n_pos = Math.round(total * (percent / 100));
      n_neg = total - n_pos;
    } else {
      n_pos = 0;
      n_neg = 0;
    }

    vote[i].insertAdjacentHTML('afterbegin', '<span class="vote_num vote_good">' + n_pos + '</span>');
    vote[i].insertAdjacentHTML('beforeend', '<span class="vote_num vote_bad">' + n_neg + '</span>');

    $('a', vote[i]).click(function() {
      var that = this,
          links = $('a', that.parentNode);

      $.get(that.href, function() {
        var n = that[/minus/.test(that.className) ? 'nextSibling' : 'previousSibling'];
        n.innerHTML = ++n.innerHTML;
        links.fadeOut();
      });


      links.attr('href', '#').css({
        opacity : 0.4,
        cursor : 'default'
      });

      return false;
    });
  }
});


/* -- 02. profile_field_classifier -- */
$(function() {
  for (var field = $('.profile-field'), i = 0, j = field.length; i < j; i++) {
    field[i].className += ' field_' + $('.label', field[i]).text().toLowerCase().replace(/ : /, '').replace(/[^a-z0-9]/g, function(s) {
        var c = s.charCodeAt(0);
        if (c == 32) return '-';
        return '__' + ('000' + c.toString(16)).slice(-4);
    });
  }
});


/* -- 03. thanked_post_message -- */
$(function() {
  var thanked = $('#main-content > .post[style*="background-color"]')[0];

  if (thanked) {
    thanked.className += ' thanked-post';
    thanked.style.backgroundColor = '';

    thanked.insertAdjacentHTML(
      'beforeend',
      '<div class="thanked-message"><i class="fa fa-thumbs-up"></i> {USERNAME} has been thanked by the topic starter !</div>'
      .replace('{USERNAME}', $(thanked).find('.username').text())
    );

    $('head').append('<style type="text/css">'+
      '.thanked-post .thanked-message { color:#FFF; font-size:13px; background:#8B5; margin:10px -1px -1px -1px; padding:0px 15px; height:45px; line-height:45px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }'+
      '.thanked-message .fa-thumbs-up { font-size:20px; margin-right:5px; vertical-align:-2px; }'+

      '@media (min-width:0px) and (max-width:768px) {'+
        '.thanked-post { padding-bottom:116px; }'+
        '.thanked-post .thanked-message { position:absolute; bottom:0; left:0; right:0; }'+
        '.thanked-post .postbody .profile-icons { bottom:44px; }'+
      '}'+
    '</style>');
  }
});
