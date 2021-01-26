/*

  # Changes in v1.3.2

  - fixed display of chatbox channels.
  - fixed display of the GIF and mention button in the editor.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.3.2';

FAE.update_step = [
  {
    info : 'Getting forum stylesheet',
    type : 'GET',
     url : '/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[method="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data = {
                edit_code : form.edit_code.value
                            /* replacements */
                            .replace('#chatbox_members:hover + #chatbox', '#chatbox_members:hover ~ #chatbox')
                            .replace('#chatbox_members:hover+#chatbox', '#chatbox_members:hover~#chatbox')
                            .replace(/#chatbox_members/gm, '.chatbox-members')+
                            /*new css*/
                            '\n/* added in FAE v1.3.2 */#chatbox_channels:after{content:"Hover over to see channels."}#chatbox_channels > ul, #chatbox_channels > .channels-title{width:100%}.chatbox-message-username{cursor:pointer}.chatbox-members{top:40px!important}.cb_delete_msg{display:inline-block!important}#tab_selector_cb{height:40px;width:180px;position:absolute;top:0;left:50%;margin-left:-90px}#cb_switch_channels,#cb_switch_members{cursor:pointer;position:relative;width:90px;height:40px}#cb_switch_channels{right:0}.cb_active_btn{background-color:#cadceb}.contact-list .person{border-bottom:1px solid rgba(112,108,114,.3);cursor:pointer;margin:0!important;padding:10px 0;position:relative}.person .info{display:inline-block;padding:0 0 0 10px;width:auto}.contact-list .name{color:var(--color_channel,#105289);display:block;font-size:1.2em;font-weight:700;position:relative}.contact-list .person:hover,contact-list .person.active{background:rgba(0,0,0,.1)}.contact-list .person.active:after{border-right:4px solid var(--color_channel,#105289);bottom:0;box-shadow:inset -4px 0 4px -4px var(--color_channel,#105289);content:"";display:block;left:0;position:absolute;top:0}.sceditor-button-giphy div{background-image:url(https://2img.net/i//fa/icon_gif.png)!important}.sceditor-button-giphy:after,.sceditor-button-giphy:before,.sceditor-button-mention:after,.sceditor-button-mention:before{content:""}',
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