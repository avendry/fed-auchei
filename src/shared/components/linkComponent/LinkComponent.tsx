import { AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
}

export const LinkComponent = ({children, className,...props}: LinkProps) => {


    return (
        <div
            className="flex cursor-pointer"
        >
            <a
                {...props}
                className={clsx('text-blue-500', className)}
            >
                {children}
            </a>
        </div>
    )
}