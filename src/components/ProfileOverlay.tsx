import { useEffect, useState } from "react";
import { fetchProfileData } from "../lib/fetch";
import { ModalState } from "../types/modal.types";
import { ProfileData } from "../types/profile.types";
import { getCurrentUsername } from "../utils/getters";
import { Modal } from "./Modal";

export default function ProfileOverlay() {
    const [isHovered, setIsHovered] = useState(false);
    const [username, setUsername] = useState<string | null>(getCurrentUsername());

    const [isPrefetching, setIsPrefetching] = useState(false);
    const [prefetchedData, setPrefetchedData] = useState<ProfileData | null>(null);
    const [prefetchError, setPrefetchError] = useState<string | null>(null);

    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        error: null,
        data: null,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const current = getCurrentUsername();
            if (current !== username) {
                setUsername(current);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [username]);

    useEffect(() => {
        if (!username) return;

        let isSubscribed = true;
        setIsPrefetching(true);
        setPrefetchedData(null);
        setPrefetchError(null);

        fetchProfileData(username).then((data) => {
            if (isSubscribed) {
                if (data) {
                    setPrefetchedData(data);
                } else {
                    setPrefetchError('Could not find profile data.');
                }
                setIsPrefetching(false);
            }
        });

        return () => {
            isSubscribed = false;
        };
    }, [username]);

    useEffect(() => {
        if (modalState.isOpen) {
            setModalState((prev) => ({
                ...prev,
                data: prefetchedData,
                error: prefetchError,
                username: username,
            }));
        }
    }, [prefetchedData, prefetchError, username]);

    const closeModal = () => {
        setIsHovered(false);
        setModalState({
            isOpen: false,
            error: null,
            data: null,
        });
    };

    const handleOpenFullRes = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!username) return;

        setModalState({
            isOpen: true,
            data: prefetchedData,
            error: prefetchError,
        });

        setIsHovered(false);
    };

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isHovered ? 'var(--overlay-alpha-80)' : 'transparent',
                    cursor: 'zoom-in',
                    zIndex: 9999,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleOpenFullRes}
            >
                {isHovered && (
                    <span
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '13px',
                            textAlign: 'center',
                            whiteSpace: 'pre-line',
                            pointerEvents: 'none',
                        }}
                    >
                        View Full{'\n'}Size
                    </span>
                )}
            </div>

            {modalState.isOpen ? (
                <Modal
                    profileData={modalState.data}
                    error={modalState.error}
                    isLoading={isPrefetching}
                    onClose={closeModal}
                />
            ) : null}
        </>
    );
};