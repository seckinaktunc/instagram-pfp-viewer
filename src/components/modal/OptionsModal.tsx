import OptionsButton from "../buttons/OptionsButton";
import Modal from "./Modal";

interface OptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onViewProfilePicture: () => void;
    onViewStory: () => void;
    username: string;
}

export default function OptionsModal({
    isOpen,
    onClose,
    onViewProfilePicture,
    onViewStory,
    username,
}: OptionsModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <Modal ariaLabel={`${username} options`} onClose={onClose}>
            {({ isMounted }) => (
                <div
                    className="x7r02ix x15fl9t6 x1yw9sn2 x1evh3fb x4giqqa xb88tzc xw2csxc x1odjw0f x5fp0pe"
                    onClick={(event) => event.stopPropagation()}
                    style={{
                        width: 560,
                        opacity: isMounted ? 1 : 0,
                        scale: isMounted ? 1 : 1.1,
                        transition: "all 100ms ease-out",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            maxWidth: "100%"
                        }}
                    >
                        <div className="_a9-v">
                            <div className="_a9-z">
                                <div
                                    style={{
                                        color: "#ffffff",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        lineHeight: 1.4,
                                        padding: "18px 20px",
                                        textAlign: "center",
                                    }}
                                >
                                    {username}
                                </div>
                                <OptionsButton label="View profile picture" onClick={onViewProfilePicture} />
                                <OptionsButton label="View story" onClick={onViewStory} />
                                <OptionsButton label="Cancel" onClick={onClose} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
}
