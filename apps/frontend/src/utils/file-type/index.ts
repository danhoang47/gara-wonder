export enum FileType {
    CSV = "csv",
}

export const getFileType = (fileType: string) => {
    const splitType = fileType.split("/");
    const type = splitType[splitType.length - 1];
    return type;
};
