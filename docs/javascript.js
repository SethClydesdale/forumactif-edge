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

}());
