const UNSUPPORTED_PROFILE_ROUTES = new Set([
    "accounts",
    "direct",
    "explore",
    "p",
    "reel",
    "reels",
    "stories",
]);

const PROFILE_USERNAME_PATTERN = /^[A-Za-z0-9._]+$/;

export const getProfileUsernameFromLocation = (pathname = window.location.pathname): string | null => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length !== 1) {
        return null;
    }

    const candidate = segments[0];

    if (!candidate || UNSUPPORTED_PROFILE_ROUTES.has(candidate.toLowerCase())) {
        return null;
    }

    if (!PROFILE_USERNAME_PATTERN.test(candidate)) {
        return null;
    }

    return candidate;
};
