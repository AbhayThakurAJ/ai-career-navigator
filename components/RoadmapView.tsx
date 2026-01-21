
import React, { useState, useMemo, useEffect } from 'react';
import { Roadmap, RoadmapStep } from '../types';
import { 
  Calendar, 
  CheckCircle2, 
  Circle,
  RotateCcw,
  Trophy,
  Zap,
  Star,
  Award,
  CloudUpload,
  Check,
  ArrowLeft
} from 'lucide-react';

interface RoadmapViewProps {
  roadmap: Roadmap;
  onReset: () => void;
  onBack: () => void;
  completedSteps: Record<string, Set<number>>;
  setCompletedSteps: React.Dispatch<React.SetStateAction<Record<string, Set<number>>>>;
  userResources: Record<string, string[]>;
  setUserResources: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  onSave: () => void;
}

type Timeframe = 'oneMonth' | 'threeMonths' | 'sixMonths';

const Confetti = () => {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'];
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className={`confetti ${colors[Math.floor(Math.random() * colors.length)]} rounded-sm`}
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </>
  );
};

export const RoadmapView: React.FC<RoadmapViewProps> = ({ 
  roadmap, 
  onReset,
  onBack,
  completedSteps,
  setCompletedSteps,
  onSave
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('threeMonths');
  const [showCelebration, setShowCelebration] = useState(false);
  const [xpPop, setXpPop] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentSteps: RoadmapStep[] = roadmap[selectedTimeframe];
  
  const toggleStep = (index: number) => {
    const isNowCompleting = !completedSteps[selectedTimeframe]?.has(index);
    
    if (isNowCompleting) {
      setXpPop(index);
      setTimeout(() => setXpPop(null), 1000);
    }

    setCompletedSteps(prev => {
      const newSet = new Set(prev[selectedTimeframe] || []);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return { ...prev, [selectedTimeframe]: newSet };
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    onSave();
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 800);
  };

  const progress = useMemo(() => {
    const completed = completedSteps[selectedTimeframe]?.size || 0;
    const total = currentSteps.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [completedSteps, selectedTimeframe, currentSteps]);

  useEffect(() => {
    if (progress === 100 && currentSteps.length > 0) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [progress, currentSteps.length]);

  const totalXp = useMemo(() => {
    // Fixed: Cast Object.values to Set<number>[] to resolve 'unknown' type error in reduce
    return (Object.values(completedSteps) as Set<number>[]).reduce((acc, set) => acc + (set.size * 100), 0);
  }, [completedSteps]);

  return (
    <div className="animate-fadeIn space-y-8 pb-20 relative">
      {showCelebration && <Confetti />}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={onBack}
              className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 text-sm flex items-center gap-2 transition-all font-black group bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Goals
            </button>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            <button 
              onClick={onReset}
              className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 text-sm flex items-center gap-2 transition-all font-black group px-2 py-2"
            >
              <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-[-120deg] transition-transform duration-500" /> Start Over
            </button>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-600 rounded-[1.25rem] shadow-2xl shadow-indigo-600/20">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {roadmap.goalTitle}
            </h2>
          </div>
          <div className="flex items-center gap-5 text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-lg">Your personalized career map.</p>
            <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-full text-xs font-black border border-amber-200 dark:border-amber-800 shadow-sm animate-pulse">
              <Zap className="w-4 h-4 fill-current" /> {totalXp} XP EARNED
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black transition-all shadow-xl active:scale-95 disabled:opacity-50 w-full sm:w-auto ${
              saveSuccess 
              ? 'bg-green-600 text-white' 
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 shadow-indigo-500/5'
            }`}
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-indigo-500"></div>
            ) : saveSuccess ? (
              <Check className="w-4 h-4" />
            ) : (
              <CloudUpload className="w-4 h-4" />
            )}
            {saveSuccess ? 'Saved Locally' : 'Save Progress'}
          </button>

          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl shadow-inner w-full sm:w-auto border border-slate-200 dark:border-transparent">
            {(['oneMonth', 'threeMonths', 'sixMonths'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-[1.1rem] text-sm font-black transition-all duration-300 ${
                  selectedTimeframe === tf 
                  ? 'bg-white dark:bg-slate-700 shadow-lg text-indigo-600 dark:text-white scale-105 z-10' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tf === 'oneMonth' ? '1 Month' : tf === 'threeMonths' ? '3 Months' : '6 Months'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="p-8 sm:p-12 rounded-[3.5rem] border-2 border-indigo-500/10 overflow-hidden relative shadow-[0_20px_60px_rgba(79,70,229,0.06)] bg-white dark:bg-slate-900/40">
        <div className={`absolute -right-8 -top-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-[100px] transition-opacity duration-1000 ${progress === 100 ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mb-10">
          <div className="flex items-center gap-5">
            <div className={`p-4 rounded-[1.5rem] transition-all duration-700 shadow-sm ${progress === 100 ? 'bg-amber-500 scale-125 rotate-12' : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-transparent'}`}>
              <Trophy className={`w-9 h-9 ${progress === 100 ? 'text-white' : 'text-slate-400'}`} />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-2">Overall Mastery</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {progress === 100 ? 'Journey Mastered!' : 'On Your Way To Success'}
              </span>
            </div>
          </div>
          <div className="text-center sm:text-right">
             <span className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 tabular-nums tracking-tighter">{progress}%</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-7 rounded-full overflow-hidden p-2 shadow-inner border border-slate-200/50 dark:border-transparent">
          <div 
            className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 transition-all duration-1000 ease-out rounded-full shadow-[0_0_25px_rgba(79,70,229,0.35)] relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
             <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.45)_50%,transparent_75%)] bg-[length:200%_100%] animate-[shimmer_2.5s_infinite]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 relative mt-20">
        <div className="absolute left-7 top-10 bottom-10 w-1.5 bg-gradient-to-b from-indigo-500/20 to-transparent dark:from-slate-800 hidden md:block rounded-full"></div>
        
        {currentSteps.map((step, index) => {
          const isCompleted = completedSteps[selectedTimeframe]?.has(index) || false;
          const isRecentlyPopped = xpPop === index;
          
          return (
            <div key={index} className="flex gap-10 relative group animate-fadeIn" style={{ animationDelay: `${index * 120}ms` }}>
              <div 
                className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center z-10 font-black transition-all duration-500 hidden md:flex border-4 ${
                  isCompleted 
                  ? 'bg-green-500 border-green-100 dark:border-green-900 text-white scale-115 shadow-2xl shadow-green-500/40 animate-pop' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-indigo-600 hover:scale-110 shadow-xl'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-8 h-8" /> : index + 1}
              </div>

              <div 
                className={`flex-grow p-8 sm:p-12 rounded-[3.5rem] transition-all duration-700 border-2 relative overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.02)] bg-white dark:bg-slate-900/30 ${
                  isCompleted 
                  ? 'border-green-500/30 bg-green-50/10 dark:bg-green-900/10 opacity-80 scale-[0.97]' 
                  : 'border-white dark:border-slate-800 hover:border-indigo-500/30 hover:shadow-2xl hover:bg-white'
                }`}
              >
                {isRecentlyPopped && (
                  <div className="absolute top-8 right-28 animate-slideInRight text-green-500 font-black text-3xl z-20 pointer-events-none drop-shadow-md">
                    +100 XP
                  </div>
                )}

                <div className="flex items-start justify-between mb-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 px-4 py-2 bg-indigo-50/80 dark:bg-indigo-900/30 rounded-full w-fit shadow-sm border border-indigo-100/50 dark:border-transparent">
                        {step.period}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600 px-4 py-2 bg-green-50 dark:bg-green-900/30 rounded-full w-fit flex items-center gap-2 shadow-sm border border-green-100 dark:border-transparent">
                          <Star className="w-3.5 h-3.5 fill-current" /> COMPLETED
                        </span>
                      )}
                    </div>
                    <h3 className={`text-2xl sm:text-4xl font-black mt-1 transition-all duration-500 leading-tight tracking-tight ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                      {step.task}
                    </h3>
                  </div>
                  <button 
                    onClick={() => toggleStep(index)}
                    className={`p-6 rounded-[2rem] transition-all duration-300 transform active:scale-90 shadow-2xl ${
                      isCompleted 
                      ? 'bg-green-500 text-white shadow-green-500/40 ring-8 ring-green-500/10' 
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white border border-slate-200 dark:border-transparent hover:shadow-indigo-500/30'
                    }`}
                    aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {isCompleted ? <CheckCircle2 className="w-9 h-9" /> : <Circle className="w-9 h-9" />}
                  </button>
                </div>

                <p className={`text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-lg sm:text-2xl font-medium transition-opacity duration-500 ${isCompleted ? 'opacity-40' : ''}`}>
                  {step.description}
                </p>

                {step.resources && step.resources.length > 0 && !isCompleted && (
                   <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800">
                     <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Expert Recommendations</h4>
                     <ul className="grid sm:grid-cols-2 gap-4">
                       {step.resources.map((res, rid) => (
                         <li key={rid} className="flex items-center gap-3 text-sm font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20 px-5 py-3 rounded-2xl border border-indigo-100/50 dark:border-transparent shadow-sm">
                           <Star className="w-4 h-4 fill-current opacity-70" /> {res}
                         </li>
                       ))}
                     </ul>
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-8 pt-20">
        {progress === 100 && (
          <div className="animate-bounce bg-gradient-to-r from-amber-400 to-orange-500 text-white px-14 py-8 rounded-[3rem] font-black text-3xl text-center shadow-2xl ring-[12px] ring-amber-500/15 flex items-center gap-5">
            <Award className="w-12 h-12" />
            UNSTOPPABLE! YOU DID IT!
          </div>
        )}
      </div>
    </div>
  );
};
