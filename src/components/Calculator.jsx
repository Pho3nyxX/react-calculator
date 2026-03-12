import Display from "./Display";
import ButtonGrid from "./ButtonGrid";

function Calculator(){
    return(
        <div className="calculator">
            <h1>Calculator</h1>
            <Display value="0" />
            <ButtonGrid />
        </div>
    )
}
export default Calculator;