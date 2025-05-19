import { IGetOptionsSelectHttp } from "@/shared/interfaces/IGetOptionsSelectHttp"
import { GetOptionsSelectHttpDto } from "../../buildFormFields/dtos/GetOptionsSelectHttpDto"
import { AxiosInstance, AxiosResponse } from "axios"
import { useNotificationStore } from "@/shared/stores/useNotificationStore";
import { GetOptionsSelectHttpSuccess } from "@/shared/dtos/GetOptionsSelectHttpSuccess";

export const GetOptionsSelectHttp = (
    setOptionsInter: (options: Array<{value: string, label: string, state: Record<string,any>}>) => void,
    setValue:(value: string) => void,
    axios: AxiosInstance
): IGetOptionsSelectHttp => {
    const { notify } = useNotificationStore();
    
    return {
        execute(getOptionsSelectHttpDto: GetOptionsSelectHttpDto): void {
            let queryParams = {};
            if (getOptionsSelectHttpDto.id) {
                queryParams = {
                    ...queryParams,
                    id: getOptionsSelectHttpDto.id
                }
            }

            if (getOptionsSelectHttpDto.concat) {
                queryParams = {
                    ...queryParams,
                    concat: getOptionsSelectHttpDto.id
                }
            }
            axios.get(`/api/v1/${getOptionsSelectHttpDto.api}/select`, {
                params: queryParams
            })
            .then((response: AxiosResponse<GetOptionsSelectHttpSuccess>) => {
                setOptionsInter(response.data.items)
            })
            .catch((err) => {
                notify.error(
                    `Select (${getOptionsSelectHttpDto.fieldName}): ${err.response.data.errorObject.error}`
                )
            })
            .finally(() => {
                if(getOptionsSelectHttpDto.id) {
                    setValue(getOptionsSelectHttpDto.id.toString())
                }
            })
        }
    }
}