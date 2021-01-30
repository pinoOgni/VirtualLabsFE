/**
 * This class is used to upload a file
 */
export declare class InputFile {
    private _fileNames;
    private _files;
    private delimiter;



    constructor(_files: InputFile[] | null, delimiter?: string);

    get files(): File[];
    get fileNames(): string;

}
