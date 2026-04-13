import { DownloadMessage, DownloadResponse } from "../types/fetch.types";
import { buildProfileImageFilename } from "./downloadHelpers";

export const startImageDownload = (
    request: DownloadMessage,
    sendResponse: (response: DownloadResponse) => void
) => {
    chrome.downloads.download(
        {
            url: request.url,
            filename: request.filename,
            conflictAction: "uniquify",
        },
        (downloadId) => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    ok: false,
                    error: chrome.runtime.lastError.message,
                });
                return;
            }

            sendResponse({ ok: typeof downloadId === "number" });
        }
    );
};

export const downloadProfileImage = async (
    imageUrl: string,
    username: string | null
): Promise<void> => {
    const filename = buildProfileImageFilename(imageUrl, username);

    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
            {
                type: "DOWNLOAD_IMAGE",
                url: imageUrl,
                filename,
            } satisfies DownloadMessage,
            (response?: DownloadResponse) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                    return;
                }

                if (!response?.ok) {
                    reject(new Error(response?.error || "Download could not be started."));
                    return;
                }

                resolve();
            }
        );
    });
};
