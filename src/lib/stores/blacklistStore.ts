import { writable, derived } from 'svelte/store';

// Blacklist mit Wörtern, die nicht erlaubt sind
const blacklistWords = [
  // Sexueller Inhalt - Englisch
  'nude', 'naked', 'sex', 'sexual', 'porn', 'pornographic', 'erotic', 'xxx', 'nsfw',
  'breast', 'breasts', 'boobs', 'tits', 'nipple', 'nipples', 'penis', 'dick', 'cock', 'vagina', 
  'pussy', 'cunt', 'ass', 'butt', 'buttocks', 'anus', 'anal', 'oral', 'blowjob', 'handjob',
  'orgasm', 'climax', 'masturbation', 'masturbate', 'fetish', 'bondage', 'bdsm', 'kinky',
  'strip', 'stripper', 'stripping', 'brothel', 'whore', 'slut',
  'intimate', 'seductive', 'provocative', 'sensual', 'horny', 'aroused', 'lustful',
  'intercourse', 'fornication', 'copulation', 'mating', 'penetration', 'doggy', 'cowgirl', 'threesome', 'orgy', 'gangbang', 'bukkake',
  'cumshot', 'facial', 'creampie', 'squirting', 'dildo', 'vibrator', 'topless', 'bottomless',
  'sperm', 'semen', 'cum', 'ejaculation', 'precum', 'virginity', 'defloration', 'hymen',
  'incest','milf', 'cougar',
  'exhibitionist', 'voyeur', 'peeping', 'streaker', 'exhibitionism',
  'domination', 'submission', 'submissive',
  'sadism', 'masochism', 'punishment', 'spanking', 'whipping',
  
  // Deutsche Nacktheitsbegriffe
  'nackt','nackte', 'nackig', 'bloß', 'entblößt', 'unbekleidet', 'hüllenlos', 'splitternackt', 'blank', 'barbusig', 'entkleidet', 'ausgezogen',
  
  // Weitere explizite Begriffe
  'fuck', 'fucking', 'fucked', 'motherfucker', 'shit', 'damn',
  'ficken', 'gefickt', 'vögeln', 'bumsen', 'poppen', 'rammeln', 'scheisse', 'verdammt'
];

// Store für die Blacklist
export const blacklist = writable<string[]>(blacklistWords);

// Funktion zur Überprüfung, ob ein Text Blacklist-Wörter enthält
export function checkForBlacklistWords(text: string): { hasBlacklistWords: boolean; foundWords: string[] } {
  // Wenn der Text leer ist oder nur Leerzeichen enthält, keine Validierung
  if (!text || text.trim().length === 0) {
    return {
      hasBlacklistWords: false,
      foundWords: []
    };
  }

  const words = text.toLowerCase().split(/\s+/);
  const foundWords: string[] = [];
  
  // Überprüfe jedes Wort im Text
  for (const word of words) {
    // Entferne Satzzeichen für die Überprüfung
    const cleanWord = word.replace(/[^\w]/g, '');
    
    // Überspringe leere Wörter oder zu kurze Wörter
    if (cleanWord.length === 0) {
      continue;
    }
    
    // Überprüfe nur auf exakte Matches oder wenn das cleanWord ein vollständiges Blacklist-Wort enthält
    for (const blacklistWord of blacklistWords) {
      if (cleanWord === blacklistWord) {
        if (!foundWords.includes(cleanWord)) {
          foundWords.push(cleanWord);
        }
        break; // Verlasse die innere Schleife, da bereits ein Match gefunden wurde
      }
    }
  }
  
  return {
    hasBlacklistWords: foundWords.length > 0,
    foundWords
  };
}

// Derived Store für die Validierung eines bestimmten Textes
export function createBlacklistValidator(text: string) {
  return derived(
    blacklist,
    ($blacklist) => checkForBlacklistWords(text)
  );
}
