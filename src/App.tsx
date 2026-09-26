import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { FootballGoal } from './components/FootballGoal';
import { VisualBalls } from './components/VisualBalls';
import { AnswerPad } from './components/AnswerPad';
import { VictoryModal } from './components/VictoryModal';
import { TrophyCabinetModal } from './components/TrophyCabinetModal';
import { GameMode, DifficultyLevel, PlayerStats, MathProblem } from './types';
import { generateProblem } from './utils/mathGenerator';
import { sound } from './utils/sound';

const STORAGE_KEY = 'frasses_mattekul_stats_v1';
const HELPER_STORAGE_KEY = 'frasses_show_helper_v1';

const DEFAULT_STATS: PlayerStats = {
  totalGoals: 0,
  trophies: 0,
  currentMatchGoals: 0,
  totalCorrect: 0,
  favoriteJersey: '10',
};

export const App: React.FC = () => {
  const [mode, setMode] = useState<GameMode>('plus');
  const [level, setLevel] = useState<DifficultyLevel>(5); // 0-5 som standard för Frans (5 år)
  const [showHelper, setShowHelper] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(HELPER_STORAGE_KEY);
      if (saved !== null) return saved === 'true';
    } catch {
      // Ignorera
    }
    return true; // På som standard för 5-åring
  });

  const [stats, setStats] = useState<PlayerStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignorera
    }
    return DEFAULT_STATS;
  });

  const [problem, setProblem] = useState<MathProblem>(() => generateProblem('plus', 5));
  const [shootState, setShootState] = useState<'idle' | 'goal' | 'miss'>('idle');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [wrongOption, setWrongOption] = useState<number | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState<boolean>(false);
  const [isTrophyCabinetOpen, setIsTrophyCabinetOpen] = useState<boolean>(false);

  // Spara statistik och hjälpinställning i localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // Ignorera
    }
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(HELPER_STORAGE_KEY, String(showHelper));
    } catch {
      // Ignorera
    }
  }, [showHelper]);

  // Generera nytt tal vid ändrat läge eller nivå
  useEffect(() => {
    const nextProb = generateProblem(mode, level);
    setProblem(nextProb);
    setShootState('idle');
    setSelectedOption(null);
    setWrongOption(null);
    setDisabled(false);
  }, [mode, level]);

  const handleAnswerSelect = useCallback((opt: number) => {
    if (disabled) return;

    setSelectedOption(opt);

    if (opt === problem.answer) {
      // RÄTT SVAR! MÅÅÅL!
      setDisabled(true);
      setShootState('goal');
      sound.playKick();

      setTimeout(() => {
        sound.playGoal();
      }, 150);

      const nextGoals = stats.currentMatchGoals + 1;
      const nextTotalGoals = stats.totalGoals + 1;
      const nextTotalCorrect = stats.totalCorrect + 1;

      if (nextGoals >= 5) {
        // MATCHEN ÄR VUNNEN!
        setStats(prev => ({
          ...prev,
          totalGoals: nextTotalGoals,
          totalCorrect: nextTotalCorrect,
          currentMatchGoals: 5,
          trophies: prev.trophies + 1,
        }));

        setTimeout(() => {
          setIsVictoryModalOpen(true);
        }, 1200);
      } else {
        // Fortsätt pågående match
        setStats(prev => ({
          ...prev,
          totalGoals: nextTotalGoals,
          totalCorrect: nextTotalCorrect,
          currentMatchGoals: nextGoals,
        }));

        setTimeout(() => {
          setProblem(generateProblem(mode, level, problem.id));
          setShootState('idle');
          setSelectedOption(null);
          setDisabled(false);
        }, 1500);
      }
    } else {
      // FEL SVAR
      setShootState('miss');
      setWrongOption(opt);
      sound.playTryAgain();

      setTimeout(() => {
        setShootState('idle');
        setWrongOption(null);
        setSelectedOption(null);
      }, 800);
    }
  }, [disabled, problem, stats, mode, level]);

  const handleNextMatch = () => {
    setIsVictoryModalOpen(false);
    setStats(prev => ({
      ...prev,
      currentMatchGoals: 0,
    }));
    setProblem(generateProblem(mode, level));
    setShootState('idle');
    setSelectedOption(null);
    setWrongOption(null);
    setDisabled(false);
    sound.playWhistle();
  };

  const handleResetStats = () => {
    setStats(DEFAULT_STATS);
    localStorage.removeItem(STORAGE_KEY);
    setIsTrophyCabinetOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-green-950 text-white flex flex-col justify-between py-2 sm:py-4">
      <div className="w-full">
        {/* Header med Frans profil, pokaler och ljudeffektsknapp */}
        <Header
          stats={stats}
          soundOn={soundOn}
          setSoundOn={setSoundOn}
          onOpenTrophies={() => setIsTrophyCabinetOpen(true)}
        />

        {/* Läges- & nivåväljare + Räknehjälpstoggle */}
        <ModeSelector
          mode={mode}
          setMode={setMode}
          level={level}
          setLevel={setLevel}
          showHelper={showHelper}
          setShowHelper={setShowHelper}
        />

        {/* Fotbollsmål och mattetal */}
        <FootballGoal
          problem={problem}
          matchGoals={stats.currentMatchGoals}
          shootState={shootState}
          selectedOption={selectedOption}
        />

        {/* Visuella fotbollar för pedagogiskt stöd (Togglingsbar) */}
        <div className="w-full max-w-md mx-auto px-4">
          {showHelper ? (
            <VisualBalls
              problem={problem}
              onClose={() => setShowHelper(false)}
            />
          ) : (
            <div className="my-2">
              <button
                type="button"
                onClick={() => {
                  sound.playBallTap(2);
                  setShowHelper(true);
                }}
                className="w-full py-2.5 px-4 bg-emerald-900/40 hover:bg-emerald-900/60 border border-dashed border-emerald-600/50 rounded-2xl text-emerald-300/90 hover:text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-xs"
              >
                <span>💡</span>
                <span>Visa bollar att räkna på (Räknehjälp)</span>
              </button>
            </div>
          )}
        </div>

        {/* Svarsknappar */}
        <AnswerPad
          options={problem.options}
          onSelect={handleAnswerSelect}
          correctAnswer={problem.answer}
          selectedOption={selectedOption}
          wrongOption={wrongOption}
          disabled={disabled}
        />
      </div>

      {/* Minimalistisk footer */}
      <footer className="w-full max-w-md mx-auto px-4 text-center text-xs text-emerald-400/60 pb-2">
        <p>⚽ Skapad för Frans • Heja dig! 🌟</p>
      </footer>

      {/* Segermodal vid vunnen match (5 mål) */}
      <VictoryModal
        isOpen={isVictoryModalOpen}
        onNextMatch={handleNextMatch}
        trophies={stats.trophies}
        totalGoals={stats.totalGoals}
      />

      {/* Prishylla / Pokalskåp */}
      <TrophyCabinetModal
        isOpen={isTrophyCabinetOpen}
        onClose={() => setIsTrophyCabinetOpen(false)}
        stats={stats}
        onReset={handleResetStats}
      />
    </div>
  );
};

export default App;
