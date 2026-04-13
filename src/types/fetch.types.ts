export interface FetchMessage {
    type: "FETCH_1080P";
    userId: string;
}

export interface DownloadMessage {
    type: "DOWNLOAD_IMAGE";
    url: string;
    filename: string;
}

export interface FetchResponse {
    url: string | null;
}

export interface DownloadResponse {
    ok: boolean;
    error?: string;
}

export type RuntimeMessage = FetchMessage | DownloadMessage;
export type RuntimeResponse = FetchResponse | DownloadResponse;
