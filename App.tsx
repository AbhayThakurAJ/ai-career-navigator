
import React, { useState, useCallback, useEffect } from 'react';
import { Layout } from './components/Layout';
import { OnboardingForm } from './components/OnboardingForm';
import { GoalSelection } from './components/GoalSelection';
import { RoadmapView } from './components/RoadmapView';
import { Auth } from './components/Auth';
import { About } from './components/About';
import { UserProfile, CareerGoal, Roadmap, AppStep, SavedState } from './types';
import { getCareerSuggestions, generateRoadmap } from './services/geminiService';

const SAVE_KEY = 'career_ai_saved_progress';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.AUTH);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [suggestedGoals, setSuggestedGoals] = useState<CareerGoal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<CareerGoal | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingGoalId, setLoadingGoalId] = useState<string | null>(null);

  // Progress State (lifted from RoadmapView for persistence)
  const [completedSteps, setCompletedSteps] = useState<Record<string, Set<number>>>({
    oneMonth: new Set(),
    threeMonths: new Set(),
    sixMonths: new Set(),
  });
  const [userResources, setUserResources] = useState<Record<string, string[]>>({});

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentStep(AppStep.ONBOARDING);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    resetApp();
  };

  const handleOnboardingSubmit = async (profile: UserProfile) => {
    setIsLoading(true);
    setUserProfile(profile);
    try {
      const goals = await getCareerSuggestions(profile);
      setSuggestedGoals(goals);
      setCurrentStep(AppStep.GOAL_SELECTION);
    } catch (error) {
      console.error("Error getting career suggestions:", error);
      alert("Something went wrong while generating suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoalSelect = async (goal: CareerGoal) => {
    if (!userProfile) return;
    setLoadingGoalId(goal.id);
    setSelectedGoal(goal);
    try {
      const generatedRoadmap = await generateRoadmap(userProfile, goal);
      setRoadmap(generatedRoadmap);
      // Reset progress when selecting a new goal
      setCompletedSteps({
        oneMonth: new Set(),
        threeMonths: new Set(),
        sixMonths: new Set(),
      });
      setUserResources({});
      setCurrentStep(AppStep.ROADMAP_VIEW);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      alert("Something went wrong while generating your roadmap. Please try again.");
    } finally {
      setLoadingGoalId(null);
    }
  };

  const saveProgress = useCallback(() => {
    if (!userProfile || !roadmap || !selectedGoal) return;

    const stateToSave: SavedState = {
      userProfile,
      roadmap,
      selectedGoal,
      completedSteps: {
        oneMonth: Array.from(completedSteps.oneMonth),
        threeMonths: Array.from(completedSteps.threeMonths),
        sixMonths: Array.from(completedSteps.sixMonths),
      },
      userResources
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(stateToSave));
  }, [userProfile, roadmap, selectedGoal, completedSteps, userResources]);

  const loadSavedProgress = useCallback(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return false;

    try {
      const data: SavedState = JSON.parse(saved);
      setUserProfile(data.userProfile);
      setRoadmap(data.roadmap);
      setSelectedGoal(data.selectedGoal);
      setCompletedSteps({
        oneMonth: new Set(data.completedSteps.oneMonth),
        threeMonths: new Set(data.completedSteps.threeMonths),
        sixMonths: new Set(data.completedSteps.sixMonths),
      });
      setUserResources(data.userResources);
      setCurrentStep(AppStep.ROADMAP_VIEW);
      return true;
    } catch (e) {
      console.error("Failed to load saved progress", e);
      return false;
    }
  }, []);

  const resetApp = useCallback(() => {
    setCurrentStep(isLoggedIn ? AppStep.ONBOARDING : AppStep.AUTH);
    setUserProfile(null);
    setSuggestedGoals([]);
    setSelectedGoal(null);
    setRoadmap(null);
    setIsLoading(false);
    setLoadingGoalId(null);
    setCompletedSteps({
      oneMonth: new Set(),
      threeMonths: new Set(),
      sixMonths: new Set(),
    });
    setUserResources({});
  }, [isLoggedIn]);

  const handleNavigate = (step: AppStep) => {
    setCurrentStep(step);
  };

  return (
    <Layout 
      darkMode={darkMode} 
      setDarkMode={setDarkMode} 
      onReset={resetApp}
      onNavigate={handleNavigate}
      isLoggedIn={isLoggedIn}
      onLogout={handleLogout}
    >
      {currentStep === AppStep.AUTH && !isLoggedIn && (
        <Auth onLogin={handleLogin} />
      )}

      {currentStep === AppStep.ABOUT && (
        <About />
      )}
      
      {isLoggedIn && (
        <>
          {currentStep === AppStep.ONBOARDING && (
            <OnboardingForm 
              onSubmit={handleOnboardingSubmit} 
              isLoading={isLoading}
              onLoadSaved={loadSavedProgress}
              hasSavedProgress={!!localStorage.getItem(SAVE_KEY)}
            />
          )}
          
          {currentStep === AppStep.GOAL_SELECTION && (
            <GoalSelection 
              goals={suggestedGoals} 
              onSelect={handleGoalSelect}
              loadingGoalId={loadingGoalId}
              onBack={() => setCurrentStep(AppStep.ONBOARDING)}
            />
          )}
          
          {currentStep === AppStep.ROADMAP_VIEW && roadmap && (
            <RoadmapView 
              roadmap={roadmap} 
              onReset={resetApp} 
              onBack={() => setCurrentStep(AppStep.GOAL_SELECTION)}
              completedSteps={completedSteps}
              setCompletedSteps={setCompletedSteps}
              userResources={userResources}
              setUserResources={setUserResources}
              onSave={saveProgress}
            />
          )}
        </>
      )}

      {isLoggedIn && currentStep === AppStep.AUTH && (
        <OnboardingForm 
          onSubmit={handleOnboardingSubmit} 
          isLoading={isLoading} 
          onLoadSaved={loadSavedProgress}
          hasSavedProgress={!!localStorage.getItem(SAVE_KEY)}
        />
      )}
    </Layout>
  );
};

export default App;
