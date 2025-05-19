export interface IFileWithProgress {
    file: File;
    progress: number;
    status: TFileStatus;
    ulid: string;
    originalKey: string | null;
    key: string | null;
}