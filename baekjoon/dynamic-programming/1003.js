const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const t = +input[0];
    const fibo = Array.from(Array(41), () => [0, 0]);
    fibo[0][0] = 1;
    fibo[1][1] = 1;
    for (let i=2 ; i<=40 ; i++) {
        fibo[i][0] = fibo[i-1][0] + fibo[i-2][0];
        fibo[i][1] = fibo[i-1][1] + fibo[i-2][1];
    }

    return input.slice(1).map(Number).map(x => fibo[x].join(' ')).join('\n');
}

console.log(solve());