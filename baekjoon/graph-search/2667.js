const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const N = +input[0];
    const arr = input.slice(1).map(s => s.split('').map(Number));
    const vis = Array.from({length: N}, () => Array(N).fill(false));
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    function dfs(x, y, vis) {
        vis[x][y] = true;

        let result = 1;
        for (let dir=0 ; dir<4 ; dir++) {
            const [nx, ny] = [x+dx[dir], y+dy[dir]];
            if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
            if (vis[nx][ny] || !arr[nx][ny]) continue;
            result += dfs(nx, ny, vis);
        }

        return result;
    }

    let result = 0;
    const cnt = [];
    for (let i=0 ; i<N ; i++) {
        for (let j=0 ; j<N ; j++) {
            if (arr[i][j] === 1 && !vis[i][j]) {
                ++result;
                cnt.push(dfs(i, j, vis));
            }
        }
    }

    return [result, ...cnt.sort((a, b) => a - b)].join('\n');
}

console.log(solve());