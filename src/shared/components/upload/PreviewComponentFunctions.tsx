import { IFileWithProgress } from "@/shared/interfaces/IFileWithProgress";
import { useCallback } from "react";

export const PreviewComponentFunctions = () => {

    const getOrCreateUrl = useCallback((file: IFileWithProgress): string => {
        // const filesSessionStorageKeys: Array<{ identity: string; value: string }> = sessionStorage.getItem('files-key') ? JSON.parse(sessionStorage.getItem('files-key')!) : [];
        // const existingFile = filesSessionStorageKeys.find(item => item.identity === file.ulid);
        // console.log({existingFile})
        // if (existingFile) {
        //     return existingFile.value;
        // }
        // const newFile = {
        //     identity: file.ulid,
        //     value: URL.createObjectURL(file.file)
        // }

        // filesSessionStorageKeys.push(newFile);
        // sessionStorage.setItem('files-key', JSON.stringify(filesSessionStorageKeys));

        return URL.createObjectURL(file.file);
    }, []);

    return {
        getOrCreateUrl,
    };
};
