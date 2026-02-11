import React from 'react';

interface TicketViewProps {
  onStart: () => void;
  playSound: (type: 'click') => void;
}

const TicketView: React.FC<TicketViewProps> = ({ onStart, playSound }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-black/70 backdrop-blur-sm fixed inset-0 z-30 animate-in fade-in duration-500">
      
      {/* Golden Ticket Container */}
      <div className="
        relative w-full max-w-sm 
        bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 
        p-1 rounded-lg shadow-[0_0_40px_rgba(234,179,8,0.6)]
        rotate-1 animate-float
      ">
        {/* Dashed Border Inner */}
        <div className="bg-yellow-100 border-4 border-yellow-800 border-dashed rounded h-full p-6 flex flex-col items-center text-yellow-900 relative overflow-hidden">
          
          {/* Shine Effect */}
          <div className="absolute -top-20 -left-20 w-40 h-full bg-white opacity-20 rotate-45 transform translate-x-full transition-transform duration-1000 animate-pulse"></div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl animate-spin-slow">✨</span>
            <span className="text-xs font-bold tracking-widest uppercase border-b border-yellow-800">Golden Ticket</span>
            <span className="text-2xl animate-spin-slow">✨</span>
          </div>

          <h2 className="text-4xl md:text-5xl text-center mb-4 font-bold drop-shadow-sm text-yellow-950">
            TROVATO!
          </h2>

          <div className="w-full h-px bg-yellow-800/30 mb-4"></div>

          <p className="text-xl md:text-2xl text-center mb-8 leading-relaxed font-bold text-yellow-900/80">
            Hai sbloccato una caccia al tesoro molto speciale...
          </p>

          <div className="bg-yellow-200/50 p-4 rounded w-full mb-6 border border-yellow-600/30">
            <p className="text-center font-sans text-sm md:text-base font-semibold">
              OBIETTIVO:
            </p>
            <p className="text-center text-lg">
              Trova <span className="text-red-600 font-bold text-2xl">3 Cuori</span> nascosti per rivelare il messaggio finale.
            </p>
          </div>
          
          <button 
            onClick={() => {
              playSound('click');
              onStart();
            }}
            className="
              w-full bg-red-500 hover:bg-red-600 text-white text-2xl py-3 px-6 rounded-md
              border-b-4 border-red-800 active:border-b-0 active:mt-1 active:mb-3
              transition-all shadow-lg flex items-center justify-center gap-2 group
            "
          >
            <span>INIZIA</span>
            <span className="group-hover:translate-x-1 transition-transform">➜</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketView;