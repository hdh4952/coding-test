const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const N = +input[0];
    const arr = input[1].split(' ').map(Number);
    const cache = Array(N).fill(-1);

    function lis(index) {
        if (index === N) {
            return 0;
        }
        if (cache[index] !== -1) {
            return cache[index];
        } 

        let result = 1;
        for (let i=index+1 ; i<N ; i++) {
            if (arr[index] < arr[i]) {
                result = Math.max(result, lis(i) + 1);
            }
        }

        return cache[index] = result;
    }

    return Math.max(...Array.from({length: N}, (_, i) => lis(i)));
}

console.log(solve());