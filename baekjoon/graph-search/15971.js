const fs = require('fs');
const [input1, ...input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, robot1, robot2] = input1.split(' ').map(Number);
const paths = Array(N+1).fill(0).map(() => []);
input2.forEach(input => {
   const [a, b, c] = input.split(' ').map(Number);
   paths[a].push([b, c]);
   paths[b].push([a, c]);
});
let result = [];

function dfs(now, goal, vis = [], temp = []) {
    vis[now] = true;

    if (now === goal) {
        result = [...temp];
        return;
    }

    for (const [next, cost] of paths[now]) {
        if (vis[next]) continue;
        vis[next] = true;
        temp.push(cost);
        dfs(next, goal, vis, temp);
        temp.pop();
        vis[next] = false;
    }
}

function solve() {
    dfs(robot1, robot2);
    if (result.length === 0) {
        result = [0];
    }
    return result.reduce((acc, cur) => acc + cur, 0) - Math.max(...result);
}

console.log(solve());