// import { ReactNode } from "react";

interface TimelineContentProps {
    title: string,
    subTitle?: string,
    time?: string,
    descrption?: string
}

export const TimelineContent = ({ ...props}: TimelineContentProps) => {
    return (
        <li
            className='flex flex-col mb-10 ms-6 text-start gap-2 '
        >
            <span
                className='absolute flex items-center justify-center h-8 w-8 rounded-full 
                ring-4 bg-accent_light text-text_dark -start-4
                dark:bg-accent_dark dark: ring-text_dark
                '
            >
                <i className="fas fa-calendar-week fa-md"></i>
            </span>
            <h2
                className='flex items-center mb-1 text-lg font-bold'
            >
                {props.title}
            </h2>
            <h3
                className='text-start text-md font-semibold'
            >
                {props.subTitle}
            </h3>
            <time
                className='flex text-sm leading-none justify-start text-opacity-5'
            >
                {props.time}
            </time>
            <p
                className='text-secundary_dark text-opacity-60
                    dark:text-text_dark dark:text-opacity-60
                '
            >
                {props.descrption}
            </p>
        </li>
    )
}