import { useRef, useEffect } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import History from "./History";
import useCalculator from "../hooks/useCalculator";

function Calculator() {
    const { value, append, compute, history, clear } = useCalculator();
    const historyRef = useRef(null);

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div className="calculator">
            <h1>Calculator</h1>
            <History history={history} historyRef={historyRef}/>
            <Display value={value || "0"} />
            <ButtonGrid append={append} compute={compute} clear={clear} />
        </div>
    )
}
export default Calculator;