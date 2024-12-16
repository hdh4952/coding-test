const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const N = +input[0];
    const arr = input.slice(1).map(Number);
    const cache = Array.from({length: N}, () => Array(2).fill(-1));

    function score(index, seq) {
        if (index >= N) {
            return -3_000_000;
        }
        if (index === N-1) {
            return arr[index];
        }
        if (cache[index][seq-1] !== -1) {
            return cache[index][seq-1];
        }
        if (seq === 2) {
            return cache[index][seq-1] = arr[index] + score(index+2, 1);
        } 

        return cache[index][seq-1] = arr[index] + Math.max(score(index+1, seq+1), score(index+2, 1));
    }

    return Math.max(score(0, 1), score(1, 1));
} 

console.log(solve());