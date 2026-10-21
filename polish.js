// Quiet finishing touches: first-view photos and a voice-led closing moment.
const developedPhotos = new Set();
let voiceIsPlaying = false;
function quietVoiceStage(playing) {
  voiceIsPlaying = playing;
  document.body.classList.toggle('voice-listening', playing);
  if (playing) document.querySelector('#confetti').replaceChildren();
}
function developPhoto() {
  const photo = app.querySelector('.photo img');
  if (!photo || developedPhotos.has(photo.getAttribute('src'))) return;
  const reveal = () => {
    if (!photo.isConnected || !photo.naturalWidth) return;
    const key = photo.getAttribute('src');
    if (developedPhotos.has(key)) return;
    developedPhotos.add(key);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) photo.classList.add('photo-developing');
  };
  if (photo.complete) reveal();
  else photo.addEventListener('load', reveal, { once: true });
}
function prepareVoiceMoment(audio, slot) {
  const moment = document.createElement('div');
  moment.className = 'voice-moment';
  moment.innerHTML = `<div class="voice-wave" aria-hidden="true">${[12,22,16,31,23,38,26,17,33,22,36,25,16,29,19,12].map((height,i)=>`<span style="--height:${height}px;--beat:${i*.09}s"></span>`).join('')}</div><p class="listening-status" role="status">Whenever you’re ready, press play. ♡</p><div class="voice-ending" hidden><span class="eyebrow">ONE LAST THING, BABY</span><p></p></div><button class="text-button voice-replay" type="button" hidden>Hear it again ♡</button>`;
  moment.querySelector('.voice-ending p').textContent = data.voiceEnding;
  slot.prepend(moment);
  const status = moment.querySelector('.listening-status');
  const quiet = text => { moment.classList.remove('is-playing'); quietVoiceStage(false); status.textContent = text; };
  audio.addEventListener('playing', () => { quietVoiceStage(true); moment.querySelector('.voice-ending').hidden = true; moment.querySelector('.voice-replay').hidden = true; moment.classList.add('is-playing'); status.textContent = 'just listen, baby. ♡'; });
  audio.addEventListener('pause', () => quiet(audio.ended ? 'All my love. Always.' : 'Take your time. I’m right here.'));
  audio.addEventListener('waiting', () => quiet('One little moment…'));
  audio.addEventListener('error', () => quiet('The recording couldn’t load. Please try again.'));
  audio.addEventListener('ended', () => {
    quiet('All my love. Always.');
    const ending = moment.querySelector('.voice-ending');
    ending.hidden = false;
    ending.setAttribute('role','status');
    moment.querySelector('.voice-replay').hidden = false;
  });
  moment.querySelector('.voice-replay').addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play().catch(() => quiet('Press play on the player whenever you’re ready.'));
  });
}
function birthdayEntrance(burst) {
  if (!burst) return;
  const finale = app.querySelector('.finale');
  finale.classList.add('birthday-entrance');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Let her read the greeting before the celebration fills the page.
  setTimeout(() => {
    if (screen === 'finale' && finale.isConnected && !document.querySelector('dialog[open]')) { confetti(); chime(true); }
  }, 1150);
}

// Native dialogs keep keyboard focus inside the photograph and restore it on close.
const photoDialog = document.querySelector('#photo-dialog');
document.addEventListener('click', event => {
  const trigger = event.target.closest('.photo-open');
  if (!trigger) return;
  const image = trigger.querySelector('img');
  if (!image?.naturalWidth) return;
  const enlarged = photoDialog.querySelector('img');
  enlarged.src = image.src;
  enlarged.alt = image.alt;
  photoDialog.querySelector('figcaption').textContent = trigger.closest('.polaroid').querySelector('.photo-caption').textContent;
  photoDialog.showModal();
});
photoDialog.querySelector('.close').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', event => {
  if (event.target !== photoDialog) return;
  const bounds = photoDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) photoDialog.close();
});
document.querySelector('#gift-dialog').addEventListener('close', () => quietVoiceStage(false));
