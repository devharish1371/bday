# For you, always

A responsive birthday story built with HTML, CSS and JavaScript. No build dependencies.

## Preview

Run `python3 -m http.server 4173` in this directory and open http://localhost:4173/dist/.

## Personalize — start here

Open [dist/personalize/README.md](dist/personalize/README.md) for the folder map.

Each numbered folder has its own `message.txt`. Replace the sample words and drop a `photo.jpg` into that same folder. The site loads both automatically. Put your recording into `dist/personalize/08-voice-note/voice-note.mp3`, with an optional `transcript.txt`.

For headings, captions, handwritten notes, or different media filenames, edit the matching section in [dist/content.js](dist/content.js). Missing photos and audio keep their placeholders. Refresh the page after saving files; use the HTTP preview above rather than opening index.html directly.

The seven photo slots are baby, toddler, teen, adulthood, now, CMA success, and married life. All current messages are sample copy. No personal media is included yet.

GitHub stores the source; pushing changes there does not automatically update the separate Sites preview. Publish a new version after personalizing.

## Interaction

The present-first choice removes the gift button and reveals the cheeky detour. The timeline supports direct chapter selection, back/next buttons, left/right keyboard arrows, and horizontal swipes. Future scenes lead to confetti and the voice-note dialog. Escape closes the dialog; closing pauses audio. Restart and replay are available. OS reduced-motion preference disables the animated reveals and confetti.

## New little surprises

- Hidden notes behind every photo, collected in a “pocketful of love” on the finale. Edit each chapter’s `secret.txt`.
- A wax-sealed letter before the future scenes. Edit `dist/personalize/09-future-letter/letter.txt`.
- An animated wish candle before the birthday explosion; tap it or use the wish button. No microphone needed.
- Notes are collected for the current page visit; refreshing resets the collection.

## Birthday adventure

- Optional three-question boyfriend quiz: different affectionate replies, no wrong answers, and a skip option.
- Scratch-to-reveal date invitation with a keyboard-accessible reveal button.
- Downloadable PNG keepsakes for your letter and date invitation.
- Optional synthesized chimes, off by default.

Personalize the quiz and invitation in `dist/personalize/10-little-surprises/`. Invalid JSON falls back to the working sample content. The keepsake includes the full future letter, with height adjusted to fit its text. These features run entirely in the visitor’s browser.

## Design research

- Storybook pacing: https://www.awwwards.com/sites/my-little-storybook
- Accessible carousel controls: https://www.w3.org/WAI/tutorials/carousels/
- Touch behavior: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action
- User-initiated audio: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay

The site uses Google Fonts with serif/sans-serif/cursive fallbacks. No analytics or tracking code. The Sites preview is owner-private by default; sharing must be configured before sending it to someone else.
