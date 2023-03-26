import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const feedRouter = createTRPCRouter({
  list: protectedProcedure
    .query(({ ctx }) => {
      return ctx.prisma.feed.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          outlets: {
            include: {
              outlet: true,
            },
          }
        },
      });
    }),
  get: protectedProcedure
    .query(async ({ ctx }) => {
      const feed = await ctx.prisma.feed.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          outlets: {
            include: {
              outlet: true,
            },
          }
        },
      });
      return feed;
    }),
  delete: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // deletes a feed with n outlets.
      const Feed = await ctx.prisma.feed.delete({
        where: {
          id: input.id,
        },
      })
      return Feed
    }),
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string(),
      outlets: z.array(z.object({
        prefix: z.string(),
        outlet: z.object({
          id: z.string(),
          name: z.string(),
          base_url: z.string(),
          ref: z.string(),
        }),
      }))
    }))
    .mutation(async ({ ctx, input }) => {
      const results = await ctx.prisma.$transaction([
        // removes all existing feed outlets.
        ctx.prisma.feedOutlet.deleteMany({
          where: {
            feedId: input.id,
          }
        }),
        // updates a feed with n outlets.
        ctx.prisma.feed.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            outlets: {
              create: input.outlets.map((outlet) => ({
                // remove forward slashes at beginning and end of prefix.
                prefix: outlet.prefix.replace(/^\/+|\/+$/g, ''),
                outletRef: outlet.outlet.ref,
                outlet: {
                  connect: {
                    id: outlet.outlet.id,
                  },
                },
              })),
            },
          },
        })])
      return results[1]
    }),
  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      outlets: z.array(z.object({
        prefix: z.string(),
        outlet: z.object({
          id: z.string(),
          name: z.string(),
          base_url: z.string(),
          ref: z.string(),
        }),
      }))
    }))
    .mutation(async ({ ctx, input }) => {
      // creates a feed with n outlets.
      const Feed = await ctx.prisma.feed.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          outlets: {
            create: input.outlets.map((outlet) => ({
              prefix: outlet.prefix,
              outletRef: outlet.outlet.ref,
              outlet: {
                connect: {
                  id: outlet.outlet.id,
                },
              },
            })),
          },
        },
      })
      return Feed
    }),
});

export type FeedRouter = typeof feedRouter;