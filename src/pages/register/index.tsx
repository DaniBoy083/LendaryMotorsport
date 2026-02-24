import { useEffect } from "react";
import logoImg from "../../assets/logo.svg";
import { Conteiner } from "../../components/conteiner";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseConnect";
import {createUserWithEmailAndPassword, updateProfile, signOut} from "firebase/auth"

//Define as regras de validação do formulario usando o zod.
const schema = z.object({
    name: z.string().nonempty("O NOME É OBRIGATORIO!"),
    email: z.string().email("INSIRA UM EMAIL VALIDO!").nonempty("O CAMPO EMAIL É OBRIGATORIO!"),
    password: z.string().min(6, "A SENHA DEVE TER NO MINIMO 6 CARACTERES").nonempty("O CAMPO DE SENHA É OBRIGATORIO!")
})

//Extrai automaticamente o tipo com base no schema.
type FormData = z.infer<typeof schema>

export function RegisterPage() {
    const navigate = useNavigate();
    // cria as funções de registro e envio e os erros de validação.
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({ //Ativa a tipagem automatica dos campos.
        resolver: zodResolver(schema), //conecta o react hook com o zod.
        mode: "onChange" //Define quando a validação acontece.
    })

    //Impede que um usuario ja logado acesse a pagina, deslogando ele automaticamente.
    useEffect(() => {
        async function handleLogout(){
            await signOut(auth)
        }
        handleLogout();
    }, [])

    function onSubmit(data: FormData){
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (user) => {
            await updateProfile(user.user, {
                displayName: data.name
            })
            console.log("Cadastrado com sucesso!")
            navigate("/dashboard", { replace: true }) //Navega o usuario para o dashboard e limpa o historico de navegação.
        })
        .catch((error) => {
            console.log("ERRO AO CADASTRAR USUARIO!")
            console.log(error)
        })
    }
    return (
        <Conteiner>
            <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
                <Link to="/" className="mb-6 max-w-sm w-full">
                    <img 
                        src={logoImg}
                        alt="Logo da plataforma"
                        className="w-full"
                        width={100}
                        height={50}
                    />
                </Link>
                <form 
                    className="bg-white max-w-xl w-full rounded-lg p-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-3">
                        <Input
                            type="text"
                            placeholder="Digite seu nome completo..."
                            name="name"
                            error={errors.name?.message} //Passa as menssagens de erro caso elas aconteçam.
                            register={register}
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            type="email"
                            placeholder="Digite seu email..."
                            name="email"
                            error={errors.email?.message} //Passa as menssagens de erro caso elas aconteçam.
                            register={register}
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            type="password"
                            placeholder="Digite sua senha..."
                            name="password"
                            error={errors.password?.message} //Passa as menssagens de erro caso elas aconteçam.
                            register={register}
                        />
                    </div>
                    <button type="submit" className="bg-black w-full rounded-md text-white h-10 font-medium">
                        Fazer cadastro...
                    </button>
                </form>
                <Link to="/login">
                    Ja possui cadastro? ir para pagina de Login.
                </Link>
            </div>
        </Conteiner>
    );
}