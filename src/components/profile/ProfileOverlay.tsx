import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import {
    PROFILE_FETCH_ERROR_MESSAGE,
    fetchProfileData,
    getCachedProfileData,
    withLiveStoryState,
} from "../../lib/profileData";
import { ProfileModalState } from "../../types/modal.types";
import { LiveAvatarImageSource, ProfileData, StoryRingSourceCanvas } from "../../types/profile.types";
import OptionsModal from "../modal/OptionsModal";
import ProfileImageModal from "../modal/ProfileImageModal";

interface ProfileOverlayProps {
    hasStory: boolean;
    liveAvatarImageSrc: LiveAvatarImageSource;
    onViewStory: () => void;
    storyRingSourceCanvas: StoryRingSourceCanvas;
    username: string;
}

export default function ProfileOverlay({
    hasStory,
    liveAvatarImageSrc,
    onViewStory,
    storyRingSourceCanvas,
    username,
}: ProfileOverlayProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData | null>(() => {
        const cachedProfile = getCachedProfileData(username);
        return cachedProfile ? withLiveStoryState(cachedProfile, hasStory) : null;
    });
    const [profileModalState, setProfileModalState] = useState<ProfileModalState>({ status: "closed" });

    const hasStoryRef = useRef(hasStory);
    const latestRequestIdRef = useRef(0);
    const latestUsernameRef = useRef(username);
    const profileDataRef = useRef<ProfileData | null>(profileData);

    const setResolvedProfileData = useCallback((nextProfileData: ProfileData | null) => {
        profileDataRef.current = nextProfileData;
        setProfileData(nextProfileData);
    }, []);

    const applyLiveStoryState = useCallback((nextProfileData: ProfileData) => {
        return withLiveStoryState(nextProfileData, hasStoryRef.current);
    }, []);

    const updateOpenModalState = useCallback((requestedUsername: string, nextProfileData: ProfileData | null, error: string | null) => {
        setProfileModalState((currentState) => {
            if (currentState.status === "closed" || currentState.username !== requestedUsername) {
                return currentState;
            }

            if (nextProfileData) {
                return {
                    status: "ready",
                    username: requestedUsername,
                    data: nextProfileData,
                };
            }

            if (error) {
                return {
                    status: "error",
                    username: requestedUsername,
                    data: "data" in currentState ? currentState.data : null,
                    error,
                };
            }

            return currentState;
        });
    }, []);

    const loadProfile = useCallback((requestedUsername: string, openModal: boolean) => {
        const cachedProfile = getCachedProfileData(requestedUsername);

        if (cachedProfile) {
            const liveProfileData = applyLiveStoryState(cachedProfile);
            setResolvedProfileData(liveProfileData);

            if (openModal) {
                setProfileModalState({
                    status: "ready",
                    username: requestedUsername,
                    data: liveProfileData,
                });
            }

            return;
        }

        const currentProfileData = profileDataRef.current;
        const loadingData = currentProfileData && currentProfileData.username === requestedUsername
            ? applyLiveStoryState(currentProfileData)
            : null;

        if (openModal) {
            setProfileModalState({
                status: "loading",
                username: requestedUsername,
                data: loadingData,
            });
        }

        const requestId = ++latestRequestIdRef.current;

        fetchProfileData(requestedUsername).then((nextProfileData) => {
            if (
                latestRequestIdRef.current !== requestId ||
                latestUsernameRef.current !== requestedUsername
            ) {
                return;
            }

            if (!nextProfileData) {
                updateOpenModalState(requestedUsername, null, PROFILE_FETCH_ERROR_MESSAGE);
                return;
            }

            const liveProfileData = applyLiveStoryState(nextProfileData);
            setResolvedProfileData(liveProfileData);
            updateOpenModalState(requestedUsername, liveProfileData, null);
        });
    }, [applyLiveStoryState, setResolvedProfileData, updateOpenModalState]);

    useEffect(() => {
        latestUsernameRef.current = username;
        hasStoryRef.current = hasStory;
        setIsHovered(false);
        setIsOptionsOpen(false);
        setProfileModalState({ status: "closed" });

        const cachedProfile = getCachedProfileData(username);
        setResolvedProfileData(cachedProfile ? withLiveStoryState(cachedProfile, hasStory) : null);
        loadProfile(username, false);

        return () => {
            latestRequestIdRef.current += 1;
        };
    }, [loadProfile, setResolvedProfileData, username]);

    useEffect(() => {
        hasStoryRef.current = hasStory;

        const currentProfileData = profileDataRef.current;
        if (currentProfileData) {
            setResolvedProfileData(withLiveStoryState(currentProfileData, hasStory));
        }

        setProfileModalState((currentState) => {
            if (currentState.status === "closed" || !("data" in currentState) || !currentState.data) {
                return currentState;
            }

            return {
                ...currentState,
                data: withLiveStoryState(currentState.data, hasStory),
            };
        });
    }, [hasStory, setResolvedProfileData]);

    const openProfileModal = useCallback(() => {
        setIsHovered(false);
        setIsOptionsOpen(false);
        loadProfile(username, true);
    }, [loadProfile, username]);

    const handleOverlayClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (hasStory) {
            setIsOptionsOpen(true);
            setIsHovered(false);
            return;
        }

        openProfileModal();
    };

    const handleViewStory = () => {
        setIsHovered(false);
        setIsOptionsOpen(false);
        onViewStory();
    };

    return (
        <>
            <button
                aria-label={hasStory ? `View ${username} options` : `View ${username} profile picture`}
                onClick={handleOverlayClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                    padding: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isHovered ? "var(--overlay-alpha-80)" : "transparent",
                    cursor: "pointer",
                    zIndex: 9999,
                }}
                type="button"
            >
                {isHovered &&
                    <span
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "13px",
                            textAlign: "center",
                            whiteSpace: "pre-line",
                            pointerEvents: "none",
                        }}
                    >
                        {hasStory ? "View options" : "View full-size"}
                    </span>
                }
            </button>

            <OptionsModal
                isOpen={isOptionsOpen}
                onClose={() => setIsOptionsOpen(false)}
                onViewProfilePicture={openProfileModal}
                onViewStory={handleViewStory}
                username={username}
            />

            <ProfileImageModal
                hasStory={hasStory}
                liveAvatarImageSrc={liveAvatarImageSrc}
                onClose={() => {
                    setIsHovered(false);
                    setProfileModalState({ status: "closed" });
                }}
                state={profileModalState}
                storyRingSourceCanvas={storyRingSourceCanvas}
            />
        </>
    );
}
