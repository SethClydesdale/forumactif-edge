/******************************
** ======= FUNCTIONS ======= **
*******************************
** 00. group_color
** 01. ajax_reputation_counter
******************************/


/* -- 00. group_color -- */
$(function() {
  for (var a = $('.post'), i = 0, j = a.length, color, rgb, title; i < j; i++) {
    color = $('.postprofile dt span[style*="color"]', a[i])[0];

    if (color) {
      title = $('.title', a[i]);

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
