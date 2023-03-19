import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createUserSchema } from "~/validation";

export const exampleRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      const newUser = await ctx.db.insertInto("users").values(input).execute();
      console.log(newUser);
      return newUser;
    }),

  getUsers: publicProcedure.query(async ({ ctx }) => {
    try {
      const users = await ctx.db.selectFrom("users").selectAll().execute();
      console.log(users);
      return users;
    } catch (error) {
      console.error(error);
    }
  }),
});
