import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const feedRouter = createTRPCRouter({
  list: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.feed.findMany({
        include: {
          outlets: {
            include: {
              outlet: true,
            },
          }
        },
      });
    }),
  get: publicProcedure
  .input(z.object({
    id: z.string(),
  }))
  .query(async ({ ctx, input }) => {
    return ctx.prisma.feed.findUnique({
      where: {
        id: input.id,
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
  delete: publicProcedure
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
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      outlets: z.array(z.object({
        prefix: z.string(),
        outletId: z.string(),
        outletRef: z.string()
      }))
    }))
    .mutation(async ({ ctx, input }) => {
      // creates a feed with n outlets.
      const Feed = await ctx.prisma.feed.create({
        data: {
          name: input.name,
          outlets: {
            create: input.outlets.map((outlet) => ({
              prefix: outlet.prefix,
              outletRef: outlet.outletRef,
              outlet: {
                connect: {
                  id: outlet.outletId,
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