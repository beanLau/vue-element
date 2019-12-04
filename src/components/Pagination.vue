<template>
  <div class="pagination-wrap">
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="pageIndexChange"
      :current-page="page.pageIndex"
      :page-sizes="pageSizes"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "pagination",
  props: ["total"],
  data() {
    return {
      pageSizes: [10, 20, 50],
      page: {
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    /**
     * pageSize修改回调
     */
    pageSizeChange(value) {
      this.page.pageSize = value;
      this.$emit("pageChange", this.page);
    },
    /**
     * 当前显示第几页修改回调
     */
    pageIndexChange(value) {
      this.page.pageIndex = value;
      this.$emit("pageChange", this.page);
    }
  }
};
</script>

<style lang="less">
.pagination-wrap {
  margin-top: 10px;
  text-align: right;
}
@media (max-width: 1366px) {
  .tabel-page {
    .pagination-wrap {
      margin-top: 4px !important;
    }
  }
}
</style>
