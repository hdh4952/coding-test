const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

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
    const [M, N] = input[0].split(' ').map(Number);
    const box = input.slice(1).map(x => x.split(' ').map(Number));

    function bfs(ripe) {
        let days = -1;
        const dx = [-1, 1, 0, 0];
        const dy = [0, 0, -1, 1];

        const ripeTomatoes = new Queue();
        ripe.forEach((coord) => {
            ripeTomatoes.push(coord);
        });

        while (!ripeTomatoes.isEmpty()) {
            const len = ripeTomatoes.length;

            for (let i=0 ; i<len ; i++) {
                const [x, y] = ripeTomatoes.pop();
                
                for (let dir=0 ; dir<4 ; dir++) {
                    const [nx, ny] = [x+dx[dir], y+dy[dir]];
                    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
                    if (box[nx][ny] === 0) {
                        box[nx][ny] = 1;
                        ripeTomatoes.push([nx, ny]);
                    }
                }
            }
            ++days;
        }

        for (let i=0 ; i<N ; i++) {
            for (let j=0 ; j<M ; j++) {
                if (box[i][j] === 0) {
                    return -1;
                }
            }
        }

        return days;
    }

    const ripe = [];
    
    for (let i=0 ; i<N ; i++) {
        for (let j=0 ; j<M ; j++) {
            if (box[i][j] === 1) {
                ripe.push([i, j]);
            }
        }
    }

    return bfs(ripe);
} 

console.log(solve());