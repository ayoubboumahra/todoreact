import { ReactNode } from "react";

interface IProps {
    columns: string[],
    children: ReactNode
}

export default function (props: IProps) {
    const {columns, children} = props;
    return (
        <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                        {
                            columns.map((c: string, index: number) => <th key={index} className="px-6 py-3 text-left font-medium">{c}</th>)
                        }
                        <th className="px-6 py-3 text-left font-medium">
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {children}
                </tbody>
            </table>
        </div>
    )
}