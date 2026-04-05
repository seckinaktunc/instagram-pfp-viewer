export default function CloseButton({ onClose }: { onClose: () => void }) {
    return (
        <div
            className="xo2ifbc x10l6tqk x1eu8d0j x1vjfegm"
            onClick={(event) => {
                event.stopPropagation();
                onClose();
            }}
        >
            <div
                className="x1i10hfl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x6s0dn4 xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x1ypdohk x78zum5 xl56j7k x1y1aw1k xf159sx xwib8y2 xmzvs34 x1epzrsm x4gyw5p x1jplu5e x1o7uuvo x14snt5h"
                role="button"
                tabIndex={0}
            >
                <div className="x6s0dn4 x78zum5 xdt5ytf xl56j7k">
                    <svg
                        aria-label="Close"
                        className="x1lliihq x1n2onr6 x9bdzbf"
                        fill="currentColor"
                        height="18"
                        role="img"
                        viewBox="0 0 24 24"
                        width="18"
                    >
                        <title>Close</title>
                        <polyline
                            fill="none"
                            points="20.643 3.357 12 12 3.353 20.647"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                        />
                        <line
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            x1="20.649"
                            x2="3.354"
                            y1="20.649"
                            y2="3.354"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}