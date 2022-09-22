import { useForm } from "react-hook-form";
import { CreateUserInput } from "../../schemas/user.schema";
import { trpc } from "../../utils/trpc";

export default function RegisterForm() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onError: (error) => {},
    onSuccess: () => {
      alert("Conta criada com sucesso");
    },
  });

  function onSubmit(values: CreateUserInput) {
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
        <label>
          <p className="text-center text-2xl">Email</p>
          <input
            className="text-black w-52"
            type="email"
            {...register("email")}
          ></input>
        </label>
        <button
          className="bg-gray-500 text-white rounded-sm  w-52 text-center mt-1"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
