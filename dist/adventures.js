// Optional playful moments. No answer is wrong and nothing blocks the love story.
let quizIndex = 0;
let quizAnswered = false;
let soundEnabled = false;
let audioContext;
let scratchRevealed = false;
let savingCard = false;
let movieChoice = '';
let customMovie = '';
const selectedMovie = () => movieChoice === 'custom' ? customMovie.trim() : movieChoice;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function chime(final = false) {
  if (!soundEnabled) return;
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    audioContext ||= new Audio();
    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
    const now = audioContext.currentTime;
    (final ? [523.25,659.25,783.99,1046.5] : [659.25,783.99]).forEach((frequency,i) => {
      const oscillator = audioContext.createOscillator(), gain = audioContext.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = frequency;
      const start = now + i * .13;
      gain.gain.setValueAtTime(0,start);
      gain.gain.linearRampToValueAtTime(.035,start+.02);
      gain.gain.exponentialRampToValueAtTime(.001,start+.65);
      oscillator.connect(gain); gain.connect(audioContext.destination);
      oscillator.start(start); oscillator.stop(start+.7);
      oscillator.onended=()=>{oscillator.disconnect();gain.disconnect()};
    });
  } catch { /* Sound is optional; the story remains fully usable. */ }
}
function toggleSound() {
  soundEnabled = !soundEnabled;
  const button = document.querySelector('#sound-toggle');
  button.setAttribute('aria-pressed',String(soundEnabled));
  button.textContent = soundEnabled ? '♪ sound on' : '♪ sound off';
  chime();
}
function quizScene(position=0) {
  screen='quiz'; quizIndex=position; quizAnswered=false; window.scrollTo(0,0);
  const question=data.quiz[quizIndex];
  app.innerHTML=`<section class="quiz-scene"><span class="eyebrow reveal">A VERY UNOFFICIAL BOYFRIEND QUIZ</span><div class="quiz-progress" aria-label="Question ${quizIndex+1} of ${data.quiz.length}">${data.quiz.map((_,i)=>`<span class="${i<=quizIndex?'filled':''}"></span>`).join('')}</div><div class="quiz-stamp" aria-hidden="true">100%<br><small>biased</small></div><h1 tabindex="-1">${esc(question.question)}</h1><p class="scene-subtitle">No wrong answers. Just a suspicious amount of affection.</p><div class="quiz-options">${question.answers.map((answer,i)=>`<button class="quiz-choice" data-action="quiz-answer" data-choice="${i}"><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${esc(answer.label)}</span><span aria-hidden="true">↗</span></button>`).join('')}</div><div class="quiz-reply" role="status" hidden></div><button class="button quiz-next" data-action="quiz-next" hidden>${quizIndex===data.quiz.length-1?'The highly scientific result':'Next very serious question'} <span>→</span></button><button class="text-button" data-action="skip-quiz">Skip the silliness, show me our future →</button></section>`;
  focusHeading();
}
function answerQuiz(choice) {
  if(quizAnswered || !Number.isInteger(choice))return;
  const answer=data.quiz[quizIndex].answers[choice]; if(!answer)return;
  quizAnswered=true;
  app.querySelectorAll('.quiz-choice').forEach((button,i)=>{button.disabled=true;button.classList.toggle('chosen',i===choice)});
  const reply=app.querySelector('.quiz-reply');reply.textContent=answer.reply;reply.hidden=false;
  const nextButton=app.querySelector('.quiz-next');nextButton.hidden=false;
  chime();nextButton.focus({preventScroll:true});
}
function quizResult() {
  screen='quiz-result';window.scrollTo(0,0);
  app.innerHTML=`<section class="quiz-scene quiz-result"><span class="eyebrow">THE RESULTS ARE IN</span><div class="result-heart" aria-hidden="true">♡</div><h1 tabindex="-1">Diagnosis:<br><em>hopelessly yours.</em></h1><p class="scene-subtitle">After extensive research and absolutely no objectivity,<br>your boyfriend is still ridiculously into you.</p><div class="result-slip"><span>OFFICIAL FINDING</span><strong>It’s you. It’s always you.</strong><small>signed, the least impartial person on earth</small></div><button class="button" data-action="quiz-finish">Okay, show me our someday <span>→</span></button><button class="text-button" data-action="quiz-again">I’d like a second opinion ↺</button></section>`;
  chime(true);focusHeading();
}
function scratchScene() {
  screen='scratch';scratchRevealed=false;window.scrollTo(0,0);
  const coupon=data.coupon;
  app.innerHTML=`<section class="scratch-scene"><span class="eyebrow">A LITTLE EXTRA, BECAUSE IT’S YOU</span><h1 tabindex="-1">Lucky you.<br><em>Luckier me.</em></h1><p class="scene-subtitle">One more thing tucked inside your birthday card.</p><div class="scratch-ticket"><div class="ticket-notch left" aria-hidden="true"></div><div class="ticket-notch right" aria-hidden="true"></div><div class="ticket-top"><span>THE JUST-US LOTTERY</span><span>№ 001 · EVERY TICKET WINS</span></div><div class="scratch-area"><div class="coupon-copy" aria-hidden="true"><span class="eyebrow">YOU’VE WON</span><h2>${esc(coupon.title)}</h2><p>${esc(coupon.message)}</p></div><canvas id="scratch-canvas" width="1200" height="800" aria-hidden="true"></canvas></div><div class="ticket-bottom">${esc(coupon.footer)}</div></div><p class="scratch-status handwriting" role="status">rub the silver away with your finger ♡</p><button class="text-button scratch-fallback" data-action="reveal-ticket">Reveal without scratching</button><div class="ticket-actions" hidden><fieldset class="movie-picker"><legend>Pick our movie ♡</legend><label class="movie-option"><input type="radio" name="movie" value="OK Kanmani" ${movieChoice==='OK Kanmani'?'checked':''}><span><small>01</small> OK Kanmani</span></label><label class="movie-option"><input type="radio" name="movie" value="Alaipaayuthey" ${movieChoice==='Alaipaayuthey'?'checked':''}><span><small>02</small> Alaipaayuthey</span></label><label class="movie-option"><input type="radio" name="movie" value="custom" ${movieChoice==='custom'?'checked':''}><span><small>03</small> Your choice, baby</span></label><label class="movie-input-label" for="custom-movie">Your movie</label><input id="custom-movie" type="text" maxlength="120" placeholder="anything u want baby" value="${esc(customMovie)}" ${movieChoice==='custom'?'':'disabled'}><p class="movie-confirmation" role="status">${selectedMovie()?`Our movie: ${esc(selectedMovie())} ♡`:'Which one are we watching?'}</p></fieldset><button class="button" data-action="save-coupon">Keep my little invitation <span>↓</span></button></div><button class="text-button" data-action="scratch-back">← back to my birthday</button></section>`;
  setupScratch();focusHeading();
}
function setupScratch() {
  const canvas=app.querySelector('#scratch-canvas'),context=canvas.getContext('2d');
  if(!context){revealTicket();return}
  context.scale(2,2);
  const gradient=context.createLinearGradient(0,0,600,400);gradient.addColorStop(0,'#adb49c');gradient.addColorStop(.45,'#d4d8c4');gradient.addColorStop(1,'#a2ad91');
  context.fillStyle=gradient;context.fillRect(0,0,600,400);
  context.strokeStyle='#ffffff30';context.lineWidth=1;
  for(let x=-400;x<600;x+=18){context.beginPath();context.moveTo(x,0);context.lineTo(x+400,400);context.stroke()}
  context.textAlign='center';context.fillStyle='#48553e';context.font='48px Georgia';context.fillText('a little something',300,162);context.font='italic 48px Georgia';context.fillText('just for you.',300,220);context.font='14px sans-serif';context.fillText('SCRATCH HERE TO FIND OUT',300,290);
  let drawing=false,last=null;
  const point=event=>{const bounds=canvas.getBoundingClientRect();return {x:(event.clientX-bounds.left)*600/bounds.width,y:(event.clientY-bounds.top)*400/bounds.height}};
  function erase(event){if(!drawing||scratchRevealed)return;const current=point(event);context.globalCompositeOperation='destination-out';context.strokeStyle='#000';context.fillStyle='#000';context.lineWidth=55;context.lineCap='round';context.beginPath();context.moveTo(last?.x??current.x,last?.y??current.y);context.lineTo(current.x,current.y);context.stroke();context.beginPath();context.arc(current.x,current.y,27.5,0,Math.PI*2);context.fill();last=current}
  function checkCoverage(){const pixels=context.getImageData(0,0,canvas.width,canvas.height).data;let clear=0,total=0;for(let y=8;y<canvas.height;y+=24){for(let x=8;x<canvas.width;x+=24){total++;if(pixels[(y*canvas.width+x)*4+3]<100)clear++}}if(clear/total>.35)revealTicket()}
  canvas.addEventListener('pointerdown',event=>{if(scratchRevealed||event.button!==0)return;drawing=true;last=point(event);canvas.setPointerCapture(event.pointerId);erase(event)});
  canvas.addEventListener('pointermove',event=>{erase(event)});
  canvas.addEventListener('pointerup',()=>{if(!drawing)return;drawing=false;last=null;checkCoverage()});
  canvas.addEventListener('pointercancel',()=>{drawing=false;last=null});
}
function revealTicket() {
  if(screen!=='scratch'||scratchRevealed)return;scratchRevealed=true;
  app.querySelector('.scratch-ticket').classList.add('revealed');
  app.querySelector('.coupon-copy').removeAttribute('aria-hidden');
  app.querySelector('.scratch-status').textContent='Redeem with one very enthusiastic boyfriend. ♡';
  app.querySelector('.scratch-fallback').hidden=true;
  app.querySelector('.ticket-actions').hidden=false;
  chime(true);confetti();
}
function wrapCardText(context,text,width) {
  const lines=[];
  for(const paragraph of String(text).split('\n')) {
    if(!paragraph){lines.push('');continue}
    let line='';
    for(const word of paragraph.split(/\s+/)) {
      if(context.measureText((line?line+' ':'')+word).width<=width){line+=(line?' ':'')+word;continue}
      if(line)lines.push(line);line='';
      // Split even an unusually long unbroken word without clipping it.
      for(const character of word){if(context.measureText(line+character).width>width){lines.push(line);line=''}line+=character}
    }
    if(line)lines.push(line);
  }
  return lines;
}
async function saveKeepsake(coupon=false) {
  if(savingCard)return;
  if(coupon && !selectedMovie()){
    app.querySelector('.movie-confirmation').textContent=movieChoice==='custom'?'Type any movie you want, baby ♡':'Pick our movie first, baby ♡';
    (movieChoice==='custom'?app.querySelector('#custom-movie'):app.querySelector('input[name=movie]')).focus();
    return;
  }
  savingCard=true;
  const button=app.querySelector(`[data-action="${coupon?'save-coupon':'save-memory'}"]`);
  const original=button?.innerHTML;if(button){button.disabled=true;button.textContent='Wrapping it up…'}
  try {
    await window.birthdayContentReady;
    const canvas=document.createElement('canvas'),context=canvas.getContext('2d');
    if(!context)throw new Error('Canvas unavailable');
    context.font='30px Georgia';
    const text=coupon?`${data.coupon.title}\n\n${data.coupon.message}\n\nOur movie: ${selectedMovie()}\n\n${data.coupon.footer}`:data.letter;
    const lines=wrapCardText(context,text,810);
    canvas.width=1000;canvas.height=Math.max(1250,480+lines.length*47);
    context.fillStyle='#f9f5ed';context.fillRect(0,0,canvas.width,canvas.height);
    context.strokeStyle='#cec7b5';context.lineWidth=2;context.strokeRect(35,35,930,canvas.height-70);
    context.fillStyle='#ad3d39';context.textAlign='center';context.font='15px sans-serif';context.fillText(coupon?'OUR PRIVATE MOVIE SCREENING':'A LITTLE PIECE OF YOUR BIRTHDAY',500,110);
    context.fillStyle='#343a30';context.font='58px Georgia';context.fillText(coupon?'My favourite company.':'Happy birthday, my babyy.',500,215);
    context.fillStyle='#ad3d39';context.font='italic 30px Georgia';context.fillText('for you, always. ♡',500,275);
    context.strokeStyle='#d7cdbb';context.beginPath();context.moveTo(95,325);context.lineTo(905,325);context.stroke();
    context.textAlign='left';context.font='30px Georgia';context.fillStyle='#505747';lines.forEach((line,i)=>context.fillText(line,95,390+i*47));
    context.textAlign='center';context.font='italic 22px Georgia';context.fillStyle='#ad3d39';context.fillText('Love you till my last breath. ♡',500,canvas.height-90);
    const imageURL=canvas.toDataURL('image/png');
    const modal=document.querySelector('#keepsake-dialog');
    modal.querySelector('.keepsake-content').innerHTML=`<span class="eyebrow">YOURS TO KEEP</span><h2 id="keepsake-title">A little memory, forever.</h2><img class="saved-card-preview" src="${imageURL}" alt="${coupon?'Your date invitation':'Your birthday letter'} keepsake"><a class="button download-card" href="${imageURL}" download="${coupon?'our-little-date':'for-you-always'}.png">Download PNG <span>↓</span></a><p class="download-hint">On a phone, you can also press and hold the image to save it.</p>`;
    modal.showModal();

  } catch {announceSave('The keepsake couldn’t be saved in this browser. You can still screenshot your favourite page.');}
  finally{savingCard=false;if(button?.isConnected){button.disabled=false;button.innerHTML=original}}
}
function announceSave(text){let status=app.querySelector('.save-status');if(!status){status=document.createElement('p');status.className='save-status';status.setAttribute('role','status');app.querySelector('section').appendChild(status)}status.textContent=text}
function handleAdventure(action,button){
  switch(action){
    case 'quiz-answer':answerQuiz(Number(button.dataset.choice));break;
    case 'quiz-next':if(quizAnswered){quizIndex<data.quiz.length-1?quizScene(quizIndex+1):quizResult()}break;
    case 'skip-quiz':case 'quiz-finish':futureLetter();break;
    case 'quiz-again':quizScene();break;
    case 'scratch':scratchScene();break;
    case 'reveal-ticket':revealTicket();break;
    case 'scratch-back':celebrate(false);focusHeading();break;
    case 'save-memory':saveKeepsake(false);break;
    case 'save-coupon':saveKeepsake(true);break;
    default:return false;
  }return true;
}
document.querySelector('#sound-toggle').addEventListener('click',toggleSound);

app.addEventListener('change',event=>{
  if(!event.target.matches('input[name="movie"]'))return;
  movieChoice=event.target.value;
  const custom=app.querySelector('#custom-movie');
  custom.disabled=movieChoice!=='custom';
  app.querySelector('.movie-confirmation').textContent=selectedMovie()?`Our movie: ${selectedMovie()} ♡`:'Type any movie you want, baby ♡';
  if(movieChoice==='custom')custom.focus();
});
app.addEventListener('input',event=>{
  if(event.target.id!=='custom-movie')return;
  customMovie=event.target.value;
  app.querySelector('.movie-confirmation').textContent=selectedMovie()?`Our movie: ${selectedMovie()} ♡`:'Type any movie you want, baby ♡';
});
