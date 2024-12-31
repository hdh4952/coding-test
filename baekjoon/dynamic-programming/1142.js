const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const N = +input[0];
    const cost = input.slice(1).map(s => s.split(' ').map(Number));
    const cache = Array.from({length: N}, () => Array(3).fill(0));
    /**
     * 
     * @param {number} idx 
     * @param {0 | 1 | 2} color - 0: red, 1: green, 2: blue 
     * @description idx번째 집을 color로 칠했을 때 최소 비용
     */
    function minCost(idx, color) {
        if (idx === N)
            return 0;
        if (cache[idx][color])
            return cache[idx][color];

        const [otherColor1, otherColor2] = [0, 1, 2].filter(c => c !== color);
        return cache[idx][color] = cost[idx][color] + Math.min(minCost(idx + 1, otherColor1), minCost(idx + 1, otherColor2));
    }

    return Math.min(minCost(0, 0), minCost(0, 1), minCost(0, 2));
}

console.log(solve());