/**
 * 生成 n 个结点的随机图的邻接矩阵
 * 
 * @param {Number} n 节点个数
 * @returns {number[][]}随机图
 */
const createGraph = n => {
  //  生成全为 0 的二维数组
  const randomGraph = [];
  for (let i = 0; i < n; i++) {
    const temp = new Array(n).fill(0);
    randomGraph.push(temp);
  }

  //  随机连接结点，生成无向图的邻接矩阵
  randomGraph.forEach((row, rowIndex) => {
    row.forEach((ele, colIndex) => {
      //  上三角
      if (colIndex > rowIndex) {
        randomGraph[rowIndex][colIndex] = Math.round(Math.random()); //  0|1
      } else if (rowIndex > colIndex) {
        randomGraph[rowIndex][colIndex] = randomGraph[colIndex][rowIndex]; //  对称
      }
    });
  });
  return randomGraph;
};

/**
 * 删除连接 u, v 的边
 * 
 * @param {Number} u 节点一
 * @param {Number} v 节点二
 * @param {number[][]} graph 随机图
 * @param {Number} n 节点个数
 * @returns {Boolean} 是否删除成功
 */
const deleteBrim = (u, v, graph, n) => {
  if (
    u < 0 ||
    v < 0 ||
    u > n - 1 ||
    v > n - 1 ||
    u === v ||
    graph[u][v] === 0
  ) {
    console.log("删除失败!");
    return;
  }
  graph[u][v] = graph[v][u] = 0;
};

/**
 * 判断 u, v 之间是否存在边
 * 
 * @param {Number} u 节点一
 * @param {Number} v 节点二
 * @param {number[][]} graph 随机图
 * @param {Number} n 节点个数
 * @returns {Boolean} u, v间是否存在边连接
 */
const existBrim = (u, v, graph, n) => {
  return (
    u >= 0 && v >= 0 && u <= n - 1 && v <= n - 1 && u !== v && graph[u][v] === 1
  );
};

/**
 * 判断随机图是否连通
 * 
 * @param {number[][]} graph 随机图
 * @param {Number} n 节点个数
 * @param {Array<Boolean>} hasVisited 遍历过的节点标记
 * @returns {Boolean} 是否连通图
 */
const isConnect = (graph, n, hasVisited) => {
  dfs(0, hasVisited, graph, n);
  for (let i = 0; i < n; i++) {
    if (!hasVisited[i]) {
      console.log("该图不连通!");
      return false;
    }
  }
  console.log("该图是连通图");
  return true;
};

/**
 * 判断 v 节点除了 k 节点外是否与其他节点之间有边连接
 * @param {Number} v 待判断点
 * @param {number[][]} graph 随机图
 * @param {Number} n 节点个数
 * @param {Number} k 比较点
 * @returns {Boolean}
 */
const existBrimExceptRoot = (v, graph, n, k) => {
  for (let i = 0; i < n; i++) {
    if (i !== k) {
      if (graph[v][i] === 1) return true;
    }
  }
  return false;
};

/**
 * 判断 v 节点除了 k1, k2 两个度为奇数的节点外是否与其他节点之间有边连接
 *
 * @param {Number} v 待判断点
 * @param {number[][]} graph 随机图
 * @param {Number} n 节点个数
 * @param {Number} k1 比较点k1
 * @param {Number} k2 比较点k2
 * @returns {Boolean} 
 */
const existBrimExceptOdd = (v, graph, n, k1, k2) => {
  for (let i = 0; i < n; i++) {
    if (i !== k1 && i !== k2) {
      if (graph[v][i] === 1) return true;
    }
  }
  return false;
};

/**
 * 返回图 graph 所有节点的度
 *
 * @param {number[][]} graph 随机图
 * @param {Number} n 节点个数
 * @returns {Array<Number>} 节点度
 */
const getDeg = (graph, n) => {
  const deg = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (existBrim(i, j, graph, n)) deg[i]++;
    }
  }
  return deg;
};

/**
 * 通过度为奇数/偶数的节点个数判断是否为欧拉图
 *
 * @param {Array<Number>} deg 所有节点的度
 * @param {Number} n 节点个数
 * @returns 奇数度的节点个数
 */
const isEuler = (deg, n) => {
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (deg[i] % 2 === 1) count++;
  }
  return count;
};

/**
 * 遍历随机图
 *
 * @param {Number} v 遍历开始点
 * @param {Array<Boolean>} hasVisited 是否遍历过该节点
 * @param {number[][]} graph 随机图
 * @param {Number} n 结点个数
 */
const dfs = (v, hasVisited, graph, n) => {
  //  标记遍历过的节点
  hasVisited[v] = true;
  for (let i = 0; i < n; i++) {
    //  若该节点与下一节点间有边连接，且下一节点没有遍历过，则遍历下一个节点
    if (existBrim(v, i, graph, n) && !hasVisited[i])
      dfs(i, hasVisited, graph, n);
  }
};

module.exports = {
  createGraph,
  deleteBrim,
  existBrim,
  isConnect,
  existBrimExceptOdd,
  existBrimExceptRoot,
  getDeg,
  isEuler
}