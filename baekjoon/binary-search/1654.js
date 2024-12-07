const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function getAmount(len, arr) {
    return arr.map(x => (x / len) >> 0).reduce((acc, cur) => acc + cur, 0);
}

function solve() {
    const [K, N] = input[0].split(' ').map(Number);
    const arr = input.slice(1).map(Number);

    let left = 1;
    let right = Math.max(...arr);

    while (left + 1 < right) {
        const mid = ((left + right) / 2) >> 0;
        const amount = getAmount(mid, arr);

        if (amount >= N) {
            left = mid;    
        } else {
            right = mid;
        }
    }

    if (getAmount(right, arr) >= N) {
        return right;
    }

    const mid = ((left + right) / 2) >> 0;
    if (getAmount(mid, arr) >= N) {
        return mid;
    }
    return left;
}

console.log(solve());