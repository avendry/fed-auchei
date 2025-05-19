import { useEffect, useState } from "react";

type SwitchProps = {
    onClick?: ({ value }: { value: boolean }) => void
    value?: boolean,
    initialValue: boolean
}

export const Switch = ({ value = false, initialValue,...props }: SwitchProps) => {
    const [isChecked, setIsChecked] = useState(false);



    useEffect(() => {
        if(initialValue) {
            setIsChecked(initialValue)
        }
    },[])

    const toggleSwitch = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        if (props.onClick) {
            props?.onClick({
                value: !isChecked
            })
        }
    };

    return (
        <label htmlFor="toggle" className={`relative flex cursor-pointer ${isChecked ? 'bg-primary_dark' : 'bg-text_dark w-12'}  w-12 h-6 rounded-full items-center px-1`}>
            <input
                type='checkbox'
                className='sr-only absolute'
                checked={isChecked}
                onChange={toggleSwitch}
            ></input>
            <span className={`w-5 h-5 bg-background_light absolute rounded-full duration-300 transition-all ${isChecked ? 'right-1' : ''}`}
                onClick={() => toggleSwitch()}
            >
            </span>
        </label>
    )
}