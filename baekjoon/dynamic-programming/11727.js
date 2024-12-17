const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();

function solve() {
    const N = +input;
    const cache = Array(1001).fill(-1);

    function tiling(n) {
        if (n <= 1) return 1;
        if (cache[n] !== -1) {
            return cache[n];
        }
        return cache[n] = (tiling(n-1) + 2*tiling(n-2)) % 10_007;
    }

    return tiling(N);
} 

console.log(solve());