<template>
  <div>
    <div class="advertising-content group-wrap-main">
      <el-form
        ref="form"
        :inline="true"
        :model="searchForm"
        label-width="80px"
        size="mini"
        class="search-form"
        v-bind:style="{ overflow: 'auto' }"
      >
        <el-form-item>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-refresh"
            @click="getPageData"
          >
            刷新
          </el-button>
          <el-button size="mini" type="primary" @click="showInputModule()">
            新建轮播
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
            prop="name"
            label="展示标题"
            width="200"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="img"
            label="图片"
            width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <img :src="scope.row.img" alt="" class="table-img" />
            </template>
          </el-table-column>
          <el-table-column
            prop="url"
            label="跳转链接"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <a :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="新建时间"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createUser"
            label="创建人"
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
      <el-dialog
        :title="dialogTitle"
        :visible.sync="showModel"
        v-if="showModel"
        :append-to-body="true"
        :close-on-click-modal="false"
        width="500px"
        :show-close="false"
        label-width="80px"
        @close="resetForm"
      >
        <el-form
          size="mini"
          label-width="100px"
          :model="inputForm"
          :rules="rules"
          ref="ruleForm"
          v-bind:style="{ overflow: 'auto' }"
        >
          <el-form-item label="展示标题" prop="title">
            <el-input placeholder="" v-model="inputForm.title"> </el-input>
          </el-form-item>
          <el-form-item label="跳转链接" prop="url">
            <el-input placeholder="" v-model="inputForm.url"> </el-input>
          </el-form-item>
          <el-form-item label="上传轮播图" prop="banner">
            <el-upload
              action="/base/upload/"
              list-type="picture-card"
              :limit="1"
              :file-list="inputForm.files"
              ref="upload"
              :on-success="uploadSuccess"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <span class="form-tip">建议大小1440*1040，且小于5M</span>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input placeholder="" v-model="inputForm.sort"> </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="closeBlog">取 消</el-button>
          <el-button size="mini" type="primary" @click="submitForm"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  getBannerList,
  updateBannerState,
  deleteBanner,
  submitAudit,
  addBanner,
  modifyBanner,
  getBannerById
} from "@/api/banner";
import _ from "lodash";
export default {
  data() {
    let _this = this;
    var checkBanner = (rule, value, callback) => {
      let files = _this.inputForm.files;
      if (!Array.isArray(files) || files.length == 0) {
        return callback(new Error("请上传轮播图片"));
      } else {
        callback();
      }
    };
    return {
      globalItem: null,
      dialogTitle: "新建轮播",
      submitType: 1, //1新建 2修改
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      showModel: false,
      tableData: [],
      searchForm: {
        mobile: ""
      },
      inputForm: {
        title: "",
        url: "",
        state: false,
        sort: "",
        files: []
      },
      rules: {
        title: [
          { required: true, message: "请输入展示标题", trigger: "blur" },
          { max: 10, message: "标题最多10个字符", trigger: "blur" }
        ],
        url: { type: "url", message: "url格式错误", trigger: "blur" },
        sort: {
          type: "integer",
          message: "请输入排序值",
          trigger: "blur",
          transform(value) {
            return _.toNumber(value);
          }
        },
        banner: {
          type: "array",
          required: true,
          validator: checkBanner,
          trigger: "change"
        }
      }
    };
  },

  components: {},

  computed: {
    tableHeight() {
      return window.innerHeight - 240;
    }
  },

  mounted() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.tableData = [
        {
          agentId: 23,
          checkStatus: 0,
          createTime: "2019-12-02 10:28:43",
          createUser: "lsy-agent01-admin01",
          id: 23,
          img: "http://pingtai.ylss.com/pub/ylss/upload/20191202/icon.ico",
          modifyTime: null,
          modifyUser: "",
          name: "测试",
          reason: "",
          remark: "",
          sort: 3,
          state: 0,
          type: 0,
          url: "",
          useType: 0
        },
        {
          agentId: 23,
          checkStatus: 1,
          createTime: "2019-11-28 03:48:31",
          createUser: "lsy-agent01-admin01",
          id: 22,
          img:
            "http://pingtai.ylss.com//pub/ylss/upload//20191128//4377f8224c97d6fe9eb626da8cbbd725bf288ea32296d-4R7Bno.jpg",
          modifyTime: "2019-11-28 06:23:24",
          modifyUser: "lsy-agent01-admin01",
          name: "测试010",
          reason: "",
          remark: "",
          sort: 0,
          state: 0,
          type: 0,
          url: "",
          useType: 0
        },
        {
          agentId: 23,
          checkStatus: 1,
          createTime: "2019-11-28 03:48:19",
          createUser: "lsy-agent01-admin01",
          id: 21,
          img:
            "http://pingtai.ylss.com//pub/ylss/upload//20191128//4377f8224c97d6fe9eb626da8cbbd725bf288ea32296d-4R7Bno.jpg",
          modifyTime: "2019-11-28 06:58:49",
          modifyUser: "lsy-agent01-admin01",
          name: "测试009",
          reason: "",
          remark: "",
          sort: 0,
          state: 0,
          type: 0,
          url: "",
          useType: 0
        },
        {
          agentId: 23,
          checkStatus: 0,
          createTime: "2019-11-28 03:48:07",
          createUser: "lsy-agent01-admin01",
          id: 20,
          img:
            "http://pingtai.ylss.com//pub/ylss/upload//20191128//4377f8224c97d6fe9eb626da8cbbd725bf288ea32296d-4R7Bno.jpg",
          modifyTime: "2019-12-02 10:20:28",
          modifyUser: "lsy-agent01-admin01",
          name: "测试008",
          reason: "",
          remark: "",
          sort: 0,
          state: 0,
          type: 0,
          url: "",
          useType: 0
        },
        {
          agentId: 23,
          checkStatus: 0,
          createTime: "2019-11-28 03:47:54",
          createUser: "lsy-agent01-admin01",
          id: 19,
          img: "http://pingtai.ylss.com//pub/ylss/upload//20191128//top.jpg",
          modifyTime: null,
          modifyUser: "",
          name: "测试007",
          reason: "",
          remark: "",
          sort: 0,
          state: 0,
          type: 0,
          url: "",
          useType: 0
        },
        {
          agentId: 23,
          checkStatus: 0,
          createTime: "2019-11-28 03:47:45",
          createUser: "lsy-agent01-admin01",
          id: 18,
          img:
            "http://pingtai.ylss.com//pub/ylss/upload//20191128//b7e0d5916892aef1e67f73f58c2aa7da47e0c8d717fc4-I69N5t.jpg",
          modifyTime: null,
          modifyUser: "",
          name: "测试006",
          reason: "",
          remark: "",
          sort: 0,
          state: 0,
          type: 0,
          url: "",
          useType: 0
        },
        {
          agentId: 23,
          checkStatus: 0,
          createTime: "2019-11-28 03:47:36",
          createUser: "lsy-agent01-admin01",
          id: 17,
          img:
            "http://pingtai.ylss.com//pub/ylss/upload//20191128//4377f8224c97d6fe9eb626da8cbbd725bf288ea32296d-4R7Bno.jpg",
          modifyTime: null,
          modifyUser: "",
          name: "测试005",
          reason: "",
          remark: "",
          sort: 0,
          state: 0,
          type: 0,
          url: "",
          useType: 0
        },
        {
          agentId: 23,
          checkStatus: 0,
          createTime: "2019-11-28 03:47:24",
          createUser: "lsy-agent01-admin01",
          id: 16,
          img:
            "http://pingtai.ylss.com//pub/ylss/upload//20191128//4377f8224c97d6fe9eb626da8cbbd725bf288ea32296d-4R7Bno.jpg",
          modifyTime: null,
          modifyUser: "",
          name: "测试004",
          reason: "",
          remark: "",
          sort: 0,
          state: 0,
          type: 0,
          url: "",
          useType: 0
        },
        {
          agentId: 23,
          checkStatus: 0,
          createTime: "2019-11-28 02:59:36",
          createUser: "lsy-agent01-admin01",
          id: 13,
          img:
            "http://pingtai.ylss.com//pub/ylss/upload//20191128//b7e0d5916892aef1e67f73f58c2aa7da47e0c8d717fc4-I69N5t.jpg",
          modifyTime: null,
          modifyUser: "",
          name: "对接标题003",
          reason: "",
          remark: "",
          sort: 2,
          state: 1,
          type: 0,
          url: "",
          useType: 0
        },
        {
          agentId: 23,
          checkStatus: 0,
          createTime: "2019-11-28 02:59:03",
          createUser: "lsy-agent01-admin01",
          id: 12,
          img:
            "http://pingtai.ylss.com//pub/ylss/upload//20191128//38c73318a070c6fec58c9352cfaeaba390d7cac215b18-MdebrF.jpg",
          modifyTime: null,
          modifyUser: "",
          name: "测试标题002",
          reason: "",
          remark: "",
          sort: 1,
          state: 1,
          type: 0,
          url: "http://www.baidu.com",
          useType: 0
        }
      ];
      // let that = this;
      // let options = Object.assign(
      //   {
      //     pageNum: that.pageIndex,
      //     pageSize: that.pageSize
      //   },
      //   that.searchForm
      // );
      // that.loading = true;
      // getBannerList(options)
      //   .then(res => {
      //     res.data.list.map(item => {
      //       item.state = !!item.state;
      //       return item;
      //     });
      //     that.tableData = res.data.list;
      //     that.pageIndex = res.data.pageNum;
      //     that.total = res.data.total;
      //     that.loading = false;
      //   })
      //   .catch(() => {
      //     that.loading = false;
      //   });
    },
    resetSearchForm() {
      this.searchForm = {
        sysclassids: ""
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
      this.dialogTitle = "新建轮播";
      this.submitType = 1;
      this.resetForm();
      this.showModel = true;
    },
    closeBlog() {
      this.showModel = false;
      this.resetForm();
    },
    resetForm() {
      this.inputForm = {
        title: "",
        url: "",
        state: false,
        sort: "",
        submitStatus: 0,
        files: []
      };
      if (this.$refs["ruleForm"] && this.$refs["ruleForm"].resetFields) {
        this.$refs["ruleForm"].resetFields();
      }
    },
    switchStatus(row, index) {
      updateBannerState({
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
    editCb(item) {
      if (item.checkStatus == 1) {
        return;
      }
      this.dialogTitle = "修改轮播";
      this.submitType = 2;
      this.loading = true;
      getBannerById({
        id: item.id
      })
        .then(res => {
          let resData = res.data;
          this.globalItem = resData;
          this.inputForm = {
            title: resData.name,
            url: resData.url,
            state: !!resData.state,
            submitStatus: resData.submitStatus,
            sort: resData.sort,
            files: [
              {
                url: resData.img,
                name: resData.img
              }
            ]
          };
          this.showModel = true;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
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
          deleteBanner({
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
    /**
     * 录入学员提交
     */
    submitForm() {
      let that = this;
      that.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let inputForm = that.inputForm;
          let options = {
            name: inputForm.title,
            submitStatus: 0,
            url: inputForm.url,
            sort: inputForm.sort,
            img: inputForm.files[0].url
          };
          that.loading = true;
          if (that.submitType == 1) {
            //新增
            addBanner(options)
              .then(() => {
                that.resetForm();
                that.showModel = false;
                that.$notify({
                  title: "成功",
                  message: "添加成功！",
                  type: "success"
                });
                that.getPageData();
                this.$refs.upload.clearFiles();
                this.inputForm.files = [];
              })
              .catch(() => {
                that.loading = false;
              });
          } else {
            options.id = that.globalItem.id;
            if (that.globalItem.checkStatus == 2) {
              //如果已审核通过，提示
              this.$confirm("修改后需要重新提交审核，确认修改吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  that.modifyBanner(options);
                })
                .catch(() => {});
            } else {
              that.modifyBanner(options);
            }
          }
        } else {
          return false;
        }
      });
    },
    modifyBanner(options) {
      let that = this;
      modifyBanner(options)
        .then(() => {
          that.resetForm();
          that.showModel = false;
          that.$notify({
            title: "成功",
            message: "修改成功！",
            type: "success"
          });
          that.getPageData();
          this.$refs.upload.clearFiles();
          this.inputForm.files = [];
        })
        .catch(() => {
          that.loading = false;
        });
    },
    handleRemove(obj) {
      let uid = obj.uid;
      let files = this.inputForm.files;
      let index = files.findIndex(item => {
        return item.uid == uid;
      });
      files.splice(index, 1);
    },
    uploadSuccess(res) {
      let url = res.data;
      this.inputForm.files = [
        {
          url: url,
          name: url
        }
      ];
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
