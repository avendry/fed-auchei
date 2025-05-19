import { DatePickerFunctionsDto } from "@/shared/dtos/DatePickerFunctionsDto";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export const DatePickerFunctions = (datePickerFunctionsDto: DatePickerFunctionsDto) => {
    const { onBlur, initialValue } = datePickerFunctionsDto;
    const [dateValue, setDateValue] = useState<Date>();

    useEffect(() => {
        if (initialValue) {
            const isoString = initialValue;
            const dateObject = new Date(isoString);
            setDateValue(dateObject)
        }
    }, [])

    const setDate = (value: Date | undefined) => {
        setDateValue(value);
        if (value) {
            const formattedDate = format(value, "yyyy-MM-dd HH:mm:ss.SSS xx"); // Formato desejado
            onBlur(formattedDate)
        }
    }

    return {
        dateValue,
        setDate
    }
}