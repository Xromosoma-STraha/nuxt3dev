// server/api/trainingPlans.get.ts
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, createError } from 'h3';
import { useAuthStore } from '~/stores/auth';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const authStore = useAuthStore();
        const userId = authStore.userId;

         if (userId === null) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Пользователь не авторизован',
            });
        }
         const parsedUserId =  parseInt(userId.toString(),10)
        if (isNaN(parsedUserId)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Некорректный ID пользователя',
            });
        }
        const trainingPlans = await prisma.trainingPlan.findMany({
            where: { userId: parsedUserId },
            include: {
                trainingPlanExercises: {
                    include: {
                        exercise: true,
                    },
                },
            },
        });

        return trainingPlans;
    } catch (error:any) {
        console.error('Ошибка при получении тренировочных планов:', error);
        if(error.statusCode) {
            throw error
         }
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при получении тренировочных планов',
            cause: error,
        });
    } finally {
        await prisma.$disconnect();
    }
});