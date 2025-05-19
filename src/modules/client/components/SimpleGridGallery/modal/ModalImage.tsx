import { DialogUi } from "@/components/ui/modal"
import { ButtonUiMv } from "@/shared/components/ButtonUiMv/ButtonUiMv";
import { FC, RefObject } from "react"

interface ModalImageProps {
    image: RefObject<HTMLImageElement>;
    onClose: VoidFunction;
    showModal: boolean;
}


export const ModalImage: FC<ModalImageProps> = ({ image, onClose, showModal }) => {
    if (!image.current) return null;

    return (
        <>
            <DialogUi.Root
                showDialog={showModal}
                size={"none"}
                className="py-0 min-h-0"
            >
                <DialogUi.Body>
                    <div
                        className="flex justify-center items-center"
                    >
                        <div className="lg:max-w-[80vw] lg:max-h-[80vh] rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={image.current.src}
                                alt={image.current.alt || "Imagem"}
                                loading="lazy"
                                className="max-w-full max-h-screen"
                            />
                        </div>
                    </div>
                </DialogUi.Body>
                <DialogUi.Footer>
                    <div
                        className="flex flex-row gap-2 mt-2 w-full"
                    >
                        <ButtonUiMv
                            variant={"destructive"}
                            onClick={onClose}
                        >
                            Fechar
                        </ButtonUiMv>
                    </div>
                </DialogUi.Footer>
            </DialogUi.Root>
        </>
    )
}