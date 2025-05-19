import { ReactNode } from "react"

interface TimelineProps {
    children: ReactNode
}

export const Root = ({children}: TimelineProps) => {

    return (
        <ol
            className='flex flex-col relative border-s border-s-accent_light
            dark:border-s-text_dark dark:text-text_dark pl-2
        '
        >
            {children}
        </ol>
    )
}