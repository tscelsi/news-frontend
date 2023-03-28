import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";

export type PokeResponse = {
  url: string
  success: boolean
}

export const outletRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.outlet.findMany();
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.outlet.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  poke: protectedProcedure
    .input(z.object({ id: z.string(), endpoint: z.string() }))
    .query(async ({ input }) => {
      const result = await fetch(`${env.SCRAPING_API_URL}/source/${input.id}/poke?` + new URLSearchParams({
        endpoint: input.endpoint,
      }).toString(), {
        method: "GET",
        headers: {
          "x-api-key": env.SCRAPING_API_KEY,
        },
      })
      if (result.status !== 200) {
        throw new Error("error poking source")
      }
      return result.json() as Promise<PokeResponse>
    })
});

export type OutletRouter = typeof outletRouter;