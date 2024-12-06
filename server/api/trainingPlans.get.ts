import { defineEventHandler, createError } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {  
    const userId = event.context.auth?.user.id as number; // userId  теперь точно есть, т.к. middleware гарантирует авторизацию

    try {
        const trainingPlans = await prisma.trainingPlan.findMany({
            where: { userId: userId }, //  Используй userId для фильтрации
            include: {
                exercises: true,
            },
        });

        return trainingPlans;

    } catch (error) {
        console.error(error);
        throw createError({ statusCode: 500, message: 'Failed to fetch training plans' });
    }
});