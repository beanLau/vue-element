<template>
  <div>
    <top />
    <side-nav />
    <div
      class="collapse-btn"
      v-bind:class="{ 'collapse-main': isCollapse }"
      @click="switchCollapse"
    >
      {{ isCollapse ? "展开" : "收起" }}
    </div>
    <el-main class="main" v-bind:class="{ 'collapse-main': isCollapse }">
      <breadcrumb ref="breadcrumb" />
      <router-view />
    </el-main>
  </div>
</template>
<script>
import Top from "./layout/Top.vue";
import SideNav from "./layout/SideNav.vue";
import Breadcrumb from "./components/Breadcrumb";

import { mapState } from "vuex";
export default {
  components: {
    Top,
    SideNav,
    Breadcrumb
  },
  mounted() {},
  computed: {
    ...mapState({
      isCollapse(state) {
        return state["index"].isCollapse;
      }
    })
  },
  methods: {
    switchCollapse() {
      this.$store.dispatch("switchCollapse");
    }
  }
};
</script>
<style lang="less">
@import "~@/assets/styles/variables.less";

.main {
  position: absolute;
  overflow: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 20px !important;
  bottom: 0;
  right: 0;
  left: 200px;
  top: 50px;
}
.collapse-btn {
  position: absolute;
  bottom: 20px;
  height: 40px;
  left: 200px;
  width: 14px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 10px;
  border-left: none;
  padding: 6px 0;
  box-sizing: border-box;
  cursor: pointer;
  z-index: 1;
}
.collapse-main {
  left: 64px;
}
.el-table {
  color: #999;
  border-radius: 4px;
}
.el-table .cell {
  font-size: 12px;
  color: #999;
}
.el-table thead {
  font-size: 14px;
  color: #333;
}
.el-table th > .cell {
  font-size: 14px;
  color: #333;
}
.el-row + .el-row {
  margin-top: 20px;
}
.el-col-3 {
  div {
    font-size: 12px;
    color: #333;
    line-height: 24px;
    text-align: right;
    margin-right: 10px;
  }
}
// tree树形点击背景色
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
}
</style>
