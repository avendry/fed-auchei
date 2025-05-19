import { ReactNode } from "react"
import { useIncreaseSideNav } from "../stores/IncreaseSidenav";
import { Globals } from "../../utils/Globals";
import { CalendarCheck2, CalendarCog, Smile } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SideNavProps = {
    children?: ReactNode;
    footerComponent?: ReactNode;
}

export const SideNav = ({ children = '', footerComponent }: SideNavProps) => {
    const { sideNav } = useIncreaseSideNav();
    const navigate = useNavigate();

    const redirectDashboard = () => {
        navigate('/dashboard')
    }

    return (
        <div
            className={`flex h-screen transition-all duration-300 overflow-hidden
                ${sideNav ? 'w-[90vw] lg:w-[400px]' : 'lg:w-[60px] w-0'}
                fixed top-28 left-0 z-50 lg:relative lg:z-auto lg:top-0
                bg-white shadow-horizontal rounded-tr-xl flex-col
            `}
        >
            <div className={`flex flex-col ${sideNav ? `p-5` : `items-center py-5`} gap-10 w-full h-[75%]
                lg:h-[85%]`}
            >
                <div className="flex flex-row items-center gap-3 hover:bg-slate-500/20 hover:rounded-md cursor-pointer" onClick={redirectDashboard}>
                    <em className="min-w-10 min-h-10 rounded-md bg-primary_light flex justify-center items-center">
                        <CalendarCheck2 className="text-white" />
                    </em>
                    {sideNav && (
                        <div>
                            <p className="text-1xl font-bold text-slate-800/70">
                                {Globals.product_name}
                            </p>
                            <p className=" flex flex-row text-xs font-bold text-slate-800/40">
                                Simplificando suas escalas
                            </p>
                        </div>
                    )}
                </div>
                <div
                // className={`${sideNav ? 'flex' : 'hidden'}`}
                >
                    {children}
                </div>
            </div>
            <div
                className={`${sideNav ? `p-5` : `flex justify-center items-end py-5`} h-[15%] content-end`}
            >
                {footerComponent}
            </div>
        </div>
    );
}