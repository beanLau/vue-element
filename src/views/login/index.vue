<template>
  <div>
    <div class="loginDev">
      <div class="loginMask"></div>
      <div class="login">
        <div class="loginLeft">
          <div class="loginLogo">
            <el-image
              class="zdwxLogo"
              src="http://img.wangxiao.cn/bjupload/new_crm/2019-10-22/1ac855bb-1b2b-4b58-8d11-2f4178599d7b.png"
              fit="fill"
            ></el-image>
          </div>
          <div class="leftMen">
            <span class="gsKh">中大网校,</span>
            <span class="gsKh">一切为荣誉而战!</span>
          </div>
        </div>
        <div class="loginRight" v-if="isInitPwd">
          <div class="loginRightTopChange">
            修改密码
            <!-- <span class="close">关闭</span>  -->
          </div>
          <div class="line"></div>
          <div class="tips">
            <span>
              温馨提示：<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因为您首次登录中大网校CRM客户关系管理系统，为了您的账户安全，请修改密码后进行登录。
            </span>
          </div>
          <div class="loginRightBottomChange">
            <el-form :model="formInline" :rules="rules" ref="formInline">
              <el-form-item prop="oldPassword">
                <el-input
                  :type="oldpasswordType"
                  prefix-icon="el-icon-lock"
                  v-model="formInline.oldPassword"
                  class="elInput"
                  placeholder="请输入原密码"
                >
                  <i
                    slot="suffix"
                    title="显示密码"
                    style="cursor:pointer;color:#AAAAAA;"
                    v-if="oldPaddword"
                    @click="changeOldPass(oldPaddword)"
                    class="el-input__icon icon-hide"
                    >&#xe6fe;</i
                  >
                  <i
                    slot="suffix"
                    title="隐藏密码"
                    style="cursor:pointer;color:#1890FF;"
                    v-else
                    @click="changeOldPass(oldPaddword)"
                    class="el-input__icon icon-hide"
                    >&#xe60f;</i
                  >
                </el-input>
              </el-form-item>
              <el-form-item prop="newPassword">
                <el-input
                  :type="newpasswordType"
                  prefix-icon="el-icon-lock"
                  v-model="formInline.newPassword"
                  class="elInput"
                  placeholder="请输入新密码"
                >
                  <i
                    slot="suffix"
                    title="显示密码"
                    style="cursor:pointer;color:#AAAAAA;"
                    v-if="newPaddword"
                    @click="changeNewPass(newPaddword)"
                    class="el-input__icon icon-hide"
                    >&#xe6fe;</i
                  >
                  <i
                    slot="suffix"
                    title="隐藏密码"
                    style="cursor:pointer;color:#1890FF;"
                    v-else
                    @click="changeNewPass(newPaddword)"
                    class="el-input__icon icon-hide"
                    >&#xe60f;</i
                  >
                </el-input>
              </el-form-item>
              <el-form-item prop="sureNewPassword">
                <el-input
                  :type="surenewpasswordType"
                  prefix-icon="el-icon-lock"
                  v-model="formInline.sureNewPassword"
                  class="elInput"
                  placeholder="请确认新密码"
                >
                  <i
                    slot="suffix"
                    title="显示密码"
                    style="cursor:pointer;color:#AAAAAA;"
                    v-if="sureNewPaddword"
                    @click="changesureNewPass(sureNewPaddword)"
                    class="el-input__icon icon-hide"
                    >&#xe6fe;</i
                  >
                  <i
                    slot="suffix"
                    title="隐藏密码"
                    style="cursor:pointer;color:#1890FF;"
                    v-else
                    @click="changesureNewPass(sureNewPaddword)"
                    class="el-input__icon icon-hide"
                    >&#xe60f;</i
                  >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="onSubmitChange('formInline')"
                  class="loginBtn"
                  >确 认</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="loginRight" v-else>
          <div class="Position"></div>
          <div class="saoCode" @click="isCode">
            <i
              slot="suffix"
              title="扫码登录"
              v-if="showCode"
              style="cursor:pointer;color:#1890FF;"
              class="el-input__icon icon-code"
              >&#xe607;</i
            >
            <i
              slot="suffix"
              title="账号登录"
              v-else
              style="cursor:pointer;color:#1890FF;"
              class="el-input__icon icon-pc"
              >&#xe606;</i
            >
          </div>
          <div class="loginRightTop" v-html="logoType"></div>
          <div class="line"></div>
          <div class="loginRightBottom" v-show="showCode">
            <el-form :model="formInline" :rules="rules" ref="formInline">
              <el-form-item prop="user">
                <el-input
                  prefix-icon="el-icon-user"
                  v-model="formInline.user"
                  placeholder="请输入用户名"
                  autofocus
                  class="elInput"
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  prefix-icon="el-icon-lock"
                  v-model="formInline.password"
                  class="elInput"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  prefix-icon="el-icon-key"
                  v-model="formInline.code"
                  placeholder="请输入验证码"
                  class="elInput2"
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="onSubmit('formInline')"
                  class="loginBtn"
                  >登 录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div v-show="!showCode">
            <div id="login_container"></div>
          </div>
        </div>
      </div>
    </div>
    <remote-js
      src="https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js"
    ></remote-js>
  </div>
</template>
<script>
import request from "@/utils/request";
//import changeUrl from "@/api/changeUrl";
export default {
  components: {
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src }
        });
      },
      props: {
        src: { type: String, required: true }
      }
    }
  },
  data() {
    var surePassWord = (rule, value, callback) => {
      if (!value) {
        callback("请确认新密码");
      } else {
        if (value != this.formInline.newPassword) {
          callback("请确认是否与新密码一致");
        } else {
          callback();
        }
      }
    };
    return {
      showCode: true,
      logoType: "欢迎登录",
      isInitPwd: 0,
      oldpasswordType: "password",
      newpasswordType: "password",
      surenewpasswordType: "password",
      oldPaddword: true,
      newPaddword: true,
      sureNewPaddword: true,
      formInline: {
        user: "",
        password: "",
        code: "",
        sureNewPassword: "",
        newPassword: "",
        oldPassword: ""
      },
      formInlineChange: {},
      showImg: true,
      rules: {
        user: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        sureNewPassword: [
          { required: true, validator: surePassWord, trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ]
      },
      Rules: {}
    };
  },
  created() {
    var lett = this;
    document.onkeydown = function() {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.onSubmit("formInline");
      }
    };
  },
  mounted() {
    // this.code();
  },
  methods: {
    isCode() {
      this.code();
      this.showCode = !this.showCode;
      // console.log(this.showCode);
      if (this.showCode) {
        this.logoType = "欢迎登录";
      } else {
        this.logoType = "扫码登录";
      }
    },
    code() {
      var obj = DDLogin({
        id: "login_container", //这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
        goto: encodeURIComponent(
          "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoafv4arrxjtenefmpt&response_type=code&scope=snsapi_login&state=1&redirect_uri=http://crm.wangxiao.cn/crm/index/dd/get_ddcode_page"
        ),
        style:
          "border:none;background-color:#FFFFFF;display: block;margin: 0 auto;",
        width: "365",
        height: "400"
      });
      var loginTmpCode = "";
      var handleMessage = function(event) {
        var origin = event.origin;
        console.log("origin", event.origin);
        if (origin == "https://login.dingtalk.com") {
          //判断是否来自ddLogin扫码事件。
          loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          console.log("loginTmpCode", loginTmpCode);
          window.location.href =
            "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoafv4arrxjtenefmpt&response_type=code&scope=snsapi_login&state=1&redirect_uri=http://crm.wangxiao.cn/index/dd/get_ddcode_page&loginTmpCode=" +
            loginTmpCode;
        }
      };
      if (typeof window.addEventListener != "undefined") {
        window.addEventListener("message", handleMessage, false);
      } else if (typeof window.attachEvent != "undefined") {
        window.attachEvent("onmessage", handleMessage);
      }
    },
    // test() {
    //   window.location.href =
    //     "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoafv4arrxjtenefmpt&response_type=code&scope=snsapi_login&state=1&redirect_uri=http://crm.wangxiao.cn/index/dd/get_ddcode_page&loginTmpCode=" +
    //     loginTmpCode;
    // },
    changeOldPass(oldpass) {
      this.oldPaddword = !oldpass;
      if (this.oldPaddword) {
        this.oldpasswordType = "password";
      } else {
        this.oldpasswordType = "test";
      }
    },
    changeNewPass(oldpass) {
      this.newPaddword = !oldpass;
      if (this.newPaddword) {
        this.newpasswordType = "password";
      } else {
        this.newpasswordType = "test";
      }
    },
    changesureNewPass(oldpass) {
      this.sureNewPaddword = !oldpass;
      if (this.sureNewPaddword) {
        this.surenewpasswordType = "password";
      } else {
        this.surenewpasswordType = "test";
      }
    },
    changeImg() {
      this.showImg = false;
      setTimeout(() => {
        this.showImg = true;
      }, 0);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request({
            url: "/index/check",
            method: "post",
            data: {
              password: this.formInline.password,
              username: this.formInline.user,
              veryfycode: this.formInline.code
            }
          }).then(res => {
            if (res.code == 0) {
              if (res.data.isInitPwd == 0) {
                request({
                  url: "/index/login",
                  method: "post",
                  data: {
                    password: this.formInline.password,
                    username: this.formInline.user,
                    veryfycode: this.formInline.code
                  }
                }).then(res => {
                  if (res.code == 0) {
                    //window.location.href = changeUrl.LocalhostUrl;
                  }
                });
              }
              // isInitPwd是否为初始化密码登录 0 否 1 是
              this.isInitPwd = res.data.isInitPwd;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 修改密码
    onSubmitChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.formInline.newPassword);
          console.log(this.formInline.oldPassword);
          request({
            url: "/admin/updatePassword",
            method: "post",
            data: {
              username: this.formInline.user,
              isFirstReset: 1,
              newPassword: this.formInline.newPassword,
              oldPassword: this.formInline.oldPassword
            }
          }).then(res => {
            if (res.code == 0) {
              this.isInitPwd = 0;
              //window.location.href = changeUrl.LocalhostUrl + "/login";
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Position {
  position: relative;
}
.saoCode {
  position: absolute;
  right: 0;
  top: 0;
}
.loginDev {
  width: 100vw;
  height: 100vh;
  background: url("http://img.wangxiao.cn/bjupload/new_crm/2019-10-21/36cfb011-d05f-44fc-a132-86d16e899004.png")
    no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  overflow: hidden;
  .loginMask {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    opacity: 0.8;
    position: fixed;
    top: 0;
    left: 0;
  }
  .login {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .loginLeft {
      .loginLogo {
        margin-left: 12.5%;
        margin-top: 5.4%;
      }
      .leftMen {
        font-size: 42px;
        color: #222222;
        margin-left: 12.5%;
        margin-top: 16%;
        .gsKh {
          display: block;
        }
      }
    }
    .loginRight {
      position: absolute;
      right: 14%;
      top: 12%;
      width: 420px;
      height: 520px;
      background: #fff;
      box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.05);
      border-radius: 5px;
      .line {
        width: 30px;
        height: 3px;
        background: #1890ff;
        border-radius: 2px;
        text-align: center;
        margin: 4px auto 0;
      }
      .loginRightTop {
        font-size: 20px;
        color: #111111;
        text-align: center;
        margin-top: 16%;
      }
      .loginRightTopChange {
        font-size: 20px;
        color: #111111;
        text-align: center;
        margin-top: 6%;
        position: relative;
        .close {
          color: #9a9a9a;
          font-size: 16px;
          position: absolute;
          right: 20px;
        }
      }
      .tips {
        margin-top: 6%;
        color: #999999;
        font-size: 14px;
        line-height: 22px;
        span {
          display: block;
          width: 80%;
          text-align: left;
          margin: 0 auto;
        }
      }
      .loginRightBottom {
        width: 70%;
        text-align: center;
        margin: 24% auto 0;
        .elInput2 {
          float: left;
          width: 60%;
        }
        .elImage {
          float: right;
        }
        .loginBtn {
          width: 100%;
          margin-top: 16%;
          background-color: #1890ff;
          border-radius: 5px;
          box-shadow: 0px 0px 9px 1px rgba(24, 255, 144, 0.35);
        }
      }
      .loginRightBottomChange {
        width: 80%;
        text-align: center;
        margin: 13% auto 0;
        .elInput {
          float: left;
        }
        .elImage {
          float: right;
        }
        .loginBtn {
          width: 90%;
          margin-top: 16%;
          background-color: #1890ff;
          border-radius: 5px;
          box-shadow: 0px 0px 9px 1px rgba(24, 255, 144, 0.35);
        }
      }
    }
  }
}
@font-face {
  font-family: "iconfont"; /* project id 1270975 */
  src: url("//at.alicdn.com/t/font_1270975_syoysk53kv.eot");
  src: url("//at.alicdn.com/t/font_1270975_syoysk53kv.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1270975_syoysk53kv.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1270975_syoysk53kv.woff") format("woff"),
    url("//at.alicdn.com/t/font_1270975_syoysk53kv.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1270975_syoysk53kv.svg#iconfont") format("svg");
}
.icon-show {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.icon-hide {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.icon-code {
  font-family: "iconfont" !important;
  font-size: 40px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.icon-pc {
  font-family: "iconfont" !important;
  font-size: 40px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="less">
.loginRightBottom {
  input.el-input__inner {
    border: none;
    border-bottom: 1px solid #dddddd;
    border-radius: 0;
  }
  .demoFormInline {
    .el-input__icon {
      color: #1890ff;
    }
    input.el-input__inner {
      border-bottom: 1px solid #1890ff;
    }
  }
}
.loginRightBottomChange {
  input.el-input__inner {
    border: none;
    border-bottom: 1px solid #dddddd;
    border-radius: 0;
  }
  .demoFormInline {
    .el-input__icon {
      color: #1890ff;
    }
    input.el-input__inner {
      border-bottom: 1px solid #1890ff;
    }
  }
}
#login_container {
  iframe {
    display: block;
    margin: 0 auto;
    margin-top: 50px;
  }
}
</style>
