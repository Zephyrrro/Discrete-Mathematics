/**
 * 求n,m之间的最大公约数
 * @param {Number} n
 * @param {Number} m
 * @returns
 */
const gcd = (n, m) => {
  //  若n<m则交换两者
  if (n < m) {
    [n, m] = [m, n];
  }
  let remain = n % m;
  while (remain) {
    n = m;
    m = remain;
    remain = n % m;
  }
  return m;
};

/**根据因子间的互质关系判断有补格
 * @param {Array<Number>} factors
 * @param {Number} number
 * @returns
 */
const Judge = (factors, number) => {
  const { length } = factors;
  const brr = new Array(length).fill(false);
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (
        gcd(factors[i], factors[j]) === 1 &&
        factors[i] * factors[j] === number
      ) {
        brr[i] = true;
        brr[j] = true;
        break;
      }
    }
  }
  //  若有因子没有被标记为true则为有补格
  return brr.includes(false);
};

module.exports = Judge;
