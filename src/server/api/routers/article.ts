import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import type { ArrayElement } from "~/utils/types";

import { type inferRouterOutputs, TRPCError } from "@trpc/server";

export const articleRouter = createTRPCRouter({
  /**
   * Retrieves the 20 latest articles from your private feed.
   */
  listPrivate: protectedProcedure
    .input(z.object({
      feed: z.object({
        outlets: z.array(z.object({
          prefix: z.string(),
          outlet: z.object({
            ref: z.string(),
          }),
        }))
      }).optional(),
      limit: z.number().optional(),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const DEFAULT_LIMIT = 20;
      if (!input.feed) {
        return [];
      }
      return ctx.prisma.article.findMany({
        where: {
          OR: input.feed.outlets.map((feedOutlet) => ({
            AND: [{
              outlet: {
                equals: feedOutlet.outlet.ref,
              }
            }, {
              prefix: {
                equals: feedOutlet.prefix,
              }
            }]
          }))
        },
        take: input.limit || DEFAULT_LIMIT,
        ...(input.cursor ? {
          skip: 1,
          cursor: {
            id: input?.cursor,
          },
        } : {}),
        orderBy: {
          modified: "desc",
        },
      })
    }),
  /** Retrieve the 20 latest articles, regardless of your private feed
   * requirements.
   */
  latest20: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.article.findMany({
        orderBy: {
          modified: "desc",
        },
        take: 20,
        select: {
          id: true,
          title: true,
          published: true,
          modified: true,
          outlet: true,
          author: true,
          body: true,
          url: true,
          prefix: true,
        }
      });
    }),
});

export type ArticleRouterOutputs = inferRouterOutputs<typeof articleRouter>;

export type ArticleListArray = ArticleRouterOutputs["listPrivate"];
export type ArticleLatest20Array = ArticleRouterOutputs["latest20"];
export type ArticleLatest = ArrayElement<ArticleLatest20Array>;
