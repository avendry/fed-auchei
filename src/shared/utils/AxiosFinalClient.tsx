import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { triggerErrorHandler } from "../functions/errorHandler";
import { Globals } from "./Globals";

const AxiosFinalClient = axios.create({
    baseURL: Globals.base_url_final_client,
    timeout: 10000
})

AxiosFinalClient.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        if (localStorage.getItem('token')) {
            if (!config.headers) {
                config.headers = {} as AxiosRequestHeaders;
            }
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        }

        return config
    }
)

AxiosFinalClient.interceptors.response.use(
    function (response: AxiosResponse) {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('client-attributes', JSON.stringify(response.data.attributes))
        }
        return response
    },
    function (error: AxiosError<{ errorObject?: Record<string, any>, error: any[] }>) {
        if (error.response?.data?.errorObject) {
            if(error.response.data.errorObject.location && error.response.data.errorObject.id_error) {
                triggerErrorHandler(
                    {
                        nameFunctionErrorExecuted: 'errorGeneral',
                        errors: error.response?.data?.errorObject
                    }
                )
            }
        }
        return Promise.reject(error)
    }
)

export default AxiosFinalClient


