const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

function solve() {
    const [K, N, F] = input[0].split(' ').map(Number);
    const areFriends = Array.from(Array(N+1), () => Array(N+1).fill(false));
    input.slice(1).map(x => x.split(' ').map(Number)).forEach(([a, b]) => {
        areFriends[a][b] = areFriends[b][a] = true;
    });
    let result = null;

    function pick(k, picked, taken) {
        if (k === K) {
            result = picked.join('\n');
            return;
        }

        const firstFree = picked.length === 0 ? 1 : picked[picked.length-1];
        for (let i=firstFree ; i<=N ; i++) {
            if (taken[i]) continue;
            let canPick = true;
            for (const person of picked) {
                if (!areFriends[person][i]) {
                    canPick = false;
                    break;
                }
            }
            if (canPick) {
                picked.push(i);
                taken[i] = true;
                pick(k+1, picked, taken);
                picked.pop();
                taken[i] = false;
            }
            if (result) {
                return;
            }
        }
    }

    pick(0, [], Array(N+1).fill(false))

    if (result) {
        return result;
    }
    return -1;
}

console.log(solve());