import { ProfileData } from "./profile.types";

export interface ModalState {
    isOpen: boolean;
    error: string | null;
    data: ProfileData | null;
}

export interface ModalProps {
    profileData: ProfileData | null;
    isLoading: boolean;
    error: string | null;
    onClose: () => void;
}