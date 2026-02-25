/*
  Arquivo de configuração de rotas
  Define todas as rotas da aplicação e a estrutura do layout
*/

import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "../pages/notfound";
import { Layout } from "../components/layout";
import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";
import { DetailPage } from "../pages/detail";
import { DashboardPage } from "../pages/dashboard";
import { NewCarPage } from "../pages/dashboard/new";
import { Private } from "./Private";

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
                path: "car/:id",
                element: <DetailPage/>
            },
            {
                path: "/dashboard",
                element: <Private><DashboardPage/></Private>
            },
            {
                path: "/dashboard/newcar",
                element: <Private><NewCarPage/></Private>
            },
            {
                // Rota coringa para página 404 (qualquer rota não definida)
                path: "*",
                element: <NotFoundPage />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    }
]);

export {router};