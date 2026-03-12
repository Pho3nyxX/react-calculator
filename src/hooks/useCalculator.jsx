import { useState } from "react";

function useCalculator(){
    const [value, setValue] = useState("");

    const appendNumber = (num) => {
        setValue((prev) => prev + num);
    }

    return{value, appendNumber};
}

export default useCalculator;