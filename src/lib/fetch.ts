import { ProfileData } from "../types/profile.types";

export const sanitizeFilenamePart = (value: string | null | undefined) => {
    const normalized = value?.trim().replace(/\s+/g, "-") || "instagram-profile-picture";
    return normalized.replace(/[<>:"/\\|?*\x00-\x1F]/g, "");
};

export const getImageExtension = (url: string) => {
    try {
        const pathname = new URL(url).pathname;
        const match = pathname.match(/\.([a-zA-Z0-9]+)$/);

        if (match) {
            return `.${match[1].toLowerCase()}`;
        }
    } catch (error) {
        console.error("Could not determine the download file extension.", error);
    }

    return ".jpg";
};

export const fetchProfileData = async (username: string): Promise<ProfileData | null> => {
    try {
        const profileRes = await fetch(
            `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
            { headers: { 'X-IG-App-ID': '936619743392459' } }
        );

        if (!profileRes.ok) throw new Error('Profile API request failed');

        const profileJson = await profileRes.json();
        const user = profileJson.data?.user;

        if (!user) return null;

        const userId = user.id;
        const profileData: ProfileData = {
            url: user.hd_profile_pic_url_info?.url || user.profile_pic_url_hd || null,
            username: user.username,
            isVerified: user.is_verified || false,
            biography: user.biography || '',
            fullName: user.full_name || '',
            postCount: user.edge_owner_to_timeline_media?.count || 0,
            followerCount: user.edge_followed_by?.count || 0,
            followingCount: user.edge_follow?.count || 0,
        };

        if (!userId) return profileData;
        return new Promise((resolve) => {
            chrome.runtime.sendMessage(
                { type: 'FETCH_1080P', userId },
                (response: { url: string | null }) => {
                    if (response && response.url) {
                        profileData.url = response.url;
                    }
                    resolve(profileData);
                }
            );
        });
    } catch (err) {
        console.error('Failed to fetch the highest resolution profile picture', err);
        return null;
    }
};