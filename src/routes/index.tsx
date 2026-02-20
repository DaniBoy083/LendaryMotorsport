/*
  Arquivo de configuração de rotas
  Define todas as rotas da aplicação e a estrutura do layout
*/

import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "../pages/notfound";
import { Layout } from "../components/layout";
import { HomePage } from "../pages/home";

// Criação do roteador com as rotas da aplicação
const router = createBrowserRouter([
    {
        // Layout envolve todas as páginas filhas
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                // Rota coringa para página 404 (qualquer rota não definida)
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
]);

export {router};