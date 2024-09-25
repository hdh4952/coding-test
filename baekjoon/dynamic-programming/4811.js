const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n').map(Number);
const memoWH = Array.from(Array(31), () => Array(31).fill(0));
const memoFn = Array(31).fill(0);

function cntByWH(w, h) {
    if (w === 0) {
        return 1;
    }

    if (w === h) {
        return func(w);
    }

    if (memoWH[w][h]) {
        return memoWH[w][h];
    }

    return memoWH[w][h] = cntByWH(w, h-1) + cntByWH(w-1, h);
}

function func(N) {
    if (N === 0) {
        return 0;
    }

    if (N <= 2) {
        return N;
    } 

    if (memoFn[N]) {
        return memoFn[N];
    }

    let result = 1;
    for(let i=N-1 ; i>=1 ; i--) {
        result += cntByWH(N-i, N-1);
    }

    return memoFn[N] = result;
}

function solve() {
    const ret = input.map(func);
    ret.pop();
    return ret.join('\n');
}

console.log(solve());