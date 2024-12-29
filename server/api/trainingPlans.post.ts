// server/api/trainingPlans.post.ts
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody, createError } from 'h3';
import { useAuthStore } from '~/stores/auth';

const prisma = new PrismaClient();

interface ExerciseData {
    id: number;
    sets: number;
    reps: number;
    weight?: string;
}

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { name, description, date, userId, exercises } = body;
         const authStore = useAuthStore()
         const authUserId = authStore.userId
         if(authUserId === null) {
           throw createError({
                statusCode: 401,
                statusMessage: 'Пользователь не авторизован',
            });
        }

        if (isNaN(authUserId)) {
             throw createError({
                statusCode: 400,
                statusMessage: 'Некорректный ID пользователя',
            });
        }

        const isoDate = new Date(date).toISOString();
        
        const newTrainingPlan = await prisma.trainingPlan.create({
            data: {
                name,
                description,
                date: isoDate,
                user: { connect: { idU: authUserId } },
            },
        });

        await Promise.all(
            exercises.map(async (exercise: ExerciseData) => {
                await prisma.trainingPlanExercise.create({
                    data: {
                        trainingPlanId: newTrainingPlan.id,
                        exerciseId: exercise.id,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        weight: exercise.weight ? parseFloat(exercise.weight) : null,
                    },
                });
            })
        );
       

        return { ok: true, trainingPlan: newTrainingPlan };
    } catch (error:any) {
        console.error('Ошибка при создании тренировочного плана:', error);
        if(error.statusCode) {
            throw error
         }
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при создании тренировочного плана',
            cause: error,
        });
    } finally {
        await prisma.$disconnect();
    }
});