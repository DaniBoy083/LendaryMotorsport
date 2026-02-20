import logoImg from "../../assets/logo.svg"
import { Link } from "react-router-dom"
import { FiUser, FiLogIn } from "react-icons/fi";

export function Header() {
    const signed = false;
    const loadingAuth = false;
    return(
        <div className="w-full flex items-center justify-center bg-black mb-4 drop-shadow h-16">
            <header className="w-full bg-black flex items-center justify-between max-w-xl px-4 mx-auto">
                <Link to="/">
                    <img
                        src={logoImg}
                        alt="Logo da plataforma"
                        width={100}
                        height={50}
                    />
                </Link>
                {!loadingAuth && signed && (
                    <Link to="/dashboard">
                        <FiUser size={24} color="white" />
                    </Link>
                )}
                {!loadingAuth && !signed && (
                    <Link to="/login">
                        <FiLogIn size={24} color="white" />
                    </Link>
                )}
            </header>
        </div>
    )
}