import { type ReactNode, useContext } from "react";
import { authContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

interface privateProps {
    children: ReactNode;
}

export function Private({children}: privateProps): any {
    const { signed, loadingAuth} = useContext(authContext);

    if(loadingAuth){
        return <div></div>
    }
    if (!signed){
        return <Navigate to="/login"/>
    }
    return children;
}