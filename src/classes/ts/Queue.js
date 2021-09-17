"use strict";
exports.__esModule = true;
exports.Queue = exports.QueueElement = void 0;
var QueueElement = /** @class */ (function () {
    function QueueElement(value, next) {
        if (next === void 0) { next = null; }
        this.value = value;
        this.next = next;
    }
    return QueueElement;
}());
exports.QueueElement = QueueElement;
var Queue = /** @class */ (function () {
    function Queue() {
        this.first = null;
        this.size = 0;
    }
    Queue.prototype.enqueue = function (value) {
        var newQueueElement = new QueueElement(value);
        if (!this.first) {
            this.first = newQueueElement;
        }
        else {
            var currentQueueElement = this.first;
            while (currentQueueElement.next) {
                currentQueueElement = currentQueueElement.next;
            }
            currentQueueElement.next = newQueueElement;
        }
        this.size++;
        return newQueueElement;
    };
    Queue.prototype.dequeue = function () {
        var deletedElement = this.first;
        this.first = this.first.next;
        this.size--;
        return deletedElement;
    };
    Queue.prototype.peek = function () {
        return this.first;
    };
    Queue.prototype.clear = function () {
        var currentQueueElement = this.first;
        while (currentQueueElement.next) {
            currentQueueElement = currentQueueElement.next;
            this.first = currentQueueElement;
            this.size--;
        }
        this.first = null;
        this.size--;
        return this;
    };
    Queue.prototype.isEmpty = function () {
        return !this.first;
    };
    Queue.prototype.toString = function () {
        if (this.isEmpty())
            return '<no cards>';
        var currentQueueElement = this.first, str = '';
        while (currentQueueElement.next) {
            str += currentQueueElement.value + " # ";
            currentQueueElement = currentQueueElement.next;
        }
        str += currentQueueElement.value;
        return str;
    };
    return Queue;
}());
exports.Queue = Queue;
