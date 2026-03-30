import { useState } from "react";
import { evaluate } from "../utils/evaluate";

function useCalculator() {
    const [value, setValue] = useState("");
    const [history, setHistory] = useState([]);
    const isOperator = (char) => ["+", "-", "*", "/", "%"].includes(char);

    const append = (char) => {
        setValue((prev) => {
            if (char === "π") return prev + Math.PI;

            if (char === "√") return prev + "√(";

            if (char === "x²") return prev + "²";

            if (char === "%") return prev + "%";

            if (isValidAppend(prev, char)) {
                return prev + char;
            }

            return prev;
        });
    };

    const compute = () => {
        try {
            const expression = value
                .replace(/mod/g, "%")
                .replace(/÷/g, "/")
            const result = evaluate(expression);
            setHistory((prev) => [...prev, `${value} = ${result}`]);
            setValue(String(result));
        } catch {
            setValue("Error");
        }
    };

    const clear = () => {
        setValue("");
    };

    const backspace = () => {
        setValue((prev) => prev.slice(0, -1));
    };

    const isValidAppend = (current, nextChar) => {
        const lastChar = current[current.length - 1];

        if (nextChar === "." && current.match(/\d*\.\d*$/)) {
            return false;
        }

        if (lastChar === "(" && nextChar === ")") {
            return false;
        }

        if (isOperator(lastChar) && isOperator(nextChar)) {
            if (nextChar === "-") return true;
            return false;
        }

        if (lastChar === "(" && isOperator(nextChar) && nextChar !== "-") {
            return false;
        }

        if (!current) {
            return /[0-9]/.test(nextChar) || nextChar === "-";
        }

        return true;
    };
    return { value, append, compute, history, clear, backspace };
}
export default useCalculator;