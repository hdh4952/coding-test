const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();

function solve() {
    const N = +input;
    const cache = Array(50_001).fill(-1);

    function count(n) {
        if (cache[n] !== -1) return cache[n];

        let result = 4;
        for (let i=223 ; i>0 ; i--) {
            const square = i*i;
            if (square > n) continue;
            if (square === n) {
                return cache[n] = 1;
            }
            result = Math.min(result, count(n - i*i) + 1);
        }
        return cache[n] = result;
    }

    return count(N);
} 

console.log(solve());