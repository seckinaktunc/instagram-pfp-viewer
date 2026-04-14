import { LiveAvatarImageSource, ProfileData, StoryRingSourceCanvas } from "../../types/profile.types";
import Button from "../buttons/Button";
import VerificationBadge from "../miscellaneous/VerificationBadge";
import ProfileAccountAvatar from "./ProfileAccountAvatar";

interface ProfileModalHeaderProps {
    downloadError: string | null;
    hasStory: boolean;
    isDownloading: boolean;
    liveAvatarImageSrc: LiveAvatarImageSource;
    onDownload: () => void;
    profileData: ProfileData | null;
    storyRingSourceCanvas: StoryRingSourceCanvas;
    username: string;
}

export default function ProfileModalHeader({
    downloadError,
    hasStory,
    isDownloading,
    liveAvatarImageSrc,
    onDownload,
    profileData,
    storyRingSourceCanvas,
    username,
}: ProfileModalHeaderProps) {
    const displayUsername = profileData?.username || username;

    return (
        <div className="_aasi _at8n">
            <div className="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x6s0dn4 x1oa3qoh x1qughib">
                <header className="_aaqw" style={{ maxWidth: "100%", width: "100%", padding: "14px 14px 14px 16px" }}>
                    <span className="xjp7ctv">
                        <div>
                            <ProfileAccountAvatar
                                hasStory={hasStory}
                                imageUrl={liveAvatarImageSrc}
                                storyRingSourceCanvas={storyRingSourceCanvas}
                                username={displayUsername}
                                variant="header"
                            />
                        </div>
                    </span>
                    <div className="_aaqy _aaqz">
                        <div className="_aar0 _aar1">
                            <div className="x78zum5 x6ikm8r x10wlt62">
                                <div className="_aaqt">
                                    <div className="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x6s0dn4 x1oa3qoh x1nhvcw1">
                                        <span
                                            className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp x1s688f x5n08af"
                                            dir="auto"
                                            style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                                        >
                                            <span className="xt0psk2">
                                                <span className="xjp7ctv">
                                                    <div className="x78zum5">
                                                        <a
                                                            className="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _a6hd"
                                                            href={`/${displayUsername}/`}
                                                        >
                                                            <div className="x6ikm8r x10wlt62 xlyipyv xuxw1ft">
                                                                <span
                                                                    className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp x1s688f x5n08af"
                                                                    dir="auto"
                                                                    style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                                                                >
                                                                    {displayUsername}
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </span>
                                            </span>
                                        </span>
                                        <VerificationBadge
                                            isVerified={profileData?.isVerified || false}
                                            wrapperClassName="html-div xdj266r x14z9mp xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw xdwrcjd x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"
                                        />
                                    </div>
                                    <div className="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x6s0dn4 x1oa3qoh x1nhvcw1">
                                        <span
                                            className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye x1fhwpqd xo1l8bm x5n08af"
                                            dir="auto"
                                            style={{ "--x---base-line-clamp-line-height": "16px", "--x-lineHeight": "16px" } as React.CSSProperties}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        disabled={!profileData?.imageUrl || isDownloading}
                        label={isDownloading ? "Downloading..." : "Download image"}
                        onClick={onDownload}
                    />
                    {downloadError ? (
                        <div
                            style={{
                                color: "#ffb4b4",
                                fontSize: "12px",
                                lineHeight: 1.4,
                                marginTop: "8px",
                            }}
                        >
                            {downloadError}
                        </div>
                    ) : null}
                </header>
            </div>
        </div>
    );
}
