const fs = require('fs');
const [input1, input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');

const N = +input1;
const arr = input2.split(' ').map(Number);

function solve() {
    let result = [arr[0], arr[arr.length-1]];

    for (let i=0 ; i<N-1 ; i++) {
        let low = i+1;
        let high = N-1;

        while (low + 1 < high) {
            let mid = ((low + high) / 2) >> 0;

            if (arr[i] + arr[mid] === 0) {
                return `${arr[i]} ${arr[mid]}`;
            }

            if (arr[i] + arr[mid] < 0) {
                low = mid;
            } else {
                high = mid;
            }
        } 

        [low, ((low + high) / 2) >> 0, high].forEach(e => {
            if (Math.abs(arr[i] + arr[e]) < Math.abs(result[0] + result[1])) {
                result = [arr[i], arr[e]];
            }
        });
    }

    return `${result[0]} ${result[1]}`;
}

console.log(solve());