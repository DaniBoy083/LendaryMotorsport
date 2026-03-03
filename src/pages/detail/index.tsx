import { useState, useEffect } from "react";
import { Conteiner } from "../../components/conteiner";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConnect";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarProps {
    id: string;
    name: string;
    year: string;
    uid: string;
    price: string | number;
    km: string;
    city: string;
    images: CarImageProps[];
    model: string;
    whatsapp: string;
    description?: string;
    created: string;
    owner: String
}

interface CarImageProps {
    name: string;
    uid: string;
    url: string;
}

export function DetailPage() {
    const [car, setCar] = useState<CarProps | null>(null);
    const [sliderPreview, setSliderPreview] = useState<number>(2);
    const { id } = useParams();
    useEffect(() => {
        async function loadCar() {
            if (!id) {
                console.log("ID do carro não fornecido");
                return;
            }
            const carRef = doc(db, "cars", id);
            getDoc(carRef)
            .then((snapshot) => {
                setCar({
                    id: snapshot.id,
                    name: snapshot.data()?.name,
                    year: snapshot.data()?.year,
                    km: snapshot.data()?.km,
                    city: snapshot.data()?.city,
                    price: snapshot.data()?.price,
                    images: snapshot.data()?.images,
                    uid: snapshot.data()?.uid,
                    model: snapshot.data()?.model,
                    whatsapp: snapshot.data()?.whatsapp,
                    description: snapshot.data()?.description,
                    created: snapshot.data()?.created,
                    owner: snapshot.data()?.owner,
                });
            })
            .catch((error) => {
                console.error("Erro ao carregar o carro:", error);
            });
        }
        loadCar();
    }, [id]);
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 729) {
                setSliderPreview(1);
            } else {
                setSliderPreview(2);
            }
        }
        window.addEventListener("resize", handleResize); // Adiciona o event listener para redimensionamento
        handleResize();
        return () => window.removeEventListener("resize", handleResize); // Limpeza do event listener
    }, []);
    return (
        <Conteiner>
            <Swiper
                pagination={{ clickable: true }}
                slidesPerView={sliderPreview}
                navigation
            >
                {car?.images.map((image) => (
                    <SwiperSlide key={image.name}>
                        <img src={image.url} alt={image.name} className="w-full h-64 object-cover rounded-lg" />
                    </SwiperSlide>
                ))}
            </Swiper>
            {car && (
                <main className="w-full bg-white rounded-lg p-6 my-4">
                    <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
                        <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
                        <h1 className="font-bold text-3xl text-black">{car?.price}</h1>
                    </div>
                    <p>{car?.model}</p>
                    <div className="flex w-full gap-6 my-4">
                        <div className="flex flex-col gap-4">
                            <div>
                                <p>Cidade</p>
                                <strong>{car?.city}</strong>
                            </div>
                            <div>
                                <p>Ano</p>
                                <strong>{car?.year}</strong>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p>Km</p>
                                <strong>{car?.km}</strong>
                            </div>
                        </div>
                    </div>
                    <strong className="text-lg">Descrição</strong>
                    <p className="mb-4">{car?.description}</p>
                    <a href={`https://wa.me/${car?.whatsapp}`} target="_blank" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg w-max">
                        <FaWhatsapp size={20} />
                        Contatar vendedor
                    </a>
                </main>
            )}
        </Conteiner>
    );
}