/*
  Componente Layout - layout principal da aplicação
  Envolve todas as páginas com Header no topo, conteúdo no meio (Outlet) e Footer no rodapé
*/

import { Footer } from '../footer/footer';
import { Outlet } from 'react-router-dom';
import { Header } from '../header';

export function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            {/* Placeholder para renderizar o componente da página atual */}
            <main className="flex-1">
                <Outlet/>
            </main>
            {/* Componente de rodapé */}
            <Footer />
        </div>
    );
}