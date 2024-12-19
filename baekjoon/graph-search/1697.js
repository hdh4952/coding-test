const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();

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

function solve() {
    const [N, K] = input.split(' ').map(Number);
    const vis = Array(100_001).fill(false);

    const locates = new Queue();
    vis[N] = true;
    locates.push(N);

    let result = 0;
    while (!locates.isEmpty()) {
        const len = locates.length;

        for (let i=0 ; i<len ; i++) {
            const now = locates.pop();

            if (now === K) {
                return result;
            }

            [now-1, now+1, now*2].forEach(next => {
                if (next < 0 || 100_000 < next) return;
                if (vis[next]) return;
                vis[next] = true;
                locates.push(next);
            });
        }

        ++result;
    }
} 

console.log(solve());