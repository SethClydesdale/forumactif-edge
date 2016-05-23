/******************************
** ======= FUNCTIONS ======= **
*******************************
** 00. wio_formatGroups
** 01. wio_getStats
** 02. wio_applyStats
** 03. wio_getNewAvatar
******************************/


/* -- 00. wio_formatGroups -- */
// changes the formatting of the group legend
function wio_formatGroups() {
  var groups = document.getElementById('wio_groups');

  if (groups) {

    for (var a = groups.getElementsByTagName('A'), i = 0, j = a.length, rgb, color; i < j; i++) {
      color = a[i].style.color;
      rgb = color.replace(/rgb\(|\)|\s/g, '').split(',');

      a[i].style.backgroundColor = color;
      a[i].style.color = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000) > 125 ? '#000' : '#FFF';
    }

  }
};


/* -- 01. wio_getStats -- */
// gets statistics via ajax
function wio_getStats() {
  var storage = window.localStorage,
      stats;

  if (storage && window.JSON) {
    if (storage.fa_wio_stats && storage.fa_wio_stats_exp > +new Date - 1*60*60*1000) {
      wio_applyStats(JSON.parse(storage.fa_wio_stats));
    } else {
      $.get('/popup_help.forum?l=miscvars', function(d) {
        var li = stats = {
          total_topics : $('li:contains({FORUMCOUNTOPIC})', d)[0],
          board_age : $('li:contains({FORUMAGE})', d)[0]
        },

        i;

        for (i in stats) {
          if (stats[i]) {
            stats[i] = '<strong>' + stats[i].innerHTML.replace(/.*?(\d+).*/, '$1') + '</strong>';
          }
        }

        wio_applyStats(stats);

        storage.fa_wio_stats = JSON.stringify(stats);
        storage.fa_wio_stats_exp = +new Date;
      });
    }

  }
};


/* -- 02. wio_applyStats -- */
// applies statistics
function wio_applyStats(stats) {
  var topics = document.getElementById('wio_total_topics'),
         age = document.getElementById('wio_board_age');

  if (topics) {
    topics.firstChild.innerHTML = stats.total_topics;
  }

  if (age) {
    age.firstChild.innerHTML = stats.board_age;
  }
}


/* -- 03. wio_getNewAvatar -- */
// gets the new avatar for the latest user
function wio_getNewAvatar() {
  var newMem = document.getElementById('wio_newest_user'),
      storage = window.localStorage,
      id;

  if (newMem) {
    id = newMem.getElementsByTagName('A')[0].href.replace(/.*?\/u(\d+).*/, '$1');

    if (storage && storage['fa_wio_newava' + id] && storage['fa_wio_newava' + id + '_exp'] > +new Date - 1*60*60*1000) {
      document.getElementById('wio_new_avatar').firstChild.src = storage['fa_wio_newava' + id];
    } else {
      $.get('/ajax/index.php?f=m&user_id=' + id, function(d) {
        var avatar = $('.tooltip-content > img', d)[0];

        if (avatar) {
          document.getElementById('wio_new_avatar').firstChild.src = avatar.src;

          if (storage) {
            storage['fa_wio_newava' + id] = avatar.src;
            storage['fa_wio_newava' + id + '_exp'] = +new Date;
          }
        }
      });
    }

  }
};
