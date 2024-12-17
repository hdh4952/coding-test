const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const t = +input[0];
    const result = [];

    function countEarthworm(M, N, coords) {
        const arr = Array.from({length: M}, () => Array(N).fill(0));
        const vis = Array.from({length: M}, () => Array(N).fill(false));
        coords.forEach(([x, y]) => {
            arr[x][y] = 1
        });

        function dfs(x, y, vis) {
            vis[x][y] = true;
            const dx = [-1, 1, 0, 0];
            const dy = [0, 0, -1, 1];
            for(let dir=0 ; dir<4 ; dir++) {
                const [nx, ny] = [x+dx[dir], y+dy[dir]];
                if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
                if (vis[nx][ny]) continue;
                if (arr[nx][ny] === 1) {
                    dfs(nx, ny, vis);
                }
            }
        }

        let answer = 0;
        for (let i=0 ; i<M ; i++) {
            for(let j=0 ; j<N ; j++) {
                if (arr[i][j] === 1 && !vis[i][j]) {
                    answer++;
                    dfs(i, j, vis);
                }
            }
        }

        return answer;
    }

    let readIdx = 1;
    for(let i=0 ; i<t ; i++) {
        const [M, N, K] = input[readIdx++].split(' ').map(Number);
        const coords = [];
        for(let j=0 ; j<K ; j++) {
            const coord = input[readIdx++].split(' ').map(Number);
            coords.push(coord);
        }

        result.push(countEarthworm(M, N, coords));
    }

    return result.join('\n');
} 

console.log(solve());