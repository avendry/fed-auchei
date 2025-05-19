
import { useRef } from "react";
import { DialogUi } from "../../../components/ui/modal";
import { ButtonUiMv } from "../ButtonUiMv/ButtonUiMv";
import { useModalErrorStore } from "../stores/ModalErrorStore";
import { useNotificationStore } from "@/shared/stores/useNotificationStore";


export const ModalError = () => {
    const { showModalError, errorData, setShowModalError } = useModalErrorStore();
    const descriptionRef = useRef<HTMLParagraphElement | null>(null);
    const { notify } = useNotificationStore();

    const copyError = () => {
        if(descriptionRef.current) {
            const errorText = descriptionRef.current.textContent;

            navigator.clipboard.writeText(errorText ?? '')
                .then(() => {
                    notify.success("Texto copiado para área de transferência")
                })
                .catch((error) => {
                    notify.error(`Falha ao copiar texto: ${error}`)
                })
        }
    }

    return (
        <DialogUi.Root
            showDialog={showModalError}
        >
            <DialogUi.Header>
                <div>
                    <span className="font-bold">Titulo:</span> {errorData?.title ?? 'Erro desconhecido'}
                </div>
                <div>
                    <p className="font-semibold">Copie e envie o erro para o desenvolvedor</p>
                </div>
            </DialogUi.Header>
            <DialogUi.Body>
                <div>
                    <span className="font-bold">Descrição do erro:</span>
                    <p className="text-sm" key="description-modal-error"ref={descriptionRef}>{errorData.location ?? errorData.error}</p>
                </div>
            </DialogUi.Body>
            <DialogUi.Footer>
                <div
                    className="flex flex-row gap-2"
                >
                    <ButtonUiMv
                        onClick={copyError}
                    >
                        Copiar Erro
                    </ButtonUiMv>
                    <ButtonUiMv
                        variant={"destructive"}
                        onClick={() => setShowModalError(false)}
                    >
                        Fechar
                    </ButtonUiMv>
                </div>
            </DialogUi.Footer>
        </DialogUi.Root>
    )
}