import { Conteiner } from "../../components/conteiner";
import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebaseConnect";
import { Link } from "react-router-dom";

interface CarProps {
    id: string;
    name: string;
    year: string;
    uid: string;
    price: string | number;
    km: string;
    city: string;
    images: CarImageProps[];
}

interface CarImageProps {
    name: string;
    uid: string;
    url: string;
}

export function HomePage() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState<string[]>([]);
    useEffect(() => {
        function loadCars() {
            const carsRef = collection(db, "cars");
            const queryRef = query(carsRef, orderBy("created", "desc"));
            getDocs(queryRef)
            .then((snapshot) => {
                console.log(snapshot.docs);
                let listcars = [] as CarProps[];
                snapshot.forEach((doc) => {
                    listcars.push({
                        id: doc.id,
                        name: doc.data().name,
                        year: doc.data().year,
                        km: doc.data().km,
                        city: doc.data().city,
                        price: doc.data().price,
                        images: doc.data().images,
                        uid: doc.data().uid,
                    });
                });
                if (listcars.length === 0) {
                    console.log("Nenhum carro cadastrado");
                }
                console.log(listcars);
                setCars(listcars);
            })
        }
        loadCars();
    }, []);
    // Função para lidar com o evento de carregamento da imagem
    function handleLoad(id: string) {
        console.log(`Imagem do carro ${id} carregada!`);
        setLoading((prev) => [...prev, id]);
    }
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
            {cars.length === 0 ? (
                <h1 className="text-center font-bold text-2xl mt-8">Nenhum carro cadastrado</h1>
            ) : (
                <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cars.map((car) => (
                        <Link to={`/details/${car.id}`} key={car.id}>
                            <section key={car.id} className="w-full bg-red-700 rounded-lg">
                                {/* Placeholder para a imagem enquanto ela carrega */}
                                <div 
                                    style={{ display: loading.includes(car.id) ? "none" : "block" }}
                                    className="w-full h-72 rounded-lg bg-slate-200"
                                ></div>
                                <img
                                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                                    src={car.images[0].url}
                                    alt="Carro"
                                    onLoad={() => handleLoad(car.id)}
                                    style={{display: loading.includes(car.id) ? "block" : "none"}} // Exibe a imagem apenas quando ela estiver carregada
                                />
                                <p className="font-bold mt-1 mb-2 px-2 text-white">{car.name}</p>
                                <div className="flex flex-col px-2">
                                    <span className="text-white mb-8">Ano: {car.year} | {car.km}KM</span>
                                    <strong className="font-medium text-white text-xl">R$ {car.price}</strong>
                                </div>
                                <div className="w-full h-px bg-slate-200 my-2"></div>
                                <div className="px-2 pb-2">
                                    <span className="text-white">
                                        {car.city}
                                    </span>
                                </div>
                            </section>
                        </Link>
                    ))}
                </main>
            )}
        </Conteiner>
    );
}