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
    date: Date;
    userId: number;
    trainingPlanExercises: TrainingPlanExercise[]
}
  
  export interface User {
    idU: number;
    userName: string;
    firstName: String;
    lastName: String;
    password: string;
    trainingPlans: TrainingPlan[];
  }

  export interface TrainingPlanExercise {
    id:number,
    sets: number;
    reps: number;
    weight: number | null;
    exerciseId:number
    exercise:{
      id:number,
      name:string,
    }
}