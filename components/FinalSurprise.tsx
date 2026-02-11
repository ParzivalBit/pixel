import React, { useEffect, useState } from 'react';
import { FINAL_LETTER } from '../constants';

interface FinalSurpriseProps {
  userName: string;
  playSound: (type: 'success' | 'click') => void;
}

const FinalSurprise: React.FC<FinalSurpriseProps> = ({ userName, playSound }) => {
  const [showLetter, setShowLetter] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    playSound('success');
    setTimeout(() => setShowLetter(true), 1000);
  }, [playSound]);

  const handleFlip = () => {
    playSound('click');
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-pink-200 overflow-hidden">
      {/* Raining Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500 animate-fall opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${10 + Math.random() * 20}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className={`transition-all duration-1000 transform z-10 w-full max-w-md px-4 flex flex-col items-center ${showLetter ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        
        {/* 3D Flip Container */}
        <div className="perspective-1000 w-full relative mb-6">
          <div className={`relative w-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* FRONT FACE (Letter) */}
            <div className="bg-white p-8 rounded-sm shadow-xl border-4 border-pink-400 relative backface-hidden min-h-[400px] flex flex-col">
              {/* Pixel Tape */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-yellow-200/80 rotate-2 border border-yellow-300"></div>
              
              <h2 className="text-3xl text-pink-600 mb-4 text-center font-bold">Per te...</h2>
              <div className="text-xl text-gray-700 whitespace-pre-line leading-relaxed font-sans md:font-mono flex-grow">
                {FINAL_LETTER(userName)}
              </div>
              <div className="mt-4 text-center text-4xl animate-pulse">
                💌
              </div>
            </div>

            {/* BACK FACE (Photo) */}
            <div className="absolute inset-0 h-full w-full bg-white p-4 rounded-sm shadow-xl border-4 border-pink-400 rotate-y-180 backface-hidden flex flex-col items-center justify-center">
               {/* Photo Frame / Polaroid Style */}
               <div className="bg-gray-100 w-full h-full border-2 border-gray-300 flex flex-col items-center p-2 shadow-inner">
                  <div className="w-full flex-grow bg-gray-800 flex items-center justify-center overflow-hidden relative group">
                    
                    {/* THE PHOTO */}
                    {/* Make sure to place a file named 'us.png' in your public folder! */}
                    <img 
                      src="/us.png" 
                      alt="Noi due" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image is missing
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('bg-pink-100');
                      }}
                    />
                    
                    {/* Fallback content if image fails to load (hidden by default if img loads) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-pink-300 -z-10">
                       <span className="text-5xl mb-2">📸</span>
                       <span className="text-xs text-center px-4">Aggiungi "us.png" nella cartella public</span>
                    </div>

                    {/* Vintage Overlay */}
                    <div className="absolute inset-0 bg-amber-900/10 pointer-events-none mix-blend-overlay"></div>
                  </div>
                  
                  <div className="h-12 w-full flex items-center justify-center">
                     <p className="font-handwriting text-2xl text-gray-700 rotate-[-2deg] mt-2">Io & Te ❤️</p>
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* Rotate Button */}
        <button 
          onClick={handleFlip}
          className="bg-indigo-600 hover:bg-indigo-500 text-white border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 px-6 py-2 rounded font-bold text-xl shadow-lg transition-all flex items-center gap-2"
        >
          <span>Ruota</span>
          <span className="text-2xl">↻</span>
        </button>

      </div>
      
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        /* 3D Flip Utilities */
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .font-handwriting {
          font-family: 'Brush Script MT', cursive;
        }
      `}</style>
    </div>
  );
};

export default FinalSurprise;