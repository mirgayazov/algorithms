import * as fs from 'fs';
import {Stack} from "../classes/ts/Stack";

function generateCode(operator: string): string {
    return `stack.top.previous.value ${operator}= stack.pop().value`;
}

function main(): void {
    let expressions: string[] = fs.readFileSync('../common/postfix.txt', 'utf8').split('\r\n'),
        stack: Stack<number> = new Stack(),
        operations: string[] = '+-*'.split('');

    for (const expression of expressions) {
        for (let i = 0; i < expression.length; i++) {
            if (operations.includes(expression[i])) {
                if (stack.top.isLocked) {
                    while (stack.top.previous) {
                        eval(generateCode(expression[i]));
                    }
                } else {
                    while (stack.top.previous && !stack.top.previous.isLocked) {
                        eval(generateCode(expression[i]));
                    }

                    stack.top.isLocked = true;
                }
            } else {
                stack.push(Number(expression[i]));
            }
        }

        console.log(`${expression} = ${stack.pop().value}`);
    }
}

main();