function tokenize(expr) {
    return expr.match(/(\d+(\.\d+)?|[+\-*/()%])/g);
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
        } else {
            const b = stack.pop();
            const a = stack.pop();

            switch (token) {
                case "+": stack.push(a + b); break;
                case "-": stack.push(a - b); break;
                case "*": stack.push(a * b); break;
                case "/": stack.push(a / b); break;
                case "%": stack.push(a % b); break;
            }
        }
    });

    return stack[0];
}

export function evaluate(expression) {
    try {
        const tokens = tokenize(expression);
        const postfix = toPostfix(tokens);
        return evaluatePostfix(postfix);
    } catch {
        return "Error";
    }
}