
export type ScreenState = 'TITLE' | 'HOME' | 'TICKET' | 'HUNT' | 'FINAL';

export interface HuntItem {
  id: string;
  emoji: string;
  top: string; // CSS percentage
  left: string; // CSS percentage
  type: 'HEART' | 'MESSAGE';
  message?: string; // Only for MESSAGE type
  isFound: boolean;
  scale?: number;
}

export interface SoundContextType {
  playSound: (type: 'blip' | 'success' | 'magic' | 'click') => void;
  isMuted: boolean;
  toggleMute: () => void;
}
