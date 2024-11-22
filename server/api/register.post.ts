import { defineEventHandler, readBody } from 'h3'
import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const registerSchema = z.object({
  userName: z.string(),
  password: z.string(),
  // ... другие поля и правила валидации
})


export default defineEventHandler(async (event) => {

  try {
    const body = await readBody(event)


	const validatedData = registerSchema.parse(body); // Валидация данных


	// Если валидация прошла успешно, используем validatedData для создания пользователя
  const hashedPassword = await bcrypt.hash(validatedData.password, 10) 


  const user = await prisma.user.create({
	data: {
		userName: validatedData.userName,
		password: hashedPassword,
			// ... другие поля, например, имя пользователя
	},
})


		return {
			status:201,
			message: 'User created',
			user: {
				// Возвращаем только необходимые данные, например, id и email
				id: user.idU,
				email: user.userName,
			},

		}



} catch (error) {
	if (error instanceof z.ZodError) {
	// Обработка ошибок валидации
		return {
			statusCode: 400,
			message: 'Validation Error',
			errors: error.errors
		};
}	else{
			console.error(error);

		return {
			status: 500,
			message: 'Registration failed',

		}


}

}
})