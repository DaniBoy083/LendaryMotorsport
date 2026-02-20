/*
  Página 404 - Página não encontrada
  Exibida quando o usuário tenta acessar uma rota que não existe
*/

import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="flex w-full min-h-screen justify-center items-center flex-col text-black">
            <h1 className="font-bold text-4xl mb-4">ERROR 404</h1>
            <h1 className="font-bold text-4xl mb-4">Not Found</h1>
            <p className="italic text-1xl mb-4">Essa pagina não existe!</p>
            <Link className="bg-gray-50/20 py-1 px-4 rounded-md" to="/">
                Voltar ao inicio.
            </Link>
        </div>
    )
}
