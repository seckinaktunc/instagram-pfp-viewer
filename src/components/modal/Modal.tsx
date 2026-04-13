import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "../../types/modal.types";
import CloseButton from "../buttons/CloseButton";

export default function Modal({ ariaLabel, withCloseButton = false, children, onClose }: ModalProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => setIsMounted(true), 10);
        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
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

    if (!document.body) {
        return null;
    }

    return createPortal(
        <div
            aria-label={ariaLabel}
            aria-modal="true"
            onClick={onClose}
            role="dialog"
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
            {withCloseButton && <CloseButton onClose={onClose} />}
            {children({ isMounted })}
        </div>,
        document.body
    );
}
