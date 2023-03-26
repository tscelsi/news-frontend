import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


import type { inferRouterOutputs } from "@trpc/server";

export const scrapingJobRouter = createTRPCRouter({
  get: protectedProcedure
    .query(async ({ ctx }) => {
      // retrieves a users scraping job
      const ScrapingJob = await ctx.prisma.scrapingJob.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      })
      return ScrapingJob
    }),
});

export type ScrapingJobRouter = inferRouterOutputs<typeof scrapingJobRouter>;
