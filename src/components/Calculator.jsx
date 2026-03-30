import { useRef, useEffect } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import History from "./History";
import useCalculator from "../hooks/useCalculator";

function Calculator() {
    const { value, append, compute, history, clear, backspace } = useCalculator();
    const historyRef = useRef(null);

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;

            if (/[0-9]/.test(key)) {
                append(key);

            } else if (key === ".") {
                append(key);

            } else if (["+", "-", "*", "/", "%"].includes(key)) {
                append(key);

            } else if (key === "(" || key === ")") {
                append(key);

            } else if (key === "Enter") {
                compute();

            } else if (key === "Backspace") {
                backspace();

            } else if (key.toLowerCase() === "c") {
                clear();

            } else if (key.toLowerCase() === "p") {
                append("π");

            } else if (key.toLowerCase() === "s") {
                append("√");

            } else if (key === "^") {
                append("x²");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [append, compute, clear, backspace ]);

    return (
        <div className="calculator">
            <h1>Calculator</h1>
            <History history={history} historyRef={historyRef} />
            <Display value={value || "0"} />
            <ButtonGrid append={append} compute={compute} clear={clear} />
        </div>
    )
}
export default Calculator;