const fs = require('fs');
const [input1, ...input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, M] = input1.split(' ').map(Number);
const graph = input2.map(x => x.split(' ').map(Number));
const INF = Number.MAX_SAFE_INTEGER;

function bellmanFord(start) {
    const dist = Array(N+1).fill(INF);
    dist[start] = 0;

    for (let i=0 ; i<N-1 ; i++) {
        graph.forEach(([now, nxt, cost]) => {
            if (dist[now] !== INF && dist[now] + cost < dist[nxt]) {
                dist[nxt] = dist[now] + cost;
            }
        });
    }

    const hasNegative = graph.some(([now, nxt, cost]) => {
        if (dist[now] !== INF && dist[now] + cost < dist[nxt]) {
            return true;
        }
    });

    if (hasNegative) {
        return [-1];
    }

    return dist.slice(2).map(d => d === INF ? -1 : d);
}

function solve() {
    const result = bellmanFord(1);
    return result.join('\n');
}

console.log(solve());