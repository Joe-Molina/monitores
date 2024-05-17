"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from "next/image";

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter()
    const [error, setError] = useState(null)

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);

        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        console.log(res)
        //@ts-ignore
        if (res.error) {
            //@ts-ignore
            setError(res.error)
        } else {
            router.push('/')
            router.refresh()
        }
    });

    return (
        <main className="flex h-screen w-screen">


            <div className="h-full flex w-2/5 p-20 ">
                <Image alt="" height={640} width={500} src="/media.png" className="rounded-xl shadow-xl hover:scale-105 transition " />
            </div>

            <div className="h-full w-3/5 flex justify-center items-center p-3 bg-black/40">
                <form onSubmit={onSubmit} className="w-1/2 ">

                    {error && (
                        <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
                    )}

                    <h1 className="text-slate-200 font-bold text-4xl mb-4">Inicia sesion en MediaCIM</h1>

                    <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
                        Email:
                    </label>
                    <input
                        type="email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required",
                            },
                        })}
                        className="p-3 rounded block mb-2  text-slate-300 w-full"
                        placeholder="user@email.com"
                    />

                    {errors.email && (
                        <span className="text-red-500 text-xs">error</span>
                    )}

                    <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
                        Password:
                    </label>
                    <input
                        type="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                        })}
                        className="p-3 rounded block mb-2  text-slate-300 w-full"
                        placeholder="******"
                    />

                    {errors.password && (
                        <span className="text-red-500 text-xs">
                            error
                        </span>
                    )}

                    <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
                        Login
                    </button>
                </form>
            </div>
        </main>

    );
}
export default LoginPage;