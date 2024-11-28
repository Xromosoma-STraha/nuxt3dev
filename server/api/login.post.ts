import { defineEventHandler, readBody, setHeader, createError, H3Error } from 'h3'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import  jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userName, password } = body

    // Валидация данных
    if (!userName || !password) {
      throw createError({ statusCode: 400, statusMessage: 'Username and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { userName },
    })

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
    }

    // JWT secret key - **Хранить в .env файле!**  
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      console.error("JWT_SECRET_KEY not found in environment variables")
      throw createError({ statusCode: 500, statusMessage: 'Server error' });
    }

    
    const token = jwt.sign({ userId: user.idU}, secretKey)
    
    // Устанавливаем токен в HTTP-only cookie
    setHeader(event, 'Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/;Max-Age=${60 * 60 * 24 * 7}`);

    // Возвращаем JSON ответ с информацией об успешной авторизации
		event.node.res.statusCode = 200; // устанавливаем статус код 200
    return { message: 'Login successful', userId: user.idU,token};
  } catch (error) {
    console.error(error);

    if (error instanceof H3Error) {
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