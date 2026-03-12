import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import useCalculator from "../hooks/useCalculator";

function Calculator(){
    const { value } = useCalculator();

    return(
        <div className="calculator">
            <h1>Calculator</h1>
            <Display value={value || "0"} />
            <ButtonGrid />
        </div>
    )
}
export default Calculator;