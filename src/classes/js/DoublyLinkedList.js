const readlineSync = require('readline-sync');
const process = require('process');
process.stdin.setRawMode(true);


class DoublyLinkedListNode {
    constructor(value = null, next = null, previous = null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }

    toString() {
        return `${this.value}`
        // return `{${this.previous ? this.previous.value : null}|${this.value}|${this.next ? this.next.value : null}}`;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(value) {
        const newNode = new DoublyLinkedListNode(value, this.head);

        if (this.head) {
            this.head.previous = newNode;
        }

        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(value) {
        const newNode = new DoublyLinkedListNode(value);

        if (this.tail) {
            this.tail.next = newNode;
        }

        newNode.previous = this.tail;

        this.tail = newNode;

        if (!this.head) {
            this.head = newNode;
        }

        return this;
    }

    delete(value) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.value === value) {
                deletedNode = currentNode;

                if (deletedNode === this.head) {
                    this.head = deletedNode.next;

                    if (this.head) {
                        this.head.previous = null;
                    }

                    if (deletedNode === this.tail) {
                        this.tail = null;
                    }
                } else if (deletedNode === this.tail) {
                    this.tail = deletedNode.previous;
                    this.tail.next = null;
                } else {
                    const previousNode = deletedNode.previous;
                    const nextNode = deletedNode.next;
                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }
            }

            currentNode = currentNode.next;
        }

        return deletedNode;
    }

    find(value) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            if (value !== undefined && currentNode.value === value) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    clear() {
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.next) {
                this.head = currentNode.next;
                currentNode.next.previous = null;
            } else {
                this.head = currentNode.next;
                this.tail = null;
            }
            currentNode = currentNode.next;
        }

        return this;
    }

    deleteTail() {
        if (this.tail) {
            const deletedTail = this.tail;
            if (this.tail.previous) {
                this.tail = this.tail.previous;
                this.tail.next = null;
            } else {
                this.head = null;
                this.tail = null;
            }
            return deletedTail;
        } else {
            return null;
        }
    }

    deleteHead() {
        if (this.head) {
            const deletedHead = this.head;
            if (this.head.next) {
                this.head = this.head.next;
                this.head.previous = null;
            } else {
                this.head = null;
                this.tail = null;
            }
            return deletedHead;
        } else {
            return null;
        }
    }

    toArray() {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    }

    toString() {
        return this.toArray().map(node => node.toString()).join('');
    }

}

function getRandomDouble(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Number((Math.random() * (max - min) + min).toFixed(4));
}

function copyList(list) {
    let newList = new DoublyLinkedList(),
        nodesArray = list.toArray();

    for (const nodesArrayElement of nodesArray) {
        newList.append(nodesArrayElement.value);
    }

    return newList;
}

function task1(list, n) {
    let arr = [],
        sum = 0,
        _copyList = copyList(list);

    for (let i = 0; i < Number(n); i++) {
        let currentHead = _copyList.deleteHead(),
            currentTail = _copyList.deleteTail();

        arr.push(Math.min(currentHead.value, currentTail.value));
    }

    for (const arrElement of arr) {
        sum += arrElement;
    }

    return sum / Number(n);
}

function task2(list) {
    let punctuation = ',;:!?-"()'.split('');
    console.log(`Введите предложение: ${list.toString()}`);

    process.stdin.on('data', input => {
        if (String(input) === '.') {
            process.exit(1);
        } else if (punctuation.includes(String(input))) {
            if (list.tail.previous) {
                let newTail = new DoublyLinkedListNode(String(input), null, list.tail.previous);
                list.tail.previous.next = newTail;
                list.tail = newTail;
            } else {
                let newTail = new DoublyLinkedListNode(String(input), null, null);
                list.head = newTail;
                list.tail = newTail;
            }
        } else {
            list.append(String(input));
        }
        console.clear();
        console.log(`Введите предложение: ${list.toString()}`);
    });

    process.on('exit', (code) => {
        list.append('.');
        console.clear();
        console.log(`Введите предложение: ${list.toString()}`);
    });
}

function main() {
    // let list = new DoublyLinkedList(),
    //     n = readlineSync.question(`Введите n:\n-> `);
    //
    // for (let i = 0; i < 2 * n; i++) {
    //     list.append(getRandomDouble(0, 100));
    // }
    //
    // console.log(task1(list, n));
    // console.log(list.toString());

    //-----------------------------

    let list2 = new DoublyLinkedList();
    task2(list2);
}


main();