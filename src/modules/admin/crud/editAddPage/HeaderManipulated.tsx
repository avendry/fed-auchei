import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from "@/components/ui/hover-card";
import { ButtonUiMv } from "@/shared/components/ButtonUiMv/ButtonUiMv";
import { ChevronLeft, Plus } from "lucide-react";
import { FC } from "react";
import { MethodType } from "./utils/interfaces/IEditAddPage";
import { CaseDirective, SwitchDiretctive } from "@/shared/components/diretiveComponents/switchDirective/SwitchComponent";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "@/shared/stores/useNotificationStore";
import { IfDirective } from "@/shared/components/diretiveComponents/ifDirective/ifDirective";

interface HeaderManipulatedProps {
    crud: string | undefined;
    id: string | undefined,
    method: MethodType | undefined,
    singularNameView: string,
    module: string | undefined

}

export const HeaderManipulated: FC<HeaderManipulatedProps> = (
    {
        crud,
        id,
        method,
        singularNameView,
        module
    }
) => {
    const navigate = useNavigate();
    const { notify } = useNotificationStore();

    const goBackListPage = () => {
        if (module && crud) {
            navigate(`/dashboard/${module}/${crud}`)
        } else {
            notify.error("Não é possivel voltar para uma pagina sem Crud e Module!")
        }
    }


    const goToNewRegister = () => {
        navigate(`/dashboard/${module}/${crud}/add`)
    }

    return (
        <>
            <div
                className="grid grid-cols-2 justify-between p-3 bg-white rounded-sm border items-center"
            >
                <div
                    className="flex justify-start"
                >
                    <p>
                        <SwitchDiretctive condition={method}>
                            <CaseDirective value={"add"}>
                                <>
                                    Gravando novo Registro
                                </>
                            </CaseDirective>
                            <CaseDirective value={"edit"}>
                                <>
                                    Editando registro <span className="font-medium"># {id}</span>
                                </>
                            </CaseDirective>
                            <CaseDirective value={"view"}>
                                <>
                                    Visualizando o Registro <span className="font-medium"># {id}</span>
                                </>
                            </CaseDirective>
                        </SwitchDiretctive>
                    </p>
                </div>
                <div
                    className="flex justify-end flex-row "
                >
                    <div
                        className="flex flex-row gap-2"
                    >
                        <IfDirective condition={method !== "add"}>
                            <HoverCard
                                openDelay={0}
                            >
                                <HoverCardTrigger>
                                    <ButtonUiMv
                                        // color="green"
                                        className="w-10 bg-green-600"
                                        onClick={goToNewRegister}
                                    >
                                        <Plus size={16} />
                                    </ButtonUiMv>
                                </HoverCardTrigger>
                                <HoverCardContent
                                    className="w-auto"
                                >
                                    Adicionar Novo {singularNameView}
                                </HoverCardContent>
                            </HoverCard>
                        </IfDirective>

                        <HoverCard
                            openDelay={0}
                        >
                            <HoverCardTrigger>
                                <ButtonUiMv
                                    // color="green"
                                    className="w-10 bg-accent_light"
                                    onClick={goBackListPage}
                                >
                                    <ChevronLeft size={16} />
                                </ButtonUiMv>
                            </HoverCardTrigger>
                            <HoverCardContent
                                className="w-auto"
                            >
                                Voltar para Listagem
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
            </div>
        </>
    )
}