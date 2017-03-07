/*

  # Changes in v1.1.7

  This is an emergency patch that fixes numerous style related issued caused by the "ModernBB" update for Forumotion.

  - Fixes unstyled (broken) toolbar
  - Fixes log in popup height and width

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.1.7';

// General Updates
FAE.update_step = [
  {
    info : 'Getting forum stylesheet',
    type : 'GET',
     url : '/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[method="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data = {
                edit_code : form.edit_code.value +
                            '\n/* added in FAE v1.1.7 */\n#fa_left,#fa_toolbar #fa_icon,#fa_toolbar #fa_service{display:inline-block!important;visibility:visible!important}#fa_left,#fa_share{line-height:30px!important}.fa_toolbar_XL_Sized{min-width:980px;width:100%}.fa_toolbar_L_Sized{min-width:774px}.fa_toolbar_M_Sized{min-width:519px}#fa_toolbar{left:0;height:30px;background-color:#eee;color:#FFF;font-family:Helvetica,Verdana,Arial;font-size:16px;z-index:999}#fa_toolbar :link,#fa_toolbar :visited{color:#FFF;text-decoration:none}#fa_toolbar a:hover{text-decoration:underline}#fa_toolbar a:active,#fa_toolbar a:hover,#fa_toolbar a:link,#fa_toolbar a:visited{border:1px solid transparent;border:none}#fa_show,.fa_tbMainElement,.fa_tbMainElement a{display:inline-block!important;vertical-align:middle}#fa_toolbar #fa_icon{background-repeat:no-repeat;background-image:url(https://illiweb.com/fa/i/toolbar/pa0.png);background-size:30px;width:30px;height:30px}#fa_toolbar #fa_fb,#fa_toolbar #fa_gp,#fa_toolbar #fa_hide,#fa_toolbar #fa_magnifier,#fa_toolbar #fa_mail,#fa_toolbar #fa_rss,#fa_toolbar #fa_twitter,#fa_toolbar_hidden #fa_show{background-image:url(https://illiweb.com/fa/i/toolbar/toolbar.png);width:30px;height:30px;cursor:pointer}#fa_left{width:auto!important;height:auto!important}#fa_icon,#fa_toolbar #fa_service{color:#666}#fa_toolbar #fa_service{text-decoration:none!important}#fa_toolbar #fa_service:hover[href]{text-decoration:underline!important}#fa_search{margin-left:20px;height:30px}#fa_search form{margin:0;padding:0;display:inline}#fa_search #fa_magnifier{position:absolute;background-position:-30px 0}#fa_search #fa_textarea{text-indent:30px!important;width:200px;height:24px;padding:0;border:0;margin-top:3px;border-radius:5px;line-height:24px}#fa_share{margin-left:20px;font-size:16px}#fa_share_text{cursor:default;color:#666;text-decoration:none!important}#fa_fb{margin-left:10px;background-position:-60px 0}#fa_twitter{background-position:-90px 0}#fa_gp{background-position:-120px 0}#fa_mail{background-position:-150px 0}#fa_rss{background-position:-180px 0}#fa_right{float:right;font-size:14px}#fa_right a.rightHeaderLink{margin-left:10px;vertical-align:top;line-height:30px;color:#666}#fa_right span.rightHeaderLink{display:inline-block;margin-left:1px;vertical-align:top;line-height:30px;color:#666}#fa_right #fa_notifications,#fa_welcome{line-height:30px;padding:0 5px;color:#666}#fa_hide{background-position:-210px 0}#fa_menu{display:inline-block}#fa_right #fa_welcome:hover,#fa_toolbar #fa_right #fa_notifications:hover{cursor:pointer}#fa_right #fa_menu #fa_welcome,#fa_right.notification #fa_menu #fa_welcome{color:#666}#fa_right #fa_menu ul,#fa_right.notification #fa_menu ul{display:none}#fa_right.welcome #fa_menu #fa_welcome{color:#333;background-color:#fff}#fa_right.welcome #fa_menu ul{display:block}#fa_menu:hover :visited,#fa_toolbar>#fa_right.notification>#fa_notifications{color:#333;background-color:#FFF}#fa_toolbar #fa_right .fa_separator{width:90%;height:1px;margin:0;padding:0;background-color:#CCC;text-align:center}#fa_menulist,#fa_toolbar #fa_right #notif_list{list-style-type:none;background-color:#FFF;z-index:999;position:absolute}#fa_menulist{display:none;margin:0;padding:0 10px;min-width:175px;width:auto;border:1px solid #333;line-height:32px;border-top:0 solid #FFF}#fa_menulist :link,#fa_menulist :visited{color:#00569C!important}#fa_toolbar_hidden{position:absolute;width:30px;height:30px;right:0;margin-top:-60px;background-color:#eee;border-radius:0 0 5px 5px;z-index:999}#fa_show{background-position:-240px 0}#fa_toolbar #fa_right #fa_notifications #notif_unread{display:none;margin-left:.5em}#fa_toolbar #fa_right #fa_notifications.unread #notif_unread{display:inline}#fa_toolbar #fa_right #notif_list{font-size:11px;display:none;margin:0;padding:0;border:1px solid #333;border-top:0 solid #FFF}#fa_toolbar #fa_right.notification #notif_list{display:block}#fa_toolbar #fa_right #notif_list li{margin:0;font-size:1em;padding:0 .5em .5em;color:#333;line-height:1.2em;display:block}#fa_toolbar #fa_right #notif_list li .contentText{float:left;width:27em;height:2.4em;overflow:hidden}#fa_toolbar #fa_right #notif_list li .contentText a{color:#00569C!important;text-decoration:underline!important;vertical-align:baseline}#fa_toolbar #fa_right #notif_list li:first-child{padding-top:.5em}#fa_toolbar #fa_right #notif_list li:first-child hr{display:none}#fa_toolbar #fa_right #notif_list li .content{width:30em;margin:0;display:block;overflow:hidden;vertical-align:top;color:inherit!important;line-height:inherit!important}#fa_toolbar #fa_right #notif_list li a.delete{width:22px;height:2.4em;background:url(https://illiweb.com/fa/i/toolbar/toolbar.png) -274px 50% no-repeat;float:right}#fa_toolbar #fa_right #notif_list li hr{margin:0 0 .5em;border:0 solid #ccc;border-top-width:1px}#fa_toolbar #fa_right #notif_list li.unread{font-weight:700;background-color:#e5e5e5}#fa_toolbar #fa_right #notif_list li.see_all{color:#fff;background-color:#333;padding:.7em!important;text-align:right}#fa_toolbar #fa_right #notif_list li.see_all a{color:#fff;width:100%}#fa_ranktitle,#fa_usermenu{width:120px;text-align:center}#fa_toolbar #live_notif{width:330px;position:absolute}#fa_toolbar #live_notif .fa_notification{background-color:#333;opacity:.8;border-radius:5px;padding:10px}#fa_toolbar #live_notif .fa_notification .content{padding-left:40px;display:inline-block;background-image:url(https://illiweb.com/fa/notifications/notifications.png);background-repeat:no-repeat;height:32px;font-size:11px;color:#fff;overflow:hidden}#fa_toolbar #live_notif .fa_notification a{text-decoration:underline!important;vertical-align:baseline}.fa_fix{position:fixed!important;position:absolute;top:0;right:0}#fa_toolbar .fa_hide{display:none!important}#fa_usermenu{position:absolute;left:0;padding:10px 20px 10px 10px;color:#333;font-size:12px}#fa_ranktitle{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#fa_ranktitle:hover{text-decoration:none!important;color:#333}#fa_usermenu td{padding:0;margin-bottom:5px;line-height:15px}#fa_usermenu td.first{text-align:right}#fa_usermenu td.bold{font-weight:700;text-align:left}#fa_usermenu img{max-width:120px;max-height:120px}#fa_menulist{padding-left:150px}\n#login_popup{width:350px;height:250px}',
                   submit : 'Submit'
        };
      }

    }
  },


  {
    info : 'Patching in updated styles',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {}
  }
];
