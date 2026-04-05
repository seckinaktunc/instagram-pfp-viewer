interface FetchMessage {
    type: string;
    userId: string;
}

interface FetchResponse {
    url: string | null;
}

chrome.runtime.onMessage.addListener((
    request: FetchMessage,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: FetchResponse) => void
) => {
    if (request.type === 'FETCH_1080P') {
        const fetchHighRes = async () => {
            try {
                const cookies = await chrome.cookies.getAll({ domain: "instagram.com" });
                const sessionId = cookies.find(c => c.name === 'sessionid')?.value;
                const dsUserId = cookies.find(c => c.name === 'ds_user_id')?.value;

                if (!sessionId || !dsUserId) {
                    console.error("Could not find IG auth cookies.");
                    return null;
                }

                const payload = JSON.stringify({ ds_user_id: dsUserId, sessionid: sessionId });
                const authHeader = `Bearer IGT:2:${btoa(payload)}`;

                const res = await fetch(`https://i.instagram.com/api/v1/users/${request.userId}/info/`, {
                    headers: {
                        'User-Agent': 'Instagram 219.0.0.12.117 Android',
                        'X-IG-App-ID': '350685531728',
                        'Authorization': authHeader,
                        'Accept': 'application/json',
                    }
                });

                if (!res.ok) throw new Error('Mobile API request failed');

                const data = await res.json();

                // 1080p
                const original1080p = data.user?.hd_profile_pic_url_info?.url;
                if (original1080p) {
                    return original1080p as string;
                }

                // Fallback
                const versions = data.user?.hd_profile_pic_versions;
                if (versions && versions.length > 0) {
                    const largest = versions.sort((a: { width: number }, b: { width: number }) => b.width - a.width)[0];
                    return largest.url as string;
                }

                return null;
            } catch (err) {
                console.error('Error fetching 1080p from background:', err);
                return null;
            }
        };

        fetchHighRes().then((url) => sendResponse({ url }));

        return true;
    }
});