import { useState } from "react";
import { evaluate } from "../utils/evaluate";

function useCalculator() {
    const [value, setValue] = useState("");
    const [history, setHistory] = useState([]);

    const append = (char) => {
        setValue((prev) => prev + char);
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

    return { value, append, compute, history, clear };
}

export default useCalculator;