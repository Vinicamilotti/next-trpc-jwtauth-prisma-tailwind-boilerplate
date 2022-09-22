import type { NextPage } from "next";
import { useState } from "react";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";
import { trpc } from "../utils/trpc";
const Home: NextPage = () => {
  const [form, setForm] = useState<JSX.Element>(<LoginForm />);
  return (
    <div className="grid place-content-center justify-center">
      <div className="w-96  shadow-md rounded-lg shadow-black h-96 grid place-content-center justify-center">
        <div className="flex justify-center">
          <div className="w-1/2  border-r-2 border-black bg-slate-500">
            <button
              className="w-full"
              onClick={() => {
                setForm(<LoginForm />);
              }}
            >
              <p>Login</p>
            </button>
          </div>
          <div className="w-1/2 border-black bg-slate-500">
            <button
              className="w-full"
              onClick={() => {
                setForm(<RegisterForm />);
              }}
            >
              Cadastro
            </button>
          </div>
        </div>
        {form}
      </div>
    </div>
  );
};

export default Home;
