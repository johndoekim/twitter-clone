interface ButtonProps {
    label: string;
    onClick?: () => void;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    disabled?: boolean;
    outline?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, secondary, fullWidth, onClick, large, disabled, outline }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
        disabled:opacitiy-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary ? 'bg-white' : 'bg-sky-500'}
        ${secondary ? 'text-black' : 'text-white'}
        ${secondary ? 'border-black' : 'border-sky-500'}
        ${large ? 'text-xl' : 'text-md'}
        ${large ? 'px-5' : 'py-4'}
        ${large ? 'py-3' : 'py-2'}
        ${outline ? 'bg-transparent' : ''}
        ${outline ? 'border-white' : ''}
        ${outline ? 'text-white' : ''}


        
`}
        >
            {label}
        </button>
    );
};
