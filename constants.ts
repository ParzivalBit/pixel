import { HuntItem } from './types';

export const CHOCOLATE_COUNT = 9;

// Random messages for non-heart items fallback (used less now that we have specific messages)
export const SWEET_MESSAGES = [
  "Non è qui, ma sei carino quando cerchi!",
  "Acqua... acqua...",
  "Ti amo anche se sbagli!",
  "Mmmh, riprova sarai più fortunato!",
  "Qui c'è solo polvere di stelle.",
];

export const INITIAL_HUNT_ITEMS: HuntItem[] = [
  // GLI OGGETTI RICHIESTI (Messaggi)
  { 
    id: 'monkey', 
    emoji: '🐵', 
    top: '30%', 
    left: '25%', 
    type: 'MESSAGE', 
    message: 'Sei una scimmietta', 
    isFound: false, 
    scale: 1.3 
  },
  { 
    id: 'dumbbell', 
    emoji: '🏋️‍♀️', 
    top: '65%', 
    left: '70%', 
    type: 'MESSAGE', 
    message: "We la prosciuttaz' !", 
    isFound: false, 
    scale: 1.4 
  },
  { 
    id: 'lipstick', 
    emoji: '💄', 
    top: '45%', 
    left: '75%', 
    type: 'MESSAGE', 
    message: 'Sbaciucchiamoci. SMACK!', 
    isFound: false, 
    scale: 1.2 
  },
  { 
    id: 'foot', 
    emoji: '🦶', 
    top: '75%', 
    left: '80%', 
    type: 'MESSAGE', 
    message: 'Mi fai un massaggino carinooo?', 
    isFound: false, 
    scale: 1.3 
  },

  // GLI OGGETTI VINCENTI (Contengono i Cuori)
  { 
    id: 'gift', 
    emoji: '🎁', 
    top: '50%', 
    left: '50%', 
    type: 'HEART', 
    isFound: false, 
    scale: 1.4 
  },
  { 
    id: 'teddy', 
    emoji: '🧸', 
    top: '35%', 
    left: '65%', 
    type: 'HEART', 
    isFound: false, 
    scale: 1.2 
  },
  { 
    id: 'star', 
    emoji: '⭐', 
    top: '20%', 
    left: '50%', 
    type: 'HEART', 
    isFound: false, // La stella nel cielo
    scale: 1.0
  },
  
  // UN EXTRA PER RIEMPIRE LO SPAZIO
  { 
    id: 'pizza', 
    emoji: '🍕', 
    top: '60%', 
    left: '30%', 
    type: 'MESSAGE', 
    message: 'Base bianca, cipolla croccante e gorgonzola. GNAM!', 
    isFound: false, 
    scale: 1.1 
  },
];

export const FINAL_LETTER = (name: string) => `
Cara Mississ,

Grazie per questi anni insieme.
Volevo solo ricordarti quanto sei speciale, con questo piccolo pensiero "virtuale".
Ogni momento con te è prezioso come questi cuori pixelati.

Ti amo! ❤️
`;