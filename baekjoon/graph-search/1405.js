const fs = require('fs');
const [N, east, west, south, north] = fs.readFileSync(0, 'utf-8').trim().split(' ').map(Number);

const arr = Array.from(Array(2*N+1), () => Array(2*N+1).fill(0));
const paths = [];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const prob = [west, east, north, south];
let sum = 0;

function dfs(x, y, cnt, p, vis) {
    if (cnt === 0) {
        return;
    } 

    for (let dir=0 ; dir<4 ; dir++) {
        const [nx, ny] = [x + dx[dir], y + dy[dir]];
        if (vis[nx][ny]) {
            sum += p * prob[dir];
            continue;
        }
        vis[x][y] = true;
        dfs(nx, ny, cnt-1, p * prob[dir] / 100, vis);
        vis[x][y] = false;
    }
}

function solve() {
    dfs(N, N, N, 1, Array.from(Array(2*N+1), () => Array(2*N+1).fill(false)));
    return 1 - (sum / 100);
}

console.log(solve());