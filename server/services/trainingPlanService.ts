import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getTrainingPlansByUserId = async (userId: number) => {
  try {
    const trainingPlans = await prisma.trainingPlan.findMany({
        where: { userId },
        include: {
            exercises: true,
        },
    });
    return trainingPlans;
} catch (error) {
    console.error("Error fetching training plans:", error);
    throw error; // Перебрасываем ошибку для обработки в контроллере
}
};