const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const N = +input[0];
    const arr = input.slice(1).map(x => x.split(''));
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    function dfs(x, y, vis, colors) {
        vis[x][y] = true;

        for (let dir=0 ; dir<4 ; dir++) {
            const [nx, ny] = [x+dx[dir], y+dy[dir]];
            if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
            if (vis[nx][ny]) continue;
            if (colors.includes(arr[nx][ny])) {
                dfs(nx, ny, vis, colors);
            }
        }
    }

    function search(colorFn) {
        let result = 0;

        const vis = Array.from({length: N}, () => Array(N).fill(false));
        for (let i=0 ; i<N ; i++) {
            for (let j=0 ; j<N ; j++) {
                if (!vis[i][j]) {
                    const colors = colorFn(arr[i][j]);
                    dfs(i, j, vis,  colors);
                    ++result;
                }
            }
        }

        return result;
    }

    const result = [
        search((color) => [color]),
        search((color) => {
            if (color === 'B') {
                return color;
            }
            return ['R', 'G'];
        })
    ];

    return result.join(' ');
} 

console.log(solve());