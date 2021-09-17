"use strict";
exports.__esModule = true;
exports.Deque = void 0;
var Stack_1 = require("./Stack");
var Deque = /** @class */ (function () {
    function Deque() {
        this.leftStack = new Stack_1.Stack();
        this.rightStack = new Stack_1.Stack();
    }
    Deque.prototype.pushBack = function (value) {
        this.leftStack.push(value);
    };
    Deque.prototype.isEmpty = function () {
        return this.leftStack.isEmpty() && this.rightStack.isEmpty();
    };
    Deque.prototype.peekBack = function () {
        if (this.isEmpty())
            return this;
        if (!this.leftStack.isEmpty()) {
            return this.leftStack.peek();
        }
        else {
            var currentElement = this.rightStack.top;
            while (currentElement.previous) {
                currentElement = currentElement.previous;
            }
            return currentElement;
        }
    };
    Deque.prototype.peekFront = function () {
        if (this.isEmpty())
            return this;
        if (!this.rightStack.isEmpty()) {
            return this.rightStack.peek();
        }
        else {
            var currentElement = this.leftStack.top;
            while (currentElement.previous) {
                currentElement = currentElement.previous;
            }
            return currentElement;
        }
    };
    Deque.prototype.popBack = function () {
        if (!this.leftStack.isEmpty()) {
            return this.leftStack.pop();
        }
        else {
            var size = this.rightStack.size, localStack = new Stack_1.Stack();
            for (var i = 0; i < Math.floor(size / 2); i++) {
                localStack.push(this.rightStack.pop().value);
            }
            while (!this.rightStack.isEmpty()) {
                this.leftStack.push(this.rightStack.pop().value);
            }
            while (!localStack.isEmpty()) {
                this.rightStack.push(localStack.pop().value);
            }
        }
        return this.leftStack.pop();
    };
    Deque.prototype.pushFront = function (value) {
        this.rightStack.push(value);
    };
    Deque.prototype.popFront = function () {
        if (!this.rightStack.isEmpty()) {
            return this.rightStack.pop();
        }
        else {
            var size = this.leftStack.size, localStack = new Stack_1.Stack();
            for (var i = 0; i < Math.floor(size / 2); i++) {
                localStack.push(this.leftStack.pop().value);
            }
            while (!this.leftStack.isEmpty()) {
                this.rightStack.push(this.leftStack.pop().value);
            }
            while (!localStack.isEmpty()) {
                this.leftStack.push(localStack.pop().value);
            }
        }
        return this.rightStack.pop();
    };
    Deque.prototype.clear = function () {
        if (this.isEmpty())
            return this;
        this.leftStack.clear();
        this.rightStack.clear();
        return this;
    };
    return Deque;
}());
exports.Deque = Deque;
