import { ButtonHTMLAttributes, useEffect, useState } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    width?: string,
    heigth?: string,
    // variant?: string
    variant: 'primary' | 'secundary' | 'yellow'
    hrefButton?: string
}

export const Button: React.FC<ButtonProps> = ({ children, hrefButton = '', variant, ...props }) => {
    const [colors, setColors] = useState(
        {
            text_color: 'text-background_light',
            bg_color: 'bg-accent_light'
        }
    )

    const choseColor = (color: string) => {
        if (color === 'primary') {
            setColors(
                {
                    bg_color: 'bg-primary_light',
                    text_color: 'text-background_light'
                }
            )
        }
        if (color === 'secundary') {
            setColors(
                {
                    bg_color: 'bg-secundary_light',
                    text_color: 'text-text_light'
                }
            )
        }
        if (color === 'yellow') {
            setColors(
                {
                    bg_color: 'bg-background_yellow',
                    text_color: 'text-text_light'
                }
            )
        }
    }
    useEffect(() => {
        choseColor(variant)
    }, [])
    return (
        <div className=''>
            {hrefButton ? (
                <a href={hrefButton}>
                    <button
                        {...props}
                        className={`
                        max-w-screen-md max-h-screen ${colors.bg_color} ${colors.text_color} rounded-md
                        dark:bg-primary_dark dark:text-background_light
                        flex
                        items-center
                        justify-center
                        container mx-auto
                        p-2
                        drop-shadow-md
                    `}
                    >
                        {children}
                    </button>
                </a>
            ) : (
                <button
                    {...props}
                    className={`
                        max-w-screen-md max-h-screen ${colors.bg_color} ${colors.text_color} rounded-md
                        dark:bg-primary_dark dark:text-background_light
                        flex
                        items-center
                        justify-center
                        container mx-auto
                        p-2
                        drop-shadow-md
                    `}
                >
                    {children}
                </button>
            )}
        </div>
    )
}