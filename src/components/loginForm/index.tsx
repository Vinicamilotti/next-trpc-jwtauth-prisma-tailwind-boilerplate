import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput, RequestLoginInput } from "../../schemas/user.schema";
import { trpc } from "../../utils/trpc";

export default function RegisterForm() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(["users.login"], {
    onError: (error) => {},
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  function onSubmit(values: RequestLoginInput) {
    mutate(values);
  }

  return (
    <div>
      <form
        className="grid place-contents-center align-middle"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && error.message}
        <label>
          <p className="text-center text-2xl">Login</p>
          <input
            className="text-black w-52"
            type="text"
            {...register("username")}
          ></input>
        </label>
        <label>
          <p className="text-center text-2xl">Senha</p>
          <input
            className="text-black w-52"
            type="password"
            {...register("password")}
          ></input>
        </label>
        <button
          className="bg-gray-500 text-white rounded-sm  w-52 text-center mt-1"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
