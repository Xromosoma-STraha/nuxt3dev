// server/api/exercises/index.get.ts
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, createError } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    try {
        const exercises = await prisma.exercise.findMany();
        return exercises;
    } catch (error) {
        console.error('Ошибка при получении упражнений:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при получении упражнений',
        });
    } finally {
        await prisma.$disconnect();
    }
});