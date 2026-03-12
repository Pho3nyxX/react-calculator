import CalcButton from "./CalcButton";

function ButtonGrid() {
  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","+", "="
  ];

  return (
    <div className="button-grid">
      {buttons.map((btn, index) => (
        <CalcButton key={index} label={btn} />
      ))}
    </div>
  );
}
export default ButtonGrid;