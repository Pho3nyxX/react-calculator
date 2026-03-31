function CalcButton({ label, onClick, className }) {
    return (
        <button
            className={`calcBtn ${className}`}
            onClick={() => onClick(label)}
        >
            {label}
        </button>
    );
}

export default CalcButton;