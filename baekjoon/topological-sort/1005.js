const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function testcase(N, requiredTimes, requiredBuildings, winningBuildings) {
  const indeg = Array(N+1).fill(0);
  const accTimes = Array(N+1).fill(0);

  for (const pre of requiredBuildings) {
    for (const nxt of pre) {
      indeg[nxt]++;
    }
  }

  const buildableNumbers = indeg.slice(1).reduce((acc, cur, idx) => {
    if (cur === 0) {
      acc.push({num: idx + 1, time: requiredTimes[idx + 1]});
    }
    return acc;
  },[]);

  if (buildableNumbers.includes(winningBuildings)) {
    return requiredTimes[winningBuildings];
  }

  while (buildableNumbers.length > 0) {
    const len = buildableNumbers.length;
    for (let i=0 ; i<len ; i++) {
      const {num: now, time} = buildableNumbers.shift();
      if (now === winningBuildings) {
        return time;
      }

      for (const nxt of requiredBuildings[now]) {
        indeg[nxt]--;
        accTimes[nxt] = Math.max(time, accTimes[nxt]);
        if (indeg[nxt] === 0) {
          buildableNumbers.push({num: nxt, time: requiredTimes[nxt] + accTimes[nxt]});
        }
      }
    }
  }
}

function solve() {
  const results = [];
  let lineIdx = 0;
  const T = +input[lineIdx++];
  for (let i=0 ; i<T ; i++) {
    const [N, K] = input[lineIdx++].split(' ').map(Number);
    const requiredTimes = [0, ...input[lineIdx++].split(' ').map(Number)];
    const requiredBuildings = Array.from({length: N+1}, () => []);
    for (let j=0 ; j<K ; j++) {
      const [X, Y] = input[lineIdx++].split(' ').map(Number);
      requiredBuildings[X].push(Y);
    }
    const winningBuildings = +input[lineIdx++];
    results.push(testcase(N, requiredTimes, requiredBuildings, winningBuildings));
  }

  return results.join('\n');
}

console.log(solve());