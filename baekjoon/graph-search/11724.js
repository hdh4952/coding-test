const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const [N, M] = input[0].split(' ').map(Number);
    const adj = Array.from({length: N+1}, () => []);
    const vis = Array(N+1).fill(false);

    input.slice(1).map(x => x.split(' ').map(Number)).forEach(([u, v]) => {
        adj[u].push(v);
        adj[v].push(u);
    });

    function dfs(now) {
        vis[now] = true;
        for (const nxt of adj[now]) {
            if (vis[nxt]) continue;
            dfs(nxt);
        }
    }

    let result = 0;
    for (let i=1 ; i<=N ; i++) {
        if (!vis[i]) {
            result++;
            dfs(i);
        }
    }

    return result;
} 

console.log(solve());