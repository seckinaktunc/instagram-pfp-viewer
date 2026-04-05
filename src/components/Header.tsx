import React from 'react'
import VerifiedCheckmark from './VerifiedCheckmark'
import Button from './Button'
import { ProfileData } from '../types/profile.types'

interface HeaderProps {
    profileData: ProfileData;
    onDownload: () => void;
    isDownloading: boolean;
    downloadError: string | null;
}

export default function Header({
    profileData,
    onDownload,
    isDownloading,
    downloadError,
}: HeaderProps) {
    return (
        <div className="_aasi _at8n">
            <div className="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x6s0dn4 x1oa3qoh x1qughib">
                <header className="_aaqw" style={{ maxWidth: "100%", width: "100%", padding: "14px 14px 14px 16px" }}>
                    <span className="xjp7ctv">
                        <div
                            aria-disabled="true"
                            className="x1i10hfl xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 xdl72j9 x2lah0s x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x1q0g3np x87ps6o x1lku1pv x1a2a7pz x6s0dn4 xamitd3 xmper1u x1lliihq x1okw0bk xl56j7k x1n2onr6"
                            role="button"
                            tabIndex={-1}
                        >
                            <canvas
                                className="x1upo8f9 xpdipgo x87ps6o"
                                height="41"
                                style={{ left: "-4.5px", position: "absolute", top: "-4.5px", height: "41px", width: "41px" }}
                                width="41"
                            />
                            <a
                                className="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk x78zum5 xdl72j9 xdt5ytf x2lah0s x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt xnz67gz x1c9tyrk xeusxvb x1pahc9y x1ertn4p x9f619 x1lliihq x2lah0s x6ikm8r x10wlt62 x1n2onr6 xzfakq xhihtb0 x1j8hi7x x172hklt xrw4ojt xg6frx5 xw872ko xhgbb2x xynf4tj xdjs2zz x1r9ni5o xvsnedh xoiy6we x16ouz9t x1qj619r xsrjr5h x1xrz1ek x1s928wv x1unh1gc x1iygr5g x2q1x1w x1j6awrg x1m1drc7 x1ypdohk x4gyw5p _a6hd"
                                href={`/${profileData.username}/`}
                                role="link"
                                style={{ height: "32px", width: "32px" }}
                                tabIndex={0}
                            >
                                <img
                                    alt={`${profileData.username}'s profile picture`}
                                    className="xpdipgo x972fbf x10w94by x1qhh985 x14e42zd xk390pu x5yr21d xdj266r x14z9mp xat24cr x1lziwak xl1xv1r xexx8yu xyri2b x18d9i69 x1c1uobl x11njtxf xh8yej3"
                                    crossOrigin="anonymous"
                                    draggable="false"
                                    src={profileData.url ? profileData.url : undefined}
                                />
                            </a>
                        </div>
                    </span>
                    <div className="_aaqy _aaqz">
                        <div className="_aar0 _aar1">
                            <div className="x78zum5 x6ikm8r x10wlt62">
                                <div className="_aaqt">
                                    <div className="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x6s0dn4 x1oa3qoh x1nhvcw1">
                                        <span
                                            className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp x1s688f x5n08af"
                                            style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                                            dir="auto"
                                        >
                                            <span className="xt0psk2">
                                                <span className="xjp7ctv">
                                                    <div className="x78zum5">
                                                        <a
                                                            className="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _a6hd"
                                                            href={`/${profileData.username}/`}
                                                            role="link"
                                                            tabIndex={0}
                                                        >
                                                            <div className="x6ikm8r x10wlt62 xlyipyv xuxw1ft">
                                                                <span
                                                                    className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp x1s688f x5n08af"
                                                                    style={{ "--x---base-line-clamp-line-height": "18px", "--x-lineHeight": "18px" } as React.CSSProperties}
                                                                    dir="auto"
                                                                >
                                                                    {profileData.username}
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </span>
                                            </span>
                                        </span>
                                        <VerifiedCheckmark isVerified={profileData.isVerified} />
                                    </div>
                                    <div className="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np xqjyukv x6s0dn4 x1oa3qoh x1nhvcw1">
                                        <span
                                            className="x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye x1fhwpqd xo1l8bm x5n08af"
                                            style={{ "--x---base-line-clamp-line-height": "16px", "--x-lineHeight": "16px" } as React.CSSProperties}
                                            dir="auto"
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        disabled={!profileData.url || isDownloading}
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
    )
}
