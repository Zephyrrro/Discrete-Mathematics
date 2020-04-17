const Judge = require("./judgeFunction");

module.exports = matrix => {
  console.log("\n关系矩阵：");
  matrix.forEach(row => console.log(`[ ${row} ]`));

  console.log("\n该集合具有：");

  if (Judge.Reflexive(matrix)) {
    console.log("自反性");
  } 
  if (Judge.Irreflexive(matrix)) {
    console.log("反自反性");
  }
  if (Judge.Symmetry(matrix)) {
    console.log("对称性");
  }
  if (Judge.Dissymmetry(matrix)) {
    console.log("反对称性");
  }

  if (Judge.Transitivity(matrix)) {
    console.log("传递性");
  }
};
