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
    const [M, N, H] = input[0].split(' ').map(Number);
    const arr = Array.from({length: N}, () => Array.from({length: M}, () => Array(H).fill(0)));
    const tomatoInput = input.slice(1).map(x => x.split(' ').map(Number)).flat();
    const q = new Queue();

    for (let z=0 ; z<H ; z++) {
        for (let x=0 ; x<N ; x++) {
            for (let y=0 ; y<M ; y++) {
                arr[x][y][z] = tomatoInput[z*M*N+x*M+y];
                if (arr[x][y][z] === 1) {
                    q.push([x, y, z]);
                }
            }
        }
    }

    function bfs(ripe) {
        let result = -1;
        const dx = [-1,1,0,0,0,0];
        const dy = [0,0,-1,1,0,0];
        const dz = [0,0,0,0,-1,1];

        while (!ripe.isEmpty()) {
            const len = q.length;

            for (let i=0 ; i<len ; i++) {
                const [x, y, z] = q.pop();
                for (let dir=0 ; dir<6 ; dir++) {
                    const [nx, ny, nz] = [x+dx[dir], y+dy[dir], z+dz[dir]];
                    if (nx < 0 || ny < 0 || nz < 0 || nx >= N || ny >= M || nz >= H) continue;
                    if (arr[nx][ny][nz] !== 0) continue;
                    arr[nx][ny][nz] = 1;
                    q.push([nx, ny, nz]);
                }
            }

            ++result;
        }

        for (let i=0 ; i<N ; i++) {
            for (let j=0 ; j<M ; j++) {
                for (let k=0 ; k<H ; k++) {
                    if (arr[i][j][k] === 0) {
                        return -1;
                    }
                }
            }
        }

        return result;
    }

    return bfs(q);
}

console.log(solve());