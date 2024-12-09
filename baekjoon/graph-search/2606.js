const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function infect(x, isInfected) {
    isInfected[x] = true;
}

function spread(x, arr, isInfected) {
    for(const next of arr[x]) {
        if (isInfected[next]) {
            continue;
        }
        infect(next, isInfected);
        spread(next, arr, isInfected);
    }
}

function solve() {
    const N = +input[0];
    const M = +input[1];
    const pairs = input.slice(2).map(x => x.split(' ').map(Number));
    const isInfected = Array(N+1).fill(false);
    const arr = Array.from({length: N+1}, () => []);
    pairs.forEach(pair => {
        const [a, b] = pair;
        arr[a].push(b);
        arr[b].push(a);
    });

    infect(1, isInfected);
    spread(1, arr, isInfected);
    return isInfected.slice(1).filter(x => x).length - 1;
}

console.log(solve());