const fs = require('fs');
const [input1, ...input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');
const T = +input1;
const arr = input2.map(BigInt);

function func(N) {
    if (N % 9n === 0n || N % 3n === 2n) {
        return 'TAK';
    }
    return 'NIE';
}

function solve() {
    return arr.map(x => func(x)).join('\n');
}

console.log(solve());