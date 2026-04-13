import { ProfileData } from "./profile.types";

export type ProfileModalState =
    | { status: "closed" }
    | { status: "loading"; username: string; data: ProfileData | null }
    | { status: "ready"; username: string; data: ProfileData }
    | { status: "error"; username: string; data: ProfileData | null; error: string };

export interface ModalShellRenderProps {
    isMounted: boolean;
}

export interface ModalProps {
    ariaLabel: string;
    withCloseButton?: boolean;
    children: (props: ModalShellRenderProps) => React.ReactNode;
    onClose: () => void;
}
