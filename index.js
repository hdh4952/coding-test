const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function getOrder(k, arr) {
    const cntDocs = Array(10).fill(0);
    arr.forEach(x => cntDocs[x]++);

    function countHigher(importance) {
        let result = 0;
        for (let i=importance+1 ; i<=9 ; i++) {
            result += cntDocs[i];
        }
        return result;
    }

    const q = new Queue();
    arr.forEach((importance, idx) => q.push({importance, idx}));

    let result = 0;
    while (true) {
        const {importance, idx} = q.pop();
        if (countHigher(importance) !== 0) {
            q.push({importance, idx});
        } else {
            cntDocs[importance]--;
            result++;
            if (idx === k) {
                return result;
            }
        }
    }
}

function solve() {
    let readIdx = 0;
    const t = +input[readIdx++];

    const result = [];
    for (let i=0 ; i<t ; i++) {
        const [N, M] = input[readIdx++].split(' ').map(Number);
        const arr = input[readIdx++].split(' ').map(Number);
        result.push(getOrder(M, arr));
    }

    return result.join('\n');
}

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

console.log(solve());