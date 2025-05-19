import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useTheme } from "../shared/context/ThemeProvider";
import { PrivateRoutes } from "./privates/Private.routes";
import { DashboardPage } from "../modules/admin/dashboard/DashboardPage";
import { ModalError } from "@/shared/components/modalError/ModalError";
import { useEffect } from "react";
import { onError } from "@/shared/functions/errorHandler";
import { useModalErrorStore } from "@/shared/components/stores/ModalErrorStore";
import { BrowserPage } from "@/modules/admin/crud/BrowserPage/BrowserPage";
import { DashboardModulePage } from "@/modules/admin/dashboardModulePage/DashboardModulePage";
import { EditAddPage } from "@/modules/admin/crud/editAddPage/EditAddPage";
import { Login } from "@/modules/admin/login/Login";
import { Profile } from "@/modules/admin/profile/Profile";
import { PrivateClientsRoute } from "./privates/PrivateClient.routes";
import { ClientPage } from "@/modules/client/home/ClientPage";
import { Page404 } from "@/shared/pages/404";

export const DashboardRoutes = () => {
    const { theme } = useTheme();
    const { setShowModalError, setErrorData } = useModalErrorStore();

    useEffect(() => {
        onError(
            {
                name: 'errorGeneral',
                callback(err) {
                    setShowModalError(true)
                    setErrorData(err)
                },
            }
        )
    }, [])

    return (
        <div className={theme}>
            <div
                className="bg-background_light"
            >
                <ModalError />
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoutes
                                    redirectTo="/login"
                                />
                            } >
                            <Route path="/dashboard" element={<DashboardPage to={""} />} />
                            <Route path="/dashboard/profile" element={<Profile />} />
                            {/* <Route path="/dashboard/:module" element={<DashboardModulePage to={""} />} /> */}
                            <Route path="/dashboard/:crud" element={<BrowserPage />} />
                            <Route path="/dashboard/:crud/:method" element={<EditAddPage />} />
                            <Route path="/dashboard/:crud/:id/:method" element={<EditAddPage />} />

                            {/* Rota catch-all */}
                        </Route>
                        <Route
                            path="/client-images"
                            element={
                                <PrivateClientsRoute redirectTo="/error" />
                            }
                        >
                            <Route path="/client-images/:eventName/:randomId" element={<ClientPage />} />
                        </Route>
                        {/* <Route
                            element={
                                <PrivateRoutes
                                    redirectTo="/login"
                                />
                            }
                        >
                            <Route path="/profile" element={<Profile />}/>
                        </Route> */}
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>

    )
}