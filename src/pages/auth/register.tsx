import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import IRegisterRequest from "../../interfaces/IRegisterRequest";
import { getRegistered, registerAttemps } from "../../store/reducers/AuthReducer";
import { AppDispatch } from "../../store";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

const Register = () => {
    
    const { register, handleSubmit, reset } = useForm<IRegisterRequest>();

    const refConfirm = useRef<HTMLInputElement>(null);
    
    const dispatch = useDispatch<AppDispatch>();

    const registered = useSelector(getRegistered);

    const onSubmit: SubmitHandler<IRegisterRequest> = (data) => {
        if(data.password != refConfirm.current?.value){
            toast.warn('Le mot de passe de confirmation ne correspond pas.');
            return;
        }
        dispatch(registerAttemps(data));
    }

    useEffect(() => {
        console.log(registered);
        if ( registered ) {
            toast.success('Le compte est créé avec succès, veuillez vous connecter maintenant.');
            reset();
        }
    }, [registered]);

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Créer un compte</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Nom complet</label>
                            <div className="mt-2">
                                <input id="username" {...register("username")} type="text" required className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

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
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirm" className="block text-sm font-medium leading-6 text-gray-900">Mot de passe de confirmation</label>
                            </div>
                            <div className="mt-2">
                                <input id="confirm" ref={refConfirm} type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Se connecter</button>
                        </div>
                    </form >
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Vous avez dèjà un compte, connecter vous
                        <Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1">ici</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register;