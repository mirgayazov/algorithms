import * as fs from 'fs';
import {StackElement, Stack} from "../classes/ts/Stack";

function checkBracketsType(currentBracket: string, topElement: StackElement<string>): boolean {
    if (currentBracket === ')' && topElement.value === '(') return true;
    if (currentBracket === ']' && topElement.value === '[') return true;

    return currentBracket === '}' && topElement.value === '{';
}

function main(): void {
    let expressions: string[] = fs.readFileSync('../common/expressions.txt', 'utf8').split('\r\n'),
        openBracketsArray: string[] = ['(', '{', '['],
        closingBracketsArray: string[] = [')', '}', ']'];

    for (const expression of expressions) {
        let expressionCorrectness: boolean = true,
            stack: Stack<string> = new Stack();

        for (let i = 0; i < expression.length; i++) {
            if (openBracketsArray.includes(expression[i])) {
                stack.push(expression[i]);
            } else if (closingBracketsArray.includes(expression[i]) &&
                stack.size !== 0 && checkBracketsType(expression[i], stack.top)) {
                stack.pop();
            }
        }

        if (stack.size !== 0) expressionCorrectness = false;
        console.log(`${expression} -> ${expressionCorrectness}`);
    }
}

main();