import { ButtonUiMv } from "@/shared/components/ButtonUiMv/ButtonUiMv"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@radix-ui/react-hover-card"
import { ChevronLeft } from "lucide-react"

export const HeaderProfile = () => {
    return (
        <>
            <div
                className="grid grid-cols-2 justify-between p-3 bg-white rounded-sm border items-center"
            >
                <div
                    className="flex justify-start"
                >
                    <p>
                        Editando Perfil
                    </p>
                </div>
                <div
                    className="flex justify-end flex-row "
                >
                    <div
                        className="flex flex-row gap-2"
                    >
                        <HoverCard
                            openDelay={0}
                        >
                            <HoverCardTrigger>
                                <ButtonUiMv
                                    // color="green"
                                    className="w-10 bg-accent_light"
                                    // onClick={goBackListPage}
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