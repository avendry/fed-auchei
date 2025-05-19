import { useEffect, useState } from "react";
import { Globals } from "@/shared/utils/Globals";
import Lottie from "lottie-react";
import animation from '../../../assets/animations/animation-login4.json';
import { ToastContainer, toast } from "react-toastify";
import LogoMvCode from "@/assets/logo.png";
import { Helmet } from "react-helmet";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/shared/components/input/Input";
import { ButtonUiMv } from "@/shared/components/ButtonUiMv/ButtonUiMv";
import { LinkComponent } from "@/shared/components/linkComponent/LinkComponent";
import Axios from "@/shared/utils/Axios";
import { useCoinStore } from "@/shared/components/stores/CoinStore";


interface ErrorResponse {
    error: { message: string }[];
}


export const Login = () => {
    // const
    const navigate = useNavigate();

    // useStates
    const [scale, setScale] = useState('full');
    const [values, setValues] = useState(
        {
            user_email: '',
            user_password: ''
        }
    );
    const [isLoading, setIsLoading] = useState(false);


    // useEffects
    useEffect(() => {
        setTimeout(() => {
            setScale('0')
        }, 520)
    }, [])

    // arrowFunctions
    const validateEmail = (email: string) => {
        const validate = /\S+@\S+\.\S+/;

        return validate.test(email)
    }

    const setValuesOnChange = ({ field, value }: { field: string, value: string }) => {
        return setValues({ ...values, [field]: value })
    }


    const isLogin = () => {
        if (!values.user_email && !values.user_password) {
            toast.info('Ops... vc ainda não preencheu nada aqui!')
            return
        }
        if (validateEmail(values.user_email) == false) {
            toast.error('Ops... o e-mail informado é inválido!');
            return
        }
        if (!values.user_password) {
            toast.error('Ops... a senha não pode ser vazia!');
            return
        }

        setIsLoading(true);
        Axios
            .post('/api/auth/authenticated', {
                data: { ...values }
            })
            .then((response: AxiosResponse<{
                error: Record<string,any>[],
                success: string;
                attributes: {
                    user: {
                        user_email: string,
                        user_id: string
                    },
                    initialCoins: number;
                    companyName: string;
                }
            }>) => {
                toast.success(response.data.success)
                useCoinStore.getState().setCoins(response.data.attributes.initialCoins)
                setTimeout(() => {
                    navigate('/dashboard')
                },3000)
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data?.error[0].message);
                    const errors = error.response.data?.error;
                    for (const item of errors) {
                        toast.warning(`${item}`);
                    }
                } else {
                    toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.');
                }
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{Globals.product_name} | Login</title>
            </Helmet>
            <ToastContainer />
            <div
                className="bg-secundary_accent_light max-h-screen h-screen flex justify-end flex-col transition-all
                lg:flex-row lg:h-screen
                "
            >
                <div
                    className=" h-[35%]"
                >
                    <div
                        className="flex flex-row gap-10 p-10 text-center
                        
                        lg:w-[60vw] lg:flex-col lg:h-screen lg:justify-center items-center
                        "
                    >
                        <p
                            className="text-2xl"
                        >
                            Automazindo sua geração de escala! 😃
                        </p>
                        <Lottie
                            className="hidden lg:flex w-[40vw]"
                            animationData={animation}
                            loop={true}
                            alt="Imagem que mostra um porco com uma moeda em cima"
                        />
                    </div>
                </div>
                <div
                    className={`flex bg-background_light h-[36rem] translate-y-${scale} w-full rounded-t-3xl transition-all duration-700
                        flex-col
                        items-center p-10 gap-10
                        lg:h-full lg:w-[40vw] lg:rounded-tl-3xl lg:rounded-tr-none lg:justify-center 
                    `}
                >
                    <div
                        className="flex flex-col text-center gap-2"
                    >
                        <h1
                            className="text-5xl font-semibold text-center drop-shadow-lg font-sans text-transparent/80"
                        >
                            {Globals.product_name}
                        </h1>
                        <p className="opacity-35">Seu software de produtividade</p>
                    </div>
                    <div>
                        <h2
                            className="text-1xl font-medium"
                        >
                            Iniciar Sessão
                        </h2>
                    </div>
                    <div
                        className="flex flex-col gap-6 lg:gap-16"
                    >
                        <div
                            className="flex flex-col gap-3"
                        >
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Email usado no cadastro"
                                onBlur={(value) => setValuesOnChange({ field: 'user_email', value: value })}
                            />
                            <Input
                                type="password"
                                label="Senha"
                                placeholder="Sua senha"
                                onBlur={(value) => setValuesOnChange({ field: 'user_password', value: value })}
                            />
                        </div>
                        <ButtonUiMv
                            onClick={isLogin}
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            Logar
                        </ButtonUiMv>
                    </div>
                    <LinkComponent className="text-sm">Esqueci minha senha!</LinkComponent>
                    {/* <div
                        className="flex flex-row text-sm gap-1"
                    >
                        <p>
                            Não tem uma conta?
                        </p>
                        <LinkComponent>
                            Crie a sua agora mesmo!
                        </LinkComponent>
                    </div> */}
                    <a 
                        className="flex flex-row justify-center items-center gap-2 cursor-pointer"
                        href="https://www.mvcode.com.br/"
                        target="_blank"
                    >
                        <h3 className="font-semibold opacity-50">Powered by</h3>
                        <img
                            src={LogoMvCode}
                            width={30}
                            height={30}
                        />
                    </a>
                </div>

            </div>
        </>
    )
}