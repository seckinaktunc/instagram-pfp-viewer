export interface BiographyMentionLink {
    endIndex: number;
    startIndex: number;
    text: string;
    username: string;
}

export interface ProfileData {
    imageUrl: string | null;
    username: string;
    isVerified: boolean;
    biography: string;
    biographyLinks: BiographyMentionLink[];
    fullName: string;
    postCount: number;
    followerCount: number;
    followingCount: number;
    hasStory: boolean;
}

export type LiveAvatarImageSource = string | null;
export type StoryRingSourceCanvas = HTMLCanvasElement | null;
