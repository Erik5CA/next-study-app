"use client";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const password2 = formData.get("password2");

    if (password !== password2) return;

    try {
      const res = await axios.post("api/auth/signup", {
        name: formData.get("name"),
        email: formData.get("email"),
        password,
      });

      const resSignIn = await signIn("credentials", {
        email: res.data.email,
        password,
        redirect: false,
      });

      if (resSignIn?.ok) return router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message);
      }
    }
  };

  return (
    <div className="flex items-center p-5 mx-auto justify-center">
      <form
        className="bg-emerald-600 rounded-md max-w-md shadow-sm shadow-slate-500"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold bg-emerald-800 rounded-t-md p-4 text-center">
          Register
        </h2>

        <div className="p-4 lg:p-6">
          <label htmlFor="name" className="text-slate-300 mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="bg-transparent border w-full border-white/50 p-2 rounded-md placeholder:text-slate-300 focus:outline-green-500 outline-none mb-2"
          />

          <label htmlFor="email" className="text-slate-300 mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="bg-transparent border w-full border-white/50 p-2 rounded-md placeholder:text-slate-300 focus:outline-green-500 outline-none mb-2"
          />

          <label htmlFor="password" className="text-slate-300 mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            className="bg-transparent border w-full border-white/50 p-2 rounded-md placeholder:text-slate-300 focus:outline-green-500 outline-none mb-2"
          />

          <label htmlFor="password2" className="text-slate-300 mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            name="password2"
            placeholder="Confirm Your password"
            className="bg-transparent border w-full border-white/50 p-2 rounded-md placeholder:text-slate-300 focus:outline-green-500 outline-none mb-2"
          />

          <button className="flex items-center justify-center gap-2 rounded-md bg-emerald-800 w-full font-semibold mt-2 py-2 hover:bg-emerald-700 transition-all shadow-md">
            <UserPlus />
            Register
          </button>

          {error && (
            <div className="w-full bg-red-600/50 text-white p-2 text-center rounded-md mt-2">
              {error}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center mb-3 py-3  border-t border-white/50">
          <p className="text-salte-200">Already signged up yet?</p>
          <Link href="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
