export interface ProfileData {
    url: string | null;
    username: string | null;
    isVerified: boolean;
    biography: string;
    fullName: string;
    postCount: number;
    followerCount: number;
    followingCount: number;
}