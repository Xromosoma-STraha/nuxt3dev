import type { TrainingPlan } from '~/types/models';

export const trainingPlansData: TrainingPlan[] = [
  {
    id: 1,
    name: 'Тренировка на грудь',
    description: 'Жим лежа, отжимания и т.д.',
    exercises: [
      { id: 101, name: 'Жим лежа', sets: 3, reps: 8, weight: 80, trainingPlanId: 1 },
      { id: 102, name: 'Отжимания', sets: 3, reps: 12, weight: null, trainingPlanId: 1 },
    ],
    userId: 1
  },
  {
    id: 2,
    name: 'Тренировка на спину',
    description: 'Подтягивания, тяга гантелей...',
    exercises: [
      { id: 201, name: 'Подтягивания', sets: 3, reps: 8 , weight: null, trainingPlanId: 2},
      { id: 202, name: 'Тяга гантели', sets: 3, reps: 10, weight: 20, trainingPlanId: 2 },
    ],
    userId:1
  },
];