const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();

function solve() {
    const [N, r, c] = input.split(' ').map(Number);

    function count(N, r, c) {
        if (N === 1) {
            return 2*r + c;
        }
        const len = 2 ** (N-1);
        const parts = 2*((r/len) >> 0) + ((c/len) >> 0);
        return parts * (len ** 2) + count(N-1, r % len, c % len);
    }

    return count(N, r, c)
}

console.log(solve());