const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();
const isPalindrome = Array.from(Array(input.length), () => Array(input.length).fill(false))
const dp = Array(input.length+1).fill(0);

function solve() {
  for (let i=0 ; i<input.length ; i++) {
    isPalindrome[i][i] = true;
  }
  for (let i=0 ; i<input.length - 1 ; i++) {
    if (input.charAt(i) === input.charAt(i+1)) {
      isPalindrome[i][i+1] = true;
    }
  }
  for(let len=3 ; len<=input.length ; len++) {
    for(let i=0 ; i<=input.length-len ; i++) {
      if (input.charAt(i) === input.charAt(i+len-1) && isPalindrome[i+1][i+len-2]) {
        isPalindrome[i][i+len-1] = true;
      }
    }
  }

  for(let e=1 ; e<=input.length ; e++) {
    dp[e] = e;
    for (let s=1 ; s<=e ; s++) {
      if (isPalindrome[s-1][e-1]) {
        dp[e] = Math.min(dp[e], dp[s-1]+1);
      }
    }
  }

  return dp[input.length];
}

console.log(solve());