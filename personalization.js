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
