const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const [N, K] = input[0].split(' ').map(Number);
    const [W, V] = input.slice(1).map(x => x.split(' ').map(Number)).reduce((acc, [w,v]) => [[...acc[0], w], [...acc[1], v]], [[], []]);
    const cache = Array.from({length: 100_001}, () => Array(N+1).fill(-1));

    function pack(weight, start) {
        if (start === N) {
            return 0;
        }
        if (cache[weight][start] !== -1) {
            return cache[weight][start];
        }

        let ret = pack(weight, start+1);
        if (weight >= W[start]) {
            ret = Math.max(ret, pack(weight-W[start], start+1) + V[start]);
        }

        return cache[weight][start] = ret;
    }

    return pack(K, 0);
} 

console.log(solve());