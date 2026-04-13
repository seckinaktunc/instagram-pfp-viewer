export const sanitizeFilenamePart = (value: string | null | undefined) => {
    const normalized = value?.trim().replace(/\s+/g, "-") || "instagram-profile-picture";
    return normalized.replace(/[<>:"/\\|?*\x00-\x1F]/g, "");
};

export const getImageExtension = (url: string) => {
    try {
        const pathname = new URL(url).pathname;
        const match = pathname.match(/\.([a-zA-Z0-9]+)$/);

        if (match) {
            return `.${match[1].toLowerCase()}`;
        }
    } catch (error) {
        console.error("Could not determine the download file extension.", error);
    }

    return ".jpg";
};

export const buildProfileImageFilename = (imageUrl: string, username: string | null) => {
    return `${sanitizeFilenamePart(username)}-profile-picture${getImageExtension(imageUrl)}`;
};
