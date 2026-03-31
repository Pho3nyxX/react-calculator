function tokenize(expr) {
    const tokens = [];
    let number = "";
    const functions = ["sqrt", "sin", "cos", "tan", "log", "ln"];

    for (let i = 0; i < expr.length; i++) {
        const char = expr[i];
        const prev = expr[i - 1];

        const matchedFn = functions.find(fn =>
            expr.slice(i, i + fn.length) === fn
        );

        if (matchedFn) {
            if (number) {
                tokens.push(number);
                number = "";
            }

            tokens.push(matchedFn);
            i += matchedFn.length - 1;
            continue;
        }

        if (/\d|\./.test(char)) {
            number += char;
        } else {
            if (number) {
                tokens.push(number);
                number = "";
            }

            if (
                char === "-" &&
                (i === 0 || "+-*/%(".includes(prev))
            ) {
                number = "-";
            } else {
                tokens.push(char);
            }
        }
    }

    if (number) tokens.push(number);
    return tokens;
}

const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
};

function toPostfix(tokens) {
    const output = [];
    const operators = [];

    tokens.forEach((token) => {
        if (!isNaN(token)) {
            output.push(token);

        } else if (token === "(") {
            operators.push(token);

        } else if (token === ")") {
            while (operators.length && operators[operators.length - 1] !== "(") {
                output.push(operators.pop());
            }
            operators.pop();
        }
        else {
            while (
                operators.length &&
                precedence[operators[operators.length - 1]] >= precedence[token]
            ) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    });

    while (operators.length) {
        output.push(operators.pop());
    }

    return output;
}

function evaluatePostfix(postfix) {
    const stack = [];
    const toRadians = (deg) => deg * (Math.PI / 180);

    postfix.forEach((token) => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));

        } else if (token === "sqrt") {
            const n = stack.pop();
            stack.push(Math.sqrt(n));

        } else if (token === "%") {
            const n = stack.pop();
            stack.push(n / 100);

        } else if (token === "sin") {
            const n = stack.pop();
            stack.push(Math.sin(toRadians(n)));

        } else if (token === "cos") {
            const n = stack.pop();
            stack.push(Math.cos(toRadians(n)));

        } else if (token === "tan") {
            const n = stack.pop();
            stack.push(Math.tan(toRadians(n)));

        } else if (token === "log") {
            const n = stack.pop();
            stack.push(Math.log10(n));

        } else if (token === "ln") {
            const n = stack.pop();
            stack.push(Math.log(n));

        } else {
            const b = stack.pop();
            const a = stack.pop();

            switch (token) {
                case "+": stack.push(a + b); break;
                case "-": stack.push(a - b); break;
                case "*": stack.push(a * b); break;
                case "/": stack.push(a / b); break;
                case "mod": stack.push(a % b); break;
            }
        }
    });

    return stack[0];
}

export function evaluate(expression) {
    try {
        let expr = expression
            .replace(/mod/g, "mod")
            .replace(/÷/g, "/")
            .replace(/π/g, `${Math.PI}`)
            .replace(/(\d+)²/g, "($1*$1)")
            .replace(/√/g, "sqrt")
            .replace(/sin/g, "sin")
            .replace(/cos/g, "cos")
            .replace(/tan/g, "tan")
            .replace(/log/g, "log")
            .replace(/ln/g, "ln")

        const tokens = tokenize(expr);
        const postfix = toPostfix(tokens);
        return evaluatePostfix(postfix);
    } catch {
        return "Error";
    }
}