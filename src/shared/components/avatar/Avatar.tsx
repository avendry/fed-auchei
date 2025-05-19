import clsx from "clsx";

type TAvatar = {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg';
    circle?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export const Avatar = (
    {
        size = 'sm',
        children,
        ...props
    }: TAvatar
) => {
    const sizeValue = size === 'sm' ? 14 : size === 'md' ? 20 : 30;
    const classSet: string = clsx(`w-${sizeValue} h-${sizeValue} circle ${props.circle ? 'rounded-full' : 'rounded-md'} 
        border-2 border-primary_light drop-shadow-md
        dark:border-accent_dark
    `);

    return (
        <>
            {children ? (
                <>
                    <div
                        className={clsx(classSet,'items-center justify-center flex',props.className)}
                    >
                        {children}
                    </div>
                </>
            ) : (
                <>
                    <img
                        className={classSet}
                        src={props.src}
                    />
                </>

            )}

        </>
    )
}