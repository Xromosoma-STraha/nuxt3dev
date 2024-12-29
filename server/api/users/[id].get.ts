// server/api/users/[id].get.ts
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, createError } from 'h3';
import { useAuthStore } from '~/stores/auth';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
 const authStore = useAuthStore()
 const userId = authStore.userId
  if (userId === null) {
      throw createError({
        statusCode: 401,
         statusMessage: 'Пользователь не авторизован',
       });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { idU:userId },
        });
        if (!user) {
          throw createError({
                statusCode: 404,
                statusMessage: 'Пользователь не найден',
            });
         }
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.idU
        }
    } catch (error:any) {
      console.error('Ошибка при получении пользователя:', error);
      if(error.statusCode) {
        throw error
      }
      throw createError({
        statusCode: 500,
        statusMessage: 'Ошибка при получении пользователя',
        cause: error,
      });
    } finally {
        await prisma.$disconnect();
    }
});