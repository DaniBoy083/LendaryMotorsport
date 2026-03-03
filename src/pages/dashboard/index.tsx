import { Conteiner } from "../../components/conteiner";
import { PainelHeader } from "../../components/painelheader";
import { FiTrash2 } from "react-icons/fi";
import { useEffect, useState, useContext } from "react";
import { collection, query, getDocs, where, doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnect";
import { authContext } from "../../contexts/authContext";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

interface CarProps {
    id: string;
    name: string;
    year: number;
    km: number;
    city: string;
    price: string | number;
    images: CarImageProps[];
    uid: string;
}

interface CarImageProps {
    name: string;
    uid: string;
    url: string;
}

export function DashboardPage() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const { user } = useContext(authContext);
    useEffect(() => {
        if(!user?.uid) {
            console.log("Usuário não autenticado");
            return
        }
        function loadCars() {
            const carsRef = collection(db, "cars");
            const queryRef = query(carsRef, where("uid", "==", user?.uid));
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
    }, [user]);
    async function handleDeleteCar(car: CarProps) {
        const itemCar = car;
        console.log(`Deletar carro com ID: ${car.id}`);
        const carRef = doc(db, "cars", itemCar.id);
        try {
            await deleteDoc(carRef);

            await Promise.all(
                itemCar.images.map(async (image) => {
                    const imagePath = `images/${car.uid}/${image.name}`;
                    const imageRef = ref(storage, imagePath);
                    await deleteObject(imageRef);
                    console.log(`Imagem ${image.name} deletada com sucesso.`);
                })
            );

            setCars(cars.filter(car => car.id !== itemCar.id));
            toast.success("Carro deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar carro:", error);
            toast.error("Ocorreu um erro ao deletar o carro. Tente novamente.");
        }
    }
    return (
        <Conteiner>
            <PainelHeader />
            {cars.length === 0 ? (
                <h1 className="text-center font-bold text-2xl mt-8">Nenhum carro cadastrado</h1>
            ) : (
                <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cars.map((car) => (
                        <section key={car.id} className="w-full bg-red-700 rounded-lg relative">
                            <button onClick={() => handleDeleteCar(car)} className="absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-200 transition-colors">
                                <FiTrash2 size={26} color="#000" />
                            </button>
                            <img
                                className="w-full rounded-lg mb-2 max-h-70"
                                src={car.images[0].url}
                                alt="Carro"
                            />
                            <p className="font-bold mt-1 mb-2 px-2 text-white">{car.name}</p>
                            <div className="flex flex-col px-2">
                                <span className="text-white mb-8">Ano: {car.year} | {car.km} KM</span>
                                <strong className="font-medium text-white text-xl">R$ {car.price}</strong>
                            </div>
                            <div className="w-full h-px bg-slate-200 my-2"></div>
                            <div className="px-2 pb-2">
                                <span className="text-white">
                                    {car.city}
                                </span>
                            </div>
                        </section>
                    ))}
                </main>
            )}
        </Conteiner>
    );
}