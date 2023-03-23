import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import type { ArrayElement } from "~/utils/types";

import  { type inferRouterOutputs, TRPCError } from "@trpc/server";

export const articleRouter = createTRPCRouter({
  /**
   * Retrieves the 20 latest articles from your private feed.
   */
  listPrivate: protectedProcedure
    .query(async ({ ctx }) => {
      const feed = await ctx.prisma.feed.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          outlets: {
            include: {
              outlet: {
                select: {
                  ref: true,
                },
              },
            },
          }
        },
      })
      if (!feed) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: "A feed for your account was not found"
        });
      }
      return ctx.prisma.article.findMany({
        where: {
          OR: feed.outlets.map((feedOutlet) => ({
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
        }
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
        }
      });
    }),
});

export type ArticleRouterOutputs = inferRouterOutputs<typeof articleRouter>;

export type ArticleListArray = ArticleRouterOutputs["listPrivate"];
export type ArticleLatest20Array = ArticleRouterOutputs["latest20"];
export type ArticleLatest = ArrayElement<ArticleLatest20Array>;
