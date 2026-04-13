interface OptionsButtonProps {
    disabled?: boolean;
    label: string;
    onClick: () => void;
}

export default function OptionsButton({
    disabled = false,
    label,
    onClick,
}: OptionsButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className="_a9--"
            type="button"
        >
            {label}
        </button>
    );
}
