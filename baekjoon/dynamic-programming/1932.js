const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const n = +input[0];
    const triangle = input.slice(1).map(s => s.split(' ').map(Number));
    const cache = Array.from({length: n}, (_, i) => Array(i+1).fill(-1));

    /**
     * 
     * @param {number} height - 제일 꼭대기를 높이 0, 제일 아래 높이를 n-1이라고 한다.
     * @param {number} k - 왼쪽부터 차례로 1씩 증가한다. (0 <= k <= height)
     * @description height 높이의 k번째 수를 선택했을 때 얻을 수 있는 최대합 
     */
    function maxSum(height, k) {
        if (height === n) {
            return 0;
        }
        if (cache[height][k] !== -1) {
            return cache[height][k];
        }

        return cache[height][k] = triangle[height][k] + Math.max(maxSum(height+1, k), maxSum(height+1, k+1));
    }

    return maxSum(0, 0);
}

console.log(solve());