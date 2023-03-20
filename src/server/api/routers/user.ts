import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { signOut } from "next-auth/react";


import type { inferRouterOutputs } from "@trpc/server";

export const userRouter = createTRPCRouter({
  delete: protectedProcedure
    .mutation(async ({ ctx }) => {
      // deletes a user (and should cascade deletion of resources
      // associated with it).
      const User = await ctx.prisma.user.delete({
        where: {
          id: ctx.session.user.id,
        },
      })
      void signOut({ redirect: false, callbackUrl: "/" })
      return User
    }),
});

export type UserRouterOutputs = inferRouterOutputs<typeof userRouter>;
