import { ButtonUiMv } from "@/shared/components/ButtonUiMv/ButtonUiMv";
import { FC } from "react";
import { ContractRenderFooterFunctions } from "./ContractRenderFooterFunctions";
import { IRenderFooterProps } from "../interface/IRenderFooterProps";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const ContractRenderFooter: FC<IRenderFooterProps> = (
    {
        parentValues
    }
) => {
    const { printContract, nextSituation, previousSituation, loading, warningText } = ContractRenderFooterFunctions({
        parentValues
    });


    return (
        <>
            <div
                className="flex flex-row gap-2"
            >

                <ButtonUiMv
                    variant="default"
                    onClick={printContract}
                    loading={loading}
                >
                    Imprimir contrato
                </ButtonUiMv>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <ButtonUiMv
                            loading={loading}
                            variant="default"
                        >
                            Retroceder situação
                        </ButtonUiMv>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza dessa ação?</AlertDialogTitle>
                            <AlertDialogDescription>
                                {warningText}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={previousSituation}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <ButtonUiMv
                            loading={loading}
                            variant="default"
                        >
                            Retroceder situação
                        </ButtonUiMv>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza dessa ação?</AlertDialogTitle>
                            <AlertDialogDescription>
                                {warningText}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={nextSituation}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div >
        </>
    )
}