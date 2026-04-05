import React from 'react'
import { ProfileData } from '../types/profile.types'
import { formatCount } from '../utils/formatters'

export default function AccountInfo({ profileData }: { profileData: ProfileData }) {
    return (
        <div className="x7a106z x972fbf x10w94by x1qhh985 x14e42zd x9f619 x78zum5 xdt5ytf x1yztbdb xw7yly9 xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x1r0jzty x11njtxf x1fkh5qu x1ddbhtg x1dlrdel">
            <div className="html-div xdj266r x14z9mp x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw xat24cr x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1">
                <div className="x78zum5 x193iq5w x6ikm8r x10wlt62">
                    <a
                        className="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x6s0dn4 x78zum5 x1q0g3np xs83m0k xeuugli x1n2onr6 _a6hd"
                        href="#"
                        role="link"
                        tabIndex={0}
                    >
                        <h2
                            className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye x133cpev x1xlr1w8 x5n08af x10wh9bi xpm28yp x8viiok x1o7cslx"
                            style={{ "--x---base-line-clamp-line-height": "30px", "--x-lineHeight": "30px" } as React.CSSProperties}
                            dir="auto"
                        >
                            <span className="x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft">
                                {profileData.username}
                            </span>
                        </h2>
                    </a>
                    {profileData.isVerified &&
                        <div className="html-div x14z9mp xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw xdj266r x13fj5qh x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh xl56j7k">
                            <svg
                                aria-label="Verified"
                                className="x1lliihq x1n2onr6"
                                fill="rgb(0, 149, 246)"
                                height="18"
                                role="img"
                                viewBox="0 0 40 40"
                                width="18"
                            >
                                <title>Verified</title>
                                <path
                                    d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    }
                </div>
            </div>
            <div className="html-div xdj266r x14z9mp x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x15mokao x1ga7v0g x16uus16 xbiv7yw x1e56ztr x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x1oa3qoh x6s0dn4 xmixu3c x78zum5 xl56j7k">
                <span
                    className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x5n08af"
                    style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                    dir="auto"
                >
                    {profileData.fullName}
                </span>
            </div>
            <div className="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x40hh3e x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x6s0dn4 x1oa3qoh x1nhvcw1">
                <div>
                    <span
                        className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x5n08af x1yc453h"
                        style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                        dir="auto"
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
                    <div
                        className="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x5n08af x9n4tj2 _a6hd"
                        tabIndex={0}
                    >
                        <span
                            className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x5n08af x1yc453h"
                            style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                            dir="auto"
                        >
                            <span className="x5n08af x1s688f" title="310,357">
                                <span className="html-span xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1hl2dhg x16tdsg8 x1vvkbs">
                                    {formatCount(profileData.followerCount, "compact")}
                                </span>
                            </span>
                            {" "}followers
                        </span>
                    </div>
                </div>
                <div>
                    <div
                        className="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x5n08af x9n4tj2 _a6hd"
                        tabIndex={0}
                    >
                        <span
                            className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x5n08af x1yc453h"
                            style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                            dir="auto"
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
        </div>
    )
}
