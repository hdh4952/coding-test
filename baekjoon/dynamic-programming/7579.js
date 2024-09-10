const fs = require('fs');
const [input1, input2, input3] = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, M] = input1.split(' ').map(Number);
const memories = input2.split(' ').map(Number);
const costs = input3.split(' ').map(Number);

function solve() {
    const maxCost = costs.reduce((acc, cur) => acc + cur, 0);
    const dp = Array(N + 1).fill(0).map(e => Array(maxCost + 1).fill(0));;

    for(let i=1 ; i<=N ; i++) {
        const nowMemory = memories[i-1];
        const nowCost = costs[i-1];

        for(let j=0 ; j<=maxCost ; j++) {
            if (j < nowCost) {
                dp[i][j] = dp[i-1][j];
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j - nowCost] + nowMemory);
            }
            
        } 
    }
    
    for(let i=0 ; i<=maxCost ; i++) {
        if (dp[N][i] >= M) {
            return i;
        }
    }
}

console.log(solve());