import { IFileWithProgress } from "@/shared/interfaces/IFileWithProgress"
import { PdfSvgComponent } from "./util/PdfSvgComponent"
import { FileSvgComponent } from "./util/FileSvgComponent"
import { WordSvgComponent } from "./util/WordSvgComponent"
import { memo } from "react"
import { PreviewComponentFunctions } from "./PreviewComponentFunctions"


interface PreviewComponentProps {
    type: string,
    explainedType: string,
    fileObject: IFileWithProgress
}



const PreviewComponentBase = ({
    type,
    fileObject,
    explainedType
}: PreviewComponentProps) => {
    const { getOrCreateUrl } = PreviewComponentFunctions();

    const renderDocuments = () => {
        switch (type) {
            case "pdf": {
                return (
                    <PdfSvgComponent />
                )
            }

            case "msword": {
                return <WordSvgComponent />
            }
        }

        return <FileSvgComponent />
    }

    const renderImages = () => {
        const url = getOrCreateUrl(fileObject);
        return (
            <img
                src={url}
                alt={fileObject.file.name}
                className="w-12 h-12 rounded-md mr-2 object-cover"
                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)} // Evita vazamento de memória
            />
        )
    }

    return (
        <>
            {explainedType == "image" && (
                <>
                    {renderImages()}
                </>
            )}
            {(explainedType === 'application' || explainedType === "text") && (
                <div className="w-12 h-12 rounded-md mr-2 flex justify-center items-center ">
                    {renderDocuments()}
                </div>
            )}
        </>
    )
}

export const PreviewComponent = memo(PreviewComponentBase, (prevProps, nextProps) => {
    // Compara se `fileObject` mudou
    return (
        prevProps.fileObject.file === nextProps.fileObject.file &&
        prevProps.fileObject.progress === nextProps.fileObject.progress &&
        prevProps.type === nextProps.type &&
        prevProps.explainedType === nextProps.explainedType
    );
});