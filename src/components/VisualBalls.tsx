import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MathProblem } from '../types';
import { sound } from '../utils/sound';

interface VisualBallsProps {
  problem: MathProblem;
  onClose?: () => void;
}

export const VisualBalls: React.FC<VisualBallsProps> = ({ problem, onClose }) => {
  const [bouncedIndices, setBouncedIndices] = useState<Record<string, boolean>>({});

  // Reset tapped balls on problem change
  useEffect(() => {
    setBouncedIndices({});
  }, [problem.id]);

  const handleBallClick = (key: string, noteIndex: number) => {
    sound.playBallTap(noteIndex);
    setBouncedIndices(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isAddition = problem.operator === '+';

  return (
    <div className="w-full bg-emerald-900/40 rounded-3xl p-3.5 sm:p-4 border border-emerald-700/40 backdrop-blur-xs my-2 relative animate-pop">
      {/* Header med instruktion och snabb-stäng-knapp */}
      <div className="flex items-center justify-between mb-3 px-1">
        <p className="text-xs sm:text-sm font-bold text-emerald-200 uppercase tracking-wider flex-1 text-center">
          {isAddition ? 'Peka och räkna alla fotbollar ⚽' : 'Räkna hur många bollar som är kvar ⚽'}
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-300 hover:text-white flex items-center justify-center transition-all border border-emerald-600/30 text-xs ml-2"
            title="Dölj räknehjälpen"
            aria-label="Dölj räknehjälpen"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isAddition ? (
        // Addition: Grupp 1 + Grupp 2
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Grupp 1 (num1) */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-2.5 bg-emerald-800/50 rounded-2xl border border-emerald-600/30 min-h-[64px]">
            {problem.num1 === 0 ? (
              <span className="text-xs font-bold text-emerald-300/70 px-2">0 bollar</span>
            ) : (
              Array.from({ length: problem.num1 }).map((_, idx) => {
                const key = `g1-${idx}`;
                const isBounced = bouncedIndices[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleBallClick(key, idx)}
                    className={`relative w-11 h-11 sm:w-12 sm:h-12 text-2xl sm:text-3xl flex items-center justify-center rounded-full transition-transform active:scale-90 ${
                      isBounced ? 'scale-115 -translate-y-1' : 'hover:scale-105'
                    }`}
                    title={`Boll ${idx + 1}`}
                  >
                    ⚽
                    <span className="absolute -bottom-1 -right-1 bg-emerald-950/90 text-emerald-300 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-emerald-500/50">
                      {idx + 1}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Plus-tecken */}
          <div className="w-8 h-8 rounded-full bg-emerald-700/60 border border-emerald-500/40 flex items-center justify-center text-emerald-200 font-extrabold text-xl shadow-xs">
            +
          </div>

          {/* Grupp 2 (num2) */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-2.5 bg-emerald-800/50 rounded-2xl border border-emerald-600/30 min-h-[64px]">
            {problem.num2 === 0 ? (
              <span className="text-xs font-bold text-emerald-300/70 px-2">0 bollar</span>
            ) : (
              Array.from({ length: problem.num2 }).map((_, idx) => {
                const key = `g2-${idx}`;
                const isBounced = bouncedIndices[key];
                const countNumber = problem.num1 + idx + 1;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleBallClick(key, countNumber)}
                    className={`relative w-11 h-11 sm:w-12 sm:h-12 text-2xl sm:text-3xl flex items-center justify-center rounded-full transition-transform active:scale-90 ${
                      isBounced ? 'scale-115 -translate-y-1' : 'hover:scale-105'
                    }`}
                    title={`Boll ${countNumber}`}
                  >
                    ⚽
                    <span className="absolute -bottom-1 -right-1 bg-emerald-950/90 text-emerald-300 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-emerald-500/50">
                      {countNumber}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : (
        // Subtraktion: Start med num1, ta bort num2
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-emerald-800/50 rounded-2xl border border-emerald-600/30 max-w-full">
            {problem.num1 === 0 ? (
              <span className="text-xs font-bold text-emerald-300/70 px-2">0 bollar</span>
            ) : (
              Array.from({ length: problem.num1 }).map((_, idx) => {
                // De sista num2 bollarna tas bort (streckas över)
                const isRemoved = idx >= (problem.num1 - problem.num2);
                const key = `sub-${idx}`;
                const isBounced = bouncedIndices[key];

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleBallClick(key, idx)}
                    className={`relative w-11 h-11 sm:w-12 sm:h-12 text-2xl sm:text-3xl flex items-center justify-center rounded-full transition-all ${
                      isRemoved
                        ? 'opacity-35 grayscale scale-90'
                        : isBounced
                        ? 'scale-115 -translate-y-1'
                        : 'hover:scale-105'
                    }`}
                    title={isRemoved ? 'Borttagen boll' : `Kvarvarande boll ${idx + 1}`}
                  >
                    ⚽
                    {isRemoved ? (
                      <span className="absolute inset-0 flex items-center justify-center text-red-500 font-black text-2xl drop-shadow-sm">
                        ✕
                      </span>
                    ) : (
                      <span className="absolute -bottom-1 -right-1 bg-emerald-950/90 text-emerald-300 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-emerald-500/50">
                        {idx + 1}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="text-center text-xs font-semibold text-emerald-300/80">
            {problem.num2 > 0 ? (
              <span>(De {problem.num2} {problem.num2 === 1 ? 'bollen' : 'bollarna'} med kryss rullade iväg!)</span>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
