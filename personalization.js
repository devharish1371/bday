// Load optional drop-in files. Missing media leaves the illustrated placeholders intact.
window.birthdayContentReady = (async () => {
  const data = window.BIRTHDAY;
  async function textFile(path) {
    try {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) return '';
      return (await response.text()).trim();
    } catch { return ''; }
  }
  function photoExists(path) {
    return new Promise(resolve => {
      const photo = new Image();
      photo.onload = () => resolve(true);
      photo.onerror = () => resolve(false);
      photo.src = path;
    });
  }
  const voicePath = data.voiceNote;
  data.voiceNote = null;
  await Promise.all([
    (async () => {
      if (data.voiceEndingFile) {
        const ending = await textFile(data.voiceEndingFile);
        if (ending) data.voiceEnding = ending;
      }
    })(),
    (async () => {
      try {
        const raw = await textFile(data.quizFile);
        const quiz = JSON.parse(raw);
        if (Array.isArray(quiz) && quiz.length && quiz.every(q => typeof q.question === 'string' && Array.isArray(q.answers) && q.answers.length >= 2 && q.answers.every(a => typeof a.label === 'string' && typeof a.reply === 'string'))) data.quiz = quiz;
      } catch { /* Invalid custom JSON keeps the working default quiz. */ }
    })(),
    (async () => {
      try {
        const coupon = JSON.parse(await textFile(data.couponFile));
        if (coupon && ['title','message','footer'].every(key => typeof coupon[key] === 'string')) data.coupon = coupon;
      } catch { /* Keep the default invitation when its JSON is absent or invalid. */ }
    })(),
    (async () => {
      if (data.letterFile) {
        const letter = await textFile(data.letterFile);
        if (letter) data.letter = letter;
      }
    })(),
    ...[...data.chapters, ...data.future].map(async chapter => {
      const photoPath = chapter.image;
      chapter.image = null;
      await Promise.all([
        (async () => {
          if (photoPath && await photoExists(photoPath)) chapter.image = photoPath;
        })(),
        (async () => {
          if (!chapter.messageFile) return;
          const message = await textFile(chapter.messageFile);
          if (message) chapter.message = message;
          if (chapter.secretFile) {
            const secret = await textFile(chapter.secretFile);
            if (secret) chapter.secret = secret;
          }
        })()
      ]);
    }),
    (async () => {
      if (!voicePath) return;
      try {
        const response = await fetch(voicePath, { method: 'HEAD', cache: 'no-store' });
        if (response.ok && !response.headers.get('content-type')?.includes('text/html')) {
          data.voiceNote = voicePath;
        }
      } catch { /* Keep the gift placeholder when the recording is unavailable. */ }
    })(),
    (async () => {
      if (!data.voiceTranscriptFile) return;
      const transcript = await textFile(data.voiceTranscriptFile);
      if (transcript) data.voiceTranscript = transcript;
    })()
  ]);
})();
