<template>
  <div>{{disjunctionStr}}</div>
</template>

<script>
export default {
  data: () => ({
    disjunctionStr: '空'
  }),
  mounted () {
    //  输出主合取范式
    this.$on('resolveDisjunction', ([alpha, disjunctionArr]) => {
      this.disjunctionStr = '';
      disjunctionArr.forEach((item, index) => {
        if (index !== 0) this.disjunctionStr += ' ∨ ';
        this.disjunctionStr += '(';
        alpha.forEach((letter, indexInner) => {
          if (indexInner !== 0) this.disjunctionStr += ' ∧ ';
          item[indexInner]
            ? (this.disjunctionStr += letter)
            : (this.disjunctionStr += `￢${letter}`);
        });
        this.disjunctionStr += ')';
      });
    });
  }
};
</script>

