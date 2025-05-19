import { Textarea } from "@/components/ui/textarea"
import IRichTextBox from "@/shared/interfaces/IRichTextBox"
import React, { useState } from "react"




export const RichTextBox: React.FC<IRichTextBox> = (
    {
        placeholder,
        onBlur
    }
) => {
    // useState
    const [value, setValue] = useState("")


    const onBlurFunction = () => {
        console.log({value})
        onBlur(value);
    }

    return (
        <>
            <Textarea
                onChange={(event) => setValue(event.target.value)}
                onBlur={onBlurFunction}
                placeholder={placeholder}
            />
        </>
    )
}