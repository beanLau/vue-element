<template>
  <div class="storefront-content group-wrap-main" v-loading="loading">
    <el-form
      size="mini"
      :model="inputForm"
      :rules="rules"
      ref="ruleForm"
      class="form-wrap"
      label-width="120px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="文章名称" prop="title">
            <el-input
              v-model="inputForm.title"
              placeholder="文章名称"
              class="custom-width"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="文章封面" prop="logoImg">
            <el-upload
              action="/base/upload/"
              list-type="picture-card"
              :limit="3"
              :file-list="inputForm.logoImg"
              ref="upload"
              :on-success="uploadSuccess"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <span class="form-tip">最多上传三张封面图</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文章类目" prop="sysClassId">
            <el-cascader
              placeholder="文章类目"
              v-model="inputForm.sysClassId"
              :options="articalTreeOptions"
              clearable
              :props="{
                value: 'id',
                label: 'name',
                checkStrictly: true
              }"
              :show-all-levels="false"
            >
            </el-cascader>
          </el-form-item>

          <el-form-item label="作者讲师" prop="teacherIds">
            <el-select
              v-model="inputForm.teacherIds"
              multiple
              placeholder="请选择作者讲师"
            >
              <el-option
                v-for="item in teacherOptions"
                :key="item.id"
                :label="item.realName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input
              v-model="inputForm.sort"
              placeholder="排序"
              class="custom-width"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="el-row">
        <el-col :span="20">
          <el-form-item label="内容" prop="detail">
            <mavon-editor
              v-model="inputForm.detail"
              @imgAdd="imgAdd"
              ref="md"
              :toolbars="toolbars"
            />
          </el-form-item>
        </el-col>
      </div>
      <div class="el-row">
        <el-col :span="20" style="text-align:center;">
          <el-button
            size="mini"
            type="primary"
            @click="submitForm"
            :loading="loading"
            >保存
          </el-button>
        </el-col>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import { uploadImg } from "@/api/global.js";
import { getArticleById, addArticle, modifyArticle } from "@/api/article";
export default {
  data() {
    let _this = this;
    var checkLogo = (rule, value, callback) => {
      let files = _this.inputForm.logoImg;
      if (!Array.isArray(files) || files.length == 0) {
        return callback(new Error("请上传文章封面"));
      } else {
        callback();
      }
    };
    var checkTeacher = (rule, value, callback) => {
      if (!Array.isArray(_this.inputForm.teacherIds)) {
        callback();
      } else if (
        !_this.inputForm.teacherIds.length ||
        _this.inputForm.teacherIds[0] == ""
      ) {
        callback(new Error("请选择作者讲师"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {},
      inputForm: {
        title: "",
        sysClassId: "",
        teacherIds: [],
        sort: "",
        detail: "",
        logoImg: []
      },
      rules: {
        title: {
          required: true,
          message: "请输入文章名称",
          trigger: "blur"
        },
        sort: {
          type: "integer",
          message: "请输入排序值",
          trigger: "blur",
          transform(value) {
            return _.toNumber(value);
          }
        },
        detail: {
          required: true,
          message: "请输入文字内容",
          trigger: "blur"
        },
        logoImg: {
          type: "array",
          required: true,
          validator: checkLogo,
          trigger: "change"
        },
        teacherIds: {
          type: "array",
          required: true,
          validator: checkTeacher,
          trigger: "change"
        }
      },
      value1: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        preview: true // 预览
      }
    };
  },

  components: {},

  computed: {
    ...mapState({
      articalTreeOptions(state) {
        return state["index"].articalTreeOptions;
      },
      teacherOptions(state) {
        return state["index"].teacherOptions;
      }
    })
  },

  mounted() {
    this.setBreadcrumb();
    this.getSelectData();
    if (this.$route.query.id) {
      this.getPageData();
    }
  },
  methods: {
    setBreadcrumb() {
      if (this.$route.query.id) {
        window.Breadcrumb.setBreadcrumbLastName("修改资讯");
      }
    },
    getSelectData() {
      if (!this.articalTreeOptions) {
        this.$store.dispatch("getArticalTreeOptions");
      }
      if (!this.teacherOptions) {
        this.$store.dispatch("getTeacherOptions");
      }
    },
    getPageData() {
      getArticleById({
        id: this.$route.query.id
      })
        .then(res => {
          let resData = res.data;
          let imgs = resData.img.split(",");
          imgs = imgs.map(item => {
            return {
              url: item,
              name: item
            };
          });
          this.inputForm = {
            title: resData.title,
            sysClassId: resData.sysClassId,
            teacherIds: resData.teacherIds.split(","),
            sort: resData.sort,
            detail: resData.detail,
            logoImg: imgs,
            checkStatus: resData.checkStatus
          };
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    submitForm() {
      let that = this;
      that.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let options = Object.assign({}, that.inputForm);
          options.logoImg = options.logoImg.map(item => item.url);
          options.img = options.logoImg.join(",");
          options.sysClassId =
            options.sysClassId[options.sysClassId.length - 1];
          options.teacherIds = options.teacherIds.join(",");
          delete options.logoImg;
          that.loading = true;
          if (that.$route.query.id) {
            //如果是修改
            options.id = that.$route.query.id;
            if (options.checkStatus == 2) {
              //如果已审核通过，提示
              this.$confirm("修改后需要重新提交审核，确认修改吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  that.modifyInfo(options);
                })
                .catch(() => {
                  that.loading = false;
                });
            } else {
              that.modifyInfo(options);
            }
          } else {
            //如果是新增
            addArticle(options)
              .then(() => {
                that.$notify({
                  title: "成功",
                  message: "添加成功！",
                  type: "success"
                });
                that.loading = false;
                that.publish("info"); //发送通知，更新页面数据
                that.$router.back();
              })
              .catch(() => {
                that.loading = false;
              });
          }
        } else {
          return false;
        }
      });
    },
    modifyInfo(options) {
      let that = this;
      modifyArticle(options)
        .then(() => {
          that.$notify({
            title: "成功",
            message: "修改成功！",
            type: "success"
          });
          that.loading = false;
          that.publish("info"); //发送通知，更新页面数据
          that.$router.back();
        })
        .catch(() => {
          that.loading = false;
        });
    },
    handleRemove(obj) {
      let uid = obj.uid;
      let logoImg = this.inputForm.logoImg;
      let index = logoImg.findIndex(item => {
        return item.uid == uid;
      });
      logoImg.splice(index, 1);
    },
    uploadSuccess(res) {
      let url = res.data;
      this.inputForm.logoImg.push({
        url: url,
        name: url
      });
    },
    imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      uploadImg(formdata).then(res => {
        if (res.code == 0) {
          this.$refs.md.$img2Url(pos, res.data);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-width {
  width: 202px;
}
.custom-width input {
  padding: 0 10px;
}
</style>
