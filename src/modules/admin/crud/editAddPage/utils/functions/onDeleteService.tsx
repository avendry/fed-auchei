import Axios from "@/shared/utils/Axios";
import { IDeleteFormBuilderClient } from "../interfaces/IDeleteFormBuilderCLient";


export const onDeleteService = (): IDeleteFormBuilderClient => {
    return {
        main({ crud, id }) {
            return Axios.delete(`/api/v1/${crud}/${id}/delete`)
        }
    }
}