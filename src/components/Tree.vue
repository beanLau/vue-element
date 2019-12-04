<template>
  <div>
    <el-tree
      :data="treeDatas"
      show-checkbox
      node-key="id"
      highlight-current
      :props="defaultProps"
      @check-change="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
export default {
  name: "tree",
  props: ["treeDatas", "defaultProps"],
  data() {
    return {
      checkedId: ""
    };
  },
  methods: {
    handleNodeClick(data) {
      this.$emit("getTreeChecked", data);
    }
    // handleNodeClick(data, checked, indeterminate) {
    // }
  }
};
</script>
<style lang="less">
@import "~@/assets/styles/variables.less";
.el-tree {
  .el-tree-node__label,
  p:first-child {
    padding: 2px 8px;
    color: @normal-color;
    font-size: 12px;
    border: 1px solid transparent;
  }
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: #fff !important;
    .el-tree-node__label,
    p:first-child {
      border-color: #2697ff;
      color: #2697ff;
      border-radius: 2px;
      background: rgb(233, 244, 255);
    }
  }
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
    &:after {
      width: 3px;
      height: 7px;
      left: 5px;
      top: 2px;
    }
  }
  .el-checkbox__input.is-indeterminate {
    .el-checkbox__inner::before {
      top: 6px;
    }
  }
}
</style>
