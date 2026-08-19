Drop Zuki's photos and videos in this folder, then tell the page about
them in manifest.json (in this same folder) — no HTML editing needed.

── Cover photo ──────────────────────────────────────────────────────────
Add a file named exactly cover.jpg here. It's picked up automatically as
Zuki's portrait on the home page and the photo next to her dedication.
Square-ish crops work best (it's shown as a circle on the home page).

── Gallery photos & videos ──────────────────────────────────────────────
1. Drop the file in this folder (e.g. photo-01.jpg, video-01.mp4).
2. Open manifest.json and add one entry for it:

     Photo:
       { "type": "image", "file": "photo-01.jpg", "caption": "" }

     Video (with an optional poster — a still image shown before it's
     opened; without one, the browser shows its own first frame):
       { "type": "video", "file": "video-01.mp4", "poster": "video-01-poster.jpg", "caption": "" }

   Every entry after the first needs a comma before it. Example with two
   photos and one video:

     [
       { "type": "image", "file": "photo-01.jpg", "caption": "" },
       { "type": "image", "file": "photo-02.jpg", "caption": "At the lake" },
       { "type": "video", "file": "video-01.mp4", "poster": "video-01-poster.jpg", "caption": "" }
     ]

3. Save manifest.json. The tile appears on the page automatically —
   no other file needs to change.

"caption" is optional on both — leave it as "" if you don't want one.
It shows under the photo/video when it's opened in the lightbox.

── A note on file size ──────────────────────────────────────────────────
Keep individual files reasonably small so the page loads quickly — a few
MB per photo, and videos ideally under ~50-100MB. GitHub also has a hard
100MB-per-file limit.

── If manifest.json has a typo ──────────────────────────────────────────
It's plain JSON — a missing comma or quote will make the whole gallery
silently not load (open the browser console to see the error). If that
happens, double-check brackets/commas against the example above.
