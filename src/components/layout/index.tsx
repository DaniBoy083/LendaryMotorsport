/*
  Componente Layout - layout principal da aplicação
  Envolve todas as páginas com Header no topo, conteúdo no meio (Outlet) e Footer no rodapé
*/

import { Footer } from '../footer/footer';
import { Outlet } from 'react-router-dom';
import { Header } from '../header';

export function Layout() {
    return (
        <>
            <Header/>
            {/* Placeholder para renderizar o componente da página atual */}
            <Outlet/>
            {/* Componente de rodapé */}
            <Footer />
        </>
    );
}