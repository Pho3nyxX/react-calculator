function tokenize(expr) {
    const tokens = [];
    let number = "";

    for (let i = 0; i < expr.length; i++) {
        const char = expr[i];
        const prev = expr[i - 1];

        if (expr.slice(i, i + 4) === "sqrt") {
            if (number) {
                tokens.push(number);
                number = "";
            }
            tokens.push("sqrt");
            i += 3;
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

    postfix.forEach((token) => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));

        } else if (token === "sqrt") {
            const n = stack.pop();
            stack.push(Math.sqrt(n));

        } else if (token === "%") {
            const n = stack.pop();
            stack.push(n / 100);
            
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
            .replace(/√/g, "sqrt");

        const tokens = tokenize(expr);
        const postfix = toPostfix(tokens);
        return evaluatePostfix(postfix);
    } catch {
        return "Error";
    }
}