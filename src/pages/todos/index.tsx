import {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { deleteTodo, getTodos, getTodosList, storeTodo, updateTodo } from "../../store/reducers/TodoReducer";
import { getUser } from "../../store/reducers/AuthReducer";
import { useForm, SubmitHandler } from "react-hook-form";
import ITodoRequest from "../../interfaces/ITodoRequest";
import { AppDispatch } from "../../store";
import { Link } from "react-router-dom";

const TodoList = () => {

    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [current, setCurrent] = useState<any>(null);

    const dispatch = useDispatch<AppDispatch>();
    
    const todos = useSelector(getTodos);
    
    const user = useSelector(getUser);
    
    useEffect(() => {
        dispatch(getTodosList(user.id));
    }, []);

    const closeDeleteModal = () => {
        setCurrent(null);
        setShowDelete(false);
    }

    const closeUpdateModal = () => {
        setCurrent(null);
        setShowUpdate(false);
    }

    const showDeleteModal = (todo:any) => {
        setCurrent(todo);
        setShowDelete(true);
    }

    const showUpdateModal = (todo:any) => {
        setCurrent(todo);
        setShowUpdate(true);
    }

    return (
        <div className="flex flex-col">
            <div className="mb-2">
                <h1 className="text-3xl font-bolder leading-tight text-gray-900">La liste de mes todos</h1>
            </div>
            <div className="mb-2 py-4 flex flex-wrap flex-grow justify-between">
                <div className="flex items-center py-2">
                    <ModalCreate  user={user} dispatch={dispatch}/>
                </div>
            </div>
            <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <Table columns={["Titre", "Completer"]}>
                    {
                        todos.map((t:any) => {
                            return (
                                <tr key={t.id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="text-sm leading-5 text-gray-900">
                                            {t.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="text-sm leading-5 text-gray-900">
                                            {
                                                t.completed ? (
                                                    <span
                                                        className="inline-block whitespace-nowrap rounded-[0.27rem] bg-green-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-green-700">
                                                        Complèter
                                                    </span>
                                                ) : (
                                                    <span
                                                    className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                                                        Pas encore
                                                    </span>
                                                )
                                            
                                            }
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                        <Link to={`/${t.id}`}
                                            className="text-indigo-600 hover:text-indigo-900" >
                                            Détail
                                        </Link>
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 mx-2" 
                                            onClick={() => showUpdateModal(t)}    
                                        >
                                            Modifier
                                        </button>
                                        <button onClick={() => showDeleteModal(t)} className="text-indigo-600 hover:text-indigo-900">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </Table>
            </div>
            <ModalDelete todo={current} show={showDelete} showModal={closeDeleteModal} dispatch={dispatch}  />
            {
                current && <ModalUpdate todo={current} show={showUpdate} showModal={closeUpdateModal} dispatch={dispatch}  />
            }
        </div>
    )
}

const ModalCreate = (props:any) => {

    const { register, handleSubmit, reset } = useForm<ITodoRequest>();

    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(s => !s);
    }

    const onSubmit: SubmitHandler<ITodoRequest> = (data) => {
        const r = {id: props.user.id, data: data};
        props.dispatch(storeTodo(r));
        reset();
    }

    return (
        <>
            <button
            type="button"
            className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
            onClick={showModal}
        >
            Créer une todo
        </button>
            <Modal show={show} showModal={showModal}>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Créer une todo</h3>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Titre</label>
                        <div className="mt-2">
                            <input id="title" {...register("title")} type="text" required className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        </div>
                        <div className="mt-2">
                            <textarea id="description" {...register("description")} className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <input id="done" {...register("completed")} type="checkbox" className="mr-2" />
                        <label htmlFor="done">Compléter</label>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Ajouter</button>
                    </div>
                </form >
            </Modal>
        </>
    )
}

const ModalUpdate = (props:any) => {

    const { register, handleSubmit } = useForm<ITodoRequest>({
        defaultValues: props.todo
    });

    const onSubmit: SubmitHandler<ITodoRequest> = (data) => {
        props.dispatch(updateTodo(data));
        props.showModal();
    }

    return (
        <>
            <Modal show={props.show} showModal={props.showModal}>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Modifier la todo</h3>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Titre</label>
                        <div className="mt-2">
                            <input id="title" {...register("title")} type="text" required className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        </div>
                        <div className="mt-2">
                            <textarea id="description" {...register("description")} className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <input id="done" {...register("completed")} type="checkbox" className="mr-2" />
                        <label htmlFor="done">Compléter</label>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">Modifier</button>
                    </div>
                </form >
            </Modal>
        </>
    )
}

const ModalDelete = (props:any) => {

    const deletedTodo = (num: number) => {
        props.dispatch(deleteTodo(num));
        props.showModal();
    }

    return (
        <Modal
            show={props.show} showModal={props.showModal}
        >
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-10">Voulez vous bien supprimer cette Todo ?</h3>
            <div>
                <button onClick={() => deletedTodo(props.todo.id)} className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500">Oui</button>
            </div>
        </Modal>
    )
}



export default TodoList;