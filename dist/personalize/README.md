# Start here ♡

Each numbered folder maps to exactly one part of the website.

| Folder | Photo | Message | Appears at |
| --- | --- | --- | --- |
| 01-baby | photo.jpeg | message.txt | Little you |
| 02-toddler | photo.jpeg | message.txt | Tiny explorer |
| 03-teen | photo.jpeg | message.txt | Teenage you |
| 04-adulthood | photo.jpeg | message.txt | Finding yourself |
| 05-now | photo.jpeg | message.txt | You, now |
| 06-cma | photo.jpeg | message.txt | CMA future dream |
| 07-married-life | photo.jpeg | message.txt | Our forever |
| 08-voice-note | voice-note.m4a | transcript.txt | Final present dialog |

1. Put each photo in its matching folder, named `photo.jpeg`.
2. Open that folder's `message.txt`, edit your message, and save.
3. Each photo folder also has a `secret.txt`: edit it to change the hidden note behind that photo.
4. Edit `09-future-letter/letter.txt` for the sealed letter before the future scenes.
5. Put your voice recording in `08-voice-note/voice-note.m4a`.
6. Optionally write its transcript in `08-voice-note/transcript.txt`.
7. Preview through a local HTTP server, then commit and deploy your updated files.

No code edits are needed with those filenames. Files are loaded on page open; refresh after changes. The current photos, recording, and messages are connected. The same personal text is included in content.js as a fallback.

For a PNG/WebP photo or M4A recording, keep the real extension and update the corresponding path in `../content.js`. That file also has a clearly separated section for each chapter's heading, caption, and handwritten note. Use square or portrait photos; cards crop around the center.

These folders are part of the website. Only add media you intend to include in the published birthday experience.

Secret-note discoveries last for the current page visit. Reloading starts a fresh collection. The wish candle uses a tap or keyboard activation; it does not request microphone access.

## Quiz and scratch-card gift

Edit `10-little-surprises/quiz.json` for the optional quiz and `10-little-surprises/coupon.json` for the date invitation. Every quiz choice has its own reply. Your quiz and movie-screening invitation are connected.

The finale lets her download your future letter as a birthday PNG. The scratch-card page has a separate PNG save button for its invitation.
