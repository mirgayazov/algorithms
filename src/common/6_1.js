"use strict";
exports.__esModule = true;
var fs = require("fs");
var Stack_1 = require("../classes/ts/Stack");
function checkBracketsType(currentBracket, topElement) {
    if (currentBracket === ')' && topElement.value === '(')
        return true;
    if (currentBracket === ']' && topElement.value === '[')
        return true;
    return currentBracket === '}' && topElement.value === '{';
}
function main() {
    var expressions = fs.readFileSync('../common/expressions.txt', 'utf8').split('\r\n'), openBracketsArray = ['(', '{', '['], closingBracketsArray = [')', '}', ']'];
    for (var _i = 0, expressions_1 = expressions; _i < expressions_1.length; _i++) {
        var expression = expressions_1[_i];
        var expressionCorrectness = true, stack = new Stack_1.Stack();
        for (var i = 0; i < expression.length; i++) {
            if (openBracketsArray.includes(expression[i])) {
                stack.push(expression[i]);
            }
            else if (closingBracketsArray.includes(expression[i]) &&
                stack.size !== 0 && checkBracketsType(expression[i], stack.top)) {
                stack.pop();
            }
        }
        if (stack.size !== 0)
            expressionCorrectness = false;
        console.log(expression + " -> " + expressionCorrectness);
    }
}
main();
