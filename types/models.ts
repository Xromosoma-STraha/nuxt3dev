export interface Exercise {
    id: number;
    name: string;
    sets: number;
    reps: number;
    weight: number | null;
    trainingPlanId: number;
  }
  
  export interface TrainingPlan {
    id: number;
    name: string;
    description: string | null;
    exercises: Exercise[];
    userId: number;
  }
  
  export interface User {
    idU: number;
    userName: string;
    password: string;
    trainingPlans: TrainingPlan[];
  }