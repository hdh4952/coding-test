const fs = require('fs');
const [input1, input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');

const N = +input1;
const dia = input2.split(' ').map(Number).sort((a, b) => b - a);

function getCloseValue(x, y, cmp) {
    let result = Number.MAX_SAFE_INTEGER;
    let i = x;
    let j = y;

    while (i < j) {
        const sum = dia[i] + dia[j];
        if (sum === cmp) {
            return sum;
        }

        if (Math.abs(cmp - sum) < Math.abs(cmp - result)) {
            result = sum;
        }

        if (sum > cmp) {
            i++;
        } else {
            j--;
        }
    }
    return result;
}

function solve() {
    let result = Number.MAX_SAFE_INTEGER;

    for(let i=0 ; i<N-1 ; i++) {
        for(let j=i+3 ; j<N ; j++) {
            const sum = dia[i] + dia[j];
            const closeValue = getCloseValue(i + 1, j - 1, sum);
            result = Math.min(result, Math.abs(sum - closeValue));
        }
    }

    return result;
}

console.log(solve());