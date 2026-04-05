import { ProfileData } from '../types/profile.types'
import AccountInfo from './AccountInfo'
import VerifiedCheckmark from './VerifiedCheckmark'

export default function ProfileContent({ profileData }: { profileData: ProfileData }) {
    return (
        <div className="x78zum5 xdt5ytf x1q2y9iw x1n2onr6 xh8yej3 x9f619 x1iyjqo2 x13lttk3 x1t7ytsu xpilrb4 xexx8yu xyri2b x18d9i69 x1c1uobl x1b5io7h">
            <section className="x12nagc x182iqb8 xv54qhq xf7dkkf">
                <AccountInfo profileData={profileData} />
            </section>
            <div className="x78zum5 xdt5ytf x1iyjqo2 xs83m0k x2lwn1j x1odjw0f x1n2onr6 x9ek82g x6ikm8r xdj266r x14z9mp x4ii5y1 x1lziwak xexx8yu xv54qhq x18d9i69 xf7dkkf">
                <ul className="_a9z6 _a9za">
                    <div
                        role="button"
                        className="x1qjc9v5 x972fbf x10w94by x1qhh985 x14e42zd x9f619 x78zum5 xdt5ytf x2lah0s xk390pu xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 xggy1nq x11njtxf"
                        tabIndex={0}
                    >
                        <li className="_a9zj _a9zl  _a9z5">
                            <div className="_a9zm">
                                <div className="_a9zn _a9zo">
                                    <div className="">
                                        <span className="xjp7ctv">
                                            <div>
                                                <div
                                                    className="x1i10hfl xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 xdl72j9 x2lah0s x3ct3a4 x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x1q0g3np x87ps6o x1lku1pv x1a2a7pz x6s0dn4 x1lliihq x1okw0bk xl56j7k x1n2onr6 x1ypdohk xqcrz7y xdj266r x14iifvp xat24cr x1lziwak"
                                                    role="button"
                                                    tabIndex={0}
                                                >
                                                    <canvas
                                                        className="x1upo8f9 xpdipgo x87ps6o"
                                                        height="41"
                                                        style={{ left: "-4.5px", position: "absolute", top: "-4.5px", height: "41px", width: "41px" }}
                                                        width="41"
                                                    ></canvas>
                                                    <span
                                                        className="xnz67gz x1c9tyrk xeusxvb x1pahc9y x1ertn4p x9f619 x1lliihq x2lah0s x6ikm8r x10wlt62 x1n2onr6 xzfakq xhihtb0 x1j8hi7x x172hklt xrw4ojt xg6frx5 xw872ko xhgbb2x xynf4tj xdjs2zz x1r9ni5o xvsnedh xoiy6we x16ouz9t x1qj619r xsrjr5h x1xrz1ek x1s928wv x1unh1gc x1iygr5g x2q1x1w x1j6awrg x1m1drc7"
                                                        role="link"
                                                        style={{ height: "32px", width: "32px" }}
                                                        tabIndex={-1}
                                                    >
                                                        <img
                                                            alt={`${profileData.username}'s profile picture`}
                                                            className="xpdipgo x972fbf x10w94by x1qhh985 x14e42zd xk390pu x5yr21d xdj266r x14z9mp xat24cr x1lziwak xl1xv1r xexx8yu xyri2b x18d9i69 x1c1uobl x11njtxf xh8yej3"
                                                            crossOrigin="anonymous"
                                                            draggable="false"
                                                            src={profileData.url ? profileData.url : undefined}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="_a9zr">
                                        <h2 className="x6s0dn4 x3nfvp2" tabIndex={-1}>
                                            <div className="html-div xdj266r xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x2fvf9 x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1">
                                                <span className="xt0psk2">
                                                    <span className="xjp7ctv">
                                                        <div>
                                                            <a
                                                                className="x1i10hfl xjqpnuy xc5r6h4 xqeqjp1 x1phubyo xdl72j9 x2lah0s x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1a2a7pz x6s0dn4 xjyslct x1ejq31n x18oe1m7 x1sy0etr xstzfhl x9f619 x1ypdohk x1f6kntn xl56j7k x17ydfre x2b8uid xlyipyv x87ps6o x14atkfc x5c86q x18br7mf x1i0vuye x11q7cde xr5sc7 xf8g3cd x20cjte xt0b8zv x568u83 xjbqb8w xr9e8f9 x1e4oeot x1ui04y5 x6en5u8 x972fbf x10w94by x1qhh985 x14e42zd xt0psk2 xt7dq6l xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x1n5bzlp"
                                                                href={`/${profileData.username}/`}
                                                                role="link"
                                                                tabIndex={0}
                                                            >
                                                                {profileData.username}
                                                            </a>
                                                        </div>
                                                    </span>
                                                </span>
                                            </div>
                                            <VerifiedCheckmark location="biography" isVerified={profileData.isVerified} />
                                        </h2>
                                        <div className="xt0psk2">
                                            <h1 className="_ap3a _aaco _aacu _aacx _aad7 _aade" dir="auto">
                                                {profileData.biography}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    )
}