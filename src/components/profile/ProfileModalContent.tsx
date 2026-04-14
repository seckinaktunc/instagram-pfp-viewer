import { LiveAvatarImageSource, ProfileData, StoryRingSourceCanvas } from "../../types/profile.types";
import ProfileAccountSummary from "./ProfileAccountSummary";
import ProfileStats from "./ProfileStats";

interface ProfileModalContentProps {
    liveAvatarImageSrc: LiveAvatarImageSource;
    profileData: ProfileData;
    storyRingSourceCanvas: StoryRingSourceCanvas;
}

export default function ProfileModalContent({
    liveAvatarImageSrc,
    profileData,
    storyRingSourceCanvas,
}: ProfileModalContentProps) {
    return (
        <div className="x78zum5 xdt5ytf x1q2y9iw x1n2onr6 xh8yej3 x9f619 x1iyjqo2 x13lttk3 x1t7ytsu xpilrb4 xexx8yu xyri2b x18d9i69 x1c1uobl x1b5io7h">
            <section className="x12nagc x182iqb8 xv54qhq xf7dkkf">
                <ProfileStats profileData={profileData} />
            </section>
            <ProfileAccountSummary
                liveAvatarImageSrc={liveAvatarImageSrc}
                profileData={profileData}
                storyRingSourceCanvas={storyRingSourceCanvas}
            />
        </div>
    );
}
