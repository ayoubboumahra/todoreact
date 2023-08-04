import { ReactNode } from "react";

interface IProps {
    show: boolean,
    showModal: () => void,
    children: ReactNode
}

export default function(props: IProps) {

    return (
        <>
            <div
                className={"fixed bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" + ( !props.show ? " hidden" : " inset-0" )}
                onClick={props.showModal}
            ></div>
            <div
                className={"absolute p-5 border w-96 shadow-lg rounded-md bg-white" + (!props.show ? " hidden" : "")}
                style={{ top: "-10%", left: "50%", transform: "translate(-50%, 10%)" }}
            >
                <div className="mt-3">
                    {props.children}
                </div>
            </div>
        </>
    )
}