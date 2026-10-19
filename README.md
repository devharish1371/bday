# For you, always

A responsive birthday story built with HTML, CSS and JavaScript. No build dependencies.

## Preview

Run `python3 -m http.server 4173` in this directory and open http://localhost:4173/dist/.

## Personalize

Edit `dist/content.js`:
- Five `chapters`: baby, toddler, teen, adulthood, and now.
- Two `future` scenes: CMA success and your happy married life.
- Put photographs in `dist/assets/` and set each `image` to `assets/filename.jpg`.
- Replace each `message`, `title`, `caption`, `note`, and `alt` with your personal words.
- Put your recorded voice note in `dist/assets/`, set `voiceNote` to its path, and add `voiceTranscript`.
- The voice note opens with native playback controls; recording is supplied separately.

Images are intentionally illustrated placeholders. All current chapter messages are sample copy. No personal media is uploaded yet. Use portrait or square photos; the cards crop centrally.

## Interaction

The present-first choice removes the gift button and reveals the cheeky detour. The timeline supports direct chapter selection, back/next buttons, left/right keyboard arrows, and horizontal swipes. Future scenes lead to confetti and the voice-note dialog. Escape closes the dialog; closing pauses audio. Restart and replay are available. OS reduced-motion preference disables the animated reveals and confetti.

## Design research

- Storybook pacing: https://www.awwwards.com/sites/my-little-storybook
- Accessible carousel controls: https://www.w3.org/WAI/tutorials/carousels/
- Touch behavior: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action
- User-initiated audio: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay

The site uses Google Fonts with serif/sans-serif/cursive fallbacks. No analytics or tracking code. The Sites preview is owner-private by default; sharing must be configured before sending it to someone else.
