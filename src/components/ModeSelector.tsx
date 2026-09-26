import React from 'react';
import { GameMode } from '../types';
import { sound } from '../utils/sound';

interface ModeSelectorProps {
  mode: GameMode;
  setMode: (m: GameMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mode,
  setMode,
}) => {
  const handleModeChange = (newMode: GameMode) => {
    sound.playBallTap(1);
    setMode(newMode);
  };

  return (
    <div className="w-full max-w-md mx-auto px-3 sm:px-4 mb-2">
      {/* Räknesätt (Plus, Minus, Blandat) */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 bg-emerald-900/60 p-1 rounded-2xl border border-emerald-700/40">
        <button
          onClick={() => handleModeChange('plus')}
          className={`py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all active:scale-95 ${
            mode === 'plus'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/40 scale-[1.02]'
              : 'text-emerald-300 hover:text-white hover:bg-emerald-800/50'
          }`}
        >
          <span className="text-base sm:text-lg">➕</span> Plus
        </button>

        <button
          onClick={() => handleModeChange('minus')}
          className={`py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all active:scale-95 ${
            mode === 'minus'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/40 scale-[1.02]'
              : 'text-emerald-300 hover:text-white hover:bg-emerald-800/50'
          }`}
        >
          <span className="text-base sm:text-lg">➖</span> Minus
        </button>

        <button
          onClick={() => handleModeChange('mix')}
          className={`py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all active:scale-95 ${
            mode === 'mix'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/40 scale-[1.02]'
              : 'text-emerald-300 hover:text-white hover:bg-emerald-800/50'
          }`}
        >
          <span className="text-base sm:text-lg">⚽</span> Mix
        </button>
      </div>
    </div>
  );
};
