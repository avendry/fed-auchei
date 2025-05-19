interface CardProps {
    title:string,
    time:string,
    description:string,
    id: string,
    src: string,
    href?: string,
    tagList?: Array<string>
}


export const Card = ({tagList = [],...props}: CardProps) => {


    return (
        <>
            <a href={props.href} target="_blank">
                <div
                    id={props.id}
                    className="flex flex-col min-h-96 max-w-[27rem] overflow-hidden cursor-pointer
                        rounded-lg bg-white border-2 border-accent_light/20
                        dark:bg-secundary_dark dark:text-text_dark dark:shadow-primary_dark dark:shadow-md
                        "
                >
                    <img
                        className='object-cover h-32 rounded-t-lg'
                        src={props.src}
                    />
                    <div
                        className='flex flex-col p-6 h-full justify-between'
                    >
                        <div
                            className=''
                        >
                            <div>
                                <h3
                                    className='font-semibold text-lg'
                                >{props.title}</h3>
                                <time
                                    className='opacity-75'
                                >{props.time}</time>
                            </div>
                        </div>
                        <p
                            className='text-sm'
                        >
                            {props.description}
                        </p>
                        <div
                            className="flex flex-wrap gap-4"
                        >
                            {tagList?.length > 0 && (
                                tagList?.map((value: any,index: any) => {
                                    return (
                                        <span 
                                        id={index}
                                        className="bg-accent_light text-text_dark dark:bg-blue-900 dark:text-blue-300 font-medium px-2 py-0.5 
                                        text-xs rounded whitespace-nowrap me-0"
                                        >
                                            {value}
                                        </span>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
            </a>

        </>
    )
}