const fs = require('fs');
const [input1, ...input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');

const N = +input1;
const coords = input2.map(e => e.split(' ').map(Number));
const dist = Array.from(Array(N + 1), () => Array(5).fill(Number.MAX_SAFE_INTEGER));
const dx = [0, -1, 1, 0, 0];
const dy = [0, 0, 0, -1, 1];

function solve() {
    for (let i=0 ; i<5 ; i++) {
        const nx = coords[1][0] + dx[i];
        const ny = coords[1][1] + dy[i];

        dist[1][i] = Math.abs(coords[0][0] - nx) + Math.abs(coords[0][1] - ny);
    }

    for (let i=2 ; i<N+1 ; i++) {
        for (let dir=0 ; dir<5 ; dir++) {
            const nx = coords[i][0] + dx[dir];
            const ny = coords[i][1] + dy[dir];

            for (let pre=0 ; pre<5 ; pre++) {
                const x = coords[i-1][0] + dx[pre];
                const y = coords[i-1][1] + dy[pre];

                dist[i][dir] = Math.min(dist[i][dir], Math.abs(x - nx) + Math.abs(y - ny) + dist[i-1][pre]);
            }
        }
    }

    return Math.min(...dist[dist.length - 1]);
}

console.log(solve());