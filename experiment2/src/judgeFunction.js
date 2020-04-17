//  自反
const Reflexive = matrix => {
  const { length } = matrix;
  for (let i = 0; i < length; i++) {
    if (matrix[i][i] !== 1) return false;
  }
  return true;
};

//  反自反
const Irreflexive = matrix => {
  const { length } = matrix;
  for (let i = 0; i < length; i++) {
    if (matrix[i][i] === 1) return false;
  }
  return true;
};

//  对称
const Symmetry = matrix => {
  const { length } = matrix;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (matrix[i][j] !== matrix[j][i]) return false;
    }
  }
  return true;
};

//  反对称
const Dissymmetry = matrix => {
  const { length } = matrix;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (matrix[i][j] === 1 && matrix[i][j] === matrix[j][i] && i !== j)
        return false;
    }
  }
  return true;
};

//  传递
const Transitivity = matrix => {
  const { length } = matrix;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      for (let k = 0; k < length; k++) {
        if (matrix[i][j] === 1 && matrix[j][k] === 1 && matrix[i][k] === 0)
          return false;
      }
    }
  }
  return true;
};

module.exports = {
  Reflexive,
  Irreflexive,
  Symmetry,
  Dissymmetry,
  Transitivity
};
