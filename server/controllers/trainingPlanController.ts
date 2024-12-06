import { getTrainingPlansByUserId } from '../services/trainingPlanService';

export const getTrainingPlans = async (userId: number) => {
  return await getTrainingPlansByUserId(userId);
};