class Queue {
    #head;
    #tail;
    #size;

    constructor() {
        this.#head = this.#tail = null;
        this.#size = 0;
    }

    get length() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    push(value) {
        const node = new Node(value);
        if (!this.#head) {
            this.#head = node;
        }
        if (this.#tail) {
            this.#tail.next = node;
        }
        this.#tail = node;
        this.#size++;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Error: Cannot pop from an empty queue.')
        }
        const ret = this.#head.value;
        this.#head = this.#head.next;
        if (!this.#head) {
            this.#tail = null;
        }
        this.#size--;
        return ret;
    }

    front() {
        if (!this.#head) {
            throw new Error('Error: Cannot access the front element of an empty queue.');
        }
        return this.#head.value;
    }
}

class Node {
    value;
    next;

    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

module.exports = Queue;