
import React from 'react';
import { CareerGoal } from '../types';
import { Target, Compass, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';

interface GoalSelectionProps {
  goals: CareerGoal[];
  onSelect: (goal: CareerGoal) => void;
  loadingGoalId: string | null;
  onBack: () => void;
}

export const GoalSelection: React.FC<GoalSelectionProps> = ({ goals, onSelect, loadingGoalId, onBack }) => {
  return (
    <div className="animate-fadeIn pb-12">
      <div className="flex flex-col items-center mb-10">
        <button 
          onClick={onBack}
          className="self-start flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-all group px-4 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </button>
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
            Your AI Career <span className="text-indigo-600">Architect</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            We've analyzed your potential. Choose the path that excites you most, and we'll build the roadmap.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {goals.map((goal, idx) => {
          // Use index as fallback if id is missing or duplicated from API
          const uniqueId = goal.id || `goal-${idx}`;
          const isThisLoading = loadingGoalId === goal.id || loadingGoalId === uniqueId;
          const isAnyLoading = loadingGoalId !== null;

          return (
            <div 
              key={uniqueId}
              className={`group p-8 rounded-[2.5rem] flex flex-col justify-between transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden border-2 ${
                isThisLoading 
                  ? 'border-indigo-500 bg-white dark:bg-slate-900 shadow-2xl scale-105 z-10' 
                  : 'bg-white/80 dark:bg-slate-900/40 border-white dark:border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-none hover:border-indigo-500/30'
              }`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                <Target className="w-32 h-32 text-indigo-500" />
              </div>
              
              <div>
                <div className="bg-indigo-50 dark:bg-indigo-900/40 w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100/50 dark:border-transparent">
                  {idx === 0 ? <Compass className="w-8 h-8" /> : idx === 1 ? <Target className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors leading-tight">
                  {goal.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base mb-8 leading-relaxed font-medium">
                  {goal.description}
                </p>
                
                <div className="bg-slate-50/80 dark:bg-slate-800/40 p-6 rounded-3xl mb-10 border border-slate-100 dark:border-transparent">
                  <span className="text-[10px] uppercase font-black text-indigo-500 tracking-[0.2em] mb-3 block">Why this fits you</span>
                  <p className="text-sm italic text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                    "{goal.reasoning}"
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelect({...goal, id: uniqueId})}
                disabled={isAnyLoading}
                className={`w-full py-4 px-6 font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isThisLoading 
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20' 
                  : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 hover:text-white'
                }`}
              >
                {isThisLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Building Roadmap...
                  </>
                ) : (
                  <>
                    {isAnyLoading ? 'Please Wait' : 'Start This Journey'} <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
