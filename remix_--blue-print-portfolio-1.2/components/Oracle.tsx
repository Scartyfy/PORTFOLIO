import React, { useState } from 'react';
import { getCardReading } from '../services/geminiService';
import { CardReading } from '../types';

interface OracleProps {
  visible: boolean;
}

export const Oracle: React.FC<OracleProps> = ({ visible }) => {
  const [reading, setReading] = useState<CardReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [revealed, setRevealed] = useState(false);

  const handleReveal = async () => {
    if (loading) return;
    setLoading(true);
    const result = await getCardReading(query);
    setReading(result);
    setLoading(false);
    setRevealed(true);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
      <div className="pointer-events-auto bg-white/95 p-8 rounded-xl shadow-2xl max-w-md text-center border border-white mt-64 animate-fade-in-up">
          
          {!revealed ? (
            <>
              <h2 className="text-2xl font-serif text-[#002FA7] mb-4">L'As de Pique</h2>
              <p className="mb-6 text-[#002FA7]/70 text-sm">La carte s'est révélée. Souhaitez-vous comprendre sa signification profonde ?</p>
              
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Posez une question..."
                className="w-full bg-transparent border-b border-[#002FA7]/30 p-2 mb-6 focus:outline-none text-center font-serif text-[#002FA7] placeholder:text-[#002FA7]/40"
              />

              <button 
                onClick={handleReveal}
                disabled={loading}
                className="px-6 py-2 bg-[#002FA7] text-white font-bold tracking-widest hover:bg-[#002480] transition-colors uppercase text-xs"
              >
                {loading ? "Divination..." : "Interpréter"}
              </button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-serif mb-2 text-[#002FA7]">{reading?.cardName}</h3>
              <div className="w-8 h-px bg-[#002FA7] mx-auto mb-4"></div>
              <p className="text-sm font-serif italic leading-relaxed text-[#002FA7]/90 mb-6">
                "{reading?.reading}"
              </p>
              
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs text-[#002FA7]/50 hover:text-[#002FA7] transition-colors uppercase tracking-widest"
              >
                Recommencer
              </button>
            </>
          )}
      </div>
    </div>
  );
};