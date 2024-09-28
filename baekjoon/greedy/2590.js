const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n').map(Number);
const space = Array(6).fill(0);

function solve() {
    let result = input[5];

    if (input[4] > 0) {
        result += input[4];
        space[0] += input[4] * 11;
    }

    if (input[3] > 0) {
        result += input[3];
        space[1] += input[3] * 5;
    }

    if (input[2] > 0) {
        result += Math.ceil(input[2] / 4);

        const rest = 4 - (input[2] % 4);
        if (rest === 3) {
            space[1] += 5;
            space[0] += 7;
        } else if (rest === 2) {
            space[1] += 3;
            space[0] += 6;
        } else if (rest === 1) {
            space[1] += 1;
            space[0] += 5;
        }
    }

    if (input[1] > 0) {
        if (input[1] > space[1]) {
            input[1] -= space[1];
            space[1] = 0;

            result += Math.ceil(input[1] / 9);
            const rest = 9 - (input[1] % 9);
            if (rest < 9) {
                space[0] += 4 * rest;
            }
        } else {
            space[1] -= input[1];
        }
    }

    if (input[0] > 0) {
        space[0] += 4 * space[1];
        if (input[0] > space[0]) {
            input[0] -= space[0];

            result += Math.ceil(input[0] / 36);
        }
    }

    return result;
}

console.log(solve());