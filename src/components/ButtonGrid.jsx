import CalcButton from "./CalcButton";

function ButtonGrid({ append, compute }) {
  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "+", "="
  ];

  const handleClick = (btn) => {
    if (btn === "=") {
      compute();
    } else {
      append(btn);
    }
  };

  return (
    <div className="button-grid">
      {buttons.map((btn, index) => (
        <CalcButton key={index} label={btn} onClick={handleClick} />
      ))}
    </div>
  );
}
export default ButtonGrid;