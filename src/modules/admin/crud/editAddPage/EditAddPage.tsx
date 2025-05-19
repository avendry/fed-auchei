import { useEffect, useState } from "react";
import { IEditAddPageProps, MethodType } from "./utils/interfaces/IEditAddPage";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "@/shared/utils/Axios";
import { AxiosError, AxiosResponse } from "axios";
import { BuildFormFields } from "@/shared/components/buildFormFields/BuildFormFields";
import { SpinnerUiMv } from "@/shared/components/spinnerUiMv/Spinner";
import { toast, ToastContainerProps } from "react-toastify";
import { onSaveService } from "./utils/functions/onSaveService";
import { onDeleteService } from "./utils/functions/onDeleteService";
import { NotificationContainer } from "@/shared/components/Notification/NotificationContainer";
import { HeaderManipulated } from "./HeaderManipulated";
import { ulid } from "ulid";
import { renderFooter } from "./utils/functions/renderFooterGenericFunction";




export const EditAddPage = ({}: IEditAddPageProps) => {
    //  const and Hooks
    const { crud, id, module, method } = useParams<{ crud: string | undefined, id: string | undefined, method: MethodType | undefined, module: string }>();
    const [fields, setFields] = useState<Record<string, any>>({});
    const [singularNameView, setSingularNameView] = useState("");
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState({});
    const uniqueId: string = ulid();
    const navigate = useNavigate();

    const toastConfig: ToastContainerProps = {
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
    }

    const toastExecute = (message: string, type: "success" | "error") => {
        toast[`${type}`](message, toastConfig);
    }


    // useEffect
    useEffect(() => {
        getFields(
            {
                callback: () => {
                    if (method !== 'add') {
                        getData()
                    } else {
                        setLoading(false)
                    }
                }
            }
        )
    }, [])


    //  arrow functions
    const getFields = ({ callback }: { callback?: () => void }) => {
        Axios
            .get(`/api/v1/get/${crud}/fields`)
            .then((reponse: AxiosResponse<{ schema: Record<string, any> }>) => {
                const { $GLOBALS } = reponse.data.schema;
                setSingularNameView($GLOBALS.singular_name)
                setFields($GLOBALS.fields)
                if (callback) callback()
            })
    }

    const getData = () => {
        Axios
            .get(`/api/v1/${crud}/${id}/get`)
            .then((response: AxiosResponse<{ response: Record<string, any>, message: string }>) => {
                const { data } = response;
                setFormValues(data.response);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleSave = (formValuesFormFields: Record<string, any>, callback: () => void) => {
        if (crud && method) {
            const { insert, update } = onSaveService({
                crud: crud,
                formValues: formValuesFormFields,
                axiosInstance: Axios,
                Ulid: uniqueId
            });
            if (method !== "view") {
                if (method == "add") {
                    insert()
                        .then(() => {
                            toastExecute("Registro salvo com sucesso", "success");
                        })
                        .catch(() => {
                            toastExecute("Tivemos um erro ao Inserir seu registro", "error");
                        })
                        .finally(() => {
                            setTimeout(() => {
                                navigate(`/dashboard/${module}/${crud}`)
                                callback()
                            }, 1600)
                        })
                }
                if (method == "edit" && id) {
                    update(
                        {
                            id: id
                        }
                    )
                        .then(() => {
                            toastExecute("Registro salvo com sucesso", "success");
                        })
                        .catch((err: AxiosError<{ title: string, error: Array<{ field: string, code: string, received: string, expected: string, message: string }> }>) => {
                            if (err.response?.data) {
                                toastExecute(`Tivemos um erro ao mudar seu registro (${err.response.data.title})`, "error");
                            }
                        })
                        .finally(() => {
                            setTimeout(() => {
                                navigate(`/dashboard/${module}/${crud}`)
                                callback()
                            }, 1600)
                        })
                }
            }
        }
    };

    const handleDelete = () => {
        if ((crud && id && method) && ["add", "edit"].includes(method)) {
            onDeleteService().main(
                {
                    crud: crud,
                    id: id
                }
            )
                .then(() => {
                    toastExecute("Arquivo deletado com sucesso", "success");
                })
                .catch(() => {
                    toastExecute("Não foi possivel apagar seu registro", "error");
                })
                .finally(() => {
                    setTimeout(() => {
                        navigate(`/dashboard/${module}/${crud}`)
                    }, 1600)
                })
        }
    }



    // renders
    return (
        <>
            <NotificationContainer />
            <div
                className="flex flex-col gap-2"
            >
                <HeaderManipulated
                    crud={crud}
                    module={module}
                    id={id}
                    singularNameView={singularNameView}
                    method={method}
                />
                <div
                    className="bg-white rounded-sm border min-h-96"
                >
                    {loading ? (
                        <>
                            <SpinnerUiMv />
                        </>
                    ) : (
                        <>
                            {(method && crud && Object.keys(fields).length > 0) && (
                                <>
                                    <BuildFormFields
                                        fieldSchema={fields}
                                        id={id ? Number(id) : uniqueId}
                                        method={method}
                                        crud={crud}
                                        dataValues={formValues}
                                        onSave={handleSave}
                                        handleDelete={handleDelete}
                                        renderFooterComponent={
                                            renderFooter().main(
                                                {
                                                    viewName: crud,
                                                    parentValues: formValues
                                                }
                                            )
                                        }
                                    />

                                </>
                            )}
                        </>
                    )}
                </div>

            </div>
        </>
    )
} 