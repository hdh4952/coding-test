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
    const [N, M] = input[0].split(' ').map(Number);
    const arr = input.slice(1).map(x => x.split(' ').map(Number));

    const start = (() => {
        for (let i=0 ; i<N ; i++) {
            for (let j=0 ; j<M ; j++) {
                if (arr[i][j] === 2) {
                    return [i, j];
                }
            }
        }
    })();

    function bfs() {
        const dx = [-1, 1, 0, 0];
        const dy = [0, 0, -1, 1];
        const q = new Queue();
        const result = Array.from({length: N}, () => Array(M).fill(-1));
        const vis = Array.from({length: N}, () => Array(M).fill(0));
        
        for (let i=0 ; i<N ; i++) {
            for (let j=0 ; j<M ; j++) {
                if (!arr[i][j]) {
                    result[i][j] = 0;
                }
            }
        }

        q.push(start);
        vis[start[0]][start[1]] = true;
        let count = 0;

        while (!q.isEmpty()) {
            const len = q.length;
            
            for(let i=0 ; i<len ; i++) {
                const [x, y] = q.pop();
                result[x][y] = count;

                for (let dir=0 ; dir<4 ; dir++) {
                    const [nx, ny] = [x+dx[dir], y+dy[dir]];
                    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
                    if (vis[nx][ny] || !arr[nx][ny]) continue;
                    q.push([nx, ny]);
                    vis[nx][ny] = true;
                }
            }

            count++;
        }

        return result;
    }

    const result = bfs();

    return result.map(col => col.join(' ')).join('\n');
} 

console.log(solve());