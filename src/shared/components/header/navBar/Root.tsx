import React from "react"
import { ReactNode } from "react";
import { useIncreaseSideNav } from "../../stores/IncreaseSidenav";
import { PanelRightClose, PanelRightOpen } from "lucide-react";


interface RootProps {
    children: ReactNode;

}


export const Root = ({ ...props }: RootProps) => {
    let avatarContent;
    const itemContent: ReactNode[] = [];
    const { increaseSideNav, sideNav } = useIncreaseSideNav();

    React.Children.forEach(props.children, (child) => {
        if (React.isValidElement(child)) {
            const componentType = child.type as React.JSXElementConstructor<any> & { displayName?: string };
            if (typeof child.type === 'function') {
                if (componentType.displayName === 'Item') {
                    itemContent.push(child)
                }
                if (componentType.displayName === 'AvatarHeader') {
                    avatarContent = child;
                }
            }
        }
    });



    const openAndCLoseSideNav = () => {
        increaseSideNav();
    }

    return (
        <div
            className="h-[100%] bg-white drop-shadow-md rounded-b-lg flex items-center  justify-between px-5
            "
        >
            <div
                className="cursor-pointer"
                onClick={() => openAndCLoseSideNav()}
            >
                {!sideNav ? (
                    <PanelRightClose />
                ) : (
                    <PanelRightOpen />
                )}
            </div>
            {itemContent}
            {/* {itemContent} */}
            {avatarContent}
        </div>

    )
}