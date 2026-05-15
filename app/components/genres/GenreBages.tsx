import type {ReactNode} from "react";

export const GenreBadge = ({children, color, isChoice}: { children: ReactNode, color: string, isChoice: boolean }) => {
    return (
        <div className={`p-2.5 ${color} text-white text-lg rounded-2xl cursor-pointer transition 
    ${isChoice
            ? `inset-shadow-sm inset-shadow-indigo-950 scale-95 font-bold text-xl`
            : `shadow-md ${color} hover:shadow-lg hover:scale-105`}`
        }>{children}</div>
    );
};