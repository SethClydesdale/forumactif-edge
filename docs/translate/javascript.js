// globals
var textarea = document.getElementById('webpage-code'),
    frame = document.getElementById('webpage-preview'),
    preview,
    scrollPosition = 0,
    GET = new XMLHttpRequest(),
    original = ''; // used to store original webpage code

// setup the preview and translation columns
function initTranslator (string) {
  original = string;
  textarea.value = string;
  updatePreview(textarea.value);

  // compile our translations by targeting elements we want to translate
  for (var toTranslate = preview.querySelectorAll('title, meta[name="description"], meta[name="keywords"], .title, .bubbleTitle, p, .button, .footertitle, #header-links a, .linklist li, #footer-end .col, [data-tip]'), translations = document.getElementById('translations'), frag = document.createDocumentFragment(), i = 0, j = toTranslate.length, html = '', text, row; i < j; i++) {
    text = document.createElement('TEXTAREA');
    text.className = 'translation';
    text.value = toTranslate[i].dataset.tip ? toTranslate[i].outerHTML.replace(/.*?data-tip="(.*?)".*/, '$1') :
                 toTranslate[i].tagName == 'META' ? toTranslate[i].outerHTML.replace(/.*?content="(.*?)".*/, '$1') :
                 toTranslate[i].outerHTML.replace(/^<.*?>/, '').replace(/<\/[^>]*?>$/, '');
    text.dataset.alias = (toTranslate[i].dataset.tip || toTranslate[i].tagName == 'META') ? text.value : toTranslate[i].outerHTML;
    text.onkeyup = function () {
      // get all translations
      for (var a = document.querySelectorAll('.translation'), i = 0, j = a.length, replacement = original, openTag, endTag; i < j; i++) {
        try {
          openTag = a[i].dataset.alias.match(/(^<.*?>)/)[1];
          endTag = a[i].dataset.alias.match(/(<\/.*?>$)/)[1];
        } catch (e) {
          openTag = '';
          endTag = '';
        }

        replacement = replacement.replace(new RegExp(a[i].dataset.alias, 'g'), openTag + a[i].value + endTag);
      }

      textarea.value = replacement; // update the webpage code

      updatePreview(textarea.value);
    }

    row = document.createElement('DIV');
    row.className = 'alias-row';
    row.innerHTML = '<div class="alias">' + (toTranslate[i].tagName == 'META' ? '<b>' + toTranslate[i].outerHTML.replace(/.*?name="(.*?)".*/, '$1') + ' : </b>' : toTranslate[i].tagName == 'TITLE' ? '<b>title : </b>' : '') + text.value + '</div>';

    row.appendChild(text);
    frag.appendChild(row);
  }

  translations.innerHTML = '';
  translations.appendChild(frag);
};


// open the iframe and apply the webpage code, as well as restore the scroll position
function updatePreview (value) {
  preview.open();
  preview.write(value);
  preview.close();

  frame.contentWindow.scrollTo(0, scrollPosition); // restore scroll position

  // listen to iframe scroll to keep scroll position while rewriting the document
  frame.contentWindow.onscroll = function () {
    scrollPosition = preview.body.scrollTop || preview.documentElement.scrollTop;
  };
};


try {
  preview = frame.contentDocument || frame.contentWindow.document;

  GET.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      initTranslator(this.responseText.replace(/<script>[\s\S][^<]*<\/script>/, ''));
    }
  };

  // get the English webpage html
  GET.open('GET', 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/docs/index.html', true);
  GET.send();

  document.getElementById('update').onclick = function () {
    initTranslator(textarea.value);
  };

  // warn before leaving page, in case changes haven't been saved
  window.onbeforeunload = function (e) {
    var warning = 'Are you sure you want to leave ? Any changes you have made will be lost.';
    e.returnValue = warning;
    return warning;
  };

} catch (e) {
  textarea.value = 'ERROR';
}
