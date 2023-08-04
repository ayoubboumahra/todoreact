import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getCurrentTodo, getTodo } from "../../store/reducers/TodoReducer";
import { getUser } from "../../store/reducers/AuthReducer";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store";

const TodoDetail = () => {

    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector(getUser);

    const todo = useSelector(getCurrentTodo);

    const params = useParams();

    useEffect(() => {
        const r = {userId: user.id as number, id: params.id as string};
        dispatch(getTodo(r));
    }, []);

    return (
        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {todo?.title}
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {todo?.description}
            </p>
            {
                todo?.completed ? (
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
    )
}

export default TodoDetail;