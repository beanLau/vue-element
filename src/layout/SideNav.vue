<template>
  <div
    class="sidebar-content"
    v-bind:class="{ 'collapse-sidebar': isCollapse }"
  >
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#202D3D"
      text-color="#ccc"
      active-text-color="#1890ff"
      router
    >
      <template v-for="(item, index) in sideBarData">
        <el-submenu
          v-if="item.children || !item.hidden"
          :key="index"
          :index="item.path"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            style="font-weight: 100"
            v-for="(it, index) in item.children"
            :key="index"
            :index="it.path"
            >{{ it.name }}</el-menu-item
          >
        </el-submenu>
        <el-menu-item v-else-if="!item.hidden" :key="index" :index="item.path">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isCollapse: state => state["index"].isCollapse,
      sideBarData: state => state["index"].sideBarData
    })
  }
};
</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.sidebar-content {
  position: absolute;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  width: 201px;
  height: calc(100% - 50px);
  background: #202d3d;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  .el-menu {
    box-sizing: border-box;
    border: none;
  }
  .el-menu-item.is-active {
    background: #1a2431 !important;
    box-sizing: border-box;
    border-left: 2px solid #1890ff;
  }
  .el-submenu .el-menu-item {
    background: #1d2837;
  }
}
.collapse-sidebar {
  width: 64px;
}
.sidebar-content::-webkit-scrollbar-thumb {
  background: #323232;
  background-clip: padding-box;
  min-height: 6px;
}
.sidebar-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.sidebar-content::-webkit-scrollbar-track-piece {
  /*内层轨道，滚动条中间部分（位置4）*/
  background-color: #666;
  border-left: 1px solid #666;
}
.el-submenu__title {
  height: 50px !important;
}
</style>
