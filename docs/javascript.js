(function() {

  /* -- DEMO VIDEOS -- */
  for (var a = document.querySelectorAll('.bubble[data-video]'), i = 0, j = a.length; i < j; i++) {

    // adds event listener to the bubbles, so they display previews on click
    a[i].title = 'View Demo';
    a[i].addEventListener('click', function () {
      var overlay = document.createElement('DIV')
            video = document.createElement('VIDEO'),
             frag = document.createDocumentFragment();

      if (/giveTip/.test(this.className)) {
        this.className = this.className.replace('giveTip', '');
      }

      overlay.id = 'previewOverlay';
      overlay.addEventListener('click', closePreview);

      video.id = 'previewVideo';
      video.innerHTML = '<source src="https://sethclydesdale.github.io/forumactif-edge/video/' + this.dataset.video + '" type="video/mp4">Your browser does not support the video tag.';
      video.addEventListener('ended', closePreview);

      frag.appendChild(overlay);
      frag.appendChild(video);
      document.body.appendChild(frag);
      document.body.style.overflow = 'hidden';

      window.setTimeout(function () {
        overlay.className = 'visible';
        video.className = 'visible';
        video.play();
      }, 100);
    });

  }

  // closes preview when overlay is clicked or the video ends
  function closePreview () {
    if (this.className == 'visible') {
      var overlay = document.getElementById('previewOverlay'),
            video = document.getElementById('previewVideo');

      overlay.className = '';
      video.className = '';

      window.setTimeout(function () {
        document.body.removeChild(overlay);
        document.body.removeChild(video);
        document.body.style.overflow = '';
      }, 400);
    }
  };


  /* -- LANGUAGE SELECTOR -- */
  // create language selector
  var a = document.createElement('A'),
      list = document.createElement('DIV'),
      frag = document.createDocumentFragment(),
      links = document.getElementById('header-links'),
      GET = new XMLHttpRequest(),
      langCode = window.location.href.replace(/.*?\/forumactif-edge\/(.*?)\//, '$1');

  a.id = 'lang-selector';
  a.href = '#';
  a.innerHTML = langCode.length > 2 ? 'EN' : langCode.toUpperCase();
  a.onclick = function () {
    var rect = this.getBoundingClientRect(),
        list = document.getElementById('lang-list');

    list.style.display = list.style.display == 'none' ? 'block' : 'none';
    list.style.top = rect.top + 36 + 'px';
    list.style.right = (rect.right - rect.left) - 18 + 'px';

    return false;
  };

  list.id = 'lang-list';
  list.style.display = 'none';
  list.innerHTML = 'Loading...';
  list.onmouseleave = function () {
    this.style.display = 'none';
  };

  // get language list from the languages page
  if (window.sessionStorage && sessionStorage.langList) {
    list.innerHTML = sessionStorage.langList;
  } else {
    GET.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        for (var lang = this.responseText.match(/(<a class="button big" href=".*?">.*?<\/a>)/g), i = 0, j = lang.length, html = ''; i < j; i++) {
          html += lang[i].replace(/class="[^"]*?"/, '');
        }

        document.getElementById('lang-list').innerHTML = html;

        if (window.sessionStorage) {
          sessionStorage.langList = html;
        }
      }
    };

    GET.open('GET', 'https://raw.githubusercontent.com/SethClydesdale/forumactif-edge/master/docs/languages/index.html', true);
    GET.send();
  }

  frag.appendChild(a);
  frag.appendChild(list);
  links.appendChild(frag);

}());
