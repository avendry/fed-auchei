import {  useEffect, useState } from "react"

type InputProps = {
    initialValue?: string | null | undefined;
    label?: string;
    isLabel?: boolean;
    onBlur: (value: string) => void;
    placeholder?: string
    readonly?: boolean;
    type?: string,
    maskPatterns?: string[]
}


export const Input = (
    {
        label = 'Ops... falta a label',
        isLabel = false,
        placeholder,
        type,
        initialValue,
        readonly,
        onBlur,
        maskPatterns
    }: InputProps
) => {

    const [value, setValue] = useState("");




    useEffect(() => {
        if (initialValue) {
            setValue(initialValue)
        }
    }, [])

    const applyMask = (input: string): string => {
        // Remove caracteres não alfanuméricos
        const alphanumericValue = input.replace(/[^a-zA-Z0-9]/g, '');
        let maskedValue = "";

        // Escolhe a máscara com base no comprimento do valor alfanumérico
        let mask = "";

        // Filtra as máscaras válidas com base na quantidade de números
        if(maskPatterns) { 
            const validMasks = maskPatterns.filter(mask => {
                const requiredDigits = mask.replace(/[^9]/g, '').length;
                return alphanumericValue.length <= requiredDigits;
            });
    
            // Se houver máscaras válidas, escolha a primeira
            if (validMasks.length > 0) {
                mask = validMasks[0];
            }
    
            // Aplica a máscara se estiver definida
            if (mask) {
                let numIndex = 0;
                for (let i = 0; i < mask.length; i++) {
                    if (mask[i] === '9') {
                        if (numIndex < alphanumericValue.length) {
                            maskedValue += alphanumericValue[numIndex];
                            numIndex++;
                        }
                    } else {
                        maskedValue += mask[i];
                    }
                }
            }
            return maskedValue;
        }

        return input;
    };

    const cleanValues = (value: string): string => {
        if (type && ['email'].includes(type)) {
            return value;
        }
        const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, '');
        return alphanumericValue;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dirtyValue = event.target.value;
        const valueWhitMaskOrNot = maskPatterns && maskPatterns.length > 0 ? applyMask(dirtyValue) : dirtyValue;
        setValue(valueWhitMaskOrNot);
    };

    const onBlurFunction = () => {
        const resultCleanValue = maskPatterns && maskPatterns.length > 0 ? cleanValues(value) : value;
        onBlur(resultCleanValue);
    }

    return (
        <div
            className="flex flex-col"
        >
            <label>
                {isLabel && label && (
                    <>
                        {label}
                    </>
                )}
            </label>
            <input
                className="h-10 p-2 w-full
                focus:outline-accent_light/20
                rounded-md
                border
                border-gray-200
                "
                disabled={readonly ?? false}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={onBlurFunction}
            />
        </div>
    )
}