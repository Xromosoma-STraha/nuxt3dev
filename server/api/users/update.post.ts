// server/api/users/update.post.ts
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody, createError } from 'h3';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
        const body = await readBody(event);
        const { firstName, lastName, newPassword, userId } = body;
      const parsedUserId = parseInt(userId, 10);
         if (isNaN(parsedUserId)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Некорректный ID пользователя',
            });
         }

        const dataToUpdate:any = {
            firstName,
             lastName
        }
      if(newPassword){
        const hashedPassword = await bcrypt.hash(newPassword, 10);
         dataToUpdate.password = hashedPassword
      }

        const updatedUser = await prisma.user.update({
            where: { idU:parsedUserId },
            data:dataToUpdate
        });
       return { ok: true, user: updatedUser };
    } catch (error:any) {
           console.error('Ошибка при обновлении профиля:', error);
         if(error.statusCode) {
             throw error
         }
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при обновлении профиля',
            cause: error,
        });
    } finally {
        await prisma.$disconnect();
    }
});