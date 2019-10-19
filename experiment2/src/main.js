const output = require("./output");
const rl = require("readline-sync");

const matrix = [];
const set = rl.question("请输入集合元素，用空格分隔：").split(" ");

console.log(`集合为：{ ${set} }\n`);

set.forEach(() => {
  const temp = new Array(set.length).fill(0);
  matrix.push(temp);
});

let orderCount = 0;
while (true && orderCount !== Math.pow(2, matrix.length)) {
  const order = rl.question("请输入序偶，输入格式为<a,b>(输入0结束)：");

  if (order === "0") {
    break;
  } else if (!order.match(/<\d+,\d+>/)) {
    console.log("输入的序偶不符合格式，请重新输入！");
    continue;
  } else {
    const [x, y] = order.substring(1, order.length - 1).split(",");
    const index1 = set.indexOf(x);
    const index2 = set.indexOf(y);
    if (index1 === -1 || index2 === -1) {
      console.log("序偶中存在集合不存在的元素，请重新输入！");
      continue;
    } else {
      matrix[index1][index2] = 1;
      orderCount++;
    }
  }
}

output(matrix);
