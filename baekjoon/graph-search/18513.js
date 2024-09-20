const fs = require('fs');
const [input1, input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');

const asc = (a, b) => (a - b);
const [N, K] = input1.split(' ').map(Number);
const arr = input2.split(' ').map(Number).sort(asc);

function solve() {
    const obj = {};

    for(let i=1 ; i<N ; i++) {
        const dist = arr[i] - arr[i-1] - 1;
        for(let j=1 ; j<=Math.min((dist >> 1), 100_000) ; j++) {
            if (!obj[j]) {
                obj[j] = 0;
            }
            obj[j] += 2;
        }
        if (dist % 2 === 1) {
            const add = (dist >> 1) + 1;
            if (!obj[add]) {
                obj[add] = 0; 
            }   
            obj[add] += 1;
        }
    }

    let result = 0;
    let houseCnt = 0;
    for(let i=1 ; i<100_000 ; i++) {
        let maxCnt = 2;
        if (obj[i]) {
            maxCnt += obj[i];
        }

        if (houseCnt + maxCnt < K) {
            result += i * maxCnt;
            houseCnt += maxCnt;
        } else {
            const cnt = K - houseCnt;
            result += i * cnt;
            houseCnt += cnt;
            return result;
        }
    }
}

console.log(solve());