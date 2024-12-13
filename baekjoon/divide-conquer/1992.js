const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const N = +input[0];
    const arr = [];
    input.slice(1).map(x => x.split('')).forEach(x => arr.push(x));

    function quad(N, x, y) {
        if (N === 1) {
            return arr[x][y];
        }

        const topLeft = quad(N/2, x, y);
        const topRight = quad(N/2, x, y+N/2);
        const bottomLeft = quad(N/2, x+N/2, y);
        const bottomRight = quad(N/2, x+N/2, y+N/2);

        const parts = [topLeft, topRight, bottomLeft, bottomRight];

        if (parts.every((part) => part === '1')) {
            return '1';
        }
        if (parts.every((part) => part === '0')) {
            return '0';
        }
        else return `(${parts.join('')})`;
    }

    return quad(N, 0, 0);
}

console.log(solve());