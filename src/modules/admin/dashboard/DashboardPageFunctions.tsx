import { getLocalStorage } from "@/shared/functions/getLocalStorage";
import { useNotificationStore } from "@/shared/stores/useNotificationStore";
import { TCard } from "@/shared/types/TCard";
import Axios from "@/shared/utils/Axios";
import { AxiosResponse } from "axios";
import { find } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DashboardPageFunctions = () => {
    const navigate = useNavigate();
    const [dataCards, setDataCards] = useState<TCard[]>([]);
    const [loading, setLoading] = useState(true);

    const localStorageGet = getLocalStorage();
    const { notify } = useNotificationStore();

    useEffect(() => {
        getCards()
    }, [])

    const getCards = () => {
        Axios
            .get('/api/v1/dashboard/cards')
            .then((response: AxiosResponse<{
                cards: TCard[]
            }>) => {
                setDataCards(response.data?.cards)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const onSelectCard = (crudName: string) => {
        const attributes = localStorageGet.getStorageAttributes();
        if(attributes) {
            const { menus, modules } = attributes;
            const selectMenu = find(menus, { "menu_slug": crudName });
            if (selectMenu) {
                const selectModule = find(modules, { "plain_module_fk_module_id": selectMenu.menu_fk_module_id });
                if (selectModule) {
                    navigate(`${location.pathname}/${selectModule.module_slug}/${selectMenu.menu_slug}`)
                }
            } else {
                notify.error("Ops, parece que não existe nenhum crud para navegar")
            }
        }else {
            notify.error('Parece que não existem atributos disponiveis do menu no LocalStorage')
        }
    }

    return {
        dataCards,
        loading,
        onSelectCard
    }
    
}