const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const INF = 10000;
    const N = +input[0];
    const adj = input.slice(1).map(s => s.split(' ').map(Number));

    for (let i=0 ; i<N ; i++) {
        for (let j=0 ; j<N ; j++) {
            if (adj[i][j] === 0)
                adj[i][j] = INF;
        }
    }

    for (let k=0 ; k<N ; k++) {
        for (let i=0 ; i<N ; i++) {
            for (let j=0 ; j<N ; j++) {
                adj[i][j] = Math.min(adj[i][j], adj[i][k] + adj[k][j]);
            }
        }
    }

    for (let i=0 ; i<N ; i++) {
        for (let j=0 ; j<N ; j++) {
            if (adj[i][j] !== INF)
                adj[i][j] = 1;
            else 
                adj[i][j] = 0;
        }
    }

    return adj.map(arr => arr.join(' ')).join('\n');
}

console.log(solve());