import { startImageDownload } from "./src/lib/download";
import { RuntimeMessage, RuntimeResponse } from "./src/types/fetch.types";

chrome.runtime.onMessage.addListener((
    request: RuntimeMessage,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: RuntimeResponse) => void
) => {
    if (request.type === "FETCH_1080P") {
        const fetchHighRes = async () => {
            try {
                const cookies = await chrome.cookies.getAll({ domain: "instagram.com" });
                const sessionId = cookies.find((cookie) => cookie.name === "sessionid")?.value;
                const dsUserId = cookies.find((cookie) => cookie.name === "ds_user_id")?.value;

                if (!sessionId || !dsUserId) {
                    console.error("Could not find Instagram auth cookies.");
                    return null;
                }

                const payload = JSON.stringify({ ds_user_id: dsUserId, sessionid: sessionId });
                const authHeader = `Bearer IGT:2:${btoa(payload)}`;

                const response = await fetch(`https://i.instagram.com/api/v1/users/${request.userId}/info/`, {
                    headers: {
                        "User-Agent": "Instagram 219.0.0.12.117 Android",
                        "X-IG-App-ID": "350685531728",
                        "Authorization": authHeader,
                        "Accept": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Mobile API request failed");
                }

                const data = await response.json();
                const original1080p = data.user?.hd_profile_pic_url_info?.url;
                if (original1080p) {
                    return original1080p as string;
                }

                const versions = data.user?.hd_profile_pic_versions;
                if (versions && versions.length > 0) {
                    const largestVersion = versions.sort(
                        (leftVersion: { width: number }, rightVersion: { width: number }) => rightVersion.width - leftVersion.width
                    )[0];
                    return largestVersion.url as string;
                }

                return null;
            } catch (error) {
                console.error("Error fetching 1080p from background:", error);
                return null;
            }
        };

        fetchHighRes().then((url) => sendResponse({ url }));

        return true;
    }

    if (request.type === "DOWNLOAD_IMAGE") {
        startImageDownload(request, sendResponse);
        return true;
    }

    return false;
});
