import { useState } from "react";
import { calculate } from "../utils/calculate";

function useCalculator() {
    const [value, setValue] = useState("");

    const append = (char) => {
        setValue((prev) => prev + char);
    };

    return { value, append };
}

export default useCalculator;