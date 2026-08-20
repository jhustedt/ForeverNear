// ForeverNear.us — shared lightbox
// Opens any element with [data-lightbox] (image or video) in an in-page overlay.
// Supports moving between items with on-screen prev/next buttons and the
// left/right arrow keys, without closing the overlay in between.
// Nothing here triggers a download; videos use native controls and play inline.

(function () {
  function buildOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <button class="lb-close" aria-label="Close">&times;</button>
      <button class="lb-nav lb-prev" aria-label="Previous">&#10094;</button>
      <div class="lb-stage"></div>
      <button class="lb-nav lb-next" aria-label="Next">&#10095;</button>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  const overlay = buildOverlay();
  const stage = overlay.querySelector('.lb-stage');
  const closeBtn = overlay.querySelector('.lb-close');
  const prevBtn = overlay.querySelector('.lb-prev');
  const nextBtn = overlay.querySelector('.lb-next');

  let items = [];
  let currentIndex = -1;

  function getItems() {
    return Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  }

  function updateNavVisibility() {
    const show = items.length > 1;
    prevBtn.style.display = show ? '' : 'none';
    nextBtn.style.display = show ? '' : 'none';
  }

  function render(el) {
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
  }

  function openAt(index) {
    items = getItems();
    if (index < 0 || index >= items.length) return;
    currentIndex = index;
    render(items[currentIndex]);
    updateNavVisibility();
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function next() {
    if (items.length === 0) return;
    openAt((currentIndex + 1) % items.length);
  }

  function prev() {
    if (items.length === 0) return;
    openAt((currentIndex - 1 + items.length) % items.length);
  }

  function close() {
    overlay.classList.remove('is-open');
    stage.innerHTML = ''; // stop any playing video
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-lightbox]');
    if (trigger) {
      e.preventDefault();
      const all = getItems();
      openAt(all.indexOf(trigger));
    }
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  });
})();
