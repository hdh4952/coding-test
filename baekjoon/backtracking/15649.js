const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();

function solve() {
    const [N, M] = input.split(' ').map(Number);
    const result = [];

    function f(arr, isUsed) {
        if (arr.length === M) {
            result.push(arr.join(' '));
            return;
        }

        for (let i=1 ; i<=N ; i++) {
            if (isUsed[i]) continue;
            arr.push(i);
            isUsed[i] = true;
            f(arr, isUsed);
            arr.pop();
            isUsed[i] = false;
        }
    } 

    f([], Array(N+1).fill(false));
    return result.join('\n');
}

console.log(solve());