const rl = require("readline-sync");
const { getFactors, getCovers } = require("./Calculate");
const Judge = require("./Judge");


const n = Number(rl.question("输入一个正整数："));

const factors = getFactors(n);
const { length } = factors;
console.log(`${n}一共有${length}个因子: [${factors}]`);


const cover = getCovers(factors);
console.log(`偏序集上的盖住关系：[${cover}]`);

if(Judge(factors, n)) {
  console.log("不是有补格.");
} else {
  console.log("是有补格.");
}

