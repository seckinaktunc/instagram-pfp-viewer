import { FetchResponse } from "../types/fetch.types";
import { ProfileData } from "../types/profile.types";

interface BaseProfileResult {
    profile: ProfileData;
    userId: string | null;
}

const profileCache = new Map<string, ProfileData>();
const inflightRequests = new Map<string, Promise<ProfileData | null>>();

const PROFILE_REQUEST_ERROR = "Could not find profile data.";

export const PROFILE_FETCH_ERROR_MESSAGE = PROFILE_REQUEST_ERROR;

export const normalizeUsername = (username: string) => username.trim().toLowerCase();

export const getCachedProfileData = (username: string) => {
    return profileCache.get(normalizeUsername(username)) || null;
};

export const withLiveStoryState = (profileData: ProfileData, hasStory: boolean): ProfileData => {
    return {
        ...profileData,
        hasStory,
    };
};

const fetchBaseProfileData = async (username: string): Promise<BaseProfileResult | null> => {
    const profileResponse = await fetch(
        `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
        { headers: { "X-IG-App-ID": "936619743392459" } }
    );

    if (!profileResponse.ok) {
        throw new Error("Profile API request failed");
    }

    const profileJson = await profileResponse.json();
    const user = profileJson.data?.user;

    if (!user) {
        return null;
    }

    return {
        userId: user.id || null,
        profile: {
            url: user.hd_profile_pic_url_info?.url || user.profile_pic_url_hd || null,
            username: user.username || username,
            isVerified: user.is_verified || false,
            biography: user.biography || "",
            fullName: user.full_name || "",
            postCount: user.edge_owner_to_timeline_media?.count || 0,
            followerCount: user.edge_followed_by?.count || 0,
            followingCount: user.edge_follow?.count || 0,
            hasStory: false,
        },
    };
};

const fetchHighResolutionProfileUrl = async (userId: string): Promise<string | null> => {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage(
            { type: "FETCH_1080P", userId },
            (response?: FetchResponse) => {
                if (chrome.runtime.lastError) {
                    console.error("Could not fetch the highest resolution profile picture", chrome.runtime.lastError);
                    resolve(null);
                    return;
                }

                resolve(response?.url || null);
            }
        );
    });
};

const fetchProfileDataUncached = async (username: string): Promise<ProfileData | null> => {
    const baseProfileResult = await fetchBaseProfileData(username);

    if (!baseProfileResult) {
        return null;
    }

    const { profile, userId } = baseProfileResult;

    if (!userId) {
        return profile;
    }

    try {
        const highResolutionUrl = await fetchHighResolutionProfileUrl(userId);

        if (highResolutionUrl) {
            return {
                ...profile,
                url: highResolutionUrl,
            };
        }
    } catch (error) {
        console.error("Could not enhance the base profile image", error);
    }

    return profile;
};

export const fetchProfileData = (username: string): Promise<ProfileData | null> => {
    const normalizedUsername = normalizeUsername(username);
    const cachedProfile = profileCache.get(normalizedUsername);

    if (cachedProfile) {
        return Promise.resolve(cachedProfile);
    }

    const inflightRequest = inflightRequests.get(normalizedUsername);

    if (inflightRequest) {
        return inflightRequest;
    }

    const request = fetchProfileDataUncached(normalizedUsername)
        .then((profileData) => {
            if (profileData) {
                profileCache.set(normalizedUsername, profileData);
            }

            return profileData;
        })
        .catch((error) => {
            console.error("Failed to fetch profile data", error);
            return null;
        })
        .finally(() => {
            inflightRequests.delete(normalizedUsername);
        });

    inflightRequests.set(normalizedUsername, request);

    return request;
};
