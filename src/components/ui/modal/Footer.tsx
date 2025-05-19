import { FC } from "react";

interface FooterProps {
    children: React.ReactNode;
}

export const Footer: FC<FooterProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    )
}

Footer.displayName = "Footer"