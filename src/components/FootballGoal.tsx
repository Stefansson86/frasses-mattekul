import React from 'react';
import { MathProblem } from '../types';

interface FootballGoalProps {
  problem: MathProblem;
  matchGoals: number; // 0 till 5
  shootState: 'idle' | 'goal' | 'miss';
  selectedOption: number | null;
}

export const FootballGoal: React.FC<FootballGoalProps> = ({
  problem,
  matchGoals,
  shootState,
  selectedOption,
}) => {
  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Matchstatus: 5 bollar till nästa pokal */}
      <div className="bg-emerald-900/60 rounded-2xl px-4 py-2.5 border border-emerald-700/50 mb-3 flex items-center justify-between">
        <div className="text-xs font-bold text-emerald-200">
          Match i full gång:
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => {
            const hasScored = i < matchGoals;
            return (
              <span
                key={i}
                className={`text-lg sm:text-xl transition-all duration-300 ${
                  hasScored ? 'scale-115 filter drop-shadow' : 'opacity-30 grayscale'
                }`}
                title={`Mål ${i + 1}`}
              >
                ⚽
              </span>
            );
          })}
        </div>
      </div>

      {/* Själva fotbollsarenan med mål och plan */}
      <div className="relative w-full h-44 sm:h-52 bg-gradient-to-b from-emerald-800 via-green-700 to-emerald-800 rounded-3xl border-4 border-emerald-500/60 shadow-xl overflow-hidden flex flex-col items-center justify-between p-3 select-none">
        {/* Fotbollsplanslinjer */}
        <div className="absolute inset-x-8 top-0 h-16 border-b-2 border-x-2 border-white/25 rounded-b-xl pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-10 border-t-2 border-white/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border-2 border-white/20 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 pointer-events-none" />

        {/* Fotbollsmålet längst upp */}
        <div className="relative z-10 w-44 sm:w-52 h-20 bg-slate-900/30 rounded-t-lg border-x-4 border-t-4 border-white/90 shadow-md flex items-center justify-center overflow-hidden">
          {/* Nätmönster */}
          <div
            className={`absolute inset-0 opacity-40 bg-[linear-gradient(45deg,#fff_25%,transparent_25%),linear-gradient(-45deg,#fff_25%,transparent_25%)] bg-[size:10px_10px] ${
              shootState === 'goal' ? 'animate-net' : ''
            }`}
          />

          {/* Målvakts-vimpel eller jubeltext */}
          {shootState === 'goal' ? (
            <div className="relative z-20 bg-amber-400 text-emerald-950 font-black text-xl sm:text-2xl px-4 py-1 rounded-full shadow-lg border-2 border-white animate-pop">
              ⚽ MÅÅÅL!
            </div>
          ) : shootState === 'miss' ? (
            <div className="relative z-20 bg-rose-500 text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg border border-white animate-pop">
              Pröva igen!
            </div>
          ) : null}
        </div>

        {/* Bollen på straffpunkten */}
        <div className="relative z-20 mb-2">
          <div
            className={`text-4xl sm:text-5xl transition-all duration-300 filter drop-shadow-md ${
              shootState === 'goal'
                ? 'animate-kick'
                : shootState === 'miss'
                ? 'animate-bounce'
                : 'animate-float'
            }`}
          >
            ⚽
          </div>
        </div>
      </div>

      {/* Mattetalet (Stort, tydligt, barnvänligt) */}
      <div className="mt-3 bg-emerald-900/70 rounded-3xl p-3 sm:p-4 border-2 border-emerald-600/40 shadow-md flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide drop-shadow-sm flex items-center justify-center gap-3">
            <span>{problem.num1}</span>
            <span className="text-emerald-400 text-3xl sm:text-4xl">{problem.operator}</span>
            <span>{problem.num2}</span>
            <span className="text-emerald-400 text-3xl sm:text-4xl">=</span>
            <span className="inline-flex items-center justify-center min-w-[56px] h-12 bg-emerald-800 border-2 border-emerald-400 rounded-2xl text-amber-300">
              {shootState === 'goal' ? problem.answer : '?'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
