import React from 'react';
import { Trophy, Award, X, Sparkles, RotateCcw } from 'lucide-react';
import { PlayerStats } from '../types';
import { sound } from '../utils/sound';

interface TrophyCabinetModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  onReset: () => void;
}

export const TrophyCabinetModal: React.FC<TrophyCabinetModalProps> = ({
  isOpen,
  onClose,
  stats,
  onReset,
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    if (window.confirm("Vill du nollställa Frans statistik och börja om från 0 pokaler?")) {
      onReset();
      sound.playBallTap(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-pop">
      <div className="bg-gradient-to-b from-emerald-900 to-emerald-950 border-3 border-emerald-500/50 rounded-3xl max-w-sm w-full p-5 text-emerald-100 shadow-2xl relative">
        {/* Stäng-knapp */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-emerald-800/80 hover:bg-emerald-700 flex items-center justify-center text-emerald-200 border border-emerald-600/40"
          title="Stäng prishyllan"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Frans Prishylla</h2>
            <p className="text-xs text-emerald-300/80">Alla dina vinster och guldmedaljer</p>
          </div>
        </div>

        {/* Pokalsamling */}
        <div className="bg-emerald-950/70 p-4 rounded-2xl border border-emerald-800/60 mb-4">
          <div className="text-xs font-bold text-amber-300/90 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Pokaler ({stats.trophies} st)
          </div>

          {stats.trophies === 0 ? (
            <div className="py-6 text-center text-emerald-400/60 text-xs font-semibold">
              Gör 5 mål i en match för att vinna din allra första pokal! ⚽🏆
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
              {Array.from({ length: stats.trophies }).map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 border border-amber-200 flex items-center justify-center shadow-md animate-pop text-lg"
                  title={`Pokal ${i + 1}`}
                >
                  🏆
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Matchstatistik */}
        <div className="grid grid-cols-2 gap-2 text-center mb-5">
          <div className="bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-700/30">
            <div className="text-xl font-black text-white">{stats.totalGoals}</div>
            <div className="text-[11px] font-semibold text-emerald-300">Gjorda mål ⚽</div>
          </div>
          <div className="bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-700/30">
            <div className="text-xl font-black text-white">{stats.totalCorrect}</div>
            <div className="text-[11px] font-semibold text-emerald-300">Rätt svar ⭐</div>
          </div>
        </div>

        {/* Nollställningsknapp & Stäng */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400/60 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Börja om från noll</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black rounded-xl text-sm transition-transform active:scale-95"
          >
            Tillbaka till matchen
          </button>
        </div>
      </div>
    </div>
  );
};
