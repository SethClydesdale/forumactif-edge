FAE.update_step = [
  {
    info : 'Installing test-update-2.js',
    type : 'POST',
     url : 'part=modules&sub=html&mode=js_edit&extended_admin=1',
    data : {
                 title : '[FA EDGE] TEST-UPDATE-2.js',
               content : 'var dummy_2 = 1;',
      'js_placement[]' : 'allpages',
                  mode : 'save',
                submit : 'Submit'
    }
  }
];
