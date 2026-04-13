interface ProfileAccountAvatarProps {
    imageUrl: string | null;
    username: string;
    variant: "header" | "summary";
}

const HEADER_WRAPPER_CLASS =
    "x1i10hfl xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 xdl72j9 x2lah0s x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x1q0g3np x87ps6o x1lku1pv x1a2a7pz x6s0dn4 xamitd3 xmper1u x1lliihq x1okw0bk xl56j7k x1n2onr6";
const SUMMARY_WRAPPER_CLASS =
    "x1i10hfl xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 xdl72j9 x2lah0s x3ct3a4 x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x1q0g3np x87ps6o x1lku1pv x1a2a7pz x6s0dn4 x1lliihq x1okw0bk xl56j7k x1n2onr6 x1ypdohk xqcrz7y xdj266r x14iifvp xat24cr x1lziwak";

export default function ProfileAccountAvatar({
    imageUrl,
    username,
    variant,
}: ProfileAccountAvatarProps) {
    return (
        <div
            className={variant === "header" ? HEADER_WRAPPER_CLASS : SUMMARY_WRAPPER_CLASS}
            role="button"
            tabIndex={0}
        >
            <canvas
                className="x1upo8f9 xpdipgo x87ps6o"
                style={{
                    left: -4.5,
                    position: "absolute",
                    top: -4.5,
                    height: 41,
                    width: 41
                }}
                height={41}
                width={41}
            />
            <a
                className={variant === "header"
                    ? "x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk x78zum5 xdl72j9 xdt5ytf x2lah0s x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt xnz67gz x1c9tyrk xeusxvb x1pahc9y x1ertn4p x9f619 x1lliihq x2lah0s x6ikm8r x10wlt62 x1n2onr6 xzfakq xhihtb0 x1j8hi7x x172hklt xrw4ojt xg6frx5 xw872ko xhgbb2x xynf4tj xdjs2zz x1r9ni5o xvsnedh xoiy6we x16ouz9t x1qj619r xsrjr5h x1xrz1ek x1s928wv x1unh1gc x1iygr5g x2q1x1w x1j6awrg x1m1drc7 x1ypdohk x4gyw5p _a6hd"
                    : "xnz67gz x1c9tyrk xeusxvb x1pahc9y x1ertn4p x9f619 x1lliihq x2lah0s x6ikm8r x10wlt62 x1n2onr6 xzfakq xhihtb0 x1j8hi7x x172hklt xrw4ojt xg6frx5 xw872ko xhgbb2x xynf4tj xdjs2zz x1r9ni5o xvsnedh xoiy6we x16ouz9t x1qj619r xsrjr5h x1xrz1ek x1s928wv x1unh1gc x1iygr5g x2q1x1w x1j6awrg x1m1drc7"}
                href={`/${username}/`}
                style={{
                    height: 32,
                    width: 32
                }}
            >
                <img
                    alt={`${username}'s profile picture`}
                    className="xpdipgo x972fbf x10w94by x1qhh985 x14e42zd xk390pu x5yr21d xdj266r x14z9mp xat24cr x1lziwak xl1xv1r xexx8yu xyri2b x18d9i69 x1c1uobl x11njtxf xh8yej3"
                    crossOrigin="anonymous"
                    draggable="false"
                    src={imageUrl || undefined}
                />
            </a>
        </div>
    );
}
