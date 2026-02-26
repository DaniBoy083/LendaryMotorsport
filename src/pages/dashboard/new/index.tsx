import { Conteiner } from "../../../components/conteiner";
import { PainelHeader } from "../../../components/painelheader";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangeEvent, useState, useContext } from "react";
import { authContext } from "../../../contexts/authContext";
import { v4 as uuidV4 } from "uuid";
import { storage } from "../../../services/firebaseConnect";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const schema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    model: z.string().nonempty("O modelo é obrigatório"),
    year: z.string().nonempty("O ano é obrigatorio"),
    km: z.string().nonempty("A quilometragem é obrigatoria"),
    price: z.string().nonempty("O preço é obrigatorio"),
    city: z.string().nonempty("A cidade é obrigatoria"),
    whatsapp: z.string().min(1, "O whatsapp é obrigatório").refine((value) => /^\d{10,11}$/.test(value), {
        message: "O número de whatsapp deve conter 10 ou 11 dígitos",
    }), //Faz a verificação se o numero de whatsapp digitado corresponde a quantidade de digitos de um numero de whatsapp real e existente.
    description: z.string().nonempty("A descrição é obrigatoria"),
});

type FormData = z.infer<typeof schema>;

export function NewCarPage() {
    const { user } = useContext(authContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });
    function onSubmit(data: FormData) {
        console.log(data);
    }
    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if(e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            if(image.type === "image/jpeg" || image.type === "image/png") {
                //Aqui você pode fazer o upload da imagem para o servidor ou armazená-la em um estado para exibição posterior.
                await handleUpload(image);
            } else {
                alert("Por favor, selecione uma imagem no formato JPEG ou PNG.");
                return;
            }
            console.log(image);
        }
    }
    async function handleUpload(image: File) {
        if(!user?.uid) {
            alert("Usuário não autenticado.");
            return;
        }
        const currentUid = user.uid; //Pega o id do usuario logado.
        const uidImage = uuidV4(); //Gera um id unico para a imagem.
        const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`); //Cria uma referência para o local onde a imagem será armazenada no Firebase Storage.
        uploadBytes(uploadRef, image) //Faz o upload da imagem para o Firebase Storage.
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadurl) => {
                console.log("URL da imagem:", downloadurl);
            }) //Obtém a URL de download da imagem após o upload bem-sucedido.
        })
    }
    return (
        <Conteiner>
            <PainelHeader />
            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
                <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:48">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="#000" />
                    </div>
                    <div className="cursor-pointer">
                        <input onChange={handleFile} className="opacity-0 cursor-pointer" type="file" accept="image/*" />
                    </div>
                </button>
            </div>
            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <p className="mb-2 font-mediunm">Nome do carro</p>
                        <Input
                            type="text"
                            register={register}
                            name="name"
                            error={errors.name?.message}
                            placeholder="Pegeuot 208"
                        />
                    </div>
                    <div className="mb-3">
                        <p className="mb-2 font-mediunm">Modelo</p>
                        <Input
                            type="text"
                            register={register}
                            name="model"
                            error={errors.model?.message}
                            placeholder="Modelo do carro"
                        />
                    </div>
                    <div className="flex w-full mb-3 flex-row items-center gap-4">
                        <div>
                            <p className="mb-2 font-mediunm">Ano</p>
                            <Input
                                type="text"
                                register={register}
                                name="year"
                                error={errors.year?.message}
                                placeholder="Ano do carro"
                            />
                        </div>
                        <div>
                            <p className="mb-2 font-mediunm">Quilometragem</p>
                            <Input
                                type="text"
                                register={register}
                                name="km"
                                error={errors.km?.message}
                                placeholder="Quilometragem do carro"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <p className="mb-2 font-mediunm">Preço</p>
                        <Input
                            type="text"
                            register={register}
                            name="price"
                            error={errors.price?.message}
                            placeholder="Preço do carro"
                        />
                    </div>
                    <div className="mb-3">
                        <p className="mb-2 font-mediunm">Cidade</p>
                        <Input
                            type="text"
                            register={register}
                            name="city"
                            error={errors.city?.message}
                            placeholder="Cidade do carro"
                        />
                    </div>
                    <div className="mb-3">
                        <p className="mb-2 font-mediunm">Whatsapp</p>
                        <Input
                            type="text"
                            register={register}
                            name="whatsapp"
                            error={errors.whatsapp?.message}
                            placeholder="Whatsapp do carro"
                        />
                    </div>
                    <div className="mb-3">
                        <p className="mb-2 font-mediunm">Descrição</p>
                        <textarea
                            className="border-2 w-full rounded-md h-24 px-2"
                            {...register("description")}
                            name="description"
                            id="description"
                            placeholder="Digite a descrição completa sobre o carro"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>
                    <button type="submit" className="w-full h-10 rounded-md bg-black text-white font-medium">
                        Enviar
                    </button>
                </form>
            </div>
        </Conteiner>
    );
}