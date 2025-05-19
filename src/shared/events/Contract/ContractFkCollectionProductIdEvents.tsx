import Axios from "@/shared/utils/Axios";
import { Event } from "../Event";
import { AxiosResponse } from "axios";
import { useNotificationStore } from "@/shared/stores/useNotificationStore";

export class ContractFkCollectionProductIdEvents extends Event {
    private axios = Axios;
    private notify = useNotificationStore.getState().notify;

    public onChange = async (value: any) => {
        this.setState("loadings", ["contract_fk_collection_product_id"])
        await this.getQuantityCollection(value.value ? value.value : null);
    }



    private async getQuantityCollection(collectionId: number | null) {
        this.axios.get('/api/v1/contract/validate-quantity/collection', {
            params: {
                collectionId: collectionId
            }
        }).then((response: AxiosResponse<{ message: string }>) => {
            this.notify.warn(response.data.message)
        })
        .finally(() => {
            this.setState("loadings",[])
        })
    }
}