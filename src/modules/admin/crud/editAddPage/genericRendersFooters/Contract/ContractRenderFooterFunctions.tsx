import { useNavigate, useParams, } from "react-router-dom";
import Axios from "@/shared/utils/Axios";
import { useState } from "react";
import { SituationContractMovementEnum } from "@/shared/enums/SituationContractMovementEnum";
import { AxiosError, AxiosPromise } from "axios";
import { useNotificationStore } from "@/shared/stores/useNotificationStore";
import { AxiosErrorDto } from "@/shared/dtos/AxiosErrorDto";

interface IContractRenderFooterFunctions {
    parentValues: Record<string, any>;
}

interface AxiosObjectErrorDto {
    errorObject: AxiosErrorDto;
}

export const ContractRenderFooterFunctions = ({
    parentValues
}: IContractRenderFooterFunctions) => {
    const paramsRouter = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const warningText = `Lembre-se de salvar o contrato antes de realizar essa ação!`

    const { notify } = useNotificationStore();


    const printContract = () => {
        setLoading(true);
        if (paramsRouter.crud === 'contracts' && paramsRouter.id !== undefined) {
            Axios
                .get(`/api/v1/contracts/print-contract`, {
                    params: {
                        contractIdentifier: parentValues.contract_random_code
                    },
                    responseType: 'blob'
                })
                .then((response) => {
                    console.log(response)
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `contrato-${parentValues.contract_random_code}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                })
                .catch(() => {
                    setLoading(false);

                })
                .finally(() => {
                    setLoading(false);
                })
        }
    };

    const nextSituation = () => {
        setLoading(true)
        moveSituation(SituationContractMovementEnum.NEXT).then(() => {
            notify.success("Situação do contrato avançou com sucesso")
        })
            .then(() => {
                reloadPage()

            })
            .catch((error: AxiosError<AxiosObjectErrorDto>) => {
                notify.error(error.response?.data.errorObject.error ?? error.message)
                setLoading(false)
            })
    };

    const previousSituation = () => {
        setLoading(true)
        moveSituation(SituationContractMovementEnum.PREVIOUS).then(() => {
            notify.success("Situação do contrato retrocedeu com sucesso")
        })
            .then(() => {
                reloadPage()

            })
            .catch((error: AxiosError<AxiosObjectErrorDto>) => {
                notify.error(error.response?.data.errorObject.error ?? error.message)
                setLoading(false)
            })
    };

    const moveSituation = (situationMovement: SituationContractMovementEnum): AxiosPromise => {
        return Axios.get(`/api/v1/contract/${situationMovement}/situation-contract`, {
            params: {
                projectRandomNumber: parentValues.contract_random_code,
                fromSituationContract: parentValues.contract_fk_situation_contract_id
            }
        });
    };

    const reloadPage = () => {
        setTimeout(() => {
            navigate(0)
            setLoading(false)
        }, 3000)
    }

    return {
        loading,
        warningText,
        printContract,
        nextSituation,
        previousSituation
    }
}