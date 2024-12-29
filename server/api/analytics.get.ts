// server/api/analytics.get.ts
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, createError, getQuery } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
      const query = getQuery(event)
       const startDate =  query.startDate as string
      const endDate = query.endDate as string
       const userId =  parseInt(query.userId as string,10)
         if (isNaN(userId)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Некорректный ID пользователя',
            });
         }
        const start = new Date(startDate);
          const end = new Date(endDate)
       const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.ceil(diffDays / 7);
       const trainingPlans = await prisma.trainingPlan.findMany({
            where: {
                 userId: userId,
                date: {
                 gte: start,
                 lte: end,
              },
            },
            include: {
                trainingPlanExercises: true
            },
        });

        const weeklyData: { week: number; volume: number }[] = [];

       for (let i = 0; i < diffWeeks; i++) {
            const weekStart = new Date(start);
            weekStart.setDate(start.getDate() + i * 7);
             const weekEnd = new Date(start);
            weekEnd.setDate(start.getDate() + (i + 1) * 7);
             const weekPlans = trainingPlans.filter(plan => plan.date >= weekStart && plan.date < weekEnd);
               let totalVolume = 0;
            weekPlans.forEach((plan) => {
                 plan.trainingPlanExercises.forEach(exercise => {
                     let volume = 0
                   if(exercise.weight){
                      volume = exercise.sets * exercise.reps * exercise.weight;
                    } else {
                      volume = exercise.sets * exercise.reps
                    }
                      totalVolume+=volume
                 })
              })
          weeklyData.push({ week: i + 1, volume: totalVolume });
        }


        let totalVolume = 0;
        let totalSets = 0;
        trainingPlans.forEach((plan) => {
          plan.trainingPlanExercises.forEach(exercise => {
              let volume = 0
            if(exercise.weight){
              volume = exercise.sets * exercise.reps * exercise.weight;
            } else {
              volume = exercise.sets * exercise.reps
            }
              totalVolume+=volume
              totalSets+=exercise.sets
           })
         })
         return {
            trainingCount: trainingPlans.length,
              totalVolume,
              totalSets,
           weeklyData,
         };
    } catch (error:any) {
         console.error('Ошибка при получении аналитики:', error);
        if(error.statusCode) {
            throw error
         }
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при получении аналитики',
            cause: error,
        });
    } finally {
        await prisma.$disconnect();
    }
});