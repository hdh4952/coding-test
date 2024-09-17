const fs = require('fs');
const [input1, ...input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');

const T = +input1;
const states = input2.slice(0, T).map(x => x.split('').map(Number));
const K = +input2[T];
const rotateInfo = input2.slice(T+1).map(x => x.split(' ').map(Number));
const LEFT = 6;
const RIGHT = 2;

function rotate(num, dir, vis = Array(T).fill(false)) {
    const now = num - 1;
    vis[now] = true;
    const leftSaw = states[now][LEFT];
    const rightSaw = states[now][RIGHT];

    if (states[now - 1] && !vis[now - 1] && states[now - 1][RIGHT] !== leftSaw) {
        rotate(num - 1, -dir, vis);
    }

    if (states[now + 1] && !vis[now + 1] && states[now + 1][LEFT] !== rightSaw) {
        rotate(num + 1, -dir, vis);
    }

    if (dir === 1) {
        states[now].unshift(states[now].pop());
    } else {
        states[now].push(states[now].shift());
    }
}

function solve() {
    rotateInfo.forEach((e) => rotate(...e));
    return states.reduce((pre, cur) => pre + cur[0], 0);
}

console.log(solve());