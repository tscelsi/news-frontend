import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const labelRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      ids: z.array(z.string()),
      label: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      /* Creates a list of labels from each permutation in the
       ids array
       [1, 2, 3] -> [
        {articleQId: 1, articleAId: 2, ...},
        {articleQId: 1, articleAId: 3, ...},
        {articleQId: 2, articleAId: 3, ...},
      ] */
      const permutations: { a: string, b: string }[] = [];
      input.ids.forEach((id, i) => {
        const rest = input.ids.slice(i + 1);
        const newPermutations = rest.map((restId) => ({
          a: id,
          b: restId,
        }))
        permutations.push(...newPermutations)
      })
      const upsertOps = permutations.map(({ a, b }) => (ctx.prisma.label.upsert({
        where: {
          articleQId_articleAId_label: {
            articleQId: a,
            articleAId: b,
            label: input.label,
          },
        },
        create: {
          articleQId: a,
          articleAId: b,
          label: input.label,
          count: 1,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      })));
      const Labels = await ctx.prisma.$transaction(upsertOps);
      return Labels;
    }),
});

export type LabelRouter = typeof labelRouter;