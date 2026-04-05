interface FetchMessage {
    type: "FETCH_1080P";
    userId: string;
}

interface DownloadMessage {
    type: "DOWNLOAD_IMAGE";
    url: string;
    filename: string;
}

interface FetchResponse {
    url: string | null;
}

interface DownloadResponse {
    ok: boolean;
    error?: string;
}

type RuntimeMessage = FetchMessage | DownloadMessage;
type RuntimeResponse = FetchResponse | DownloadResponse;