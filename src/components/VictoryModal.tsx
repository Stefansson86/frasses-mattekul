import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award, Play } from 'lucide-react';
import { sound } from '../utils/sound';

interface VictoryModalProps {
  isOpen: boolean;
  onNextMatch: () => void;
  trophies: number;
  totalGoals: number;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onNextMatch,
  trophies,
  totalGoals,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playWhistle();
      setTimeout(() => {
        sound.playGoal();
      }, 300);

      // Skjut konfetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22c55e', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
        });
      } catch {
        // Ignorera om confetti inte kan renderas
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-pop">
      <div className="bg-gradient-to-b from-emerald-800 to-emerald-950 border-4 border-amber-400 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative overflow-hidden">
        {/* Ljusstrålar/Guldglow */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-full flex items-center justify-center shadow-lg border-4 border-amber-300 animate-bounce">
          <Trophy className="w-10 h-10 text-amber-900" />
        </div>

        <h2 className="text-3xl font-black text-amber-300 tracking-wide uppercase mb-1">
          Mästare Frans!
        </h2>
        <p className="text-emerald-100 font-bold text-sm mb-4">
          Du gjorde 5 mål och vann hela matchen! ⚽🔥
        </p>

        <div className="grid grid-cols-2 gap-3 bg-emerald-900/80 p-3 rounded-2xl border border-emerald-600/40 mb-5">
          <div className="flex flex-col items-center">
            <span className="text-xs text-emerald-300 font-semibold">Dina Pokaler</span>
            <div className="flex items-center gap-1 text-2xl font-black text-amber-300">
              <Trophy className="w-5 h-5" />
              <span>{trophies}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-emerald-300 font-semibold">Totalt Gjorda Mål</span>
            <div className="flex items-center gap-1 text-2xl font-black text-emerald-200">
              <span>⚽</span>
              <span>{totalGoals}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onNextMatch}
          className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-emerald-950 font-black text-xl rounded-2xl shadow-lg border-2 border-white flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <Play className="w-6 h-6 fill-current" />
          <span>Spela Ny Match!</span>
        </button>
      </div>
    </div>
  );
};
