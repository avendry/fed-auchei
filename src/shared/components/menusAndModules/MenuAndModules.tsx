import { useNavigate } from "react-router-dom";
import { MenusRender } from "./MenusRender";
import { MenuRenderDto } from "@/shared/dtos/MenuRenderDto";



interface MenuAndModulesProps {
    location: string;
}


const menus: MenuRenderDto[] = [
    {
        title: "Cadastros",
        items: [
            {
                name: "Usuários",
                order: 1,
                url_slug: "users",
                icon: "fas fa-users"
            },
            {
                name: "Funcionários",
                order: 2,
                url_slug: "employees",
                icon: "fas fa-users"
            }
        ]
    },
    {
        title: "Escalas",
        items: [
            {
                name: "Gerador de escalas",
                icon: "fas fa-calendar-alt",
                order: 3,
                url_slug: "calendar-scales"
            }
        ]
    }
]


export const MenuAndModules = (params: MenuAndModulesProps) => {
    const navigate = useNavigate();

    const redirectTo = ({ destiny }: { destiny: string }) => {
        navigate(destiny);
    }

    const renderMenuOrModules = () => {
        // const attributes = JSON.parse(localStorage.getItem('attributes') || '{}')
        // const { location } = params;
        // if (location === '/dashboard') {
        //     return <ModulesRender
        //         navigateTo={redirectTo}
        //         data={attributes.menus.modules}
        //     />
        // } else {
        return <MenusRender
            navigateTo={redirectTo}
            data={menus}
        />
        // <></>
        // }
    }

    return (
        <>
            {renderMenuOrModules()}
        </>
    )
}