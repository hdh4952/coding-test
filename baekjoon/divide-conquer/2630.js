const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const N = +input[0];
    const arr = input.slice(1).map(x => x.split(' ').map(Number));

    function count(N, r, c) {
        if (N === 1) {
            if (arr[r][c] === 1) return [0, 1];
            return [1, 0];
        }

        const topLeft = count(N/2, r, c);
        const topRight = count(N/2, r, c+N/2);
        const bottomLeft = count(N/2, r+N/2, c);
        const bottomRight = count(N/2, r+N/2, c+N/2);

        const parts = [topLeft, topRight, bottomLeft, bottomRight];
        if (parts.every(part => part[0] === 1 && part[1] === 0)) {
            return [1, 0];
        }
        if (parts.every(part => part[0] === 0 && part[1] === 1)) {
            return [0, 1];
        }

        return parts.reduce((acc, cur) => [acc[0]+cur[0], acc[1]+cur[1]], [0, 0]);
    }

    const result = count(N, 0, 0);
    return result.join('\n');
}

console.log(solve());