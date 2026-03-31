import CalcButton from "./CalcButton";

function ButtonGrid({ append, compute, clear }) {
  const buttons = [
    "C", "(", ")", "mod", "sin",
    "7", "8", "9", "÷", "cos",
    "4", "5", "6", "*", "tan",
    "1", "2", "3", "-", "log",
    "0", "π", "√", "x²", "ln",
    "%", ".", "+", "="
  ];

  const handleClick = (btn) => {
    if (btn === "=") {
      compute();
    } else if (btn === "C") {
      clear();
    } else {
      append(btn);
    }
  };

  return (
    <div className="button-grid">
      {buttons.map((btn, index) => (
        <CalcButton
          key={index}
          label={btn}
          onClick={handleClick}
          className={btn === "=" ? "equals" : ""}
        />
      ))}
    </div>
  );
}
export default ButtonGrid;