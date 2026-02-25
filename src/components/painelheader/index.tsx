import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnect";

export function PainelHeader() {
    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <div className="w-full items-center flex h-10 bg-red-700 rounded-lg text-white font-medium gap-4 px-4 mb-4">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/newcar">Novo Carro</Link>
            <button className="ml-auto" onClick={handleLogout}>Sair</button>
        </div>
        
    )
}