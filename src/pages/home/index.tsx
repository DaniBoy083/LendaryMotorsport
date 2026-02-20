import { Conteiner } from "../../components/conteiner";

export function HomePage() {
    return (
        <Conteiner>
            <section className="bg-red-700 p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
                <input
                    className="text-white w-full border-2 rounded-lg h-9 px-3 outline-none"
                    placeholder="Digite o nome do carro..."
                />
                <button className="bg-black text-white h-9 px-8 rounded-lg font-medium text-lg">
                    Buscar
                </button>
            </section>
            <h1 className="font-bold text-center mt-6 text-2xl mb-4">
                Carros novos e seminovos disponiveis!
            </h1>
            <main className="gird grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <section className="w-full bg-red-700 rounded-lg">
                    <img
                        className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                        src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2026/202601/20260121/peugeot-208-1-0-turbo-200-hybrid-gt-cvt-wmimagem16504015832.webp?s=fill&w=552&h=414&q=60"
                        alt="Carro"
                    />
                    <p className="font-bold mt-1 mb-2 px-2 text-white">Peugeot 208 GT</p>
                    <div className="flex flex-col px-2">
                        <span className="text-white mb-8">Ano: 2025/2026 | 10.000KM</span>
                        <strong className="font-medium text-white text-xl">R$ 100.000</strong>
                    </div>
                    <div className="w-full h-px bg-slate-200 my-2"></div>
                    <div className="px-2 pb-2">
                        <span className="text-white">
                            João Pessoa - PB
                        </span>
                    </div>
                </section>
            </main>
        </Conteiner>
    );
}