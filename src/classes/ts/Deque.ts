import {Stack} from "./Stack";
import {StackElement} from "./Stack";

export class Deque<Type> {
    leftStack: Stack<Type>; //tail
    rightStack: Stack<Type>; //head

    constructor() {
        this.leftStack = new Stack();
        this.rightStack = new Stack();
    }

    isEmpty(): boolean {
        return this.leftStack.isEmpty() && this.rightStack.isEmpty();
    }

    pushBack(value: Type) {
        this.leftStack.push(value);
    }

    popBack(): StackElement<Type> {
        if (!this.leftStack.isEmpty()) {
            return this.leftStack.pop();
        } else {
            let size: number = this.rightStack.size,
                localStack: Stack<Type> = new Stack();

            for (let i = 0; i < Math.floor(size / 2); i++) {
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
    }

    peekBack(): StackElement<Type> | Deque<Type> {
        if (this.isEmpty()) return this;

        if (!this.leftStack.isEmpty()) {
            return this.leftStack.peek();
        } else {
            let currentElement = this.rightStack.top;

            while (currentElement.previous) {
                currentElement = currentElement.previous;
            }

            return currentElement;
        }
    }

    pushFront(value: Type) {
        this.rightStack.push(value);
    }

    popFront(): StackElement<Type> {
        if (!this.rightStack.isEmpty()) {
            return this.rightStack.pop();
        } else {
            let size: number = this.leftStack.size,
                localStack: Stack<Type> = new Stack();

            for (let i = 0; i < Math.floor(size / 2); i++) {
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
    }

    peekFront(): StackElement<Type> | Deque<Type> {
        if (this.isEmpty()) return this;

        if (!this.rightStack.isEmpty()) {
            return this.rightStack.peek();
        } else {
            let currentElement = this.leftStack.top;

            while (currentElement.previous) {
                currentElement = currentElement.previous;
            }

            return currentElement;
        }
    }

    clear(): Deque<Type> {
        if (this.isEmpty()) return this;

        this.leftStack.clear();
        this.rightStack.clear();

        return this;
    }
}