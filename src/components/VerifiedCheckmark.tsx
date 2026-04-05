export default function VerifiedCheckmark({ location = "header", isVerified }: { location?: "header" | "biography", isVerified: boolean }) {
    if (!isVerified) return null;

    if (location === "header") return (
        <div className="html-div xdj266r x14z9mp xat24cr xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw xdwrcjd x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1">
            <svg
                aria-label="Verified"
                className="x1lliihq x1n2onr6"
                fill="rgb(0, 149, 246)"
                height="12"
                role="img"
                viewBox="0 0 40 40"
                width="12"
            >
                <title>Verified</title>
                <path
                    d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                    fill-rule="evenodd"
                ></path>
            </svg>
        </div>
    )

    if (location === "biography") return (
        <div className="html-div xdj266r xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x2fvf9 x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1">
            <svg
                aria-label="Verified"
                className="x1lliihq x1n2onr6"
                fill="rgb(0, 149, 246)"
                height="12"
                role="img"
                viewBox="0 0 40 40"
                width="12"
            >
                <title>Verified</title>
                <path
                    d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                    fill-rule="evenodd"
                ></path>
            </svg>
        </div>
    )
}