import { FC } from "react"

interface HeaderProps {
    children: React.ReactNode
}

export const Header: FC<HeaderProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    )
}

Header.displayName = "Header";