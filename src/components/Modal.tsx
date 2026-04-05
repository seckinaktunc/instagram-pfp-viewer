import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "../types/modal.types";
import CloseButton from "./CloseButton";
import Header from "./Header";
import ProfileContent from "./ProfileContent";
import Spinner from "./Spinner";

export const Modal = ({ profileData, error, isLoading, onClose }: ModalProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 10);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyOverflow = document.body.style.overflow;

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.overflow = originalBodyOverflow;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onClose]);

    if (!document.body || !profileData) return null;
    return createPortal(
        <div
            aria-label={
                profileData.username
                    ? `${profileData.username} profile picture viewer`
                    : "Instagram profile picture viewer"
            }
            aria-modal="true"
            role="dialog"
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 2147483647,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--overlay-alpha-80)",
                padding: "24px",
                boxSizing: "border-box",
            }}
        >
            <CloseButton onClose={onClose} />
            <div
                style={{
                    width: "auto",
                    height: "100%",
                    display: "flex",
                    borderRadius: "4px",
                    overflow: "hidden",
                    background: "#212328",
                    opacity: isMounted ? 1 : 0,
                    scale: isMounted ? 1 : 1.1,
                    transition: 'all 100ms ease-out',
                }}
                onClick={(event) => event.stopPropagation()}
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
                        background: "#000000"
                    }}
                >
                    {profileData.url ? (
                        <img
                            alt={
                                profileData.username
                                    ? `${profileData.username} profile picture`
                                    : "Instagram profile picture"
                            }
                            src={profileData.url}
                            style={{
                                display: "block",
                                height: "100%",
                                objectFit: "contain",
                            }}
                        />
                    ) : null}

                    {!profileData.url && isLoading ? (
                        <Spinner />
                    ) : null}

                    {!profileData.url && error ? (
                        <div
                            style={{
                                maxWidth: "420px",
                                color: "#fff",
                                fontSize: "15px",
                                lineHeight: 1.5,
                                textAlign: "center",
                            }}
                        >
                            {error}
                        </div>
                    ) : null}
                </div>

                {profileData.username ? (
                    <div
                        className="x78zum5 xdt5ytf x67bb7w x1n2onr6 xvbhtw8 x5yr21d x15mokao x1t39747 x1wcsgtt xbiv7yw"
                        role="presentation"
                        tabIndex={-1}
                        style={{
                            width: "500px",
                            height: "100%"
                        }}
                    >
                        <Header profileData={profileData} />
                        <ProfileContent profileData={profileData} />
                    </div>
                ) : null}
            </div>
        </div>,
        document.body
    );
}
