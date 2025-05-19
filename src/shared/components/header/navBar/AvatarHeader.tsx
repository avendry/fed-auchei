import React, { FC, ReactNode } from "react"
import clsx from "clsx";


type AvatarHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
}


export const AvatarHeader: FC<AvatarHeaderProps> = ({children,...props}) => {
    

    return (
        <div
            className={clsx('',props.className)}
        >
            {children}
        </div>
    )
}

AvatarHeader.displayName = "AvatarHeader"