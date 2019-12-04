<template>
  <div class="navbar clearfix">
    <el-breadcrumb
      class="breadcrumb-container"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item
        v-for="item in breadList"
        :key="item.path"
        :to="item.path"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  data() {
    return {
      breadList: []
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    window.Breadcrumb = this;
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      this.breadList = matched;
    },
    setBreadcrumbLastName(value) {
      this.breadList[this.breadList.length - 1]["name"] = value;
    }
  }
};
</script>

<style lang="less">
@media (min-width: 1336px) {
  .el-breadcrumb {
    height: 50px;
    line-height: 50px !important;
    font-size: 12px !important;
  }
}
</style>
