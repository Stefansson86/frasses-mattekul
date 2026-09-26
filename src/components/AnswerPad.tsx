import React from 'react';

interface AnswerPadProps {
  options: number[];
  onSelect: (val: number) => void;
  correctAnswer: number;
  selectedOption: number | null;
  wrongOption: number | null;
  disabled: boolean;
}

export const AnswerPad: React.FC<AnswerPadProps> = ({
  options,
  onSelect,
  correctAnswer,
  selectedOption,
  wrongOption,
  disabled,
}) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 mt-2 mb-4">
      <div
        className={`grid gap-3 ${
          options.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
        }`}
      >
        {options.map((opt) => {
          const isSelected = selectedOption === opt;
          const isCorrect = isSelected && opt === correctAnswer;
          const isWrong = wrongOption === opt;

          return (
            <button
              key={opt}
              type="button"
              disabled={disabled || isWrong}
              onClick={() => onSelect(opt)}
              className={`h-20 sm:h-24 rounded-3xl font-extrabold text-3xl sm:text-4xl flex flex-col items-center justify-center transition-all duration-200 active:scale-95 shadow-md border-3 select-none ${
                isCorrect
                  ? 'bg-gradient-to-b from-green-400 to-emerald-600 text-white border-white scale-105 shadow-emerald-500/50'
                  : isWrong
                  ? 'bg-rose-500/30 text-rose-300 border-rose-600/50 opacity-50 cursor-not-allowed'
                  : 'bg-gradient-to-b from-emerald-100 to-emerald-200 hover:from-white hover:to-emerald-100 text-emerald-950 border-emerald-400/80 hover:border-emerald-300 hover:scale-[1.02]'
              }`}
            >
              <span>{opt}</span>
              <span className="text-xs font-semibold text-emerald-800/70 -mt-1">
                {isCorrect ? '⚽ MÅL!' : 'skjut!'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
