import { ReactNode } from "react";
import { BiographyMentionLink } from "../../types/profile.types";

interface ProfileBiographyProps {
    biography: string;
    biographyLinks: BiographyMentionLink[];
}

export default function ProfileBiography({
    biography,
    biographyLinks,
}: ProfileBiographyProps) {
    const biographySegments: ReactNode[] = [];
    const sortedLinks = [...biographyLinks].sort((leftLink, rightLink) => leftLink.startIndex - rightLink.startIndex);
    let cursor = 0;

    for (const biographyLink of sortedLinks) {
        if (biographyLink.startIndex < cursor || biographyLink.endIndex > biography.length) {
            continue;
        }

        if (biographyLink.startIndex > cursor) {
            biographySegments.push(biography.slice(cursor, biographyLink.startIndex));
        }

        biographySegments.push(
            <a
                href={`/${biographyLink.username}/`}
                key={`${biographyLink.startIndex}:${biographyLink.endIndex}:${biographyLink.username}`}
                className="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz notranslate _a6hd"
                role="link"
                tabIndex={0}
            >
                {biography.slice(biographyLink.startIndex, biographyLink.endIndex)}
            </a>
        );

        cursor = biographyLink.endIndex;
    }

    if (cursor < biography.length) {
        biographySegments.push(biography.slice(cursor));
    }

    return (
        <h1
            className="_ap3a _aaco _aacu _aacx _aad7 _aade"
            dir="auto"
            style={{ whiteSpace: "pre-wrap" }}
        >
            {biographySegments.length ? biographySegments : biography}
        </h1>
    );
}
