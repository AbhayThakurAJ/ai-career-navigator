
export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  education: string;
}

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  reasoning: string;
}

export interface RoadmapStep {
  period: string;
  task: string;
  description: string;
  resources: string[];
}

export interface Roadmap {
  goalId: string;
  goalTitle: string;
  oneMonth: RoadmapStep[];
  threeMonths: RoadmapStep[];
  sixMonths: RoadmapStep[];
}

export enum AppStep {
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  GOAL_SELECTION = 'GOAL_SELECTION',
  ROADMAP_VIEW = 'ROADMAP_VIEW',
  ABOUT = 'ABOUT'
}

export interface SavedState {
  userProfile: UserProfile;
  roadmap: Roadmap;
  selectedGoal: CareerGoal;
  completedSteps: Record<string, number[]>; // Array of indices for easier JSON storage
  userResources: Record<string, string[]>;
}
