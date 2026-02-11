import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScreenState } from './types';
import { playRetroSound } from './utils/sound';
import TitleScreen from './components/TitleScreen';
import ChocolateBox from './components/ChocolateBox';
import TicketView from './components/TicketView';
import ScavengerHunt from './components/ScavengerHunt';
import FinalSurprise from './components/FinalSurprise';

const App: React.FC = () => {
  // Changed initial state to TITLE
  const [screen, setScreen] = useState<ScreenState>('TITLE');
  const [userName, setUserName] = useState('Mini');
  const [isMuted, setIsMuted] = useState(false);
  
  // Reference to the background music audio element
  const bgmRef = useRef<HTMLAudioElement>(null);

  // Parse URL param for name
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name');
    if (nameParam) {
      setUserName(nameParam);
    }
  }, []);

  // Handle mute toggle for both SFX and Music
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handlePlaySound = useCallback((type: 'blip' | 'success' | 'magic' | 'click') => {
    if (!isMuted) {
      playRetroSound(type);
    }
  }, [isMuted]);

  const startMusic = () => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.3; // Set volume low (30%) so it doesn't overpower SFX
      bgmRef.current.play().catch(e => {
        console.log("Audio autoplay prevented by browser policy until interaction", e);
      });
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'TITLE':
        return (
          <TitleScreen 
            onStart={() => {
              startMusic(); // Start music on user interaction
              setScreen('HOME');
            }} 
            playSound={handlePlaySound} 
          />
        );
      case 'HOME':
        return (
          <ChocolateBox 
            onFound={() => setScreen('TICKET')} 
            playSound={handlePlaySound}
            userName={userName}
          />
        );
      case 'TICKET':
        return (
          <>
            <ChocolateBox 
              onFound={() => {}} // No-op, just background
              playSound={() => {}} 
              userName={userName}
            />
            <TicketView 
              onStart={() => setScreen('HUNT')} 
              playSound={handlePlaySound}
            />
          </>
        );
      case 'HUNT':
        return (
          <ScavengerHunt 
            onComplete={() => setScreen('FINAL')} 
            playSound={handlePlaySound} 
          />
        );
      case 'FINAL':
        return (
          <FinalSurprise 
            userName={userName} 
            playSound={handlePlaySound} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-screen bg-pink-50 text-indigo-900 overflow-hidden font-vt323 select-none">
      {/* Background Music Element */}
      {/* Ensure you have a file named 'bgm.mp3' in your public folder */}
      <audio ref={bgmRef} loop src="/bgm.mp3" />

      {/* Scanlines Effect Overlay */}
      <div className="scanlines pointer-events-none z-50"></div>

      {/* Audio Toggle */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-4 right-4 z-50 p-2 bg-white/20 hover:bg-white/40 rounded backdrop-blur-sm transition-colors text-white"
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Main Content Area */}
      <main className="w-full h-full max-w-lg mx-auto relative bg-slate-900/10 shadow-2xl md:border-x-4 border-black/10">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;