const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const N = +input[0];
const arr = input[1].split(' ').map(Number);
const K = +input[2];

function solve() {
    let i = 0, j = 0, sum = 0;
    let result = 0;

    while (i <= j && j <= N) {
        if (sum > K) {
            result += N - j + 1;
            sum -= arr[i++];
        } else {
            if (j === N) {
                break;
            }
            while (j < N && sum <= K) {
                sum += arr[j++];
            }
        }
    }

    return result;
}

console.log(solve());