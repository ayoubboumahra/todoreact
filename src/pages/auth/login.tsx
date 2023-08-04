import { SubmitHandler, useForm } from "react-hook-form";
import { Link, redirect, useNavigate } from "react-router-dom";
import ILoginRequest from "../../interfaces/ILoginRequest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { getUser, loginAttemps } from "../../store/reducers/AuthReducer";
import { useEffect } from "react";

const Login = () => {

    const { register, handleSubmit } = useForm<ILoginRequest>();

    const navigate = useNavigate();
    
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector(getUser);

    const onSubmit: SubmitHandler<ILoginRequest> = (data) => {
        dispatch(loginAttemps(data));
    }

    useEffect(() => {
        if ( user ) {
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Connectez-vous à votre compte</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Adresse e-mail</label>
                            <div className="mt-2">
                                <input id="email" {...register("email")} type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" {...register("password")} type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Se connecter</button>
                        </div>
                    </form >
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Vous n'avez pas de compte, créer un compte
                        <Link to={"/register"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1">ici</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;