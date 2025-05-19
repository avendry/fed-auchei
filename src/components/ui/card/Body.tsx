import clsx from "clsx"

interface BodyProps {
    children: React.ReactNode,
    className?: string
}

export const Body = (params: BodyProps) => {
    return (
        <>
            <div
                className={clsx(params.className)}
            >
                {params.children}
            </div>
        </>
    )
}