import { useState } from "react";
import { evaluate } from "../utils/evaluate";

function useCalculator() {
    const [value, setValue] = useState("");
    const [history, setHistory] = useState([]);
    const isOperator = (char) => ["+", "-", "*", "/", "%"].includes(char);

    const append = (char) => {
        setValue((prev) => {
            if (isValidAppend(prev, char)) {
                return prev + char;
            } else {
                return prev;
            }
        });
    };

    const compute = () => {
        try {
            const expression = value.replace(/mod/g, "%");
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

    const isValidAppend = (current, nextChar) => {
        const lastChar = current[current.length - 1];

        if (nextChar === "." && current.match(/\d*\.\d*$/)) {
            return false;
        }

        if (lastChar === "(" && nextChar === ")") {
            return false;
        }

        if (isOperator(lastChar) && isOperator(nextChar)) {
            return false;
        }

        if (lastChar === "(" && isOperator(nextChar) && nextChar !== "-") {
            return false;
        }

        return true;
    };

    return { value, append, compute, history, clear };
}

export default useCalculator;