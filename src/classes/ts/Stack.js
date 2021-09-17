"use strict";
exports.__esModule = true;
exports.Stack = exports.StackElement = void 0;
var StackElement = /** @class */ (function () {
    function StackElement(value, previous, isLocked) {
        if (previous === void 0) { previous = null; }
        if (isLocked === void 0) { isLocked = false; }
        this.value = value;
        this.isLocked = isLocked;
        this.previous = previous;
    }
    return StackElement;
}());
exports.StackElement = StackElement;
var Stack = /** @class */ (function () {
    function Stack() {
        this.top = null;
        this.size = 0;
    }
    Stack.prototype.isEmpty = function () {
        return this.size === 0;
    };
    Stack.prototype.push = function (value) {
        this.top = new StackElement(value, this.top);
        this.size++;
        return this.top;
    };
    Stack.prototype.pop = function () {
        var deletedElement = this.top;
        this.top = this.top.previous;
        this.size--;
        return deletedElement;
    };
    Stack.prototype.peek = function () {
        return this.top;
    };
    Stack.prototype.clear = function () {
        while (this.size) {
            this.pop();
        }
        return this;
    };
    return Stack;
}());
exports.Stack = Stack;
