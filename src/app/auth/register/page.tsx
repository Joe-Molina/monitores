"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import './style.css'
import Image from "next/image";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
            return alert("Passwords do not match");
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: data.username,
                tipo_usuario: data.tipo_usuario,
                email: data.email,
                password: data.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            router.push("/auth/login");
        }
    });

    console.log(errors);

    return (
        <main className="flex h-screen w-screen p-20" >

            <div className="flex w-full h-full rounded-xl overflow-hidden">
                <div className="h-full flex w-1/2 p-20 bg-neutral-700">
                    <Image alt="" height={640} width={640} src="/media.png" className="rounded-xl shadow-xl hover:scale-105 transition" />
                </div>

                <div className="h-full w-1/2 flex justify-center items-center p-3 bg-black/80">
                    <form onSubmit={onSubmit} className="w-1/2">
                        <h1 className="text-slate-200 font-bold text-4xl mb-4">Registe en MediaCIM</h1>

                        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
                            Username:
                        </label>
                        <input
                            type="text"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "Username is required",
                                },
                            })}
                            className="p-3 rounded block mb-2 text-slate-300 w-full"
                            placeholder="yourUser123"
                        />

                        <label htmlFor="tipo_usuario" className="text-slate-500 mb-2 block text-sm">
                            Departamento:
                        </label>


                        <select
                            {...register("tipo_usuario", {
                                required: {
                                    value: true,
                                    message: "tipo_usuario is required",
                                },
                            })} className="bg-neutral-900 w-full h-12 rounded-sm px-2">
                            <option value="Administracion">Administracion</option>
                            <option value="Sistemas">Sistemas</option>
                            <option value="Medios">Medios</option>
                            <option value="Recepcion">Recepcion</option>
                        </select>

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
                            className="p-3 rounded block mb-2 text-slate-300 w-full"
                            placeholder="user@email.com"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">error con email</span>
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
                            placeholder="********"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                error con clave
                            </span>
                        )}

                        <label
                            htmlFor="confirmPassword"
                            className="text-slate-500 mb-2 block text-sm"
                        >
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: "Confirm Password is required",
                                },
                            })}
                            className="p-3 rounded block mb-2  text-slate-300 w-full"
                            placeholder="********"
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-500 text-sm">
                                error con la confirmacion de la clave
                            </span>
                        )}

                        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
                            Register
                        </button>
                    </form>
                </div>
            </div>


        </main>
    );
}
export default RegisterPage;