import { FetchResponse } from "../types/fetch.types";
import { BiographyMentionLink, ProfileData } from "../types/profile.types";

interface BaseProfileResult {
    profile: ProfileData;
    userId: string | null;
}

interface BiographyMentionCandidate {
    endIndex: number | null;
    startIndex: number | null;
    text: string | null;
    url: string | null;
    username: string | null;
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

const getRecord = (value: unknown): Record<string, unknown> | null => {
    if (!value || typeof value !== "object") {
        return null;
    }

    return value as Record<string, unknown>;
};

const getString = (value: unknown) => {
    return typeof value === "string" ? value : null;
};

const getNumber = (value: unknown) => {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
};

const getInstagramUsernameFromUrl = (value: string | null) => {
    if (!value) {
        return null;
    }

    const matchedUsername = value.match(/instagram\.com\/([A-Za-z0-9._]+)\/?/i);
    return matchedUsername?.[1] || null;
};

const getBiographyMentionCandidate = (value: unknown): BiographyMentionCandidate | null => {
    const record = getRecord(value);
    if (!record) {
        return null;
    }

    const userRecord =
        getRecord(record.user) ||
        getRecord(record.mentioned_user) ||
        getRecord(record.profile) ||
        getRecord(record.entity);
    const linkRecord = getRecord(record.link) || getRecord(record.link_info);

    const url =
        getString(record.url) ||
        getString(record.href) ||
        getString(linkRecord?.url) ||
        getString(linkRecord?.href);
    const username =
        getString(record.username) ||
        getString(userRecord?.username) ||
        getInstagramUsernameFromUrl(url);

    const startIndex =
        getNumber(record.start) ??
        getNumber(record.start_index) ??
        getNumber(record.offset) ??
        getNumber(record.inline_start);
    const length =
        getNumber(record.length) ??
        getNumber(record.inline_length);
    const endIndex =
        getNumber(record.end) ??
        getNumber(record.end_index) ??
        (startIndex !== null && length !== null ? startIndex + length : null);

    return {
        endIndex,
        startIndex,
        text:
            getString(record.text) ||
            getString(record.title) ||
            getString(record.display_text) ||
            (username ? `@${username}` : null),
        url,
        username,
    };
};

const normalizeBiographyMentionLinks = (
    biography: string,
    candidates: BiographyMentionCandidate[]
): BiographyMentionLink[] => {
    const normalizedLinks: BiographyMentionLink[] = [];
    const seenLinkKeys = new Set<string>();
    let searchIndex = 0;

    const orderedCandidates = candidates
        .filter((candidate) => candidate.username || candidate.text || candidate.url)
        .sort((leftCandidate, rightCandidate) => {
            const leftStartIndex = leftCandidate.startIndex ?? Number.MAX_SAFE_INTEGER;
            const rightStartIndex = rightCandidate.startIndex ?? Number.MAX_SAFE_INTEGER;

            return leftStartIndex - rightStartIndex;
        });

    for (const candidate of orderedCandidates) {
        let username = candidate.username || getInstagramUsernameFromUrl(candidate.url);
        let linkText = candidate.text;
        let startIndex = candidate.startIndex;
        let endIndex = candidate.endIndex;

        if (startIndex !== null && endIndex !== null && startIndex >= 0 && endIndex <= biography.length && endIndex > startIndex) {
            linkText = biography.slice(startIndex, endIndex);
        }

        if ((!linkText || !linkText.startsWith("@")) && username) {
            linkText = `@${username}`;
        }

        if (!linkText) {
            continue;
        }

        if (startIndex === null || endIndex === null || biography.slice(startIndex, endIndex) !== linkText) {
            const matchedIndex = biography.indexOf(linkText, searchIndex);

            if (matchedIndex === -1) {
                continue;
            }

            startIndex = matchedIndex;
            endIndex = matchedIndex + linkText.length;
        }

        if (!linkText.startsWith("@")) {
            continue;
        }

        username = username || linkText.slice(1);

        if (!username || !/^[A-Za-z0-9._]+$/.test(username)) {
            continue;
        }

        const linkKey = `${startIndex}:${endIndex}:${username}`;

        if (seenLinkKeys.has(linkKey)) {
            continue;
        }

        seenLinkKeys.add(linkKey);
        searchIndex = endIndex;
        normalizedLinks.push({
            endIndex,
            startIndex,
            text: linkText,
            username,
        });
    }

    return normalizedLinks;
};

const extractBiographyMentionLinks = (user: unknown, biography: string) => {
    const userRecord = getRecord(user);
    if (!userRecord || !biography) {
        return [];
    }

    const biographyWithEntities = getRecord(userRecord.biography_with_entities);
    const rawCandidates = [
        ...(Array.isArray(biographyWithEntities?.entities) ? biographyWithEntities.entities : []),
        ...(Array.isArray(biographyWithEntities?.links) ? biographyWithEntities.links : []),
        ...(Array.isArray(biographyWithEntities?.ranges) ? biographyWithEntities.ranges : []),
        ...(Array.isArray(userRecord.biography_entities) ? userRecord.biography_entities : []),
        ...(Array.isArray(userRecord.bio_links) ? userRecord.bio_links : []),
    ];

    return normalizeBiographyMentionLinks(
        biography,
        rawCandidates
            .map(getBiographyMentionCandidate)
            .filter((candidate): candidate is BiographyMentionCandidate => Boolean(candidate))
    );
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
            imageUrl: user.hd_profile_pic_url_info?.url || user.profile_pic_url_hd || null,
            username: user.username || username,
            isVerified: user.is_verified || false,
            biography: user.biography || "",
            biographyLinks: extractBiographyMentionLinks(user, user.biography || ""),
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
                imageUrl: highResolutionUrl,
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
