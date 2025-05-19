

interface Props {
    label: string
}

export const ErrorPopover = ({
    label
}: Props) => {
    return (
        <div
            className=""
        >
            <span className="font-semibold text-red-800/30 text-sm"><label htmlFor="">{label}</label></span>
        </div>
    )
}