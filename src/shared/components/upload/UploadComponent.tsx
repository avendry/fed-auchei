import { IFileWithProgress } from "@/shared/interfaces/IFileWithProgress";
import { uploadFunctions } from "./uploadFunctions";
import { PreviewComponent } from "./PreviewComponent";
import { ViewImageOriginal } from "./components/viewImageOriginal/ViewImageOriginal";


interface UploadComponentProps {
    relation: string,
    fieldName: string,
    relationId: string | number
}

export const UploadComponent: React.FC<UploadComponentProps> = ({
    fieldName,
    relation,
    relationId
}) => {
    const { files, getInputProps, getRootProps, deleteFile, showImageOriginal } = uploadFunctions({
        relation: relation,
        relationId: relationId,
        tableName: fieldName
    });
    const filesWithProgress: IFileWithProgress[] = files;

    return (
        <>
            <ViewImageOriginal/>
            <div className="w-full mx-auto p-6 bg-purple-50 rounded-lg shadow-lg h-[100%]">
                <div
                    {...getRootProps()}
                    className="flex flex-col items-center justify-center p-1 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer"
                >
                    <input {...getInputProps()} />
                    <i className="fas fa-cloud-upload-alt text-purple-500 text-5xl"></i>
                    <p className="text-purple-500 font-semibold">Importe seus arquivos</p>
                    <p className="text-xs text-purple-400">Arraste ou clique para fazer upload</p>
                </div>

                <div className="mt-4 space-y-2 max-h-[65%] overflow-y-auto scrollbar-none">
                    {filesWithProgress.map((fileObj) => (
                        <div
                            key={fileObj.ulid}
                            className="flex items-center p-2 bg-white rounded-md shadow gap-2 group relative"
                        >
                            <PreviewComponent
                                fileObject={fileObj}
                                type={fileObj.file.type.split('/').pop() ?? ""}
                                explainedType={fileObj.file.type.split('/').shift() ?? ""}
                            />
                            <div className="w-[70%]">
                                <p className="text-sm font-semibold">{fileObj.file.name}</p>
                                <p className="text-xs text-gray-400">
                                    {(fileObj.file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </div>

                            <div className="w-[30%]">
                                <progress
                                    className={`w-full h-1 rounded-md shadow ${fileObj.status === 'error' ? 'bg-red-400' : 'bg-purple-400'}`}
                                    value={fileObj.progress}
                                    max="100"
                                />
                                {fileObj.status === 'uploading' && (
                                    <p className="text-red-300 text-xs font-semibold">Uploading...</p>
                                )}
                                {fileObj.status === 'done' && (
                                    <p className="text-green-500 text-xs font-semibold">100%</p>
                                )}
                                {fileObj.status === 'error' && (
                                    <p className="text-red-500 text-xs font-semibold">Erro</p>
                                )}
                            </div>

                            {/* Conteúdo visível no hover */}
                            <div className="absolute top-0 left-0 w-full h-full gap-2 flex rounded-md items-center justify-end pr-1 bg-black bg-opacity-35 opacity-0 group-hover:opacity-100 group-hover:flex">
                                <button
                                    onClick={() => showImageOriginal(fileObj.originalKey,fileObj.key)}
                                    className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-800"
                                >
                                    Ver Original
                                </button>
                                <button
                                    onClick={() => deleteFile(fileObj.ulid)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
                                >
                                    Excluir
                                </button>
                            </div>

                            {/* Botão de cancelar upload */}
                            {fileObj.status === 'uploading' && (
                                <button className="ml-2 text-purple-400 hover:text-purple-600">
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}