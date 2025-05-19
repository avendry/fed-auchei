import { useEffect, useState } from "react"
import { IAxiosSelectPicker } from "../../interfaces/IAxiosSelectPicker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Axios from "@/shared/utils/Axios";
import { GetOptionsSelectHttp } from "./functions/getOptionsSelectHttp";

export const AxiosSelectPicker: React.FC<IAxiosSelectPicker> = (
    {
        options,
        valueSelected,
        onSelect,
        api,
        fieldNameSchema,
        initalValueId,
        readonly
    }
) => {
    // useStates
    const [value, setValue] = useState<string>("0");
    const [optionsInter, setOptionsInter] = useState<Array<{ value: string, label: string, state?: Record<string, any> }>>([]);
    const axiosGet = Axios;
    const getOptionsSelectHttpImpl = GetOptionsSelectHttp(
        setOptionsInter,
        setValue,
        axiosGet
    );

    // useEffects
    useEffect(() => {
        initializeSelectValue()
    }, [])


    //  const functions
    const initializeSelectValue = () => {
        if (options !== null) {
            if (options.length > 0 && valueSelected) {
                setValue(value);
                setOptionsInter(options)
            }
        } else {
            if (api) {
                getOptionsSelectHttpImpl.execute({ api: api, fieldName: fieldNameSchema, id: initalValueId })
            }
        }
    }

    const handleChange = (eventValue: string) => {
        const selectedOption = optionsInter.find(option => option.value === eventValue);
        if (selectedOption) {
            setValue(eventValue);
            if (onSelect) {
                onSelect(selectedOption)
            }
        }
    }

    return (
        <>
            <Select
                onValueChange={handleChange}
                value={value}
                disabled={readonly}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent
                    className="cursor-pointer"
                >
                    {optionsInter && optionsInter.length > 0 && (
                        <>
                            {optionsInter.map((option: { value: string, label: string }) => (
                                <SelectItem
                                    className="cursor-pointer"
                                    key={option.label}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </>
                    )}
                </SelectContent>
            </Select>
        </>
    )
}