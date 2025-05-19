import { Outlet, Navigate, useLocation } from "react-router-dom"
import DefaultRenderBody from "../components/DefaultRenderBody"
import { useEffect, useState } from "react";
import LoadingLottie from "@/assets/animations/Loading.json";
import Axios from "../../shared/utils/Axios";
import { AxiosResponse } from "axios";
import { useGlobalAtributeStore } from "../../shared/stores/globalAttributeStore";
// import { PrivateRoutesFunctions } from "./PrivateRouteFunctions";
import Lottie from "lottie-react";
interface PrivateRoutesProps {
    redirectTo: string
}

export const PrivateRoutes = ({
    redirectTo,
    // ...props
}: PrivateRoutesProps) => {
    // const { sessionStorageCleanUpFiles } = PrivateRoutesFunctions();
    const [valid, setValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const route = useLocation();
    const { setContextData } = useGlobalAtributeStore();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const attributes = JSON.parse(localStorage.getItem('attributes') || '{}')
            Axios
                .get(`/api/auth/authenticated/me/${localStorage.getItem('token')}`)
                .then((res: AxiosResponse) => {
                    if (res.data.response?.isAuth) {
                        // sessionStorageCleanUpFiles();
                        setValid(true)
                        setContextData(attributes)
                    }
                })
                .catch(() => {
                    setValid(false)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else {
            setValid(false)
            setIsLoading(false)
        }
    }, [route, route.pathname, setContextData])


    return (
        <>
            {/* {isLoading ? (
                <>
                    <div
                        className="w-full h-screen flex flex-col justify-center content-center items-center"
                    >
                        <Lottie
                            className="hidden lg:flex w-[20vw] h-[25vh]"
                            animationData={LoadingLottie}
                            loop={true}
                            alt="Imagem que mostra um porco com uma moeda em cima"
                        />
                        <div className="flex flex-row gap-1 text-slate-700">
                            <p className="text-3xl">Sistema em carregamento</p>
                        </div>
                    </div>
                </>
            ) : ( */}
                <>
                    {/* {valid ? ( */}
                        <>

                            <>
                                <DefaultRenderBody

                                >
                                    <Outlet />
                                </DefaultRenderBody>
                            </>

                        </>
                    {/* ) : (
                        <Navigate to={redirectTo} />
                    )} */}
                </>
            {/* )} */}
        </>
    )
}
