import { DialogUi } from "@/components/ui/modal"
import { viewImageOriginalFunctions } from "./viewImageOriginalFunctions"
import React from "react";
import { ButtonUiMv } from "@/shared/components/ButtonUiMv/ButtonUiMv";
import { ViewImageOriginalStore } from "@/shared/components/stores/ViewImageOriginalStore";

export const ViewImageOriginal: React.FC = (
) => {
    const { showModal, setShowModal, viewImageData, setViewImageData } = ViewImageOriginalStore();
    const { image, handleDownload, handleColseButton } = viewImageOriginalFunctions(
        {
            keyImage: viewImageData.keyImage,
            imageTitle: viewImageData.title,
            setShowModal,
            setViewImageData
        }
    );

    return (
        <>
            <DialogUi.Root
                showDialog={showModal}
            >
                <DialogUi.Header>
                    <div>
                        <span className="font-bold">Nome do Arquivo:</span> {viewImageData.title}
                    </div>
                </DialogUi.Header>
                <DialogUi.Body>
                    <div
                        className="flex justify-center items-center"
                    >
                        {image ? (
                            <img
                                src={image}
                                alt="Imagem Original"
                                className="max-w-full max-h-96 rounded-lg shadow-md shadow-gray-500/80"
                                decoding="async"
                                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                            />
                        ) : (
                            <span>Carregando imagem...</span>
                        )}
                    </div>
                </DialogUi.Body>
                <DialogUi.Footer>
                    <div
                        className="flex flex-row gap-2 mt-5"
                    >
                        <ButtonUiMv
                        // onClick={copyError}
                        onClick={handleDownload}
                        >
                            Baixar Imagem
                        </ButtonUiMv>
                        <ButtonUiMv
                            variant={"destructive"}
                            onClick={handleColseButton}
                        >
                            Fechar
                        </ButtonUiMv>
                    </div>
                </DialogUi.Footer>
            </DialogUi.Root>
        </>
    )
}