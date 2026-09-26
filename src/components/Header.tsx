import React from 'react';
import { Volume2, VolumeX, Trophy } from 'lucide-react';
import { sound } from '../utils/sound';
import { PlayerStats, DifficultyLevel } from '../types';

interface HeaderProps {
  stats: PlayerStats;
  level: DifficultyLevel;
  setLevel: (l: DifficultyLevel) => void;
  soundOn: boolean;
  setSoundOn: (v: boolean) => void;
  onOpenTrophies: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  level,
  setLevel,
  soundOn,
  setSoundOn,
  onOpenTrophies,
}) => {
  const toggleSound = () => {
    const next = !soundOn;
    sound.soundEnabled = next;
    setSoundOn(next);
    if (next) sound.playBallTap(2);
  };

  const handleLevelChange = (newLevel: DifficultyLevel) => {
    sound.playBallTap(3);
    setLevel(newLevel);
  };

  return (
    <header className="w-full max-w-md mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-1.5">
      {/* Profil Frans & Fotboll */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md shadow-emerald-900/30 border border-emerald-300/40 text-lg">
          ⚽
        </div>
        <div>
          <h1 className="font-extrabold text-sm sm:text-base text-emerald-100 tracking-wide leading-tight">
            Frans <span className="text-emerald-400">#10</span>
          </h1>
          <p className="text-[10px] sm:text-xs font-semibold text-emerald-300/70 hidden min-[360px]:block">
            Mattekul
          </p>
        </div>
      </div>

      {/* Svårighetsgrad (Mellan Frans och Pokalen) */}
      <div className="flex items-center bg-emerald-950/80 p-0.5 rounded-xl border border-emerald-700/50 shadow-inner">
        <button
          onClick={() => handleLevelChange(5)}
          className={`px-2.5 py-1 rounded-lg font-black text-xs transition-all active:scale-95 ${
            level === 5
              ? 'bg-emerald-400 text-emerald-950 shadow-sm'
              : 'text-emerald-300/70 hover:text-white'
          }`}
          title="Nivå 0 till 5 (Lättare)"
        >
          0–5
        </button>
        <button
          onClick={() => handleLevelChange(10)}
          className={`px-2.5 py-1 rounded-lg font-black text-xs transition-all active:scale-95 ${
            level === 10
              ? 'bg-emerald-400 text-emerald-950 shadow-sm'
              : 'text-emerald-300/70 hover:text-white'
          }`}
          title="Nivå 0 till 10 (Klurigare)"
        >
          0–10
        </button>
      </div>

      {/* Pokaler & Ljudreglage */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Pokalknapp */}
        <button
          onClick={onOpenTrophies}
          className="flex items-center gap-1 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600/40 rounded-xl px-2.5 py-1.5 transition-transform active:scale-95 shadow-sm"
          title="Se Frans pokaler"
        >
          <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
          <span className="font-extrabold text-xs sm:text-sm text-amber-300">{stats.trophies}</span>
        </button>

        {/* Ljudeffekter */}
        <button
          onClick={toggleSound}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 border ${
            soundOn
              ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
              : 'bg-emerald-900/60 text-emerald-400/60 border-emerald-700/30'
          }`}
          title={soundOn ? 'Ljudeffekter är på' : 'Ljudeffekter är av'}
          aria-label="Växla ljud"
        >
          {soundOn ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>
      </div>
    </header>
  );
};
