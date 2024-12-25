const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const N = +input[0];
    /**
     * @type {Array<[number, number]>}
     * [begin: 회의 시작 시간, end: 회의 종료 시간]
     */
    const meeting = input.slice(1).map(s => s.split(' ').map(Number));

    const sorted = meeting.sort((a, b) => {
        if (a[1] !== b[1]) {
            return a[1] - b[1]; 
        }
        return a[0] - b[0];
    });

    let time = 0;
    let result = 0;
    for (const [begin, end] of sorted) {
        if (time <= begin) {
            result++;
            time = end;
        }
    }

    return result;
}

console.log(solve());