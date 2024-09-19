const fs = require('fs');
const [input1, ...input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');

const N = +input1;
const arr = input2.map(x => x.split(' ').map(Number));
const dir = [[1, 0], [0, 1]];

function dfs(x, y, vis) {
    if (x === N-1 && y === N-1) {
        return true;
    }
    vis[x][y] = true;

    const jumpCnt = arr[x][y];
    for(let i=0 ; i<2 ; i++) {
        const [nx, ny] = [x+jumpCnt*dir[i][0], y+jumpCnt*dir[i][1]];
        if (nx >= N || ny >= N || vis[nx][ny]) {
            continue;
        }
        const isArrived = dfs(nx, ny, vis);
        if (isArrived) {
            return true;
        }
    }
    return false;
}

function solve() {
    const isArrived = dfs(0, 0, Array.from({length: N}).map(() => Array(N).fill(false)));

    if (isArrived) {
        return "HaruHaru";
    }
    return "Hing";
}

console.log(solve());