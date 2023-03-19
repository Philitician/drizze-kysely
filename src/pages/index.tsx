/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { type SubmitHandler, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import { type CreateUserInput, createUserSchema } from "~/validation";
import { zodResolver } from "@hookform/resolvers/zod";

const Home: NextPage = () => {
  const { data } = api.example.getUsers.useQuery();
  const { register, handleSubmit, reset } = useForm<CreateUserInput>({
    mode: "onBlur",
    resolver: zodResolver(createUserSchema),
  });
  const { mutate } = api.example.createUser.useMutation();
  const onSubmit: SubmitHandler<CreateUserInput> = (data) => {
    mutate(data);
    reset();
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-4xl font-bold text-white">Create User</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" className="text-black" {...register("name")} />
          <button className="m-10 text-white" type="submit">
            Submit
          </button>
        </form>
        <div className="flex flex-col items-center justify-center gap-6">
          {data?.map((user) => (
            <div key={user.id} className="text-white">
              name: {user.name}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
