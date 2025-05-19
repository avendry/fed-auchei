import { FC } from "react";

interface BodyProps {
    children: React.ReactNode;
}

export const Body: FC<BodyProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

Body.displayName = "Body"