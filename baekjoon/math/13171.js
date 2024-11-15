const fs = require('fs');
const [input1, input2] = fs.readFileSync(0, 'utf-8').trim().split('\n');
const A = BigInt(input1);
const X = BigInt(input2);
const MOD = 1_000_000_007n;

function modpow(x, n) {
  if (n === 0n) {
    return 1n;
  }
  if (n === 1n) {
    return x;
  }

  const a = modpow(x, n / 2n);
  const result = (a * a) % MOD;
  if (n % 2n !== 0n) {
    return ((result % MOD) * (x % MOD)) % MOD;
  }
  return result;
}

function solve() {
  return modpow(A, X).toString();
}

console.log(solve());