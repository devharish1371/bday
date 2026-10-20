// Small discoveries between the chapters. All personal copy lives in content.js / personalize/.
const foundNotes = new Set();
let letterOpened = false;
let wishTimer;
const allChapters = () => [...data.chapters, ...data.future];
function noteKey() { return screen === 'future' ? data.chapters.length + index : index; }
function secretButton() {
  const key = noteKey();
  return `<button class="secret-tab ${foundNotes.has(key) ? 'found' : ''}" data-action="secret" aria-label="Read the secret note tucked behind this photo"><span aria-hidden="true">♡</span> ${foundNotes.has(key) ? 'your little secret' : 'psst… turn me over'}</button>`;
}
function readSecret() {
  const key = noteKey(), chapter = allChapters()[key];
  foundNotes.add(key);
  const tab = app.querySelector('.secret-tab');
  if (tab) { tab.classList.add('found'); tab.innerHTML = '<span aria-hidden="true">♥</span> your little secret'; }
  const modal = document.querySelector('#keepsake-dialog');
  modal.querySelector('.keepsake-content').innerHTML = `<span class="eyebrow">TUCKED BEHIND ${esc(chapter.label.toUpperCase())}</span><h2 id="keepsake-title">Just between us.</h2><div class="note-rule"></div><p class="secret-copy">${esc(chapter.secret)}</p><span class="note-signature">yours, obviously. ♡</span><p class="collected-count">${foundNotes.size} of ${allChapters().length} little notes found</p>`;
  modal.showModal();
}
function noteCollection() {
  const modal = document.querySelector('#keepsake-dialog');
  modal.querySelector('.keepsake-content').innerHTML = `<span class="eyebrow">A FEW THINGS TO KEEP</span><h2 id="keepsake-title">Your pocketful of love.</h2><p class="collection-intro">${foundNotes.size ? 'Little notes you found along the way. Keep them for a day you need a smile.' : 'There’s a little note tucked behind each photo. Go back through our story and turn them over.'}</p><div class="collected-notes">${allChapters().map((chapter,key)=>foundNotes.has(key)?`<article><span class="eyebrow">${esc(chapter.label)}</span><p>${esc(chapter.secret)}</p></article>`:'').join('')}</div><p class="collected-count">${foundNotes.size} of ${allChapters().length} found · hidden behind the photos</p>`;
  modal.showModal();
}
function futureLetter() {
  screen = 'letter'; window.scrollTo(0,0);
  app.innerHTML = `<section class="letter-scene"><span class="eyebrow reveal">BEFORE WE TURN THE NEXT PAGE</span><h1 class="reveal" tabindex="-1">A little letter<br><em>for our someday.</em></h1><p class="scene-subtitle reveal">Some of my favourite memories haven’t happened yet.</p><div class="letter-envelope ${letterOpened?'opened':''}"><div class="envelope-shadow" aria-hidden="true"></div><div class="envelope-back" aria-hidden="true"></div><article class="letter-paper" ${letterOpened?'':'hidden'}><span class="letter-date">TO MY FAVOURITE PERSON</span><p>${esc(data.letter)}</p></article><div class="envelope-front" aria-hidden="true"></div><div class="envelope-flap" aria-hidden="true"></div><button class="wax-seal" data-action="open-letter" aria-label="Break the seal and open your letter" ${letterOpened?'hidden':''}>♡</button></div><p class="letter-hint handwriting" ${letterOpened?'hidden':''}>a little courage. a little hope. tap the seal. ↑</p><div class="letter-actions" ${letterOpened?'':'hidden'}><button class="button" data-action="enter-future">Let’s see our someday <span>→</span></button></div><button class="text-button" data-action="letter-back">← back to us, right now</button></section>`;
  focusHeading();
}
function openLetter() {
  letterOpened = true;
  const envelope = app.querySelector('.letter-envelope');
  envelope.classList.add('opened');
  envelope.querySelector('.letter-paper').hidden = false;
  envelope.querySelector('.wax-seal').hidden = true;
  app.querySelector('.letter-hint').hidden = true;
  app.querySelector('.letter-actions').hidden = false;
  app.querySelector('[data-action="enter-future"]').focus({preventScroll:true});
}
function wishScene() {
  screen = 'wish'; window.scrollTo(0,0);
  app.innerHTML = `<section class="wish-scene"><div class="wish-stars" aria-hidden="true">✧ <span>✦</span> ✧</div><span class="eyebrow reveal">JUST A MOMENT, BIRTHDAY GIRL</span><h1 class="reveal" tabindex="-1">Close your eyes.<br><em>Make a wish.</em></h1><p class="scene-subtitle reveal">Keep it a secret. I’ll be rooting for it anyway.</p><button class="wish-candle" data-action="wish" aria-label="Blow out the candle and reveal your birthday surprise"><span class="candle-glow" aria-hidden="true"></span><span class="candle-flame" aria-hidden="true"></span><span class="candle-wick" aria-hidden="true"></span><span class="candle-body" aria-hidden="true"></span><span class="candle-plate" aria-hidden="true"></span><span class="candle-smoke" aria-hidden="true"></span></button><p class="wish-instruction handwriting" role="status">ready? tap the candle to blow it out.</p><button class="button wish-button" data-action="wish">I made my wish <span>✧</span></button><button class="text-button" data-action="wish-back">← one more look at our future</button></section>`;
  focusHeading();
}
function blowCandle() {
  if (screen !== 'wish' || app.querySelector('.wish-scene').classList.contains('wished')) return;
  app.querySelector('.wish-scene').classList.add('wished');
  app.querySelector('.wish-instruction').textContent = 'May this be your sweetest year yet. ♡';
  app.querySelectorAll('[data-action="wish"]').forEach(button=>button.disabled = true);
  wishTimer = setTimeout(() => { if (screen === 'wish') { celebrate(); focusHeading(); } }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1900);
}
function handleExtra(action) {
  switch(action) {
    case 'secret': readSecret(); break;
    case 'collection': noteCollection(); break;
    case 'open-letter': openLetter(); break;
    case 'enter-future': story(true,0); focusHeading(); break;
    case 'letter-back': story(false,data.chapters.length-1); focusHeading(); break;
    case 'wish': blowCandle(); break;
    case 'wish-back': clearTimeout(wishTimer); story(true,data.future.length-1); focusHeading(); break;
    default: return false;
  }
  return true;
}
const keepsakeDialog = document.querySelector('#keepsake-dialog');
keepsakeDialog.querySelector('.close').addEventListener('click',()=>keepsakeDialog.close());
keepsakeDialog.addEventListener('click',event=>{
  if (event.target !== keepsakeDialog) return;
  const bounds=keepsakeDialog.getBoundingClientRect();
  if(event.clientX<bounds.left || event.clientX>bounds.right || event.clientY<bounds.top || event.clientY>bounds.bottom) keepsakeDialog.close();
});
