import { LiveAvatarImageSource, ProfileData, StoryRingSourceCanvas } from "../../types/profile.types";
import VerificationBadge from "../miscellaneous/VerificationBadge";
import ProfileAccountAvatar from "./ProfileAccountAvatar";
import ProfileBiography from "./ProfileBiography";

interface ProfileAccountSummaryProps {
    liveAvatarImageSrc: LiveAvatarImageSource;
    profileData: ProfileData;
    storyRingSourceCanvas: StoryRingSourceCanvas;
}

export default function ProfileAccountSummary({
    liveAvatarImageSrc,
    profileData,
    storyRingSourceCanvas,
}: ProfileAccountSummaryProps) {
    return (
        <div className="x78zum5 xdt5ytf x1iyjqo2 xs83m0k x2lwn1j x1odjw0f x1n2onr6 x9ek82g x6ikm8r xdj266r x14z9mp x4ii5y1 x1lziwak xexx8yu xv54qhq x18d9i69 xf7dkkf">
            <ul className="_a9z6 _a9za">
                <div className="x1qjc9v5 x972fbf x10w94by x1qhh985 x14e42zd x9f619 x78zum5 xdt5ytf x2lah0s xk390pu xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 xggy1nq x11njtxf">
                    <li className="_a9zj _a9zl _a9z5">
                        <div className="_a9zm">
                            <div className="_a9zn _a9zo">
                                <div>
                                    <span className="xjp7ctv">
                                        <div>
                                            <ProfileAccountAvatar
                                                hasStory={profileData.hasStory}
                                                imageUrl={liveAvatarImageSrc}
                                                storyRingSourceCanvas={storyRingSourceCanvas}
                                                username={profileData.username}
                                                variant="summary"
                                            />
                                        </div>
                                    </span>
                                </div>
                                <div className="_a9zr">
                                    <h2 className="x6s0dn4 x3nfvp2">
                                        <div className="html-div xdj266r xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x2fvf9 x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1">
                                            <span className="xt0psk2">
                                                <span className="xjp7ctv">
                                                    <div>
                                                        <a
                                                            className="x1i10hfl xjqpnuy xc5r6h4 xqeqjp1 x1phubyo xdl72j9 x2lah0s x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1a2a7pz x6s0dn4 xjyslct x1ejq31n x18oe1m7 x1sy0etr xstzfhl x9f619 x1ypdohk x1f6kntn xl56j7k x17ydfre x2b8uid xlyipyv x87ps6o x14atkfc x5c86q x18br7mf x1i0vuye x11q7cde xr5sc7 xf8g3cd x20cjte xt0b8zv x568u83 xjbqb8w xr9e8f9 x1e4oeot x1ui04y5 x6en5u8 x972fbf x10w94by x1qhh985 x14e42zd xt0psk2 xt7dq6l xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x1n5bzlp"
                                                            href={`/${profileData.username}/`}
                                                        >
                                                            {profileData.username}
                                                        </a>
                                                    </div>
                                                </span>
                                            </span>
                                        </div>
                                        <VerificationBadge
                                            isVerified={profileData.isVerified}
                                            wrapperClassName="html-div xdj266r xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x2fvf9 x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"
                                        />
                                    </h2>
                                    <div className="xt0psk2">
                                        <ProfileBiography
                                            biography={profileData.biography}
                                            biographyLinks={profileData.biographyLinks}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
    );
}
