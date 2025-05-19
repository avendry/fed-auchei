import { Outlet, Navigate, useLocation } from "react-router-dom"
// import DefaultRenderBody from "../components/DefaultRenderBody"
import { useEffect, useState } from "react";
import { SpinnerUiMv } from "../../shared/components/spinnerUiMv/Spinner";
// import AxiosFinalClient from "@/shared/utils/AxiosFinalClient";
// import { AxiosResponse } from "axios";
import { useGlobalAtributeStore } from "../../shared/stores/globalAttributeStore";
// import { PrivateRoutesFunctions } from "./PrivateRouteFunctions";
interface PrivateRoutesProps {
    redirectTo: string
}

export const PrivateClientsRoute = ({
    redirectTo,
    // ...props
}: PrivateRoutesProps) => {
    // const { sessionStorageCleanUpFiles } = PrivateRoutesFunctions();
    const [valid] = useState(true);
    const [isLoading] = useState(false);
    const route = useLocation();
    const { setContextData } = useGlobalAtributeStore();

    useEffect(() => {
        // if (localStorage.getItem('token')) {
        //     const attributes = JSON.parse(localStorage.getItem('attributes') || '{}')
        //     Axios
        //         .get(`/api/auth/authenticated/me/${localStorage.getItem('token')}`)
        //         .then((res: AxiosResponse) => {
        //             if (res.data.response?.isAuth) {
        //                 // sessionStorageCleanUpFiles();
        //                 setValid(true)
        //                 setContextData(attributes)
        //             }
        //         })
        //         .catch(() => {
        //             setValid(false)
        //         })
        //         .finally(() => {
        //             setIsLoading(false)
        //         })
        // } else {
        //     setValid(false)
        //     setIsLoading(false)
        // }
    }, [route, route.pathname, setContextData])


    return (
        <>
            {isLoading ? (
                <>
                    <SpinnerUiMv />
                </>
            ) : (
                <>
                    {valid ? (
                        <>

                            <>
                                <Outlet />
                            </>

                        </>
                    ) : (
                        <Navigate to={redirectTo} />
                    )}
                </>
            )}
        </>
    )
}
