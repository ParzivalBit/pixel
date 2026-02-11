import React, { useState, useRef, useEffect } from 'react';
import { INITIAL_HUNT_ITEMS, SWEET_MESSAGES } from '../constants';
import { HuntItem } from '../types';

interface ScavengerHuntProps {
  onComplete: () => void;
  playSound: (type: 'blip' | 'success' | 'magic' | 'click') => void;
}

const ScavengerHunt: React.FC<ScavengerHuntProps> = ({ onComplete, playSound }) => {
  const [items, setItems] = useState<HuntItem[]>(INITIAL_HUNT_ITEMS);
  const [heartsFound, setHeartsFound] = useState(0);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  
  // Ref to store the timeout ID so we can clear it if the user clicks another item quickly
  const messageTimeoutRef = useRef<number | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const handleItemClick = (item: HuntItem, e: React.MouseEvent) => {
    // Prevent any default browser behavior
    e.preventDefault();
    e.stopPropagation();

    if (item.isFound) return;

    // Mark item as found
    const newItems = items.map(i => i.id === item.id ? { ...i, isFound: true } : i);
    setItems(newItems);

    if (item.type === 'HEART') {
      const newCount = heartsFound + 1;
      setHeartsFound(newCount);
      playSound('magic');
      
      // Check win condition
      if (newCount >= 3) {
        setActiveMessage(null);
        setTimeout(onComplete, 1500);
      }
    } else {
      playSound('blip');
      const msg = item.message || SWEET_MESSAGES[Math.floor(Math.random() * SWEET_MESSAGES.length)];
      
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }

      setActiveMessage(msg);

      messageTimeoutRef.current = window.setTimeout(() => {
        setActiveMessage(null);
        messageTimeoutRef.current = null;
      }, 4000);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#050510] text-white select-none">
      
      {/* Dynamic Starry Sky Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {Array.from({ length: 60 }).map((_, i) => {
           const size = Math.random() * 3 + 1;
           return (
             <div
               key={i}
               className="absolute rounded-full bg-white opacity-80 animate-pulse"
               style={{
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
                 width: `${size}px`,
                 height: `${size}px`,
                 animationDuration: `${Math.random() * 3 + 1}s`,
                 animationDelay: `${Math.random() * 2}s`
               }}
             ></div>
           );
         })}
         <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-yellow-100 opacity-20 blur-xl"></div>
      </div>

      {/* HUD */}
      <div className="absolute top-4 left-4 z-10 bg-slate-800/80 p-2 rounded-lg border-2 border-slate-600 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-2xl drop-shadow">❤️</span>
          <span className="text-yellow-100 text-2xl font-bold font-mono tracking-widest">{heartsFound}/3</span>
        </div>
      </div>

      {/* --- AVATAR & SPEECH BUBBLE SECTION --- */}
      
      {/* 1. The Speech Bubble (Comes from bottom left) */}
      {activeMessage && (
        <div className="absolute bottom-48 md:bottom-64 left-4 z-50 w-64 md:w-80 pointer-events-none animate-bounce-in">
           <div className="bg-white border-4 border-slate-900 p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] relative">
              <p className="text-indigo-900 text-xl md:text-2xl leading-tight font-bold font-vt323">
                {activeMessage}
              </p>
              {/* Tail pointing down-left to the avatar */}
              <div className="absolute -bottom-3 left-10 w-6 h-6 bg-white border-b-4 border-r-4 border-slate-900 rotate-45"></div>
           </div>
        </div>
      )}

      {/* 2. The Avatar Character */}
      <div className="absolute bottom-0 left-2 z-40 pointer-events-none filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
         {/* 
            ISTRUZIONI PER L'UTENTE:
            Per inserire la tua immagine pixel art:
            1. Salva la tua immagine come 'avatar.png' (sfondo trasparente consigliato).
            2. Mettila nella cartella 'public/' del progetto.
         */}
         <img 
            src="/avatar.png" 
            alt="My Avatar"
            className="w-48 h-48 md:w-64 md:h-64 object-contain pixel-art animate-idle"
            onError={(e) => {
              // Fallback logic if avatar.png is not found
              e.currentTarget.style.display = 'none';
              const fallback = document.getElementById('avatar-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
         />
         {/* Fallback placeholder (Prince/King Emoji) if image is missing */}
         <div id="avatar-fallback" className="hidden text-9xl md:text-[10rem] animate-bounce-slight transform -translate-y-4">
            🤴
         </div>
      </div>

      {/* Interactive Items */}
      <div className="w-full h-full relative z-20">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={(e) => handleItemClick(item, e)}
            style={{ 
              top: item.top, 
              left: item.left,
              transform: `scale(${item.scale || 1}) translate(-50%, -50%)`
            }}
            className={`
              absolute flex items-center justify-center
              transition-all duration-300
              ${item.isFound ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100 hover:scale-125 cursor-pointer-retro hover:z-30'}
            `}
          >
            <div className="text-5xl md:text-6xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] filter hover:brightness-110 transition-all select-none">
              {item.emoji}
            </div>
            
            {/* Found animation */}
            {item.isFound && item.type === 'HEART' && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
                 <span className="text-red-500 text-6xl animate-ping absolute">❤️</span>
                 <span className="text-pink-400 text-6xl animate-ping absolute delay-100">✨</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes idle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-idle {
          animation: idle 2s infinite ease-in-out;
        }
        .animate-bounce-in {
          animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        @keyframes bounceIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ScavengerHunt;