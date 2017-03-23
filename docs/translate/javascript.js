// globals
var textarea = document.getElementById('webpage-code'),
    preview = document.getElementById('webpage-preview'),
    GET = new XMLHttpRequest(),
    original = ''; // used to store original webpage code

// setup the preview and translation columns
function initTranslator (string) {
  original = string;
  textarea.value = string;

  function setup () {
    for (var toTranslate = preview.querySelectorAll('.title, .bubbleTitle, p, .button, .footertitle, #header-links a, .linklist li, #footer-end .col, [data-tip]'), translations = document.getElementById('translations'), frag = document.createDocumentFragment(), i = 0, j = toTranslate.length, html = '', text, row; i < j; i++) {
      text = document.createElement('TEXTAREA');
      text.className = 'translation';
      text.value = toTranslate[i].dataset.tip ? toTranslate[i].outerHTML.replace(/.*?data-tip="(.*?)".*/, '$1') : toTranslate[i].outerHTML.replace(/^<.*?>/, '').replace(/<\/[^>]*?>$/, '');
      text.dataset.alias = toTranslate[i].dataset.tip ? text.value : toTranslate[i].outerHTML;
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

        // update the preview
        preview.open();
        preview.write(textarea.value);
        preview.close();
      }

      row = document.createElement('DIV');
      row.className = 'alias-row';
      row.innerHTML = '<div class="alias">' + text.value + '</div>';

      row.appendChild(text);
      frag.appendChild(row);
    }

    translations.innerHTML = '';
    translations.appendChild(frag);
  }

  // open the iframe and apply the webpage code
  preview.open();
  preview.write(textarea.value);
  preview.close();

  // wait until the frame contents are loaded, and then compole our translations by targeting elements we want to translate
  preview.addEventListener('DOMContentLoaded', setup);

}

try {
  preview = preview.contentDocument || preview.contentWindow.document;

  GET.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      initTranslator(this.responseText);
    }
  };

  // get the English webpage html
  GET.open('GET', 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/docs/index.html', true);
  GET.send();

  document.getElementById('update').onclick = function () {
    initTranslator(textarea.value);
  };

  window.onbeforeunload = function (e) {
    var warning = 'Are you sure you want to leave ? Any changes you have made will be lost.';
    e.returnValue = warning;
    return warning;
  };

} catch (e) {
  textarea.value = 'ERROR';
}
