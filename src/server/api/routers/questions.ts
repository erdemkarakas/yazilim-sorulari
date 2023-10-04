import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/src/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  getRandom20Questions: publicProcedure
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
        questionCode: z.string(),
        a: z.string(),
        b: z.string(),
        c: z.string(),
        d: z.string(),
        correct: z.string(),
        answerExp: z.string(),

        technologyId: z.number(),
      }),
    )
    .query(
      async ({
        ctx,
        input: {
          questionText,
          questionCode,
          a,
          b,
          c,
          d,
          correct,
          answerExp,
          technologyId,
        },
      }) => {
        if (
          !questionText ||
          !questionCode ||
          !technologyId ||
          !correct ||
          !a ||
          !b ||
          !c ||
          !d ||
          !technologyId
        ) {
          throw new Error("question, answer and technologyId are required");
        }

        const newQuestion = await ctx.db.question.create({
          data: {
            questionText,
            questionCode,
            a,
            b,
            c,
            d,
            correct,
            answerExp,
            technologyId,
          },
        });

        return newQuestion;
      },
    ),
});
