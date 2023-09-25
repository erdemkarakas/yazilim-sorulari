import { resolve } from "path";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
      console.log("randomOffsets :>> ", randomOffsets);
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
});
