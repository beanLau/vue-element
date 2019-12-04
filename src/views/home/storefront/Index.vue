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
        <el-col :span="8">
          <el-form-item label="学校名称" prop="schoolName">
            <el-input
              v-model="inputForm.schoolName"
              placeholder="该名称将展示在主页头部"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="企业注册名称" prop="companyName">
            <el-input
              v-model="inputForm.companyName"
              placeholder="该名称将展示在页末的版权所有信息"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="上传Logo" prop="logoImg">
            <el-upload
              action="/base/upload/"
              list-type="picture-card"
              :limit="1"
              :file-list="inputForm.logoImg"
              ref="upload"
              :on-success="uploadSuccess"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <span class="form-tip">建议大小1440*1040，且小于5M</span>
          </el-form-item>
          <el-form-item label="所在地区" prop="sysareaids">
            <el-cascader
              placeholder="所在地区"
              v-model="inputForm.sysareaids"
              :options="areaOptions"
              clearable
              :props="{
                value: 'id',
                label: 'name',
                checkStrictly: true,
                multiple: true
              }"
              :show-all-levels="false"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input
              v-model="inputForm.address"
              placeholder="详细地址"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话" prop="telephone">
            <el-input
              v-model="inputForm.telephone"
              placeholder="电话"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input
              v-model="inputForm.qq"
              placeholder="QQ"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="wechat">
            <el-input
              v-model="inputForm.wechat"
              placeholder="微信"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input
              v-model="inputForm.mail"
              placeholder="邮箱"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="el-row">
        <el-col :span="16" style="text-align:center;">
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
import { getAgentDetail, saveDetail } from "@/api/global.js";
export default {
  data() {
    let _this = this;
    var checkLogo = (rule, value, callback) => {
      let files = _this.inputForm.logoImg;
      if (!Array.isArray(files) || files.length == 0) {
        return callback(new Error("请上传LOGO图片"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {},
      inputForm: {
        schoolName: "",
        companyName: "",
        logoImg: [],
        address: "",
        telephone: "",
        wechat: "",
        qq: "",
        mail: ""
      },
      rules: {
        schoolName: {
          required: true,
          message: "请输入学校名称",
          trigger: "blur"
        },
        companyName: {
          required: true,
          message: "请输入公司名称",
          trigger: "blur"
        },
        telephone: {
          required: true,
          message: "请输入电话",
          trigger: "blur"
        },
        wechat: { required: true, message: "请输入微信号", trigger: "blur" },
        qq: { required: true, message: "请输入qq号", trigger: "blur" },
        mail: {
          required: true,
          type: "email",
          message: "请输入邮箱地址",
          trigger: "blur"
        },
        logoImg: {
          type: "array",
          required: true,
          validator: checkLogo,
          trigger: "change"
        }
      }
    };
  },

  components: {},

  computed: {
    ...mapState({
      areaOptions(state) {
        return state["index"].areaOptions;
      }
    })
  },

  mounted() {
    this.getSelectData();
    this.getPageData();
  },
  methods: {
    getSelectData() {
      if (!this.areaOptions) {
        this.$store.dispatch("getAreaOptions");
      }
    },
    getPageData() {
      getAgentDetail()
        .then(res => {
          let resData = res.data;
          this.inputForm = resData;
          if (resData.logoImg) {
            this.inputForm.logoImg = [
              {
                url: resData.img,
                name: resData.img
              }
            ];
          } else {
            this.inputForm.logoImg = [];
          }

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
          options.logoImg = options.logoImg[0].url;
          that.loading = true;
          saveDetail(options)
            .then(() => {
              that.$notify({
                title: "成功",
                message: "修改成功！",
                type: "success"
              });
              that.loading = false;
            })
            .catch(() => {
              that.loading = false;
            });
        } else {
          return false;
        }
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
      this.inputForm.logoImg = [
        {
          url: url,
          name: url
        }
      ];
    }
  }
};
</script>
<style lang="scss" scoped></style>
