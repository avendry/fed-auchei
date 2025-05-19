import { MenuAndModulesProps } from "./interfaces"
import { Card } from "../../../components/ui/card"
import { useNavigate } from "react-router-dom"
import { ModulesDto } from "@/shared/dtos/ModulesDto"
import { LayoutDashboard } from "lucide-react"


interface ModulesRenderProps extends MenuAndModulesProps {
    data: ModulesDto[]
}

export const ModulesRender = (params: ModulesRenderProps) => {
    const navigate = useNavigate();


    const onSelectedModuleDashboard = (module: string) => {
        if(module) {
            navigate(module)
        }
    }


    return (
        <>
            <div
                className="bg-primary_light py-5 px-2 rounded-lg drop-shadow-md w-full"
            >
                <h2
                    className="text-sm font-semibold text-white flex flex- gap-1 items-center"
                >
                    Modulos  <LayoutDashboard size={16} />
                </h2>
                <div
                    className="flex flex-row justify-between flex-wrap "
                >
                    {params.data.map((object: ModulesDto) => {
                        return (
                            <Card.Root
                                colors={"primary"}
                                key={object.module_slug}
                                sizeCard={"md"}
                                className="min-w-[48%] max-w-[48%] mt-2 items-center cursor-pointer"
                                onClick={() => onSelectedModuleDashboard(object.module_slug)}
                            >
                                {object.module_name}
                            </Card.Root>
                        )
                    })}
                </div>
            </div>
        </>
    )
}