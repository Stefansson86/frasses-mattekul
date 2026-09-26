import React from 'react';
import { GameMode, DifficultyLevel } from '../types';
import { sound } from '../utils/sound';

interface ModeSelectorProps {
  mode: GameMode;
  setMode: (m: GameMode) => void;
  level: DifficultyLevel;
  setLevel: (l: DifficultyLevel) => void;
  showHelper: boolean;
  setShowHelper: (h: boolean) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mode,
  setMode,
  level,
  setLevel,
  showHelper,
  setShowHelper,
}) => {
  const handleModeChange = (newMode: GameMode) => {
    sound.playBallTap(1);
    setMode(newMode);
  };

  const handleLevelChange = (newLevel: DifficultyLevel) => {
    sound.playBallTap(3);
    setLevel(newLevel);
  };

  const handleToggleHelper = () => {
    sound.playBallTap(2);
    setShowHelper(!showHelper);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 mb-2 space-y-2">
      {/* Räknesätt (Plus, Minus, Blandat) */}
      <div className="grid grid-cols-3 gap-2 bg-emerald-900/60 p-1 rounded-2xl border border-emerald-700/40">
        <button
          onClick={() => handleModeChange('plus')}
          className={`py-2 px-3 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            mode === 'plus'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/40 scale-[1.02]'
              : 'text-emerald-300 hover:text-white hover:bg-emerald-800/50'
          }`}
        >
          <span className="text-lg">➕</span> Plus
        </button>

        <button
          onClick={() => handleModeChange('minus')}
          className={`py-2 px-3 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            mode === 'minus'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/40 scale-[1.02]'
              : 'text-emerald-300 hover:text-white hover:bg-emerald-800/50'
          }`}
        >
          <span className="text-lg">➖</span> Minus
        </button>

        <button
          onClick={() => handleModeChange('mix')}
          className={`py-2 px-3 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            mode === 'mix'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/40 scale-[1.02]'
              : 'text-emerald-300 hover:text-white hover:bg-emerald-800/50'
          }`}
        >
          <span className="text-lg">⚽</span> Mix
        </button>
      </div>

      {/* Inställningsrad: Svårighetsgrad & Räknehjälp */}
      <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
        {/* Svårighetsgrad */}
        <div className="bg-emerald-900/50 p-1.5 rounded-2xl border border-emerald-800/50 flex flex-col justify-between">
          <span className="text-emerald-300/80 font-bold px-1 mb-1 text-[11px] uppercase tracking-wide">
            Svårighetsgrad
          </span>
          <div className="grid grid-cols-2 gap-1 bg-emerald-950/60 p-0.5 rounded-xl border border-emerald-800/60">
            <button
              onClick={() => handleLevelChange(5)}
              className={`py-1 rounded-lg font-extrabold text-xs transition-all ${
                level === 5
                  ? 'bg-emerald-400 text-emerald-950 shadow-sm'
                  : 'text-emerald-300/70 hover:text-white'
              }`}
            >
              0 – 5
            </button>
            <button
              onClick={() => handleLevelChange(10)}
              className={`py-1 rounded-lg font-extrabold text-xs transition-all ${
                level === 10
                  ? 'bg-emerald-400 text-emerald-950 shadow-sm'
                  : 'text-emerald-300/70 hover:text-white'
              }`}
            >
              0 – 10
            </button>
          </div>
        </div>

        {/* Räknehjälp (Bollar) */}
        <div className="bg-emerald-900/50 p-1.5 rounded-2xl border border-emerald-800/50 flex flex-col justify-between">
          <span className="text-emerald-300/80 font-bold px-1 mb-1 text-[11px] uppercase tracking-wide">
            Räknehjälp (belysning)
          </span>
          <button
            onClick={handleToggleHelper}
            className={`w-full py-1 px-2 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 border ${
              showHelper
                ? 'bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-400/60 shadow-xs'
                : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400/70 border-emerald-800/60'
            }`}
            title={showHelper ? 'Klicka för att dölja bollar' : 'Klicka för att visa bollar'}
          >
            <span>{showHelper ? '🟢' : '⚪'}</span>
            <span>{showHelper ? 'Bollar: PÅ' : 'Bollar: AV'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
