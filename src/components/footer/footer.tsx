// Componente Footer: rodapé da aplicação
// Contém informações de contato e link externo.

import styles from './footer.module.css';

export function Footer() {
    // Usamos um <ol> com <li> para representar itens, estilizados pelo módulo CSS
    return(
        <footer className={styles.footer}>
            <div id="sobre" className={styles.desenvolvedor}>
                <ol>
                    {/* Item 1: crédito do desenvolvedor */}
                    <li>Página desenvolvida por Daniel Costa Carvalho Martins</li>
                    {/* Item 2: link de contato por email */}
                    <li><a href="mailto:danielcostacarvalhomartins06@gmail.com">danielcostacarvalhomartins06@gmail.com</a></li>
                    {/* Item 3: link externo - abre em nova aba e evita vulnerabilidades com rel */}
                    <li><a href="https://devthreebydanielcosta.vercel.app" target="_blank" rel="noopener noreferrer">Saiba mais</a></li>
                </ol>
            </div>
        </footer>
    )
}