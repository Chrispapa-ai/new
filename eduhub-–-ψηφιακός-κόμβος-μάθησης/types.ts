
export type MaterialType = 'pdf' | 'video' | 'simulation' | 'link' | 'image';

export interface Material {
  id: string;
  title: string;
  type: MaterialType;
  url: string;
  description?: string;
}

export type ActivityType = 'mcq' | 'flashcard' | 'short_answer';

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  questions?: Question[];
  flashcards?: Flashcard[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  materials: Material[];
  activities: Activity[];
  createdAt: number;
}

export interface User {
  email: string;
  role: 'instructor' | 'student';
}

export interface AppState {
  modules: LearningModule[];
  isLoggedIn: boolean;
}
