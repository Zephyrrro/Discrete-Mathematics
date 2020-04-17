const rl = require("readline-sync");

const { createGraph, isConnect, getDeg, isEuler } = require("./Graph");
const { oddDFS, evenDFS } = require("./DFS");

let output = [];

const n = Number(rl.question("请输入结点个数："));

let randomGraph = createGraph(n);

randomGraph.forEach(row => console.log(row));

const hasVisited = new Array(n).fill(false);

const connect = isConnect(randomGraph, n, hasVisited);

const degArray = getDeg(randomGraph, n);

console.log(`该图各节点的度为：${degArray}`);

let randomGraphCopy = JSON.parse(JSON.stringify(randomGraph));

if (connect && isEuler(degArray, n) === 0) {
  console.log("该图为欧拉图!\n");
  randomGraph.forEach((row, index) => {
    console.log(`该图以${index}为源点得到的欧拉回路所经过的节点依次为：`);
    evenDFS(index, randomGraph, n, index, output);
    console.log(output);
    output = [];
    randomGraph = JSON.parse(JSON.stringify(randomGraphCopy));
  });
} else if (connect && isEuler(degArray, n) === 2) {
  console.log("该图为半欧拉图!\n");
  const temp = [];
  let k = 0;
  for (let i = 0; i < n; i++) {
    if (degArray[i] % 2 === 1) {
      temp[k++] = i;
    }
  }
  console.log("其中的一条欧拉路为：");
  oddDFS(temp[0], randomGraph, n, temp[0], temp[1], output);
  console.log(output);
  output = [];
  randomGraph = JSON.parse(JSON.stringify(randomGraphCopy));
  console.log("另一条欧拉路为：");
  oddDFS(temp[1], randomGraph, n, temp[1], temp[0], output);
  console.log(output);
  output = [];
} else {
  console.log("该图既不是欧拉图，也不是半欧拉图!");
}
