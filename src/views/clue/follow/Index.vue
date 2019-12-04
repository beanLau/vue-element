<template>
  <div>
    <div
      class="advertising-content group-wrap-main"
      v-if="pagePath == '/follow'"
    >
      <el-form
        ref="form"
        :inline="true"
        :model="searchForm"
        label-width="70px"
        size="mini"
        class="search-form"
        v-bind:style="{ overflow: 'auto' }"
      >
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="searchForm.startTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="costom-datepicker"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学员ID">
          <el-input
            v-model="searchForm.id"
            placeholder="学员ID"
            class="costom-input"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="学员名称">
          <el-input
            v-model="searchForm.realName"
            placeholder="学员名称"
            class="costom-input"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="searchForm.mobile"
            placeholder="手机号码"
            class="costom-input"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="toSearch"
          >
            查询
          </el-button>
          <el-button size="mini" type="primary" @click="exportCb">
            导出
          </el-button>
          <el-button size="mini" type="primary" @click="resetSearch">
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <div
        class="tabel-content"
        v-bind:style="{ maxHeight: tableHeight + 'px' }"
      >
        <el-table
          v-loading="loading"
          border
          :data="tableData"
          :height="tableHeight"
          style="width: 100%"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          tooltip-effect="light"
        >
          <el-table-column
            prop="title"
            label="学员ID"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="学员昵称"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="手机号"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="sysClassName"
            label="真实姓名"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="teacherNames"
            label="关注商品"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="性别"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="likeNum"
            label="年龄"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="likeNum"
            label="注册时间"
            width="160"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="likeNum"
            label="最近登录时间"
            width="160"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <span
                @click="editCb(scope.row)"
                class="table-btn edit"
                :class="{ 'disable-btn': scope.row.checkStatus == 1 }"
              >
                <i class="el-icon-edit-outline"></i>详情</span
              >
              <span
                @click="submitCheck(scope.row)"
                class="table-btn edit"
                :class="{ 'disable-btn': scope.row.checkStatus != 0 }"
              >
                <i class="el-icon-s-promotion"></i>确认到店</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-wrap">
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageIndexChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { getStudentList, exportStudent, updateSotreState } from "@/api/student";
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      showModel: false,
      tableData: [],
      searchForm: {
        realName: "",
        id: "",
        mobile: "",
        startTime: ""
      }
    };
  },

  components: {},

  computed: {
    pagePath() {
      return this.$route.path;
    },
    tableHeight() {
      return window.innerHeight - 240;
    }
  },

  mounted() {
    this.getPageData();
  },
  methods: {
    toSearch() {
      this.pageIndex = 1;
      this.getPageData();
    },
    resetSearch() {
      this.searchForm = {
        realName: "",
        id: "",
        mobile: "",
        startTime: ""
      };
      this.pageIndex = 1;
      this.getPageData();
    },
    getPageData() {
      let that = this;
      let options = Object.assign(
        {
          pageNum: that.pageIndex,
          pageSize: that.pageSize
        },
        that.searchForm
      );
      if (options.startTime) {
        options.endTime = options.startTime[1];
        options.startTime = options.startTime[0];
      }

      that.loading = true;
      getStudentList(options)
        .then(res => {
          res.data.list.map(item => {
            item.state = !!item.state;
            return item;
          });
          that.tableData = res.data.list;
          that.pageIndex = res.data.pageNum;
          that.total = res.data.total;
          that.loading = false;
        })
        .catch(() => {
          that.loading = false;
        });
    },
    exportCb() {
      let that = this;
      let options = Object.assign(
        {
          pageNum: that.pageIndex,
          pageSize: that.pageSize
        },
        that.searchForm
      );
      if (options.startTime) {
        options.endTime = options.startTime[1];
        options.startTime = options.startTime[0];
      }

      that.loading = true;
      exportStudent(options)
        .then(() => {
          this.$message({
            type: "success",
            message: "导出成功!"
          });
          that.loading = false;
        })
        .catch(() => {
          that.loading = false;
        });
    },
    /**
     * pageSize修改回调
     */
    pageSizeChange(value) {
      this.pageSize = value;
      this.getPageData();
    },
    /**
     * 当前显示第几页修改回调
     */
    pageIndexChange(value) {
      this.pageIndex = value;
      this.getPageData();
    },
    editCb(row) {
      this.$router.push({
        path: "/course/detail",
        query: { id: row.id }
      });
    },
    submitCheck(item) {
      if (item.checkStatus != 0) {
        return;
      }
      this.$confirm("确认到店吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          updateSotreState({
            id: item.id
          })
            .then(() => {
              this.$notify({
                title: "成功",
                message: "确认到店成功！",
                type: "success"
              });
              this.getPageData();
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.advertising-content {
  .search-form {
    margin-top: 10px;
  }
  .top-btns {
    margin-bottom: 10px;
  }
  .pagination-wrap {
    margin-top: 10px;
    text-align: right;
  }
  .highlight {
    color: #409eff;
    cursor: pointer;
  }
  .table-btns {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .add-btn {
      color: #1890ff;
    }
    .table-btn {
      color: #666;
      font-size: 10px;
      padding: 0 6px;
      cursor: pointer;
      i {
        margin-right: 2px;
      }
    }
  }
  .custom-width {
    width: 40px;
    input {
      padding: 0 2px !important;
    }
  }
  .custom-date-picker {
    width: 140px;
  }
  .column-pic {
    width: 30px;
    height: 30px;
    margin: 0 6px;
  }
  .table-img {
    width: 100px;
    display: inline-block;
  }
}
.form-tip {
  color: #999;
  font-size: 10px;
}
.costom-datepicker {
  width: 240px;
}
.costom-input {
  width: 150px;
}
</style>
