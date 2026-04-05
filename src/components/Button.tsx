interface ButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({ label, onClick }: ButtonProps) {
    return (
        <div
            className="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv xuk3077 x1oa3qoh x1nhvcw1"
            onClick={onClick}
        >
            <div
                className="x1i10hfl xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x972fbf x10w94by x1qhh985 x14e42zd xdl72j9 x2lah0s x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu x18d9i69 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1lku1pv x1a2a7pz x6s0dn4 xjyslct x1obq294 x5a5i1n xde0f50 x15x8krk x1ejq31n x18oe1m7 x1sy0etr xstzfhl x9f619 x9bdzbf x1ypdohk x1f6kntn xwhw2v2 x10w6t97 xl56j7k x17ydfre xf7dkkf xv54qhq x1n2onr6 x2b8uid xlyipyv x87ps6o x14atkfc x5c86q x18br7mf x1i0vuye x18cabeq x158me93 xk4oym4 x1uugd1q x3nfvp2"
                role="button"
                tabIndex={0}
            >
                {label}
            </div>
        </div>
    )
}
