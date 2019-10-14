<template>
  <div>{{conjunctionStr}}</div>
</template>

<script>
export default {
  data: () => ({
    conjunctionStr: '空'
  }),
  mounted () {
    this.$on('resolveConjunction', ([alpha, conjunctionArr]) => {
      this.conjunctionStr = '';
      conjunctionArr.forEach((item, index) => {
        if (index !== 0) this.conjunctionStr += ' ∧ ';
        this.conjunctionStr += '(';
        alpha.forEach((letter, indexInner) => {
          if (indexInner !== 0) this.conjunctionStr += ' ∨ ';
          item[indexInner]
            ? (this.conjunctionStr += `￢${letter}`)
            : (this.conjunctionStr += letter);
        });
        this.conjunctionStr += ')';
      });
    });
  }
};
</script>

