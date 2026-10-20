# Start here ♡

Each numbered folder maps to exactly one part of the website.

| Folder | Photo | Message | Appears at |
| --- | --- | --- | --- |
| 01-baby | photo.jpg | message.txt | Little you |
| 02-toddler | photo.jpg | message.txt | Tiny explorer |
| 03-teen | photo.jpg | message.txt | Teenage you |
| 04-adulthood | photo.jpg | message.txt | Finding yourself |
| 05-now | photo.jpg | message.txt | You, now |
| 06-cma | photo.jpg | message.txt | CMA future dream |
| 07-married-life | photo.jpg | message.txt | Our forever |
| 08-voice-note | voice-note.mp3 | transcript.txt | Final present dialog |

1. Put each photo in its matching folder, named `photo.jpg`.
2. Open that folder's `message.txt`, replace the sample words, and save.
3. Each photo folder also has a `secret.txt`: edit it to change the hidden note behind that photo.
4. Edit `09-future-letter/letter.txt` for the sealed letter before the future scenes.
5. Put your voice recording in `08-voice-note/voice-note.mp3`.
6. Optionally write its transcript in `08-voice-note/transcript.txt`.
7. Preview through a local HTTP server, then commit and deploy your updated files.

No code edits are needed with those filenames. Files are loaded on page open; refresh after changes. Missing photos keep the illustrations. Missing audio keeps the gift placeholder. Blank messages use the sample copy from content.js.

For a PNG/WebP photo or M4A recording, keep the real extension and update the corresponding path in `../content.js`. That file also has a clearly separated section for each chapter's heading, caption, and handwritten note. Use square or portrait photos; cards crop around the center.

These folders are part of the website. Only add media you intend to include in the published birthday experience.

Secret-note discoveries last for the current page visit. Reloading starts a fresh collection. The wish candle uses a tap or keyboard activation; it does not request microphone access.

## Quiz and scratch-card gift

Edit `10-little-surprises/quiz.json` for the optional quiz and `10-little-surprises/coupon.json` for the date invitation. Every quiz choice has its own reply. All current questions and gift wording are samples—swap in your inside jokes and a date you want to give her.

The finale lets her download your future letter as a birthday PNG. The scratch-card page has a separate PNG save button for its invitation.
