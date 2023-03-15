import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { articleRouter } from "~/server/api/routers/article";
import { feedRouter } from "./routers/feed";
import { outletRouter } from "./routers/outlet";
import { labelRouter } from "./routers/label";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  article: articleRouter,
  feed: feedRouter,
  outlet: outletRouter,
  label: labelRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
