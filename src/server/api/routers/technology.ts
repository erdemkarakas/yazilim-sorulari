import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const technologyRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.technology.findMany();
  }),
});
