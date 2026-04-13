import { useEffect, useState } from "react";
import { downloadProfileImage } from "../../lib/download";
import { ProfileModalState } from "../../types/modal.types";
import ProfileModalContent from "../profile/ProfileModalContent";
import ProfileModalHeader from "../profile/ProfileModalHeader";
import Spinner from "../miscellaneous/Spinner";
import Modal from "./Modal";

interface ProfileImageModalProps {
    onClose: () => void;
    state: ProfileModalState;
}

export default function ProfileImageModal({
    onClose,
    state,
}: ProfileImageModalProps) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState<string | null>(null);

    useEffect(() => {
        setIsDownloading(false);
        setDownloadError(null);
    }, [state.status === "closed" ? "closed" : state.username, state.status === "closed" ? null : state.data?.url]);

    if (state.status === "closed") {
        return null;
    }

    const profileData = state.data;
    const username = state.username;

    const handleDownload = async () => {
        if (!profileData?.url || isDownloading) {
            return;
        }

        setIsDownloading(true);
        setDownloadError(null);

        try {
            await downloadProfileImage(profileData.url, profileData.username);
        } catch (error) {
            console.error("Failed to download profile image", error);
            setDownloadError("Could not download the image right now.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Modal ariaLabel={`${username} profile picture viewer`} withCloseButton onClose={onClose}>
            {({ isMounted }) => (
                <div
                    onClick={(event) => event.stopPropagation()}
                    style={{
                        width: "auto",
                        height: "100%",
                        display: "flex",
                        borderRadius: "4px",
                        overflow: "hidden",
                        background: "#212328",
                        opacity: isMounted ? 1 : 0,
                        scale: isMounted ? 1 : 1.1,
                        transition: "all 100ms ease-out",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            aspectRatio: "1/1",
                            cursor: "auto",
                            background: "#000000",
                        }}
                    >
                        {profileData?.url ? (
                            <img
                                alt={`${username} profile picture`}
                                src={profileData.url}
                                style={{
                                    display: "block",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        ) : null}

                        {!profileData?.url && state.status === "loading" ? (
                            <Spinner />
                        ) : null}

                        {!profileData?.url && state.status === "error" ? (
                            <div
                                style={{
                                    maxWidth: "420px",
                                    color: "#fff",
                                    fontSize: "15px",
                                    lineHeight: 1.5,
                                    textAlign: "center",
                                }}
                            >
                                {state.error}
                            </div>
                        ) : null}
                    </div>

                    <div
                        className="x78zum5 xdt5ytf x67bb7w x1n2onr6 xvbhtw8 x5yr21d x15mokao x1t39747 x1wcsgtt xbiv7yw"
                        style={{
                            width: "500px",
                            height: "100%",
                        }}
                    >
                        <ProfileModalHeader
                            downloadError={downloadError}
                            isDownloading={isDownloading}
                            onDownload={handleDownload}
                            profileData={profileData}
                            username={username}
                        />
                        {profileData ? (
                            <ProfileModalContent profileData={profileData} />
                        ) : null}
                    </div>
                </div>
            )}
        </Modal>
    );
}
