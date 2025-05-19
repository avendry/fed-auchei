import { ViewImageOriginalFunctionsDto } from "@/shared/dtos/ViewImageOriginalFunctionsDto"
import Axios from "@/shared/utils/Axios";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";


export const viewImageOriginalFunctions = (viewImageOriginalFunctionsDto: ViewImageOriginalFunctionsDto) => {
    const { keyImage, imageTitle, setShowModal, setViewImageData } = viewImageOriginalFunctionsDto;
    const [image, setImage] = useState<string | null>(null);


    useEffect(() => {
        if (keyImage) {
            useLoadOriginalImage(keyImage)
        }
    }, [keyImage]);

    // const createOrGetURLImage = (keyImage: string) => {
    //     console.log("test ", keyImage)
    // }

    const useLoadOriginalImage = (keyImage: string) => {
        Axios.get('/api/v1/file/get-original-file', {
            params: {
                key: keyImage
            },
            headers: {
                "Accept": 'image/'
            },
            responseType: "blob"
        })
            .then(async (response: AxiosResponse) => {
                const contentType = response.headers["content-type"];
                if (contentType) {
                    const blob = new Blob([response.data], { type: contentType });
                    const fileUrl = URL.createObjectURL(blob);
                    setImage(fileUrl)
                }
            })
    }

    // const useLoadSignedUrl = (keyImage: string) => {
    //     Axios.get('/api/v1/file/get-signed-url', {
    //         params: {
    //             key: keyImage
    //         }
    //     })
    //         .then((response: AxiosResponse<{ url: string }>) => {
    //             if (response.data?.url) {
    //                 setImage(response.data.url)
    //             }
    //         })
    // }


    const handleDownload = () => {
        if (image) {
            // Fazendo a requisição para a URL assinada do MinIO usando Axios
            axios.get(image, {
                responseType: 'blob' // Garantindo que a resposta seja tratada como um Blob
            })
                .then((response) => {
                    // Verifica se a resposta é bem-sucedida
                    if (response.status !== 200) {
                        throw new Error("Erro ao baixar o arquivo.");
                    }

                    // Definindo um nome padrão para o arquivo (ou pode ser um valor obtido da API)
                    const filename = imageTitle || "imagem.jpg";

                    // Criando um link temporário para o download
                    const blob = response.data;
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = filename;

                    // Adicionando o link ao DOM, clicando nele e removendo-o em seguida
                    document.body.appendChild(link);
                    link.click(); 
                    document.body.removeChild(link);
                })
                .catch((err) => {
                    console.error("Erro ao baixar o arquivo:", err);
                });
        } else {
            console.error("A URL da imagem não está disponível");
        }
    };

    const handleColseButton = () => {
        console.log('executando')
        setShowModal(false);
        setViewImageData({keyImage: "", title: ""})
        setImage(null)
    }


    return {
        image,
        handleDownload,
        handleColseButton
    }
}