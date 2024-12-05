
import { defineEventHandler, getCookie, sendError, createError } from 'h3';
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token');

  if (!token) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }));
  }

  try {
    const secretKey = process.env.JWT_SECRET;
     if (!secretKey) {
            console.error("JWT_SECRET not found in environment variables")
            throw createError({ statusCode: 500, statusMessage: 'Server error' });
        }

    const decoded = jwt.verify(token, secretKey) as { userId: number };
    const userId = decoded.userId;

    const trainingPlans = await prisma.trainingPlan.findMany({
      where: { userId },
      include: { exercises: true }
    });

    return trainingPlans;

  } catch (error) {
    console.error('Token verification failed:', error);
        if(error instanceof jwt.TokenExpiredError){

            return sendError(event, createError({ statusCode: 403, statusMessage: 'Token expired' }));
        }
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }));
  }
});