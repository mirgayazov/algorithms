"use strict";
exports.__esModule = true;
var fs = require("fs");
var Stack_1 = require("../classes/ts/Stack");
function generateCode(operator) {
    return "stack.top.previous.value " + operator + "= stack.pop().value";
}
function main() {
    var expressions = fs.readFileSync('../common/postfix.txt', 'utf8').split('\r\n'), stack = new Stack_1.Stack(), operations = '+-*'.split('');
    for (var _i = 0, expressions_1 = expressions; _i < expressions_1.length; _i++) {
        var expression = expressions_1[_i];
        for (var i = 0; i < expression.length; i++) {
            if (operations.includes(expression[i])) {
                if (stack.top.isLocked) {
                    while (stack.top.previous) {
                        eval(generateCode(expression[i]));
                    }
                }
                else {
                    while (stack.top.previous && !stack.top.previous.isLocked) {
                        eval(generateCode(expression[i]));
                    }
                    stack.top.isLocked = true;
                }
            }
            else {
                stack.push(Number(expression[i]));
            }
        }
        console.log(expression + " = " + stack.pop().value);
    }
}
main();
