const readlineSync = require('readline-sync');

class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

    toString() {
        return `${this.value}`;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);

        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(value) {
        const newNode = new LinkedListNode(value);

        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this.tail.next = newNode;

        this.tail = newNode;

        return this;
    }

    certainPosition(value, position) {
        if (position < 0) return;

        let currentNode = this.head,
            previousNode = this.head,
            i = 0;

        while (currentNode) {
            if (i === position) break;
            previousNode = currentNode;
            currentNode = currentNode.next;
            i++;
        }

        previousNode.next = new LinkedListNode(value, currentNode);

        return this;
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

    clear() {
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.next) {
                this.head = currentNode.next;
            } else {
                this.head = currentNode.next;
                this.tail = null;
            }
            currentNode = currentNode.next;
        }

        return this;
    }

    findNumber(value) {
        let num = 0;
        let currentNode = this.head;
        while (currentNode.value !== value) {
            currentNode = currentNode.next;
            num++;
        }
        return num;
    }

    deleteNodeByNumber(number) {
        let num = 0,
            currentNode = this.head,
            previousNode = this.head;

        while (num !== Number(number)) {
            previousNode = currentNode;
            currentNode = currentNode.next;
            num++;
        }

        if (currentNode === this.head) {
            this.head = currentNode.next;
        } else if (currentNode === this.tail) {
            previousNode.next = null;
            this.tail = previousNode;
        } else {
            previousNode.next = currentNode.next;
        }

        return this;
    }

    deleteNodeByValue(value) {
        let currentNode = this.head,
            previousNode = this.head;

        while (currentNode) {
            if (currentNode.value === value) {
                if (currentNode === this.head) {
                    this.head = currentNode.next;
                } else if (currentNode === this.tail) {
                    previousNode.next = null;
                    currentNode = null;
                    this.tail = previousNode;
                } else {
                    previousNode.next = currentNode.next;
                    currentNode = currentNode.next;
                    // break; удалить первый попавшийся
                }
            } else {
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
        }

        return this;
    }
}

let list = new LinkedList(),
    sentence = 'Hello World.',
    dialog = true;

for (const letter of sentence) {
    list.append(letter);
}

while (dialog) {
    let value = null,
        code = readlineSync.question(`--------------------------Введите--------------------------
1.Добавление элемента в конец списка.
2.Добавление элемента в начало списка.
3.Добавление элемента в определенную позицию.
4.Удаление элемента по его значению.
5.Удаление элемента по его номеру в односвязном списке.
6.Очистка списка.
7.Поиска номера элемента в списке.
8.Просмотр списка.
Любую клавишу для выхода.
-> `);
    switch (code) {
        case '1':
            value = readlineSync.question('Введите элемент для добавления\n-> ');
            list.append(value);
            break;
        case '2':
            value = readlineSync.question('Введите элемент для добавления\n-> ');
            list.prepend(value);
            break;
        case '3':
            value = readlineSync.question('Введите элемент для добавления\n-> ');
            let position = readlineSync.question('Введите позицию для добавления\n-> ');
            list.certainPosition(value, Number(position));
            break;
        case '4':
            value = readlineSync.question('Введите элемент для удаления\n-> ');
            list.deleteNodeByValue(value);
            break;
        case '5':
            value = readlineSync.question('Введите номер элемента для удаления\n-> ');
            list.deleteNodeByNumber(value);
            break;
        case '6':
            console.log(list.clear());
            break;
        case '7':
            value = readlineSync.question('Введите элемент для поиска его номера\n-> ');
            console.log(list.findNumber(value));
            break;
        case '8':
            console.log(list.toString());
            break;
        default:
            dialog = false;
            break;
    }
}