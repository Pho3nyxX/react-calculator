import { useState } from "react";
import { calculate } from "../utils/calculate";

function useCalculator() {
    const [value, setValue] = useState("");

    const append = (char) => {
        setValue((prev) => prev + char);
    };

    const compute = () => {
        try {
            const result = eval(value);
            setValue(String(result));
        } catch {
            setValue("Error");
        }
    };

    return { value, append, compute };
}

export default useCalculator;