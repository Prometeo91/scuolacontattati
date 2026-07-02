/* Tutte le stringhe di interfaccia del sito, in un unico posto.
   I contenuti (lezioni, eventi) vivono nelle content collections;
   qui c'è solo il "telaio" bilingue. */

export const STRINGS = {
  it: {
    schoolName: 'Scuola ContattaTi',
    tagline: 'Scuola di Consapevolezza ed Alchimia · Bari e online',
    heroLead:
      'Un percorso di risveglio interiore in sette anni: Quarta Via, Enneagramma, Alchimia e le Leggi dell’Universo.',
    navLessons: 'Lezioni',
    ctaLessons: 'Scopri il percorso',
    lessonsTitle: 'Il percorso in sette anni',
    lessonsLead:
      'Ogni anno di lavoro approfondisce un livello del cammino. Le lezioni si tengono a Bari e online.',
    year: 'Anno',
    lesson: 'Lezione',
    themes: 'Temi della lezione',
    backToLessons: '← Tutte le lezioni',
    nextLesson: 'Prossima lezione',
    themeToggle: 'Cambia tema',
    langLabel: 'Lingua / Language',
    footerNote: 'Prototipo v2 — architettura Astro, contenuti da content collection.',
  },
  en: {
    schoolName: 'Scuola ContattaTi',
    tagline: 'School of Awareness and Alchemy · Bari and online',
    heroLead:
      'A seven-year path of inner awakening: the Fourth Way, the Enneagram, Alchemy and the Laws of the Universe.',
    navLessons: 'Lessons',
    ctaLessons: 'Discover the path',
    lessonsTitle: 'The seven-year path',
    lessonsLead:
      'Each year of work deepens one level of the journey. Lessons are held in Bari and online.',
    year: 'Year',
    lesson: 'Lesson',
    themes: 'Lesson themes',
    backToLessons: '← All lessons',
    nextLesson: 'Next lesson',
    themeToggle: 'Switch theme',
    langLabel: 'Lingua / Language',
    footerNote: 'v2 prototype — Astro architecture, content from a content collection.',
  },
};

export function t(locale) {
  return STRINGS[locale] ?? STRINGS.it;
}

export function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/* Percorso equivalente nell'altra lingua (routing /en/ prefissato). */
export function altPath(pathname, targetLocale) {
  const bare = pathname.replace(/^\/en(\/|$)/, '/');
  return targetLocale === 'en' ? '/en' + (bare === '/' ? '/' : bare) : bare;
}

export function localePath(locale, path) {
  return locale === 'en' ? '/en' + path : path;
}
