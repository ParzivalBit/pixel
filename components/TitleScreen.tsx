import React from 'react';

interface TitleScreenProps {
  onStart: () => void;
  playSound: (type: 'click' | 'magic') => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onStart, playSound }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">💖</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-bounce delay-700">💖</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-pulse">✨</div>
        <div className="absolute top-1/3 right-1/4 text-2xl animate-pulse delay-300">✨</div>
      </div>

      {/* Main Title Area */}
      <div className="z-10 text-center animate-float">
        <div className="mb-2 text-pink-300 text-xl font-bold tracking-widest uppercase drop-shadow-md">
          Pixel Love Adventure
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-2 leading-none text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-pink-600 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          BUON<br/>SAN VALENTINO
        </h1>
        
        <div className="inline-block bg-pink-600 text-white px-3 py-1 text-lg rounded rotate-[-2deg] shadow-lg border-2 border-white/50 mb-8 animate-pulse">
          (+ Anniversario!)
        </div>
      </div>

      {/* Retro Play Button */}
      <button
        onClick={() => {
          playSound('magic'); // Play a magic sound on start
          onStart();
        }}
        className="
          group relative inline-flex items-center justify-center
          px-12 py-4 text-3xl font-bold text-yellow-100 uppercase tracking-widest
          bg-red-600 border-4 border-red-800 rounded-lg
          shadow-[0_8px_0_rgb(153,27,27)] active:shadow-[0_0px_0_rgb(153,27,27)]
          active:translate-y-2 transition-all duration-100
          hover:bg-red-500
          z-20
        "
      >
        <span className="mr-3 animate-pulse">▶</span> 
        PLAY
      </button>

      <p className="mt-12 text-purple-300/60 text-sm">
        © 2025 Love Corp. Insert Coin to Start
      </p>
    </div>
  );
};

export default TitleScreen;