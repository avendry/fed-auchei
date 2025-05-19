import { IFileWithProgress } from "@/shared/interfaces/IFileWithProgress";
import { useCallback, useEffect, useState } from "react"
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import Axios from "@/shared/utils/Axios";
import { ulid } from "ulid";
import { UploadFunctionsDto } from "@/shared/dtos/UploadFunctionsDto";
import { AxiosResponse } from "axios";
import { ViewImageOriginalStore } from "../stores/ViewImageOriginalStore";

export const uploadFunctions = (uploadFunctions: UploadFunctionsDto) => {
    const { relation, relationId, tableName } = uploadFunctions;
    const [files, setFiles] = useState<IFileWithProgress[]>([]);
    const { setViewImageData,setShowModal} = ViewImageOriginalStore();



    useEffect(() => {
        if (relationId) {
            getFilesResized();
        }
    }, [relationId])


    const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[], _event: DropEvent) => {
        if(fileRejections.length > 0) {
            console.warn('Arquivos rejeitados:', fileRejections);
        }
        const newFiles = acceptedFiles.map((file) => ({
            file,
            progress: 0,
            status: 'uploading' as TFileStatus,
            ulid: ulid(),
            key: file.name,
            originalKey: ''
        }));
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        uploadFiles(newFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const uploadFiles = (filesToUpload: IFileWithProgress[]) => {
        filesToUpload.forEach((fileObj) => {
            const formData = new FormData();
            formData.append('file', fileObj.file);

            Axios.post(`/api/v1/file/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    ulid: fileObj.ulid,
                    table: tableName,
                    relation: relation,
                    relationId: relationId
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 0) - 10);
                    uploadFileProgress(fileObj.ulid, progress);
                }
            })
                .then(() => {
                    updateFileStatus(fileObj.ulid, 'done');
                })
                .catch(() => {
                    updateFileStatus(fileObj.ulid, 'error');
                })
        })
    }

    const uploadFileProgress = useCallback((fileUlid: string, progress: number) => {
        setFiles((prevFiles) => {
            const index = prevFiles.findIndex((file) => file.ulid === fileUlid);
            if (index === -1) return prevFiles;
            const updatedFile = { ...prevFiles[index], progress, status: 'uploading' as TFileStatus };
            return [...prevFiles.slice(0, index), updatedFile, ...prevFiles.slice(index + 1)];
        });
    }, []);

    const updateFileStatus = useCallback((fileUlid: string, status: TFileStatus) => {
        const progressUpdate = status === 'done' ? 100 : 0;
        setFiles((prevFiles) => {
            const newFiles = prevFiles.map((file) =>
                file.ulid === fileUlid ? { ...file, status, progress: progressUpdate } : file

            );
            return newFiles;
        });
    },[]);

    const deleteFile = useCallback((fileUlid: string) => {
        Axios.delete('/api/v1/file/delete', {
            params: {
                table: tableName,
                id: fileUlid
            }
        })
            .then(() => {
                setFiles((prevFiles) => prevFiles.filter((file) => file.ulid !== fileUlid));
            })
    },[]);

    const getFilesResized = () => {
        Axios.get(`/api/v1/file/list-resized`, {
            params: {
                table: tableName,
                relationId,
                currentPage: 1,
                perPage: 50
            }
        })
            .then((res: AxiosResponse<
                {
                    message: string,
                    totalFiles: number,
                    nextPage: number,
                    items: {
                        key: string,
                        content: string,
                        contentType: string,
                        id: number,
                        originalKey: string
                    }[]
                }>) => {
                if (res.data.items) {
                    const resizedFiles = res.data.items.map((item) => {
                        return {
                            file: base64ToFile(item.content, item.key, item.contentType),
                            progress: 100,
                            status: 'done' as TFileStatus,
                            originalKey: item.originalKey,
                            key: item.key,
                            ulid: item.id.toString(),
                        };
                    });
                    setFiles((prevFiles) => {
                        const updatedFiles = [...prevFiles];
                        resizedFiles.forEach((newFile) => {
                            const index = updatedFiles.findIndex((file) => file.ulid === newFile.ulid);
                            if (index > -1) {
                                updatedFiles[index] = { ...updatedFiles[index], ...newFile };
                            } else {
                                updatedFiles.push(newFile);
                            }
                        });
                        return updatedFiles;
                    });
                }
            })
    }

    const base64ToFile = (base64Data: string, fileName: string, mimeType: string) => {
        const byteArray = Uint8Array.from(atob(base64Data.split(',')[1]), char => char.charCodeAt(0));
        return new File([byteArray], fileName, { type: mimeType });
    };

    const showImageOriginal = useCallback((keyPath: string | null, titleKey: string | null) => {
        console.log({keyPath},{titleKey})
        if(keyPath && titleKey) {
            setViewImageData({keyImage: keyPath, title: titleKey})
            setShowModal(true)
        }
    },[setShowModal,setViewImageData]);

    return {
        files,
        getRootProps,
        getInputProps,
        deleteFile,
        showImageOriginal
    }
}