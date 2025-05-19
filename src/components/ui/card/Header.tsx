import clsx from "clsx";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const Header = ({ className,children }: HeaderProps) => {
    return (
        <>
            <div
                className={clsx(className)}
            >
                {children}
            </div>
        </>
    )
}