<template>
  <div>
    <div
      class="advertising-content group-wrap-main"
      v-if="pagePath == '/course'"
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
        <el-form-item label="课程标题">
          <el-input
            v-model="searchForm.title"
            placeholder="课程标题"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="作者讲师">
          <el-input
            v-model="searchForm.teacherName"
            placeholder="作者讲师"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="发布状态">
          <el-select
            v-model="searchForm.state"
            size="mini"
            clearable
            placeholder="请选择"
            style="width:100px;"
          >
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程类目">
          <el-cascader
            placeholder="请选择"
            :options="articalTreeOptions"
            clearable
            v-model="searchForm.sysClassId"
            :props="{
              checkStrictly: true,
              label: 'name',
              value: 'id'
            }"
            :show-all-levels="false"
          ></el-cascader>
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
          <el-button size="mini" type="primary" @click="showInputModule()">
            新建课程
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
            type="index"
            label="序号"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="课程名称"
            width="200"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="sysClassName"
            label="所属类目"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="teacherNames" label="作者讲师" align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="发布时间"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="likeNum"
            label="价格"
            width="100"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="状态" width="80" align="center">
            <template slot-scope="scope">
              <el-switch
                v-if="scope.row.checkStatus == 2"
                v-model="scope.row.state"
                @change="switchStatus(scope.row, scope.$index)"
              >
              </el-switch>
              <span v-if="scope.row.checkStatus == 0">待提审</span>
              <span v-if="scope.row.checkStatus == 1">审核中</span>
              <span v-if="scope.row.checkStatus == 3">审核被拒</span>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" width="80" align="center">
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <span
                @click="editCb(scope.row)"
                class="table-btn edit"
                :class="{ 'disable-btn': scope.row.checkStatus == 1 }"
              >
                <i class="el-icon-edit-outline"></i>修改</span
              >
              <span
                @click="submitCheck(scope.row)"
                class="table-btn edit"
                :class="{ 'disable-btn': scope.row.checkStatus != 0 }"
              >
                <i class="el-icon-s-promotion"></i>提审</span
              >
              <span @click="deleteCb(scope.row)" class="table-btn remove">
                <i class="el-icon-delete"></i>删除</span
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
import {
  getCourseList,
  updateCourseState,
  deleteCourse,
  submitAudit
} from "@/api/course";
import { mapState } from "vuex";
export default {
  data() {
    return {
      globalItem: null,
      dialogTitle: "新建课程",
      submitType: 1, //1新建 2修改
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      showModel: false,
      tableData: [],
      searchForm: {
        title: "",
        sysClassId: "",
        teacherName: "",
        state: ""
      },
      infoTypeOptions: [],
      stateOptions: [
        {
          value: "0",
          label: "否"
        },
        {
          value: "1",
          label: "是"
        }
      ]
    };
  },

  components: {},

  computed: {
    ...mapState({
      articalTreeOptions(state) {
        return state["index"].articalTreeOptions;
      }
    }),
    pagePath() {
      return this.$route.path;
    },
    tableHeight() {
      return window.innerHeight - 240;
    }
  },

  mounted() {
    this.subscribe("course");
    this.getSelectData();
    this.getPageData();
  },
  methods: {
    getSelectData() {
      if (!this.articalTreeOptions) {
        this.$store.dispatch("getArticalTreeOptions");
      }
    },
    toSearch() {
      this.pageIndex = 1;
      this.getPageData();
    },
    resetSearch() {
      this.searchForm = {
        title: "",
        sysClassId: "",
        teacherName: "",
        state: ""
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
      let sysClassId = options.sysClassId;
      if (Array.isArray(sysClassId) && sysClassId.length > 0) {
        options.sysClassId = sysClassId[sysClassId.length - 1];
      } else {
        delete options.sysClassId;
      }
      that.loading = true;
      getCourseList(options)
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
    resetSearchForm() {
      this.searchForm = {
        title: "",
        sysClassId: "",
        teacherName: "",
        state: ""
      };
      this.pageIndex = 1;
      this.getPageData();
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
    /**
     * 显示录入表单弹窗
     */
    showInputModule() {
      this.$router.push({
        path: "/course/detail",
        query: { id: "" }
      });
    },
    switchStatus(row, index) {
      updateCourseState({
        id: row.id
      })
        .then(res => {
          if (res.code != 0) {
            this.tableData[index].state = !this.tableData[index].state;
          }
        })
        .catch(() => {
          this.tableData[index].state = !this.tableData[index].state;
        });
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
      this.$confirm("确认提交审核吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          submitAudit({
            id: item.id
          })
            .then(() => {
              this.$notify({
                title: "成功",
                message: "提交审核成功！",
                type: "success"
              });
              this.getPageData();
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    deleteCb(item) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          deleteCourse({
            id: item.id
          })
            .then(() => {
              this.$notify({
                title: "成功",
                message: "删除成功！",
                type: "success"
              });
              this.getPageData();
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    publishCb(type) {
      if (type == "course") {
        this.getPageData();
      }
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
</style>
