/* eslint-disable prettier/prettier */
(() => {
  const quiz = document.querySelector('.side-wrap');
  const cards = quiz.querySelectorAll('.card');
  const chapter = document.querySelector('.page-header .main')?.textContent;
  const title = document.querySelector('.page-header .sub')?.textContent;

  console.log(
    JSON.stringify(
      Array.from(cards).map((cardEl) => ({
      chapter,
      title,
      question: cardEl.querySelector('.card-header')?.textContent,
      answer: cardEl.querySelector('.card-body')?.textContent,
      tags: ['cpt', 'vocab', chapter],
    })),
      null,
      2,
    ),
  )
})()

const vocabWithApi = () => {
  const quiz = document.querySelector('.side-wrap'); const cards = quiz.querySelectorAll('.card'); const chapter = document.querySelector('.page-header .main')?.textContent; const title = document.querySelector('.page-header .sub')?.textContent;

  const vocab = Array.from(cards).map((cardEl) => ({
      chapter,
      title,
      question: cardEl.querySelector('.card-header')?.textContent,
      answer: cardEl.querySelector('.card-body')?.textContent,
      tags: ['cpt', 'vocab', chapter],
    }));

  const vocabJSON = JSON.stringify(vocab, null, 2);
  fetch('https://jp-api.vercel.app/api/flashcards/vocab', { method: 'PUT',  mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: vocabJSON }).then(() => { console.log('save done') }).catch(() => { console.log('save fail') });
  navigator.clipboard.writeText(vocabJSON).then(() => {console.log('copy done')}).catch(() => {console.log('copy fail')});
}

javascript:(() => { const quiz = document.querySelector('.side-wrap'); const cards = quiz.querySelectorAll('.card'); const chapter = document.querySelector('.page-header .main')?.textContent; const title = document.querySelector('.page-header .sub')?.textContent; const vocab = Array.from(cards).map((cardEl) => ({ chapter, title, question: cardEl.querySelector('.card-header')?.textContent, answer: cardEl.querySelector('.card-body')?.textContent, tags: ['cpt', 'vocab', chapter], })); const vocabJSON = JSON.stringify(vocab, null, 2); fetch('https://jp-api.vercel.app/api/flashcards/vocab', { method: 'PUT',  mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: vocabJSON }).then(() => { alert('success') }).catch(() => { alert('fail') }); })()


const quizWithApi = () => {
  const quiz = document.querySelector('.quiz-review');
  const cards = quiz.querySelectorAll('.card');
  const chapter = document.querySelector('.page-header .main')?.textContent;
  const title = document.querySelector('.page-header .sub')?.textContent;
  const questions = Array.from(cards).map((cardEl) => {
    const questionMarkdown = cardEl.querySelector('.card-header markdown');
    const question = questionMarkdown.textContent || questionMarkdown.innerText || '';
    const optionsMarkdown = cardEl.querySelectorAll('.card-body markdown');
    const options = Array.from(optionsMarkdown).map((el) => el.textContent || el.innerText || '');
    const answerEl = cardEl.querySelector('.text-success');
    const answer = answerEl.textContent || answerEl.innerText || '';
    const wrongAnswer = cardEl.querySelector('.text-danger');
    return { question, options, answer, missed: !!wrongAnswer, tags: ['cpt', 'quiz', chapter], title, chapter };
  });

  const questionsJSON = JSON.stringify(questions, null, 2);
  fetch('https://jp-api.vercel.app/api/flashcards/quiz', { method: 'PUT',  mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: questionsJSON }).then(() => { console.log('save done') }).catch(() => { console.log('save fail') });
  // navigator.clipboard.writeText(questionsJSON).then(() => {console.log('copy done')}).catch(() => {console.log('copy fail')});
}


javascript: (() => { const quiz = document.querySelector('.quiz-review'); const cards = quiz.querySelectorAll('.card'); const chapter = document.querySelector('.page-header .main')?.textContent; const title = document.querySelector('.page-header .sub')?.textContent; const questions = Array.from(cards).map((cardEl) => { const questionMarkdown = cardEl.querySelector('.card-header markdown'); const question = questionMarkdown.textContent || questionMarkdown.innerText || ''; const optionsMarkdown = cardEl.querySelectorAll('.card-body markdown'); const options = Array.from(optionsMarkdown).map((el) => el.textContent || el.innerText || ''); const answerEl = cardEl.querySelector('.text-success'); const answer = answerEl.textContent || answerEl.innerText || ''; const wrongAnswer = cardEl.querySelector('.text-danger'); return { question, options, answer, missed: !!wrongAnswer, tags: ['cpt', 'quiz', chapter], title, chapter }; }); const questionsJSON = JSON.stringify(questions, null, 2); fetch('https://jp-api.vercel.app/api/flashcards/quiz', { method: 'PUT', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: questionsJSON }).then(() => { alert('success') }).catch(() => { alert('fail') }); })()

