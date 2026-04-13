import React from "react";
import { ProfileData } from "../../types/profile.types";
import { formatCount } from "../../utils/formatters";
import VerificationBadge from "../miscellaneous/VerificationBadge";

export default function ProfileStats({ profileData }: { profileData: ProfileData }) {
    return (
        <div className="x7a106z x972fbf x10w94by x1qhh985 x14e42zd x9f619 x78zum5 xdt5ytf x1yztbdb xw7yly9 xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x1r0jzty x11njtxf x1fkh5qu x1ddbhtg x1dlrdel">
            <div className="html-div xdj266r x14z9mp x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw xat24cr x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1">
                <div className="x78zum5 x193iq5w x6ikm8r x10wlt62">
                    <a
                        className="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x6s0dn4 x78zum5 x1q0g3np xs83m0k xeuugli x1n2onr6 _a6hd"
                        href={`/${profileData.username}/`}
                    >
                        <h2
                            className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye x133cpev x1xlr1w8 x5n08af x10wh9bi xpm28yp x8viiok x1o7cslx"
                            dir="auto"
                            style={{ "--x---base-line-clamp-line-height": "30px", "--x-lineHeight": "30px" } as React.CSSProperties}
                        >
                            <span className="x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft">
                                {profileData.username}
                            </span>
                        </h2>
                    </a>
                    <VerificationBadge
                        isVerified={profileData.isVerified}
                        size={18}
                        wrapperClassName="html-div x14z9mp xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw xdj266r x13fj5qh x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh xl56j7k"
                    />
                </div>
            </div>
            <div className="html-div xdj266r x14z9mp x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x15mokao x1ga7v0g x16uus16 xbiv7yw x1e56ztr x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x1oa3qoh x6s0dn4 xmixu3c x78zum5 xl56j7k">
                <span
                    className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x5n08af"
                    dir="auto"
                    style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                >
                    {profileData.fullName}
                </span>
            </div>
            <div className="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x40hh3e x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x6s0dn4 x1oa3qoh x1nhvcw1">
                <div>
                    <span
                        className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x5n08af x1yc453h"
                        dir="auto"
                        style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                    >
                        <span className="x5n08af x1s688f">
                            <span className="html-span xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1hl2dhg x16tdsg8 x1vvkbs">
                                {formatCount(profileData.postCount)}
                            </span>
                        </span>
                        {" "}posts
                    </span>
                </div>
                <div>
                    <span
                        className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x5n08af x1yc453h"
                        dir="auto"
                        style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                    >
                        <span className="x5n08af x1s688f" title={profileData.followerCount.toLocaleString("en-US")}>
                            <span className="html-span xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1hl2dhg x16tdsg8 x1vvkbs">
                                {formatCount(profileData.followerCount, "compact")}
                            </span>
                        </span>
                        {" "}followers
                    </span>
                </div>
                <div>
                    <span
                        className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x5n08af x1yc453h"
                        dir="auto"
                        style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                    >
                        <span className="x5n08af x1s688f">
                            <span className="html-span xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1hl2dhg x16tdsg8 x1vvkbs">
                                {formatCount(profileData.followingCount)}
                            </span>
                        </span>
                        {" "}following
                    </span>
                </div>
            </div>
        </div>
    );
}
