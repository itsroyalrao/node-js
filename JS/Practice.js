let arr = [1, 2, 3, 4, 5];
let res = [];
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j <= i; j++) {
    let ans = [];
    for (let k = j; k <= i; k++) {
      ans.push(arr[k]);
    }
    res.push(ans);
    ans = [];
  }
}
console.log(res);