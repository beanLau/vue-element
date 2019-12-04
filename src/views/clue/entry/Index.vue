<template>
  <div class="storefront-content group-wrap-main" v-loading="loading">
    <el-form
      size="mini"
      label-width="100px"
      :model="inputForm"
      :rules="rules"
      ref="ruleForm"
      v-bind:style="{ overflow: 'auto' }"
    >
      <div class="el-row">
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realName">
            <el-input placeholder="" v-model="inputForm.realName"> </el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input placeholder="" v-model="inputForm.age"> </el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input placeholder="" v-model="inputForm.mobile"> </el-input>
          </el-form-item>
          <el-form-item class="ver-bottom" label="性别" prop="gender">
            <el-radio-group v-model="inputForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard">
            <el-input placeholder="" v-model="inputForm.idCard"> </el-input>
          </el-form-item>
          <el-form-item label="课程类目" prop="sysClassId">
            <el-cascader
              placeholder="请选择"
              :options="articalTreeOptions"
              clearable
              v-model="inputForm.sysClassId"
              :props="{
                checkStrictly: true,
                label: 'name',
                value: 'id'
              }"
              :show-all-levels="false"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商品名">
            <el-select
              v-model="inputForm.goods"
              size="mini"
              clearable
              placeholder="请选择"
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
          <div class="el-row" style="text-align:center;">
            <el-button size="mini" type="primary" @click="submitForm"
              >保存</el-button
            >
          </div>
        </el-col>
      </div>
    </el-form>
  </div>
</template>

<script>
import { addStudent } from "@/api/student";
import { positiveIntegerValidater, phoneValidater } from "@/utils/validate";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      ruleForm: {},
      inputForm: {
        realName: "",
        age: "",
        mobile: "",
        gender: 1,
        idCard: "",
        sysClassId: "",
        goods: ""
      },
      rules: {
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        age: {
          type: "integer",
          message: "请输入正确数字",
          trigger: "blur",
          validator: positiveIntegerValidater
        },
        mobile: {
          required: true,
          message: "请输入正确手机号",
          validator: phoneValidater
        },
        idCard: {},
        sysClassId: { type: "array", trigger: "change" }
      }
    };
  },

  components: {},

  computed: {
    ...mapState({
      articalTreeOptions(state) {
        return state["index"].articalTreeOptions;
      }
    })
  },

  mounted() {
    this.getSelectData();
  },
  methods: {
    getSelectData() {
      if (!this.articalTreeOptions) {
        this.$store.dispatch("getArticalTreeOptions");
      }
    },
    resetForm() {
      this.inputForm = {
        realName: "",
        age: "",
        mobile: "",
        gender: 1,
        idCard: "",
        sysClassId: "",
        goods: ""
      };
      if (this.$refs["ruleForm"] && this.$refs["ruleForm"].resetFields) {
        this.$refs["ruleForm"].resetFields();
      }
    },
    submitForm() {
      let that = this;
      that.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let options = Object.assign({}, that.inputForm);
          that.loading = true;
          addStudent(options)
            .then(() => {
              that.resetForm();
              that.showModel = false;
              that.$notify({
                title: "成功",
                message: "录入成功！",
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
    }
  }
};
</script>
<style lang="scss" scoped></style>
