// import { DivHtml}

import React, {HtmlHTMLAttributes} from "react"

interface BoxProps extends HtmlHTMLAttributes<HTMLDivElement> {
    hrefButton?: string
}

export const Box: React.FC<BoxProps> = ({children, hrefButton,...props}) => {


    return (
        <a href={hrefButton} target="_blank">
            <div
                {...props}
                className='w-20 h-20 bg-accent_light rounded-lg cursor-pointer flex items-center justify-center text-background_light
                    hover:border-2 hover:border-white
                    dark:bg-accent_dark/80
                '
            >
                {children}
            </div>
        </a>
    )
}