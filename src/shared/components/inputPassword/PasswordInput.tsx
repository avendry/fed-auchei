import { Pencil, PencilOff } from "lucide-react";
import { useEffect, useState } from "react";

type InputProps = {
    initialValue?: string | null | undefined;
    label?: string;
    isLabel?: boolean;
    onBlur: (value: string) => void;
    placeholder?: string
}


export const PasswordInput = (
    {
        label = 'Ops... falta a label',
        isLabel = false,
        placeholder,
        initialValue,
        onBlur
    }: InputProps
) => {

    const [value, setValue] = useState("");
    const [unlock, setUnlock] = useState(false);


    useEffect(() => {
        if (initialValue) {
            setValue(initialValue)
        }
    }, [])

    const onBlurFunction = () => {
        onBlur(value);
    }

    return (
        <div
            className="flex flex-col gap-1"
        >
            <label>
                {isLabel && label && (
                    <>
                        {label}
                    </>
                )}
            </label>
            <div
                className="flex flex-row justify-center items-center"
            >
                <input
                    type={unlock ? "text" : "password"}
                    className="h-10 p-2 w-full
                        focus:outline-accent_light/20
                        rounded-s-md
                        border
                        border-gray-200
                    "
                    value={value}
                    placeholder={placeholder}
                    onChange={(event) => setValue(event.target.value)}
                    onBlur={onBlurFunction}
                />
                <button
                    className="border h-10 w-10 flex justify-center items-center rounded-e-md"
                    onClick={() => setUnlock(!unlock)} 
                >
                    {!unlock ? (
                        <>
                            <PencilOff size={18} className="text-slate-400/80 cursor-pointer"
                            />
                        </>
                    ) : (
                        <>
                            <Pencil size={18} className="text-slate-400/80 cursor-pointer"
                            />
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}