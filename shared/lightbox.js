// ForeverNear.us — shared lightbox
// Opens any element with [data-lightbox] (image or video) in an in-page overlay.
// Nothing here triggers a download; videos use native controls and play inline.

(function () {
  function buildOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <button class="lb-close" aria-label="Close">&times;</button>
      <div class="lb-stage"></div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  const overlay = buildOverlay();
  const stage = overlay.querySelector('.lb-stage');
  const closeBtn = overlay.querySelector('.lb-close');

  function close() {
    overlay.classList.remove('is-open');
    stage.innerHTML = ''; // stop any playing video
    document.body.style.overflow = '';
  }

  function open(el) {
    stage.innerHTML = '';
    const type = el.getAttribute('data-lightbox');
    const src = el.getAttribute('data-src') || el.currentSrc || el.src;
    const caption = el.getAttribute('data-caption') || '';

    let media;
    if (type === 'video') {
      media = document.createElement('video');
      media.src = src;
      media.controls = true;
      media.autoplay = true;
      media.playsInline = true;
      // Discourage the browser's own download affordance where supported.
      media.setAttribute('controlsList', 'nodownload');
    } else {
      media = document.createElement('img');
      media.src = src;
      media.alt = caption;
    }
    stage.appendChild(media);

    if (caption) {
      const cap = document.createElement('p');
      cap.className = 'lb-caption';
      cap.textContent = caption;
      stage.appendChild(cap);
    }

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-lightbox]');
    if (trigger) {
      e.preventDefault();
      open(trigger);
    }
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
})();
