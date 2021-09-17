export class QueueElement<Type> {
    value: Type;
    next: QueueElement<Type> | null;

    constructor(value: Type, next: QueueElement<Type> = null) {
        this.value = value;
        this.next = next;
    }
}

export class Queue<Type> {
    first: QueueElement<Type> | null;
    size: number;

    constructor() {
        this.first = null;
        this.size = 0;
    }

    isEmpty(): boolean {
        return !this.first;
    }

    enqueue(value): QueueElement<Type> {
        let newQueueElement = new QueueElement(value);

        if (!this.first) {
            this.first = newQueueElement;
        } else {
            let currentQueueElement: QueueElement<Type> = this.first;

            while (currentQueueElement.next) {
                currentQueueElement = currentQueueElement.next;
            }

            currentQueueElement.next = newQueueElement;
        }

        this.size++;

        return newQueueElement;
    }

    dequeue(): QueueElement<Type> {
        let deletedElement: QueueElement<Type> = this.first;

        this.first = this.first.next;
        this.size--;

        return deletedElement;
    }

    peek(): QueueElement<Type> {
        return this.first;
    }

    clear() {
        let currentQueueElement: QueueElement<Type> = this.first;

        while (currentQueueElement.next) {
            currentQueueElement = currentQueueElement.next;
            this.first = currentQueueElement;
            this.size--;
        }

        this.first = null;
        this.size--;

        return this;
    }

    toString(): string {
        if (this.isEmpty()) return '<no cards>';

        let currentQueueElement: QueueElement<Type> = this.first,
            str: string = '';

        while (currentQueueElement.next) {
            str += `${currentQueueElement.value} # `;
            currentQueueElement = currentQueueElement.next;
        }

        str += currentQueueElement.value;

        return str;
    }
}