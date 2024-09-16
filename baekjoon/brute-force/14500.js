const fs = require('fs');
const [input1, ...input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, M] = input1.split(' ').map(Number);
const arr = input2.map(x => x.split(' ').map(Number));
let result = 0;
const dir = [[0, -1], [0, 1], [1, 0], [-1, 0]];

function dfs(x, y, vis, temp, cnt = 0) {
    vis[x][y] = true;
    result = Math.max(result, temp);

    if (cnt === 3) {
        vis[x][y] = false;
        return;
    }

    for(let i=0 ; i<4 ; i++) {
        const [nx, ny] = [x + dir[i][0], y + dir[i][1]];
        if (nx < 0 || ny < 0 || nx >= N || ny >= M || vis[nx][ny]) {
            continue;
        }
        dfs(nx, ny, vis, temp + arr[nx][ny], cnt + 1);
    }

    vis[x][y] = false;
}

function findCornerCase() {
    for(let i=0 ; i<N-1 ; i++) {
        for(let j=0 ; j<M-2 ; j++) {
            const sum = arr[i][j] + arr[i][j+1] + arr[i][j+2] + arr[i+1][j+1];
            result = Math.max(result, sum);
        }
    }
    for(let i=0 ; i<N-1 ; i++) {
        for(let j=0 ; j<M-2 ; j++) {
            const sum = arr[i+1][j] + arr[i+1][j+1] + arr[i+1][j+2] + arr[i][j+1];
            result = Math.max(result, sum);
        }
    }
    for(let i=0 ; i<N-2 ; i++) {
        for(let j=0 ; j<M-1 ; j++) {
            const sum = arr[i][j] + arr[i+1][j] + arr[i+2][j] + arr[i+1][j+1];
            result = Math.max(result, sum);
        }
    }
    for(let i=0 ; i<N-2 ; i++) {
        for(let j=0 ; j<M-1 ; j++) {
            const sum = arr[i][j+1] + arr[i+1][j+1] + arr[i+2][j+1] + arr[i+1][j];
            result = Math.max(result, sum);
        }
    }
}

function solve() {
    const vis = arr.map((col) => Array(col.length).fill(false));
    for(let i=0 ; i<N ; i++) {
        for(let j=0 ; j<M ; j++) {
            dfs(i, j, vis, arr[i][j]);
        }
    }

    findCornerCase();

    return result;
}

console.log(solve());