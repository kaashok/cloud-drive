export interface RepositoryDto {
    id: number,
    name: string;
    full_name: string;
    updated_at: string;
    owner: RepositoryOwnerDto;
}

export interface RepositoryOwnerDto {
    login: string;
}

export interface RepositoryContentDto {
    /**
     * Name of the file or folder
     */
    name: string;
    /**
     * Path of the file or folder
     */
    path: string;
    /**
     * File or Folder(Directory)
     */
    type: RepositoryContentType;
    /**
     * HTML URL of the file or folder
     */
    html_url: string;
    /**
     * GITHUB URL of the file or folder
     */
    git_url: string;
    /**
     * DOWNLOAD URL of the file or folder
     */
    download_url: string;
    /**
     * Base 64 Content
     */
    content?: string;
    /**
     * File Type
     */
    fileType?: string;
    /**
     * Base 64 Content
     */
    base64Content?:string;
}

export enum RepositoryContentType {
    File = "file",
    Folder = "dir"
}
