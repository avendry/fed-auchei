export const SpinnerUiMv = () => {

    return (
        <>
            <div className="flex flex-row gap-2 " role="status">
                <div
                    className="
                        max-h-10
                        max-w-10
                        min-h-6
                        min-w-6
                        border
                        border-l-blue-50
                        border-r-blue-100
                        border-b-blue-200
                        border-t-blue-300
                        animate-spin
                        ease-linear
                        rounded-full
                    "
                />
                {/* <span className="visually-hidden"></span> */}
            </div>
        </>
    )
}