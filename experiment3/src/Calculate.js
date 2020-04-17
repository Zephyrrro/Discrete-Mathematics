/**
 * 输入数字，返回其因子
 * @param {Number} number
 * @returns
 */
const getFactors = number => {
  const factors = [];
  const k = Math.round(Math.sqrt(number));
  for (let i = 1; i <= k; i++) {
    if (number % i === 0) {
      if (i !== number / i) {
        factors.push(i);
        factors.push(number / i);
      } else {
        factors.push(i);
      }
    }
  }
  //  返回升序排序的因子数组
  return factors.sort((first, second) => first - second);
};

/**
 * 根据各个因子之间能否互相整除得到盖住关系
 * @param {Array<Number>} factors
 * @returns
 */
const getCovers = factors => {
  const covers = [];
  const { length } = factors;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (factors[j] % factors[i] === 0 && i < j) {
        let flag = true;
        for (let k = i + 1; k < j; k++) {
          if (
            factors[j] % factors[k] === 0 &&
            factors[k] % factors[i] === 0 &&
            i < k &&
            k < j
          ) {
            flag = false;
            break;
          }
        }
        if (flag) {
          covers.push(`<${factors[i]}, ${factors[j]}>`);
        }
      }
    }
  }
  return covers;
};

module.exports = { getFactors, getCovers };
