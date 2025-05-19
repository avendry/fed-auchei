import { clsx } from "clsx"


interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}


export const Title = ({children, className,...props}: TitleProps) => {
    return (
        <>
            <div
                className={clsx(className)}
                {...props}
            >
                {children}
            </div>
        </>
    )
}