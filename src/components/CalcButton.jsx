function CalcButton({ label, onClick }) {
    return (
        <button
            className="calcBtn"
            onClick={() => onClick(label)}
        >
            {label}
        </button>
    )
}
export default CalcButton;