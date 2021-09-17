"use strict";
exports.__esModule = true;
var Deque_1 = require("../classes/ts/Deque");
function main() {
    var deque = new Deque_1.Deque();
    for (var i = 5; i >= 1; i--) {
        deque.pushFront(i);
    }
    deque.popFront();
    for (var i = 6; i <= 10; i++) {
        deque.pushBack(i);
    }
    deque.popBack();
    console.log(deque.peekFront());
    console.log(deque.clear());
}
main();
