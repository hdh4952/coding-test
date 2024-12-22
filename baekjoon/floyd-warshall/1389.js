const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const [N, M] = input[0].split(' ').map(Number);
    const INF = 10000;
    const step = Array.from({length: N+1}, () => Array(N+1).fill(INF));
    input.slice(1).forEach(e => {
        const [a, b] = e.split(' ').map(Number);
        step[a][b] = 1;
        step[b][a] = 1;
    });

    for (let k=1 ; k<=N ; k++) {
        for (let i=1 ; i<=N ; i++) {
            for (let j=1 ; j<=N ; j++) {
                if (i === j) continue;
                step[i][j] = Math.min(step[i][j], step[i][k] + step[k][j]);
            }
        }
    }

    let result = 1;
    let minStep = INF;
    for (let i=1 ; i<=N ; i++) {
        let sum = 0;
        for (let j=1 ; j<=N ; j++) {
            if (i === j) continue;
            sum += step[i][j];
        }
        
        if (minStep > sum) {
            minStep = sum;
            result = i;
        }
    }

    return result;
}

console.log(solve());