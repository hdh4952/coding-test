const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();

function solve() {
    
    const arr = input.split('-');
    const [first, ...rest] = arr.map(s => {
        const nums = s.split('+').map(Number);
        const num = nums.reduce((acc, cur) => acc + cur, 0);
        return num;
    });
    return first - rest.reduce((acc, cur) => acc + cur, 0);
}

console.log(solve());