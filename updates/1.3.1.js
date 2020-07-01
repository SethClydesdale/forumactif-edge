/*

  # Changes in v1.3.1

  - added support for the new like/dislike system.

*/

FAE.update_tag = 'https://github.com/SethClydesdale/forumactif-edge/releases/tag/v1.3.1';

FAE.update_step = [
  {
    info : 'Getting template viewcomments_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=131&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        // update the template ONLY if the changes are not present
        if (/fa_like_div/.test(form.template.value)) {
          FAE.index = FAE.index + 2;
          FAE.log('The template viewcomments_body.html already contains the necessary changes. Skipping template modifications...', 'font-weight:bold;');
          
        } else {
          FAE.step[FAE.index + 1].data.template = form.template.value
          .replace(/			<div class="clear"><\/div>\n    <\/div>/, `			<div class="clear"></div>
      
			<!-- BEGIN switch_likes_active -->
			<div class="fa_like_div">
				<!-- BEGIN switch_like_list -->
				{postrow.displayed.switch_likes_active.switch_like_list.D_LIKE_LIST}
				<!-- END switch_like_list -->
				<!-- BEGIN switch_dislike_list -->
				{postrow.displayed.switch_likes_active.switch_dislike_list.D_DISLIKE_LIST}
				<!-- END switch_dislike_list -->
				<button class="rep-button {postrow.displayed.switch_likes_active.C_VOTE_LIKE}"  data-href="{postrow.displayed.switch_likes_active.U_VOTE_LIKE}" data-href-rm="{postrow.displayed.switch_likes_active.U_VOTE_RM_LIKE}">
					<svg width="13px" height="13px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 1344q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5t45.5 18.5q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19h-288q-26 0-45-19t-19-45v-640q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149 15 44 15 76 3 76-43 137 17 56 0 117-15 57-54 94 9 112-49 181-64 76-197 78h-129q-66 0-144-15.5t-121.5-29-120.5-39.5q-123-43-158-44-26-1-45-19.5t-19-44.5v-641q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120 18-18 31-48t17.5-48.5 13.5-60.5q7-39 12.5-61t19.5-52 34-50q19-19 45-19 46 0 82.5 10.5t60 26 40 40.5 24 45 12 50 5 45 .5 39q0 38-9.5 76t-19 60-27.5 56q-3 6-10 18t-11 22-8 24h277q78 0 135 57t57 135z" fill="#666"/></svg>
					<span>{postrow.displayed.switch_likes_active.L_LIKE}</span>{postrow.displayed.switch_likes_active.COUNT_VOTE_LIKE}
				</button>
				<!-- BEGIN switch_dislike_button -->
				<button class="rep-button {postrow.displayed.switch_likes_active.switch_dislike_button.C_VOTE_DISLIKE}" data-href="{postrow.displayed.switch_likes_active.switch_dislike_button.U_VOTE_DISLIKE}" data-href-rm="{postrow.displayed.switch_likes_active.switch_dislike_button.U_VOTE_RM_LIKE}">
					<svg width="13px" height="13px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 576q0 26-19 45t-45 19q-27 0-45.5-19t-18.5-45q0-27 18.5-45.5t45.5-18.5q26 0 45 18.5t19 45.5zm160 512v-640q0-26-19-45t-45-19h-288q-26 0-45 19t-19 45v640q0 26 19 45t45 19h288q26 0 45-19t19-45zm1129-149q55 61 55 149-1 78-57.5 135t-134.5 57h-277q4 14 8 24t11 22 10 18q18 37 27 57t19 58.5 10 76.5q0 24-.5 39t-5 45-12 50-24 45-40 40.5-60 26-82.5 10.5q-26 0-45-19-20-20-34-50t-19.5-52-12.5-61q-9-42-13.5-60.5t-17.5-48.5-31-48q-33-33-101-120-49-64-101-121t-76-59q-25-2-43-20.5t-18-43.5v-641q0-26 19-44.5t45-19.5q35-1 158-44 77-26 120.5-39.5t121.5-29 144-15.5h129q133 2 197 78 58 69 49 181 39 37 54 94 17 61 0 117 46 61 43 137 0 32-15 76z" fill="#666"/></svg>
					<span>{postrow.displayed.switch_likes_active.switch_dislike_button.L_DISLIKE}</span>{postrow.displayed.switch_likes_active.switch_dislike_button.COUNT_VOTE_DISLIKE}
				</button>
				<!-- END switch_dislike_button -->
			</div>
			<!-- END switch_likes_active -->
    </div>`)
          
          .replace(/          <div class="clear"><\/div>\n				<\/div>/, `          <div class="clear"></div>
					<!-- BEGIN switch_likes_active -->
					<div class="fa_like_div">
						<!-- BEGIN switch_like_list -->
						{comment.displayed.switch_likes_active.switch_like_list.D_LIKE_LIST}
						<!-- END switch_like_list -->
						<!-- BEGIN switch_dislike_list -->
						{comment.displayed.switch_likes_active.switch_dislike_list.D_DISLIKE_LIST}
						<!-- END switch_dislike_list -->
						<button class="rep-button {comment.displayed.switch_likes_active.C_VOTE_LIKE}"  data-href="{comment.displayed.switch_likes_active.U_VOTE_LIKE}" data-href-rm="{comment.displayed.switch_likes_active.U_VOTE_RM_LIKE}">
							<svg width="13px" height="13px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 1344q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5t45.5 18.5q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19h-288q-26 0-45-19t-19-45v-640q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149 15 44 15 76 3 76-43 137 17 56 0 117-15 57-54 94 9 112-49 181-64 76-197 78h-129q-66 0-144-15.5t-121.5-29-120.5-39.5q-123-43-158-44-26-1-45-19.5t-19-44.5v-641q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120 18-18 31-48t17.5-48.5 13.5-60.5q7-39 12.5-61t19.5-52 34-50q19-19 45-19 46 0 82.5 10.5t60 26 40 40.5 24 45 12 50 5 45 .5 39q0 38-9.5 76t-19 60-27.5 56q-3 6-10 18t-11 22-8 24h277q78 0 135 57t57 135z" fill="#666"/></svg>
							<span>{comment.displayed.switch_likes_active.L_LIKE}</span>{comment.displayed.switch_likes_active.COUNT_VOTE_LIKE}
						</button>
						<!-- BEGIN switch_dislike_button -->
						<button class="rep-button {comment.displayed.switch_likes_active.switch_dislike_button.C_VOTE_DISLIKE}" data-href="{comment.displayed.switch_likes_active.switch_dislike_button.U_VOTE_DISLIKE}" data-href-rm="{comment.displayed.switch_likes_active.switch_dislike_button.U_VOTE_RM_LIKE}">
							<svg width="13px" height="13px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 576q0 26-19 45t-45 19q-27 0-45.5-19t-18.5-45q0-27 18.5-45.5t45.5-18.5q26 0 45 18.5t19 45.5zm160 512v-640q0-26-19-45t-45-19h-288q-26 0-45 19t-19 45v640q0 26 19 45t45 19h288q26 0 45-19t19-45zm1129-149q55 61 55 149-1 78-57.5 135t-134.5 57h-277q4 14 8 24t11 22 10 18q18 37 27 57t19 58.5 10 76.5q0 24-.5 39t-5 45-12 50-24 45-40 40.5-60 26-82.5 10.5q-26 0-45-19-20-20-34-50t-19.5-52-12.5-61q-9-42-13.5-60.5t-17.5-48.5-31-48q-33-33-101-120-49-64-101-121t-76-59q-25-2-43-20.5t-18-43.5v-641q0-26 19-44.5t45-19.5q35-1 158-44 77-26 120.5-39.5t121.5-29 144-15.5h129q133 2 197 78 58 69 49 181 39 37 54 94 17 61 0 117 46 61 43 137 0 32-15 76z" fill="#666"/></svg>
							<span>{comment.displayed.switch_likes_active.switch_dislike_button.L_DISLIKE}</span>{comment.displayed.switch_likes_active.switch_dislike_button.COUNT_VOTE_DISLIKE}
						</button>
						<!-- END switch_dislike_button -->
					</div>
					<!-- END switch_likes_active -->
				</div>`);
        }
      }
    }
  },


  {
    info : 'Updating template viewcomments_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 131,
             l : 'main',
      tpl_name : 'viewcomments_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template viewcomments_body.html',
    type : 'PUBLISH',
     tpl : 131
  },
  
  
  {
    info : 'Getting template viewtopic_body.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=127&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        // update the template ONLY if the changes are not present
        if (/fa_like_div/.test(form.template.value)) {
          FAE.index = FAE.index + 2;
          FAE.log('The template viewtopic_body.html already contains the necessary changes. Skipping template modifications...', 'font-weight:bold;');
          
        } else {
          FAE.step[FAE.index + 1].data.template = form.template.value
          .replace(/			<div class="clear"><\/div>\n    <\/div>/, `			<div class="clear"></div>
      
			<!-- BEGIN switch_likes_active -->
			<div class="fa_like_div">
				<!-- BEGIN switch_like_list -->
				{postrow.displayed.switch_likes_active.switch_like_list.D_LIKE_LIST}
				<!-- END switch_like_list -->
				<!-- BEGIN switch_dislike_list -->
				{postrow.displayed.switch_likes_active.switch_dislike_list.D_DISLIKE_LIST}
				<!-- END switch_dislike_list -->
				<button class="rep-button {postrow.displayed.switch_likes_active.C_VOTE_LIKE}"  data-href="{postrow.displayed.switch_likes_active.U_VOTE_LIKE}" data-href-rm="{postrow.displayed.switch_likes_active.U_VOTE_RM_LIKE}">
					<svg width="13px" height="13px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 1344q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5t45.5 18.5q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19h-288q-26 0-45-19t-19-45v-640q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149 15 44 15 76 3 76-43 137 17 56 0 117-15 57-54 94 9 112-49 181-64 76-197 78h-129q-66 0-144-15.5t-121.5-29-120.5-39.5q-123-43-158-44-26-1-45-19.5t-19-44.5v-641q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120 18-18 31-48t17.5-48.5 13.5-60.5q7-39 12.5-61t19.5-52 34-50q19-19 45-19 46 0 82.5 10.5t60 26 40 40.5 24 45 12 50 5 45 .5 39q0 38-9.5 76t-19 60-27.5 56q-3 6-10 18t-11 22-8 24h277q78 0 135 57t57 135z" fill="#666"/></svg>
					<span>{postrow.displayed.switch_likes_active.L_LIKE}</span>{postrow.displayed.switch_likes_active.COUNT_VOTE_LIKE}
				</button>
				<!-- BEGIN switch_dislike_button -->
				<button class="rep-button {postrow.displayed.switch_likes_active.switch_dislike_button.C_VOTE_DISLIKE}" data-href="{postrow.displayed.switch_likes_active.switch_dislike_button.U_VOTE_DISLIKE}" data-href-rm="{postrow.displayed.switch_likes_active.switch_dislike_button.U_VOTE_RM_LIKE}">
					<svg width="13px" height="13px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 576q0 26-19 45t-45 19q-27 0-45.5-19t-18.5-45q0-27 18.5-45.5t45.5-18.5q26 0 45 18.5t19 45.5zm160 512v-640q0-26-19-45t-45-19h-288q-26 0-45 19t-19 45v640q0 26 19 45t45 19h288q26 0 45-19t19-45zm1129-149q55 61 55 149-1 78-57.5 135t-134.5 57h-277q4 14 8 24t11 22 10 18q18 37 27 57t19 58.5 10 76.5q0 24-.5 39t-5 45-12 50-24 45-40 40.5-60 26-82.5 10.5q-26 0-45-19-20-20-34-50t-19.5-52-12.5-61q-9-42-13.5-60.5t-17.5-48.5-31-48q-33-33-101-120-49-64-101-121t-76-59q-25-2-43-20.5t-18-43.5v-641q0-26 19-44.5t45-19.5q35-1 158-44 77-26 120.5-39.5t121.5-29 144-15.5h129q133 2 197 78 58 69 49 181 39 37 54 94 17 61 0 117 46 61 43 137 0 32-15 76z" fill="#666"/></svg>
					<span>{postrow.displayed.switch_likes_active.switch_dislike_button.L_DISLIKE}</span>{postrow.displayed.switch_likes_active.switch_dislike_button.COUNT_VOTE_DISLIKE}
				</button>
				<!-- END switch_dislike_button -->
			</div>
			<!-- END switch_likes_active -->
    </div>`);
        }
      }
    }
  },


  {
    info : 'Updating template viewtopic_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 127,
             l : 'main',
      tpl_name : 'viewtopic_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template viewtopic_body.html',
    type : 'PUBLISH',
     tpl : 127
  },
  
  
  {
    info : 'Getting template overall_header.html',
    type : 'GET',
     url : '/admin/index.forum?part=themes&sub=templates&mode=edit_main&t=116&l=main&extended_admin=1&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[name="post"]', d)[0];

      if (form) {
        // update the template ONLY if the changes are not present
        if (/switch_like_popup/.test(form.template.value)) {
          FAE.index = FAE.index + 2;
          FAE.log('The template overall_header.html already contains the necessary changes. Skipping template modifications...', 'font-weight:bold;');
          
        } else {
          FAE.step[FAE.index + 1].data.template = form.template.value
          .replace('<a id="top" name="top" accesskey="t"></a>', `
<!-- BEGIN switch_like_popup -->
<div id="like_popup" style="z-index: 10000 !important;">
	<div class="h3">{SITENAME}</div>
	{LIKE_POPUP_MSG}
	<div id="like_popup_buttons">
		<form action="{S_LOGIN_ACTION}" method="get">
			<input type="submit" class="button1" value="{L_LOGIN}"/>
			<input type="button" class="button1" value="{L_REGISTER}" onclick="parent.location='{U_REGISTER}';"/>
			<input id="like_popup_close" type="button" class="button2" value="{L_LIKE_CLOSE}"/>
		</form>
	</div>
</div>
<!-- END switch_like_popup -->

<a id="top" name="top" accesskey="t"></a>`);
        }
      }
    }
  },


  {
    info : 'Updating template overall_header.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 116,
             l : 'main',
      tpl_name : 'overall_header',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template overall_header.html',
    type : 'PUBLISH',
     tpl : 116
  },
  
  
  {
    info : 'Getting forum stylesheet',
    type : 'GET',
     url : '/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid,
    func : function(d) {
      var form = $('form[method="post"]', d)[0];

      if (form) {
        FAE.step[FAE.index + 1].data = {
                edit_code : form.edit_code.value + '\n/* added in FAE v1.3.1 */\n.fa_like_div{clear:both;padding-top:2em}#blog_comments .fa_like_div{margin:0;width:96%}.rep-nb{border-left:1px solid #c7c3bf;display:inline-block;font-weight:700;line-height:9px;margin-left:11px;padding-left:6px}.rep-button,.rep-button:active,.rep-button:focus{background:linear-gradient(#ffffff0%,#e9e9e9100%);border:1px solid #858585;border-radius:4px;box-shadow:0 0 0 1px #fff inset;color:#d31141;cursor:pointer;font-family:Trebuchet MS;font-size:11px;font-weight:700;line-height:1;margin:3px 11px 0 0;outline:0;padding:1px 7px 1px 9px;position:relative;text-transform:uppercase;transition:color .4s}.rep-button i,.rep-button svg{color:#666;display:block;float:left;font-size:13px;margin-left:-12px;margin-right:6px;margin-top:-5px;text-shadow:0 0 1px #fff}.fa_disliked i{color:#f44336}.fa_disliked path{fill:#f44336}.fa_liked i{color:#4caf50}.fa_liked path{fill:#4caf50}.fa_dislike_list,.fa_like_list{background-color:rgba(0,26,60,.04);border-radius:3px;padding:5px}.fa_like_others{background:0 0;border:none;color:#0474bf;cursor:pointer;display:inline-block;font-family:inherit;font-size:inherit;outline:0;position:relative}.fa_like_others:focus,.fa_like_others:hover{color:#2b2b2b}.fa_like_others .fa_like_tooltip{background-color:#555;border-radius:6px;bottom:125%;color:#fff;left:50%;margin-left:-40px;min-width:80px;opacity:0;padding:5px 10px;position:absolute;text-align:left;transition:opacity .3s;visibility:hidden;z-index:10}.fa_like_others .fa_like_tooltip a{color:#fff}.fa_like_others .fa_like_tooltip::after{border-color:#555 transparent transparent;border-style:solid;border-width:5px;content:"";left:40px;margin-left:-5px;position:absolute;top:100%}.fa_like_others:focus .fa_like_tooltip{opacity:1;visibility:visible}.fa_like_others a{color:#fff}',
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