// ForeverNear.us — gallery renderer
// Reads media/manifest.json (relative to the current page) and builds the
// gallery tiles. Adding a photo/video no longer requires editing HTML —
// just drop the file in media/ and add one entry to manifest.json.
//
// manifest.json format, one object per photo or video:
//   { "type": "image", "file": "photo-01.jpg", "caption": "" }
//   { "type": "video", "file": "video-01.mp4", "poster": "video-01-poster.jpg", "caption": "" }
// "poster" (video only) is a still-frame image shown in the grid before
// it's opened; if omitted, the browser's own first frame is used instead.
// "caption" is optional on both.

(async function () {
  const container = document.getElementById('gallery');
  if (!container) return;

  let items;
  try {
    const res = await fetch('./media/manifest.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('manifest.json not found (' + res.status + ')');
    items = await res.json();
  } catch (err) {
    console.error('ForeverNear: could not load gallery manifest —', err);
    return;
  }

  if (!Array.isArray(items) || items.length === 0) return;

  const frag = document.createDocumentFragment();

  items.forEach(function (item) {
    if (!item || !item.file || (item.type !== 'image' && item.type !== 'video')) return;

    const btn = document.createElement('button');
    btn.className = 'gallery-item' + (item.type === 'video' ? ' is-video' : '');
    btn.setAttribute('data-lightbox', item.type);
    btn.setAttribute('data-src', './media/' + item.file);
    if (item.caption) btn.setAttribute('data-caption', item.caption);

    if (item.type === 'video') {
      if (item.poster) {
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.alt = item.caption || 'Video of Zuki';
        img.src = './media/' + item.poster;
        btn.appendChild(img);
      } else {
        const video = document.createElement('video');
        video.src = './media/' + item.file;
        video.muted = true;
        video.preload = 'metadata';
        btn.appendChild(video);
      }
    } else {
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = item.caption || 'Zuki';
      img.src = './media/' + item.file;
      btn.appendChild(img);
    }

    frag.appendChild(btn);
  });

  container.appendChild(frag);
})();
