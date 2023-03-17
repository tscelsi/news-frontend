import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import type { ArrayElement } from "~/utils/types";

import type { inferRouterOutputs } from "@trpc/server";

export const articleRouter = createTRPCRouter({
  list: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.article.findMany();
    }),
  latest: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.article.findMany({
        orderBy: {
          published: "desc",
        },
        take: 20,
        select: {
          id: true,
          title: true,
          published: true,
          outlet: true,
          author: true,
          body: true,
        }
      });
    }),
});

export type ArticleRouterOutputs = inferRouterOutputs<typeof articleRouter>;

export type ArticleListArray = ArticleRouterOutputs["list"];
export type ArticleLatestArray = ArticleRouterOutputs["latest"];
export type ArticleLatest = ArrayElement<ArticleLatestArray>;
