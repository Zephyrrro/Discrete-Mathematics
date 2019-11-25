const gcd = (n, m) => {
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

const Judge = (factors, number) => {
  const { length } = factors;
  const brr = new Array(length).fill(false);
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      const temp = gcd(factors[i], factors[j]);
      if (temp === 1 && factors[i] * factors[j] === number) {
        brr[i] = true;
        brr[j] = true;
        break;
      }
    }
  }
  return brr.includes(false);
};

module.exports = Judge;
