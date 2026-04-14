import { createRoot, Root } from "react-dom/client";
import ProfileOverlay from "../components/profile/ProfileOverlay";
import { LOCATION_CHANGE_EVENT, installLocationChangeHandling } from "./navigation";
import { getProfileUsernameFromLocation } from "./routes";
import { getProfileAvatarTarget, triggerNativeStoryViewer } from "./avatarTarget";

const OVERLAY_CLASS_NAME = "instagram-pfp-viewer";

let isInitialized = false;
let overlayRoot: Root | null = null;
let overlayMountPoint: HTMLDivElement | null = null;
let currentMountElement: HTMLElement | null = null;
let originalMountPosition = "";
let observer: MutationObserver | null = null;
let syncScheduled = false;

const cleanupOverlay = () => {
    overlayRoot?.unmount();
    overlayRoot = null;

    overlayMountPoint?.remove();
    overlayMountPoint = null;

    if (currentMountElement) {
        currentMountElement.style.position = originalMountPosition;
    }

    currentMountElement = null;
    originalMountPosition = "";
};

const ensureOverlayRoot = (mountElement: HTMLElement) => {
    if (overlayRoot && overlayMountPoint && currentMountElement === mountElement) {
        return;
    }

    cleanupOverlay();
    currentMountElement = mountElement;
    originalMountPosition = mountElement.style.position;

    if (window.getComputedStyle(mountElement).position === "static") {
        mountElement.style.position = "relative";
    }

    overlayMountPoint = document.createElement("div");
    overlayMountPoint.className = OVERLAY_CLASS_NAME;
    mountElement.appendChild(overlayMountPoint);

    overlayRoot = createRoot(overlayMountPoint);
};

const syncOverlay = () => {
    syncScheduled = false;

    const username = getProfileUsernameFromLocation();
    if (!username) {
        cleanupOverlay();
        return;
    }

    const avatarTarget = getProfileAvatarTarget(username);
    if (!avatarTarget) {
        cleanupOverlay();
        return;
    }

    ensureOverlayRoot(avatarTarget.mountElement);
    overlayRoot?.render(
        <ProfileOverlay
            hasStory={avatarTarget.hasStory}
            liveAvatarImageSrc={avatarTarget.liveAvatarImageSrc}
            onViewStory={() => {
                const openedNativeStory = triggerNativeStoryViewer(avatarTarget.storyTrigger);

                if (!openedNativeStory) {
                    window.location.assign(`/stories/${username}/`);
                }
            }}
            storyRingSourceCanvas={avatarTarget.storyRingSourceCanvas}
            username={username}
        />
    );
};

const scheduleOverlaySync = () => {
    if (syncScheduled) {
        return;
    }

    syncScheduled = true;
    window.requestAnimationFrame(syncOverlay);
};

export default function initialize() {
    if (isInitialized) {
        scheduleOverlaySync();
        return;
    }

    isInitialized = true;
    installLocationChangeHandling();

    window.addEventListener(LOCATION_CHANGE_EVENT, scheduleOverlaySync);

    observer = new MutationObserver(() => {
        scheduleOverlaySync();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "href", "src", "style"],
    });

    scheduleOverlaySync();
}
