import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

 async function main() {
     // ... твой код для создания тестовых данных User, TrainingPlan, Exercise ...
      await prisma.user.create({
        data: {
          userName: 'testUser',
          password: 'testPassword',
          trainingPlans: {
            create: [
              {
                name: "testPlan1",
                 description: "leg training",
                 exercises:{
                     create: [
                         {name: "leg1", sets: 1, reps: 1},
                         {name: "leg2", sets: 2, reps: 2}
                     ]
                 }
              },
               {
                 name: "testPlan2",
                 description: "hands training",
                 exercises:{
                     create: [
                         {name: "hand1", sets: 1, reps: 1},
                         {name: "hand2", sets: 2, reps: 2}
                     ]
                 }
               }
            ]
          }
        },
        include: {
          trainingPlans: {
             include:{
                 exercises: true
             }
          }
        }
      })
 }

 main()
   .then(async () => {
     await prisma.$disconnect()
   })
   .catch(async (e) => {
     console.error(e)
     await prisma.$disconnect()
     process.exit(1)
   })