const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const [N, M] = input[0].split(' ').map(Number);
    const arr = input[1].split(' ').map(Number);
    
    function getTree(h) {
        let result = 0;
        arr.forEach(x => {
            if (x - h > 0) {
                result += x - h;
            }
        });
        return result;
    }
    
    let lo = 0;
    let hi = Math.max(...arr);

    while (lo + 1 < hi) {
        const mid = ((lo + hi) / 2) >> 0;
        const tree = getTree(mid);

        if (tree === M) {
            return mid;
        }

        if (tree > M) {
            lo = mid;
        } else {
            hi = mid;
        }
    }

    return lo;
}

console.log(solve());