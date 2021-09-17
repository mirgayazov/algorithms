export class StackElement<Type> {
    value: Type;
    previous: StackElement<Type> | null;
    isLocked: boolean;

    constructor(value: Type, previous: StackElement<Type> = null, isLocked: boolean = false) {
        this.value = value;
        this.isLocked = isLocked;
        this.previous = previous;
    }
}

export class Stack<Type> {
    top: StackElement<Type> | null;
    size: number;

    constructor() {
        this.top = null;
        this.size = 0;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    push(value: Type): StackElement<Type> {
        this.top = new StackElement(value, this.top);
        this.size++;

        return this.top;
    }

    pop(): StackElement<Type> {
        let deletedElement = this.top;

        this.top = this.top.previous;
        this.size--;

        return deletedElement;
    }

    peek(): StackElement<Type> {
        return this.top;
    }

    clear(): Stack<Type> {
        while (this.size) {
            this.pop();
        }

        return this;
    }
}