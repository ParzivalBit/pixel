import React, { useState } from 'react';
import { CHOCOLATE_COUNT } from '../constants';

interface ChocolateBoxProps {
  onFound: () => void;
  playSound: (type: 'click' | 'success') => void;
  userName: string;
}

const ChocolateBox: React.FC<ChocolateBoxProps> = ({ onFound, playSound, userName }) => {
  const [openedIndices, setOpenedIndices] = useState<number[]>([]);
  
  // Deterministically random winning index based on mount
  const [winningIndex] = useState(() => Math.floor(Math.random() * CHOCOLATE_COUNT));

  const isWon = openedIndices.includes(winningIndex);

  const handleChocoClick = (index: number) => {
    if (openedIndices.includes(index) || isWon) return;

    setOpenedIndices(prev => [...prev, index]);
    
    if (index === winningIndex) {
      playSound('success');
      setTimeout(onFound, 800);
    } else {
      playSound('click');
    }
  };

  // Helper to render different chocolate styles based on index
  const renderChocolateDesign = (index: number) => {
    const styleType = index % 4;

    switch (styleType) {
      case 0: // Dark Chocolate Square with Stripes
        return (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-[#3e2723] to-[#1a100e] shadow-[4px_4px_0_rgba(0,0,0,0.3)] border-t border-l border-[#5d4037] relative flex items-center justify-center group overflow-hidden">
             {/* Shine */}
             <div className="absolute top-0 right-0 w-8 h-8 bg-white opacity-5 blur-md rounded-full transform translate-x-2 -translate-y-2"></div>
             {/* Stripes */}
             <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 opacity-30 transform -rotate-45">
                <div className="w-full h-1 bg-[#8d6e63]"></div>
                <div className="w-full h-1 bg-[#8d6e63]"></div>
                <div className="w-full h-1 bg-[#8d6e63]"></div>
             </div>
          </div>
        );
      case 1: // Milk Chocolate Round with Swirl
        return (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-[#795548] to-[#4e342e] shadow-[4px_4px_0_rgba(0,0,0,0.3)] border-2 border-[#8d6e63] relative flex items-center justify-center group">
             {/* Swirl SVG */}
             <svg viewBox="0 0 100 100" className="w-12 h-12 opacity-40">
               <path d="M 20 50 Q 35 20 50 50 T 80 50" stroke="#3e2723" strokeWidth="8" fill="none" strokeLinecap="round" />
             </svg>
             {/* Highlight dot */}
             <div className="absolute top-3 left-4 w-3 h-2 bg-white opacity-20 rounded-full rotate-[-45deg]"></div>
          </div>
        );
      case 2: // White/Pink Heart Praline
        return (
          <div className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
             {/* Heart Shape via CSS Clip Path or SVG */}
             <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
               <path d="M50 88 C 10 60 -10 30 20 10 C 40 -5 50 20 50 20 C 50 20 60 -5 80 10 C 110 30 90 60 50 88" fill="#f48fb1" stroke="#ad1457" strokeWidth="2" />
               {/* Decoration */}
               <circle cx="30" cy="30" r="4" fill="white" fillOpacity="0.6" />
               <circle cx="70" cy="25" r="3" fill="white" fillOpacity="0.6" />
             </svg>
          </div>
        );
      case 3: // Gold Foil Rocher Style
        return (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-[4px_4px_0_rgba(0,0,0,0.3)] border border-yellow-200 relative flex items-center justify-center overflow-hidden">
             {/* Texture */}
             <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')]"></div>
             {/* Center sticker */}
             <div className="w-6 h-6 bg-yellow-100 rounded-full opacity-60 absolute top-2 right-4 blur-[1px]"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 relative">
      {/* Decorative floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 text-2xl animate-float">💖</div>
        <div className="absolute bottom-20 right-10 text-xl animate-float" style={{ animationDelay: '1s' }}>💖</div>
        <div className="absolute top-1/3 left-3/4 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>✨</div>
      </div>

      <h1 className="text-4xl md:text-5xl text-pink-100 mb-6 text-center drop-shadow-[2px_2px_0_rgba(169,34,91,1)] z-10">
        Per {userName} <span className="text-red-400 animate-pulse">♥</span>
      </h1>
      
      {/* The Box Container */}
      <div className="bg-[#5a1a1a] p-2 md:p-3 rounded-xl shadow-[0_15px_0_rgba(0,0,0,0.3)] border-b-8 border-r-8 border-[#3d0f0f] relative z-10 animate-float max-w-md w-full">
        
        {/* Box Interior / Liner */}
        <div className="bg-[#2d0a0a] p-4 md:p-6 rounded-lg border-2 border-[#5a1a1a] shadow-inner relative">
          
          {/* Lid Tag */}
          <div className="absolute -top-5 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-1 rounded shadow-lg text-sm md:text-base rotate-[5deg] z-20 border border-white/30 font-bold">
             Premium Selection
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6 justify-items-center">
            {Array.from({ length: CHOCOLATE_COUNT }).map((_, i) => {
              const isOpened = openedIndices.includes(i);
              const isWinner = i === winningIndex;
              
              return (
                <div key={i} className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                  
                  {/* The Paper Cup (Pirottino) - Always visible underneath */}
                  <div className={`
                    absolute bottom-0 w-16 h-16 md:w-20 md:h-20 rounded-full 
                    bg-gradient-to-b from-[#3e2723] to-[#251613]
                    border-2 border-dashed border-[#5d4037]
                    shadow-inner
                    transition-all duration-300
                    ${isOpened ? 'opacity-100 scale-95 rotate-12' : 'opacity-80 scale-100'}
                  `}></div>

                  <button
                    onClick={() => handleChocoClick(i)}
                    disabled={isOpened || isWon}
                    className={`
                      relative w-full h-full transition-all duration-300 transform flex items-center justify-center
                      ${!isOpened ? 'hover:scale-105 active:scale-95 cursor-pointer-retro hover:-translate-y-1' : 'cursor-default'}
                    `}
                  >
                    {isOpened ? (
                      isWinner ? (
                        <div className="animate-bounce relative z-20">
                          <span className="text-5xl md:text-6xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] filter brightness-110">🎟️</span>
                          <span className="absolute -top-4 -right-4 text-3xl animate-ping">✨</span>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center z-10">
                           {/* Crumbs to show it was eaten */}
                           <div className="w-1 h-1 bg-[#5d4037] rounded-full absolute top-1/3 left-1/3"></div>
                           <div className="w-2 h-2 bg-[#3e2723] rounded-full absolute bottom-1/3 right-1/3"></div>
                           <div className="w-1 h-1 bg-[#4e342e] rounded-full absolute top-1/2 right-1/4"></div>
                        </div>
                      )
                    ) : (
                      // Unopened Chocolate Design
                      <div className="relative z-10">
                        {renderChocolateDesign(i)}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-pink-200/80 text-lg text-center font-sans tracking-wider font-bold drop-shadow-md">
        {isWon ? "Trovato! 🎉" : "Cerca il biglietto nascosto..."}
      </p>
    </div>
  );
};

export default ChocolateBox;