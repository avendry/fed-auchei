import { ClientsFunctionsDto } from "@/shared/dtos/ClientsFunctionsDto";
import { useEffect, useRef, useState } from "react";
import AxiosFinalClient from "@/shared/utils/AxiosFinalClient";

export const ClientFunctions = ({
    // project_randon_number
}: ClientsFunctionsDto) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        listImages()
    },[])

    const listImages = () => {
        setLoading(true)
        AxiosFinalClient.get('/')
    }


    const handleViewImageExpanded = (imgElement: HTMLImageElement) => {
        imageRef.current = imgElement;
        setIsModalOpen(true);
    };

    return {
        isModalOpen,
        imageRef,
        loading,
        setIsModalOpen,
        handleViewImageExpanded
    }
}