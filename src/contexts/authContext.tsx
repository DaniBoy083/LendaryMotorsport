//Contexto que protegeas rotas e faz o carregamento ou descarregamento das informações do usuario se estiver logado ou não.
import { type ReactNode, useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnect";

interface authProviderProps {
    children: ReactNode;
}

type authContextData = {
    signed:boolean;
    loadingAuth: boolean;
    handleInfoUser: (user: userProps) => void;
    user: userProps | null;
}

interface userProps {
    uid: string;
    name: string | null;
    email: string| null;
}

export const authContext = createContext({} as authContextData)

function authProvider({children}: authProviderProps) {
    const [user, setUser] = useState<userProps | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email
                })
                setLoadingAuth(false);
            }else{
                setUser(null);
                setLoadingAuth(false);
            }
        })
        return () => {
            unsub();
        }
    }, [])
    function handleInfoUser({ name, email, uid}: userProps){
        setUser({
            name,
            email,
            uid
        })
    }
    return(
        <authContext.Provider value={{signed: !!user, loadingAuth, handleInfoUser, user }}> {/* !! Converte a variavel para uma variavel do tipo boleano. */}
            {children}
        </authContext.Provider>
    )
}

export default authProvider;