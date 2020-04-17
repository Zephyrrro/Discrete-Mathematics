const {
  existBrim,
  existBrimExceptRoot,
  existBrimExceptOdd,
  deleteBrim
} = require("./Graph");


/**
 * 从 v 开始遍历, 所有节点的度都为偶数
 * @param {Number} v 遍历开始点
 * @param {number[][]} graph 随机图
 * @param {Number} n 节点个数
 * @param {Number} k 判断点/下一节点
 * @param {Array<Number>} output
 */
const evenDFS = (v, graph, n, k, output) => {
  //  若 v 除了 k 之外还与其他节点连接，则接下去遍历
  if (existBrimExceptRoot(v, graph, n, k)) {
    output.push(v);
    //  遍历节点，找到与 v 连接的节点（除了k）
    for (let u = 0; u < n; u++) {
      if (u === k) continue;
      //  若 v 与 u 连接，则从 u 开始接下去遍历，并删除 v, u相连的边
      if (existBrim(v, u, graph, n)) {
        deleteBrim(v, u, graph, n);
        evenDFS(u, graph, n, k, output);
      }
    }
  }
  //  若 v 只与 k 相连，则删除两者连接的边，并从 k 开始接下去遍历
  else if (!existBrimExceptRoot(v, graph, n, k) && existBrim(v, k, graph, n)) {
    output.push(v);
    deleteBrim(v, k, graph, n);
    evenDFS(k, graph, n, k, output);
  }
};

/**
 * 优先往除了 k1, k2 两个度为奇数的节点的方向遍历
 * @param {Number} v 遍历开始点
 * @param {number[][]} graph 随机图
 * @param {Number} n 节点个数
 * @param {Number} k1 度为奇数的节点k1
 * @param {Number} k2 度为奇数的节点k2
 * @param {Array<Number>} output
 */
const oddDFS = (v, graph, n, k1, k2, output) => {
  if (existBrimExceptOdd(v, graph, n, k1, k2)) {
    output.push(v);
    for (let u = 0; u < n; u++) {
      if (u === k1 || u === k2) continue;
      if (existBrim(v, u, graph, n)) {
        deleteBrim(v, u, graph, n);
        oddDFS(u, graph, n, k1, k2, output);
      }
    }
  } else if (
    !existBrimExceptRoot(v, graph, n, k1) &&
    existBrim(v, k1, graph, n)
  ) {
    output.push(v);
    deleteBrim(v, k1, graph, n);
    oddDFS(k1, graph, n, k1, k2, output);
  } else if (
    !existBrimExceptRoot(v, graph, n, k2) &&
    existBrim(v, k2, graph, n)
  ) {
    output.push(v);
    deleteBrim(v, k2, graph, n);
    oddDFS(k2, graph, n, k1, k2, output);
  } else {
    //  孤立点，一般只有遍历到最后一个节点时执行
    output.push(v);
  }
};

module.exports = {
  evenDFS,
  oddDFS
}
