const fs = require('fs');
const [input1, input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const N = +input1;
    const arr = input2.split(' ').map(Number);

    const dp = Array.from(Array(N + 1), () => Array(21).fill(0n));
    dp[0][arr[0]] = 1n;
    for (let i=1 ; i<N-1 ; i++) {
        for (let j=0 ; j<=20; j++) {
            if (j + arr[i] <= 20) {   
                dp[i][j + arr[i]] += BigInt(dp[i-1][j]);
            }
            if (j - arr[i] >= 0) {
                dp[i][j - arr[i]] += BigInt(dp[i-1][j]);
            }
        }
    } 

    return dp[N-2][arr[N-1]].toString();
}

console.log(solve());