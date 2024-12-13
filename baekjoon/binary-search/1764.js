const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const [N, M] = input[0].split(' ').map(Number);
    const sortFn = (a, b) => {
        if (a < b) {
            return -1;
        }
        return 1;
    };
    const arr1 = input.slice(1, N+1).sort(sortFn);
    const arr2 = input.slice(N+1).sort(sortFn);

    function binsearch(name) {
        let lo = 0;
        let hi = arr2.length - 1;

        while (lo <= hi) {
            let mid = ((lo + hi) / 2) >> 0;
            if (arr2[mid] === name) {
                return true;
            }

            if (arr2[mid] < name) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        return false;
    }

    const result = arr1.filter(name => binsearch(name));
    return `${result.length}\n${result.join('\n')}`;
}

console.log(solve());