FAE.update_step = [
  {
    info : 'Installing test-update-1.js',
    type : 'POST',
     url : 'part=modules&sub=html&mode=js_edit&extended_admin=1',
    data : {
                 title : '[FA EDGE] TEST-UPDATE-1.js',
               content : 'var dummy_1 = 1;',
      'js_placement[]' : 'allpages',
                  mode : 'save',
                submit : 'Submit'
    }
  }
];
