import { ComponentProps } from "react"



interface InputSearchProps extends ComponentProps<'input'> {

}



export const InputSearch = (
    {
        ...props
    }: InputSearchProps
) => {
    return (
        <>
            {/* <div
                className="flex"
            >
                <div
                    className="flex flex-row"
                >

                    <input
                        className="h-10 p-2
                            focus:outline-accent_light/40
                            rounded-md
                            border flex-grow
                            "
                        {...props}
                    />

                    <button
                        className="w-[25%] bg-gray-200 rounded-e-md"
                    >
                        Search
                    </button>
                </div>
            </div> */}
            <div className="flex flex-row">
                <input
                    className="h-10 p-2 flex-grow focus:outline-accent_light/40 rounded-md border w-[100%]"
                    {...props}
                />
                <button
                    className="bg-gray-200 rounded-e-md px-4"
                >
                    Search
                </button>
            </div>
        </>
    )
}