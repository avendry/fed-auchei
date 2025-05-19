import { Card } from "@/components/ui/card";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from "@/components/ui/hover-card";
import { ButtonUiMv } from "../ButtonUiMv/ButtonUiMv";
import { LayoutDashboard } from "lucide-react";
import { useGlobalAtributeStore } from "@/shared/stores/globalAttributeStore";
import { filter } from "lodash";
import { IfDirective } from "../diretiveComponents/ifDirective/ifDirective";

export const FooterComponent = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { contextData } = useGlobalAtributeStore();

    const renderNameModule = () => {
        if(contextData.menus) {
            const nameModule = filter(contextData.menus.modules, { 'module_slug': params.module })[0];
            return nameModule?.module_name
        }

        return '';
    }

    const goToModuleDashboard = () => {
        navigate(`/dashboard/${params.module}`)
    }

    return (
        <>
            <Card.Root
                colors={"primary"}

                sizeCard={"md"}
                className="min-w-[48%] mt-2 items-center cursor-pointer"

            >
                <div
                    className="flex flex-row"
                >
                    <IfDirective condition={params.module && params.crud}>
                        <div
                            className="w-[85%]"
                        >
                            <HoverCard
                                openDelay={0}
                            >
                                <HoverCardTrigger>
                                    <ButtonUiMv
                                        // color="green"
                                        className="bg-slate-50 text-slate-700 hover:text-slate-50"
                                        onClick={goToModuleDashboard}
                                    >
                                        {renderNameModule()}
                                    </ButtonUiMv>
                                    {/* <Link
                                    className="bg-slate-50 flex h-full rounded-md items-center justify-center text-slate-700"
                                    to="/dashbaord"
                                >
                                    {renderNameModule()}
                                </Link> */}
                                </HoverCardTrigger>
                                <HoverCardContent
                                    className="w-auto"
                                >
                                    Dashboard do modulo
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <div
                            className="w-[15%]"
                        >
                            <HoverCard
                                openDelay={0}
                            >
                                <HoverCardTrigger>
                                    {/* <ButtonUiMv
                                    // color="green"
                                    className="bg-green-600"
                                    onClick={goToPrincipalModule}
                                >
                                    <LayoutDashboard size={16} />
                                </ButtonUiMv> */}
                                    <Link
                                        className="bg-primary_light h-full flex rounded-md items-center justify-center text-slate-50"
                                        to={"/dashboard"}
                                    >
                                        <LayoutDashboard size={16} />
                                    </Link>
                                </HoverCardTrigger>
                                <HoverCardContent
                                    className="w-auto"
                                >
                                    Dashboard principal
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </IfDirective>
                    <IfDirective condition={params.module && !params.crud}>
                        <div
                            className="w-[100%] h-10"
                        >
                            <HoverCard
                                openDelay={0}
                            >
                                <HoverCardTrigger>
                                    {/* <ButtonUiMv
                                    // color="green"
                                    className="bg-green-600"
                                    onClick={goToPrincipalModule}
                                >
                                    <LayoutDashboard size={16} />
                                </ButtonUiMv> */}
                                    <Link
                                        className="bg-primary_light h-full flex rounded-md items-center justify-center text-slate-50"
                                        to={"/dashboard"}
                                    >
                                        <LayoutDashboard size={16} />
                                    </Link>
                                </HoverCardTrigger>
                                <HoverCardContent
                                    className="w-auto"
                                >
                                    Dashboard principal
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </IfDirective>
                </div>
            </Card.Root>
        </>
    )
}