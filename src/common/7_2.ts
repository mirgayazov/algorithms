import {Deque} from "../classes/ts/Deque";

function main(): void {
    let deque: Deque<number> = new Deque();

    for (let i = 5; i >= 1; i--) {
        deque.pushFront(i);
    }

    deque.popFront();

    for (let i = 6; i <= 10; i++) {
        deque.pushBack(i);
    }
    deque.popBack();

    console.log(deque.peekFront());
    console.log(deque.clear());
}

main();