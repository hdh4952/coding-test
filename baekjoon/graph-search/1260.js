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
    const [N, M, V] = input[0].split(' ').map(Number);
    const adj = input.slice(1).reduce((acc, cur) => {
        const [a, b] = cur.split(' ').map(Number);
        acc[a].push(b);
        acc[b].push(a);
        return acc;
    }, Array.from({length: N+1}, () => []));

    for (let i=1 ; i<=N ; i++) {
        adj[i] = adj[i].sort((a, b) => a - b);
    }

    const dfsResult = [];
    const bfsResult = [];

    function dfs(now, vis) {
        vis[now] = true;
        dfsResult.push(now);
        for (const next of adj[now]) {
            if (vis[next]) continue;
            dfs(next, vis);
        }
    }

    function bfs(start) {
        const vis = Array(N+1).fill(false);
        const q = new Queue();
        q.push(start);
        vis[start] = true;

        while (!q.isEmpty()) {
            const len = q.length;
            for (let i=0 ; i<len ; i++) {
                const now = q.front(); q.pop();
                bfsResult.push(now);

                for (const next of adj[now]) {
                    if (vis[next]) continue;
                    vis[next] = true;
                    q.push(next);
                }
            }
        }
    }

    dfs(V, Array(N+1).fill(false));
    bfs(V);

    return [dfsResult.join(' '), bfsResult.join(' ')].join('\n');
}

console.log(solve());