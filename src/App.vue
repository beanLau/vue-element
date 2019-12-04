<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang="less">
html body {
  font-size: 62.5%;
}
#app {
  font-family: "MicrosoftYaHei";
}
* {
  margin: 0;
  padding: 0;
}

body .el-table th.gutter {
  display: table-cell !important;
}

body .el-table colgroup.gutter {
  display: table-cell !important;
}
.flex {
  display: flex;
  align-items: center;
}
.mgLf10 {
  margin-left: 10px;
}
::-webkit-scrollbar-track-piece {
  background-color: #eaeaea;
  border-left: 1px solid #d2d2d2;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #bdbdbd;
  background-clip: padding-box;
  min-height: 8px;
}
</style>
