import { defineEventHandler, readBody, createError, H3Error } from 'h3'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { z } from 'zod'

const prisma = new PrismaClient()

const registerSchema = z.object({
  userName: z.string().min(3, {message: "Username must be at least 3 characters long"}),
  password: z.string().min(6, {message: "Password must be at least 6 characters long"}),
  firstName: z.string().min(2, {message: "First name must be at least 2 characters long"}),
  lastName: z.string().min(2, {message: "Last name must be at least 2 characters long"}),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const validatedData = registerSchema.parse(body);
    const { userName, password, firstName, lastName } = validatedData

    const existingUser = await prisma.user.findUnique({ where: { userName } })

    if (existingUser) {
         throw createError({ statusCode: 409, statusMessage: 'Username is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        userName,
        password: hashedPassword,
        firstName,
        lastName,
      },
    })
    event.node.res.statusCode = 201
    return {message: 'User created successfully',userId: newUser.idU, userName: newUser.userName, firstName: newUser.firstName, lastName: newUser.lastName  }
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
			// Обработка ошибок валидации
        throw createError({
            statusCode: 400,
            message: 'Validation Error',
             data: error.issues.map(issue => ({
              message: issue.message,
              path: issue.path,
              code: issue.code
            }))
         });
    } else if (error instanceof H3Error) {
      throw error; // Пробрасываем H3Error дальше
    } else if (error instanceof Error) {
			// Создаем H3Error из обычной ошибки
      throw createError({
        statusCode: 500,
        statusMessage: 'Server error',
        cause: error,
      });
    } else {
      // Неизвестный тип ошибки
      throw createError({
        statusCode: 500,
        statusMessage: 'Unknown server error',
      });
    }
  } finally {
      await prisma.$disconnect()
  }
})