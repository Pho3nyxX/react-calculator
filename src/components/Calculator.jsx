import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import useCalculator from "../hooks/useCalculator";

function Calculator() {
    const { value, append, compute } = useCalculator();

    return (
        <div className="calculator">
            <h1>Calculator</h1>
            <Display value={value || "0"} />
            <ButtonGrid append={append} compute={compute} />
        </div>
    )
}
export default Calculator;