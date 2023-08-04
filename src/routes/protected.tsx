import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../store/reducers/AuthReducer"
import { Navigate } from "react-router-dom";

interface IProps {
    required: boolean,
    el: JSX.Element
}

const ProtectedRoute = (props: IProps) => {
    const user = useSelector(getUser);
    if(props.required && !user){
        return <Navigate to="/login" replace={true} />;
    }
    return props.el;
}

export default ProtectedRoute;