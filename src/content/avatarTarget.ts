export interface AvatarTarget {
    hasStory: boolean;
    mountElement: HTMLElement;
    storyTrigger: HTMLElement | null;
}

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

export const getProfileAvatarTarget = (username: string): AvatarTarget | null => {
    const header = getProfileHeader();

    if (!header) {
        return null;
    }

    const avatarImage = getBestAvatarImage(header);

    if (!avatarImage) {
        return null;
    }

    const storyTrigger = getStoryTrigger(avatarImage, header, username);

    return {
        mountElement: getMountElement(avatarImage, header),
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
