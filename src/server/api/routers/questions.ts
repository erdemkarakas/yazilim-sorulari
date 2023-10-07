import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/src/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  getRandomQuestions: publicProcedure
    .input(z.object({ technologyId: z.number(), limit: z.number().optional() }))
    .query(async ({ ctx, input: { technologyId, limit = 20 } }) => {
      if (!technologyId) {
        throw new Error("technologyId is required");
      }

      const totalQuestionsCount = await ctx.db.question.count({
        where: { technologyId },
      });

      const randomOffsets = Array.from({ length: limit }, () =>
        Math.floor(Math.random() * totalQuestionsCount),
      );

      const questions = await Promise.all(
        randomOffsets.map((offset) =>
          ctx.db.question.findMany({
            where: { technologyId },
            skip: offset,
            take: 1,
          }),
        ),
      );

      return questions.flat();
    }),
  addQuestion: publicProcedure
    .input(
      z.object({
        questionText: z.string(),
        questionCode: z.string().optional(),
        answerA: z.string(),
        answerB: z.string(),
        answerC: z.string(),
        answerD: z.string(),
        correctAnswer: z.string(),
        answerExp: z.string().optional(),
        technologyId: z.number(),
      }),
    )
    .mutation(
      async ({
        ctx,
        input: {
          technologyId,
          questionText,
          answerA,
          answerB,
          answerC,
          answerD,
          correctAnswer,
          questionCode = "",
          answerExp = "",
        },
      }) => {
        const newQuestion = await ctx.db.question.create({
          data: {
            technologyId,
            questionText,
            answerA,
            answerB,
            answerC,
            answerD,
            correctAnswer: correctAnswer,
            questionCode: questionCode || "",
            answerExp: answerExp || "",
          },
        });

        return newQuestion;
      },
    ),
  getQuestionCount: publicProcedure
    .input(z.object({ technologyId: z.number() }))
    .query(async ({ ctx, input: { technologyId } }) => {
      if (!technologyId) {
        throw new Error("technologyId is required");
      }

      const totalQuestionsCount = await ctx.db.question.count({
        where: { technologyId },
      });

      return totalQuestionsCount;
    }),

  getQuestionById: publicProcedure
    .input(z.object({ id: z.number(), technologyId: z.number() }))
    .query(async ({ ctx, input: { id, technologyId } }) => {
      if (!technologyId) {
        throw new Error("technologyId is required");
      }

      const question = await ctx.db.question.findFirst({
        where: { id, technologyId },
      });

      return question;
    }),
});
