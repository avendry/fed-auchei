import { MenuAndModulesProps } from "./interfaces"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { IfDirective } from "../diretiveComponents/ifDirective/ifDirective"
import { useNotificationStore } from "@/shared/stores/useNotificationStore"
import { MenuRenderDto } from "@/shared/dtos/MenuRenderDto"
import { useIncreaseSideNav } from "../stores/IncreaseSidenav"

interface MenuProps extends MenuAndModulesProps {
    data: MenuRenderDto[]
}

export const MenusRender = (_params: MenuProps) => {
    const [dataMenus, setDataMenus] = useState<MenuRenderDto[] | null>();
    const navigate = useNavigate();
    const location = useLocation();
    const { module } = useParams<{ module: string }>();
    const { notify } = useNotificationStore();
    const { sideNav } = useIncreaseSideNav();


    useEffect(() => {
        // renderMenus();
        setDataMenus(_params.data)
    }, [_params.data])

    const goToListCrud = (crud: string) => {
        const pathnameParams = location.pathname.split('/');
        const lastPathParam = pathnameParams.pop();
        if (lastPathParam !== crud) {
            navigate(`${crud}`)
            // window.location.reload(); 
        } else {
            notify.info("Não é possivel navegar para a rota atual")
        }
    }

    return (
        <>
            <div
                className="flex flex-row justify-between flex-wrap w-full"
            >
                <IfDirective condition={dataMenus && dataMenus.length > 0}>
                    <div className={`flex flex-col ${sideNav ? `gap-6`: ``} w-full`}>
                        {dataMenus?.map((menu: MenuRenderDto) => {
                            return (
                                <div>
                                    {sideNav && (
                                        <p className="text-xs text-transparent/60">{menu.title}</p>
                                    )}
                                    {
                                        menu.items.map((items) => {
                                            return (
                                                <>
                                                    <Link
                                                        className={`flex flex-row ${sideNav ? `justify-between` : `justify-center`} w-full px-2 py-3 h-10 border-b-2 border-slate-200
                                                            hover:bg-accent_light dark:hover:bg-slate-800 rounded-md
                                                            hover:cursor-pointer
                                                            hover:text-slate-50`}
                                                        // onClick={() => goToListCrud(items.url_slug)}
                                                        to={items.url_slug}
                                                    >
                                                        <div
                                                            className="flex flex-row gap-2 items-center"
                                                        >
                                                            <i className={`${items.icon}`} />
                                                            {sideNav && (
                                                                <h6 className="text-sm">
                                                                    {items.name}
                                                                </h6>
                                                            )}
                                                        </div>
                                                        <div>
                                                            {/* <ChevronDown /> */}
                                                        </div>
                                                    </Link>

                                                </>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })}
                    </div>
                </IfDirective>
            </div>
        </>
    )
}