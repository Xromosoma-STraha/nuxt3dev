-- CreateTable
CREATE TABLE "Diary" (
    "idD" SERIAL NOT NULL,
    "authorID" INTEGER NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("idD")
);

-- CreateTable
CREATE TABLE "Post" (
    "idP" SERIAL NOT NULL,
    "postName" TEXT NOT NULL,
    "postText" TEXT NOT NULL,
    "authorID" INTEGER NOT NULL,
    "trainingPlanID" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("idP")
);

-- CreateTable
CREATE TABLE "TrainingPlan" (
    "idTr" SERIAL NOT NULL,
    "planName" TEXT NOT NULL,
    "authorID" INTEGER NOT NULL,
    "benchPR" INTEGER NOT NULL,

    CONSTRAINT "TrainingPlan_pkey" PRIMARY KEY ("idTr")
);

-- CreateTable
CREATE TABLE "User" (
    "idU" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idU")
);

-- CreateTable
CREATE TABLE "feedback" (
    "idF" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "authorID" INTEGER NOT NULL,
    "mark" INTEGER NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("idF")
);

-- CreateIndex
CREATE UNIQUE INDEX "Diary_authorID_key" ON "Diary"("authorID");

-- CreateIndex
CREATE UNIQUE INDEX "Post_trainingPlanID_key" ON "Post"("trainingPlanID");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("idU") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("idU") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_trainingPlanID_fkey" FOREIGN KEY ("trainingPlanID") REFERENCES "TrainingPlan"("idTr") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlan" ADD CONSTRAINT "TrainingPlan_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("idU") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("idU") ON DELETE RESTRICT ON UPDATE CASCADE;
