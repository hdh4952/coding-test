const fs = require('fs');
const [input1, ...input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, M] = input1.split(' ').map(Number);
const arr = input2.map(x => x.split(' ').map(Number));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const memo = Array.from(Array(N), () => Array(M).fill(0));

function calculateSpaceSize(x, y) {
    const start = [x, y];
    const vis = {}
    vis[`${x} ${y}`] = true;
    const q = [start];
    const space = [start];

    let result = 0;
    while (q.length !== 0) {
        const [cx, cy] = q.shift();
        result++;

        for (let dir=0 ; dir<4 ; dir++) {
            const [nx, ny] = [cx + dx[dir], cy + dy[dir]];
            if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
            if (!arr[nx][ny]) continue;
            if (vis[`${nx} ${ny}`]) continue;
            vis[`${nx} ${ny}`] = true;
            q.push([nx, ny]);
            space.push([nx, ny]);
        }
    }

    return [result, space];
}

function solve() {
    let result = 0;
    let id = 0;

    for (let i=0 ; i<N ; i++) {
        for (let j=0 ; j<M ; j++) {
            if (arr[i][j] === 1 && !memo[i][j]) {
                const [spaceSize, space] = calculateSpaceSize(i, j);
                space.forEach(([x, y]) => {
                    memo[x][y] = {spaceSize, id};
                });
                id++;
            }
        }
    }

    for (let i=0 ; i<N ; i++) {
        for (let j=0 ; j<M ; j++) {
            if (arr[i][j] === 0) {
                let count = 1;
                const ids = [];
                for (let dir=0 ; dir<4 ; dir++) {
                    const [nx, ny] = [i + dx[dir], j + dy[dir]];
                    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
                    if (!arr[nx][ny]) continue;
                    const {spaceSize, id} = memo[nx][ny];
                    if (!ids.includes(id)) {
                        ids.push(id);
                        count += spaceSize;
                    }
                }
                
                result = Math.max(result, count);
            }
        }
    }

    return result;
}

console.log(solve());