export interface AvatarTarget {
    hasStory: boolean;
    liveAvatarImageSrc: string | null;
    mountElement: HTMLElement;
    storyRingSourceCanvas: HTMLCanvasElement | null;
    storyTrigger: HTMLElement | null;
}

const MODAL_STORY_RING_TARGET_SIZE = 41;
const MIN_SMALL_AVATAR_SIZE = 20;
const MAX_SMALL_AVATAR_SIZE = 48;

const isVisibleElement = (element: Element | null): element is HTMLElement => {
    if (!(element instanceof HTMLElement)) {
        return false;
    }

    const rect = element.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
        return false;
    }

    const style = window.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
};

const getInteractiveAncestors = (element: HTMLElement, boundary: HTMLElement) => {
    const interactiveAncestors: HTMLElement[] = [];
    let currentElement: HTMLElement | null = element;

    while (currentElement && currentElement !== boundary) {
        if (
            currentElement.tagName === "A" ||
            currentElement.tagName === "BUTTON" ||
            currentElement.getAttribute("role") === "button"
        ) {
            interactiveAncestors.push(currentElement);
        }

        currentElement = currentElement.parentElement;
    }

    return interactiveAncestors;
};

const rectContainsRect = (outerRect: DOMRect, innerRect: DOMRect) => {
    return (
        outerRect.left <= innerRect.left &&
        outerRect.top <= innerRect.top &&
        outerRect.right >= innerRect.right &&
        outerRect.bottom >= innerRect.bottom
    );
};

const getImageSource = (image: HTMLImageElement) => {
    return image.currentSrc || image.src || image.getAttribute("src") || null;
};

const isExtensionElement = (element: Element) => {
    return Boolean(
        element.closest(".instagram-pfp-viewer") ||
        element.closest("[aria-modal='true']")
    );
};

const getInteractiveContainer = (element: HTMLElement) => {
    return element.closest("a, button, [role='button']");
};

const hrefMatchesUsername = (href: string | null, username: string) => {
    if (!href) {
        return false;
    }

    return href.toLowerCase().includes(`/${username.toLowerCase()}/`);
};

const isStoryTrigger = (element: HTMLElement, username: string) => {
    const href = element.getAttribute("href")?.toLowerCase() || "";
    const normalizedUsername = username.toLowerCase();

    if (href.includes("/stories/")) {
        return true;
    }

    if (href.includes(`/${normalizedUsername}/`) && element.querySelector("canvas")) {
        return true;
    }

    return Boolean(element.querySelector("canvas"));
};

const getProfileHeader = () => {
    const mainHeaderCandidates = Array.from(document.querySelectorAll("main header"));
    const visibleMainHeader = mainHeaderCandidates.find(isVisibleElement);
    if (visibleMainHeader) {
        return visibleMainHeader;
    }

    const fallbackHeaders = Array.from(document.querySelectorAll("header"));
    return fallbackHeaders.find((header) => {
        return isVisibleElement(header) && !header.closest("[aria-modal='true']");
    }) || null;
};

const getBestAvatarImage = (header: HTMLElement) => {
    const imageCandidates = Array.from(header.querySelectorAll("img")).filter((image) => {
        const rect = image.getBoundingClientRect();
        return isVisibleElement(image) && rect.width >= 32 && rect.height >= 32;
    });

    if (!imageCandidates.length) {
        return null;
    }

    return imageCandidates.sort((leftImage, rightImage) => {
        const leftRect = leftImage.getBoundingClientRect();
        const rightRect = rightImage.getBoundingClientRect();

        return (rightRect.width * rightRect.height) - (leftRect.width * leftRect.height);
    })[0];
};

const getMountElement = (image: HTMLImageElement, header: HTMLElement) => {
    const imageRect = image.getBoundingClientRect();
    let currentElement = image.parentElement;

    while (currentElement && currentElement !== header) {
        const isInteractive =
            currentElement.tagName === "A" ||
            currentElement.tagName === "BUTTON" ||
            currentElement.getAttribute("role") === "button";

        if (!isInteractive && rectContainsRect(currentElement.getBoundingClientRect(), imageRect)) {
            return currentElement;
        }

        currentElement = currentElement.parentElement;
    }

    return image.parentElement || image;
};

const getStoryTrigger = (image: HTMLImageElement, header: HTMLElement, username: string) => {
    const imageRect = image.getBoundingClientRect();
    const ancestorTrigger = getInteractiveAncestors(image, header).find((ancestor) => {
        return isVisibleElement(ancestor) && isStoryTrigger(ancestor, username);
    });

    if (ancestorTrigger) {
        return ancestorTrigger;
    }

    const siblingCandidates = Array.from(header.querySelectorAll("a, button, [role='button']")).filter(isVisibleElement);
    return siblingCandidates.find((candidate) => {
        const candidateRect = candidate.getBoundingClientRect();
        return rectContainsRect(candidateRect, imageRect) && isStoryTrigger(candidate, username);
    }) || null;
};

const getSmallStoryRingSourceCanvas = (
    username: string,
    header: HTMLElement,
    liveAvatarImageSrc: string | null
) => {
    const canvasCandidates = Array.from(document.querySelectorAll("canvas")).filter((canvas): canvas is HTMLCanvasElement => {
        if (!(canvas instanceof HTMLCanvasElement) || !isVisibleElement(canvas)) {
            return false;
        }

        if (header.contains(canvas) || isExtensionElement(canvas)) {
            return false;
        }

        if (canvas.width <= 0 || canvas.height <= 0) {
            return false;
        }

        return true;
    });

    const scoredCanvasCandidates = canvasCandidates.map((canvasCandidate) => {
        const canvasRect = canvasCandidate.getBoundingClientRect();
        const enclosedImages = Array.from(document.querySelectorAll("img")).filter((image): image is HTMLImageElement => {
            if (!(image instanceof HTMLImageElement) || !isVisibleElement(image)) {
                return false;
            }

            if (header.contains(image) || isExtensionElement(image)) {
                return false;
            }

            const imageRect = image.getBoundingClientRect();
            const imageSize = Math.max(imageRect.width, imageRect.height);
            if (imageSize < MIN_SMALL_AVATAR_SIZE || imageSize > MAX_SMALL_AVATAR_SIZE) {
                return false;
            }

            if (!rectContainsRect(canvasRect, imageRect)) {
                return false;
            }

            const interactiveContainer = getInteractiveContainer(image);
            const href = interactiveContainer?.getAttribute("href") || null;
            const imageSource = getImageSource(image);

            return hrefMatchesUsername(href, username) || (
                Boolean(liveAvatarImageSrc) &&
                imageSource === liveAvatarImageSrc
            );
        });

        if (!enclosedImages.length) {
            return null;
        }

        const displayedSize = Math.max(canvasRect.width, canvasRect.height);

        return {
            canvas: canvasCandidate,
            enclosedImageSize: Math.max(
                ...enclosedImages.map((image) => Math.max(
                    image.getBoundingClientRect().width,
                    image.getBoundingClientRect().height
                ))
            ),
            sizeDistance: Math.abs(displayedSize - MODAL_STORY_RING_TARGET_SIZE),
            displayedSize,
        };
    }).filter((candidate): candidate is {
        canvas: HTMLCanvasElement;
        displayedSize: number;
        enclosedImageSize: number;
        sizeDistance: number;
    } => Boolean(candidate));

    return scoredCanvasCandidates.sort((leftCandidate, rightCandidate) => {
        if (leftCandidate.sizeDistance !== rightCandidate.sizeDistance) {
            return leftCandidate.sizeDistance - rightCandidate.sizeDistance;
        }

        if (leftCandidate.displayedSize !== rightCandidate.displayedSize) {
            return leftCandidate.displayedSize - rightCandidate.displayedSize;
        }

        return leftCandidate.enclosedImageSize - rightCandidate.enclosedImageSize;
    })[0]?.canvas || null;
};

export const getProfileAvatarTarget = (username: string): AvatarTarget | null => {
    const header = getProfileHeader();

    if (!header) {
        return null;
    }

    const avatarImage = getBestAvatarImage(header);

    if (!avatarImage) {
        return null;
    }

    const liveAvatarImageSrc = getImageSource(avatarImage);
    const storyTrigger = getStoryTrigger(avatarImage, header, username);
    const storyRingSourceCanvas = getSmallStoryRingSourceCanvas(username, header, liveAvatarImageSrc);

    return {
        liveAvatarImageSrc,
        mountElement: getMountElement(avatarImage, header),
        storyRingSourceCanvas,
        storyTrigger,
        hasStory: Boolean(storyTrigger),
    };
};

export const triggerNativeStoryViewer = (storyTrigger: HTMLElement | null) => {
    if (!storyTrigger || !storyTrigger.isConnected) {
        return false;
    }

    storyTrigger.dispatchEvent(
        new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
        })
    );

    return true;
};
