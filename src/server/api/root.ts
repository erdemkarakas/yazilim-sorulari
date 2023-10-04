import { technologyRouter } from "@/src/server/api/routers/technology";
import { createTRPCRouter } from "@/src/server/api/trpc";
import { questionsRouter } from "./routers/questions";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  technology: technologyRouter,
  questions: questionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
