import { FC, ReactNode } from "react"

interface ItemProps {
    children: ReactNode
}


export const Item: FC<ItemProps> = ({children}) => {


    return (
        <>
            {children}
        </>
    )
}

Item.displayName = "Item"