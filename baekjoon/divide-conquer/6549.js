const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function getArea(arr) {
    function search(left, right) {
        if (left === right) {
            return arr[left];
        }

        const mid = ((left + right) / 2) >> 0;
        let lo = mid;
        let hi = mid + 1;
        let minHeight = Math.min(arr[lo], arr[hi]);

        let result = Math.max(search(left, lo), search(hi, right), minHeight * 2);
        while (left < lo || hi < right) {
            if (left < lo && (hi === right || arr[lo-1] > arr[hi+1])) {
                lo--;
                minHeight = Math.min(arr[lo], minHeight);
            } else {
                hi++;
                minHeight = Math.min(arr[hi], minHeight);
            }
            result = Math.max(result, minHeight * (hi - lo + 1));
        }
        return result;
    }

    return search(0, arr.length - 1);
}

function solve() {
    input.pop();
    return input.map(x => x.split(' ').map(Number).slice(1)).map(getArea).join('\n');
}

console.log(solve());