<template>
  <div id="wrapper">
    <el-container>
      <el-header>利用真值表法求取主析取范式以及主合取范式的实现</el-header>
      <el-main>
        <div class="app-container">
          <div class="top-container">
            <div class="controller">
              <el-input
                placeholder="请输入公式"
                prefix-icon="el-icon-edit"
                v-model="formulaInput"
                class="formula-input"
                @input="checkValidation"
                autofocus
              >
                <div slot="append">
                  <el-popover
                    placement="bottom"
                    width="400"
                    trigger="manual"
                    v-model="symbolVisible"
                  >
                    <div class="btn-group">
                      <template v-for="(item, index) in symbolArr">
                        <el-button
                          @click="insertSymbol(item)"
                          :key="index"
                          circle
                          style="width: 40px; height: 40px"
                        >{{item}}</el-button>
                      </template>
                    </div>
                    <el-button
                      slot="reference"
                      icon="el-icon-more"
                      @click="symbolVisible = !symbolVisible;"
                    ></el-button>
                  </el-popover>
                </div>
              </el-input>
              <el-button type="primary" @click="handleResolve" :disabled="!valid">求取范式</el-button>
            </div>
            <div
              :class="valid ? 'tips' : 'tips-error tips'"
            >{{valid ? "通过键盘输入变元，通过点击按钮输入符号" : '检测到无效公式!'}}</div>
          </div>
          <div class="bottom-container">
            <el-tabs type="border-card">
              <el-tab-pane label="真值表">
                <div class="table-container">
                  <el-table
                    :data="truthTable"
                    border=""
                    style="width: 100%; "
                    lazy
                    :load="loadRowDataAsync"
                  >
                    <el-table-column
                      v-for="(item, index) in alpha"
                      :key="index"
                      :max-width="1/alpha.length * 100"
                      min-width="180"
                      :prop="alpha[index]"
                      :label="alpha[index]"
                      align="center"
                    />
                    <el-table-column
                      prop="formualTruth"
                      label="表达式真值"
                      align="center"
                      min-width="180"
                      v-if="hasResolve"
                    />
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="主析取范式">
                <disjunction ref="disjunction"/>
              </el-tab-pane>
              <el-tab-pane label="主合取范式">
                <conjunction :conjunctionArr="conjunctionArr" :alpha="alpha" ref="conjunction"/>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import TruthTable from 'components/HomePage/TruthTable'
import Disjunction from '@/components/HomePage/Disjunction';
import Conjunction from '@/components/HomePage/Conjunction';

export default {
  name: 'HomePage',
  components: { Disjunction, Conjunction },
  data: () => ({
    formulaInput: '',
    formulaAfterInit: '',
    formulaLast: '',
    valid: true,
    symbolVisible: false,
    postfix: '',
    alpha: [],
    truthTable: [],
    truthMap: {},
    symbolArr: ['¬', '∧', '∨', '→', '↔', '(', ')'],
    selectPosBefore: 0,
    disjunctionArr: [],
    conjunctionArr: [],
    hasResolve: false
  }),
  methods: {
    checkValidation (val) {
      if (val.length === 0) {
        this.valid = true;
      } else {
        val.match(/[^A-Za-z¬∧∨→↔()]/g) ||
        val.match(/[∧∨→↔](?=[∧∨→↔])/g) ||
        val.match(/[A-Za-z](?=[A-Za-z])/g)
          ? (this.valid = false)
          : (this.valid = true);
      }
    },
    insertSymbol (symbol) {
      const input = document.getElementsByClassName('el-input__inner')[0];
      const { selectionStart } = input;
      this.selectPosBefore = selectionStart;
      this.formulaInput =
        this.formulaInput.substring(0, selectionStart) +
        symbol +
        this.formulaInput.substring(selectionStart);
      input.focus();
      setTimeout(() => {
        input.setSelectionRange(selectionStart + 1, selectionStart + 1);
      }, 0);
      this.checkValidation(this.formulaInput);
    },
    loadRowDataAsync (tree, treeNode, resolve) {},
    icp (ch) {
      // 栈外
      switch (ch) {
        case '#':
          return 0;
        case '(':
          return 12;
        case '¬':
          return 10;
        case '∧':
          return 8;
        case '∨':
          return 6;
        case '→':
          return 4;
        case '↔':
          return 2;
        case ')':
          return 1;
      }
    },
    isp (ch) {
      // 栈内
      switch (ch) {
        case '#':
          return 0;
        case '(':
          return 1;
        case '¬':
          return 11;
        case '∧':
          return 9;
        case '∨':
          return 7;
        case '→':
          return 5;
        case '↔':
          return 3;
        case ')':
          return 12;
      }
    },
    top (arr) {
      return arr[arr.length - 1];
    },
    transform () {
      const symbolStack = [];
      symbolStack.push('#');
      let symbol;
      for (let i = 0; i < this.formulaAfterInit.length; i++) {
        const ch = this.formulaAfterInit.charAt(i);
        if (ch.match(/[A-Za-z]/)) {
          this.postfix += ch;
          if (this.alpha.indexOf(ch) === -1) {
            this.alpha.push(ch);
          }
        } else if (ch === ')') {
          for (
            symbol = this.top(symbolStack);
            symbol !== '(';
            symbol = this.top(symbolStack)
          ) {
            this.postfix += symbol;
            symbolStack.pop();
          }
          symbolStack.pop();
        } else {
          if (ch === '(' && this.top(symbolStack) === '(') {
            symbolStack.push(ch);
          } else {
            for (
              symbol = this.top(symbolStack);
              symbol && this.icp(ch) <= this.isp(symbol);
              symbol = this.top(symbolStack)
            ) {
              if (symbol !== '(') this.postfix += symbol;
              symbolStack.pop();
            }
            symbolStack.push(ch);
          }
        }
      }
      while (symbolStack.length !== 1) {
        const symbol = symbolStack.pop();
        if (symbol !== '(') this.postfix += symbol;
      }
    },
    cal () {
      const symbolStack = [];
      for (let i = 0; i < this.postfix.length; i++) {
        const ch = this.postfix.charAt(i);
        if (ch === '#') break;
        if (ch.match(/[A-Za-z]/)) {
          symbolStack.push(this.truthMap[ch]);
        } else if (ch === '¬') {
          const mark = symbolStack.pop();
          symbolStack.push(!mark);
        } else {
          const [mark1, mark2] = [symbolStack.pop(), symbolStack.pop()];
          switch (ch) {
            case '∧':
              symbolStack.push(mark1 && mark2);
              break;
            case '∨':
              symbolStack.push(mark1 || mark2);
              break;
            case '→':
              symbolStack.push(!(mark2 && !mark1));
              break;
            case '↔':
              symbolStack.push(mark1 === mark2);
              break;
          }
        }
      }
      return this.top(symbolStack);
    },
    dfs (currentVariableIndex) {
      if (currentVariableIndex === this.alpha.length) {
        const ans = this.cal();
        let tempObj = {};
        let tempArr = [];
        this.alpha.forEach((letter, index) => {
          this.truthMap[letter]
            ? (tempObj[letter] = 'T')
            : (tempObj[letter] = 'F');
        });
        ans ? (tempObj['formualTruth'] = 'T') : (tempObj['formualTruth'] = 'F');
        this.truthTable.push(tempObj);
        this.alpha.forEach((letter, index) => {
          tempArr[index] = this.truthMap[letter];
        });
        ans
          ? this.disjunctionArr.push(tempArr)
          : this.conjunctionArr.push(tempArr);
        return;
      }
      this.truthMap[this.alpha[currentVariableIndex]] = true;
      this.dfs(currentVariableIndex + 1);
      this.truthMap[this.alpha[currentVariableIndex]] = false;
      this.dfs(currentVariableIndex + 1);
    },
    handleResolve () {
      if (this.formulaLast !== this.formulaInput) {
        this.reset();
        this.formulaAfterInit = this.formulaInput + '#';
        this.formulaAfterInit = this.formulaAfterInit.replace(/(¬+)/, item => {
          return item.length % 2 ? '¬' : '';
        });
        this.transform();
        this.dfs(0);
        this.$refs.disjunction.$emit('resolveDisjunction', [
          this.alpha,
          this.disjunctionArr
        ]);
        this.$refs.conjunction.$emit('resolveConjunction', [
          this.alpha,
          this.conjunctionArr
        ]);
        this.formulaLast = this.formulaInput;
        this.hasResolve = true;
      }
    },
    reset () {
      this.formulaAfterInit = '';
      this.postfix = '';
      this.alpha = [];
      this.truthTable = [];
      this.truthMap = {};
      this.disjunctionArr = [];
      this.conjunctionArr = [];
      this.hasResolve = false;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

::-webkit-scrollbar {
  width: 8vpx;
  height: 10px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  background-color: #eceff1;
  border-radius: 4px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #bbb;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  /* padding: 60px 80px; */
  width: 100vw;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 2rem !important;
  height: calc(100vh - 60px);
}

.app-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.top-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
}

.top-container .controller {
  display: flex;
  justify-content: space-around;
}

.top-container .formula-input {
  width: 70%;
}

.btn-group {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.top-container .tips {
  margin-top: 0.2rem;
  text-align: center;
  font-size: 14px;
  color: #909399;
}

.top-container .tips-error {
  color: #f56c6c;
}

.bottom-container {
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-container .el-tabs {
  width: 100%;
  height: 100%;
}
.bottom-container .el-tab-pane {
  height: calc((100vh - 60px - 4rem) * 0.78 - 39px);
  overflow-x: auto;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-container .table-container {
  width: 100%;
  max-height: 100%;
}
.el-table__header tr th {
  background: rgb(245, 247, 250);
}
</style>
