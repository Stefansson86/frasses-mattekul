import React from 'react';
import { Volume2, VolumeX, Trophy } from 'lucide-react';
import { sound } from '../utils/sound';
import { PlayerStats } from '../types';

interface HeaderProps {
  stats: PlayerStats;
  soundOn: boolean;
  setSoundOn: (v: boolean) => void;
  onOpenTrophies: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
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

  return (
    <header className="w-full max-w-md mx-auto px-4 py-3 flex items-center justify-between">
      {/* Profil Frans & Fotboll */}
      <div className="flex items-center gap-2">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md shadow-emerald-900/30 border-2 border-emerald-300/40 text-xl">
          ⚽
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-lg text-emerald-100 tracking-wide">
              Frans <span className="text-emerald-400">#10</span>
            </h1>
          </div>
          <p className="text-xs font-semibold text-emerald-300/80">Mattekul på planen</p>
        </div>
      </div>

      {/* Pokaler & Ljudreglage */}
      <div className="flex items-center gap-2">
        {/* Pokalknapp */}
        <button
          onClick={onOpenTrophies}
          className="flex items-center gap-1.5 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600/40 rounded-xl px-3 py-1.5 transition-transform active:scale-95 shadow-sm"
          title="Se Frans pokaler"
        >
          <Trophy className="w-4 h-4 text-amber-300" />
          <span className="font-extrabold text-sm text-amber-300">{stats.trophies}</span>
        </button>

        {/* Ljudeffekter (Bollspark, mål, klick) */}
        <button
          onClick={toggleSound}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 border ${
            soundOn
              ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
              : 'bg-emerald-900/60 text-emerald-400/60 border-emerald-700/30'
          }`}
          title={soundOn ? 'Ljudeffekter är på' : 'Ljudeffekter är av'}
          aria-label="Växla ljud"
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
