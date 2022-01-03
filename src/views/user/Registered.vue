<template>
  <div v-loading="loading"
    :element-loading-text="loadingTitle">
    <div class="constr">
      <div class="regist-head">注册</div>
      <div class="regist-body">
        <div class="regist-main">
          <div class="regist-group">
            <label class="regist-label"
              ><span class="regist-star">*</span>登录邮箱</label
            >
            <div class="regist-cell">
              <input
                type="email"
                class="regist-input"
                v-model="registeredInformation.userEmail"
              /><span class="regist-remark regist-warn">
                <i class="icon-warn"></i>***@qq.com
              </span>
            </div>
          </div>
          <div class="regist-group">
            <label class="regist-label"
              ><span class="regist-star">*</span>登录密码</label
            >
            <div class="regist-cell">
              <input
                type="password"
                class="regist-input"
                v-model="registeredInformation.pwd"
              /><span class="regist-remark">
                请输入6-16位密码，区分大小写，不能使用空格
              </span>
            </div>
          </div>
          <div class="regist-group">
            <label class="regist-label"
              ><span class="regist-star">*</span>用户昵称</label
            >
            <div class="regist-cell">
              <input
                v-model="registeredInformation.username"
                class="regist-input"
              />
            </div>
          </div>
          <!-- <div class="regist-group">
            <label class="regist-label">手机号码</label>
            <div class="regist-cell">
              <input type="tel" class="regist-input" />
            </div>
          </div> -->
          <div class="regist-group">
            <label class="regist-label"
              ><span class="regist-star">*</span>验 证 码</label
            >
            <div class="regist-cell">
              <input
                class="regist-input regist-code-input"
                v-model="UserVerificationCode"
              />
              <div class="yzm">
                <el-button
                  @click="sendVerificationCode"
                  v-text="codeTitle"
                ></el-button>
              </div>
            </div>
          </div>
          <div class="regist-group">
            <label class="regist-label">&nbsp;</label>
            <div class="regist-cell">
              <input type="checkbox" v-model="xieyi" /><label
                >我已阅读并同意<a href="##">千禧蛋协议</a>。</label
              >
              <p>
                <el-button class="regist-btn" @click="registered"
                  >立即注册</el-button
                >
                &nbsp;<a href="http://localhost:8081/login">邮箱已注册？</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createVerificationCode, getTime } from "../../config/public";
import {
  sendCode,
  registerUser,
  findOneByEmail,
  login,
} from "../../api/getData";
export default {
  data() {
    return {
      loading:false,
      loadingTitle:"",
      xieyi: false,
      /**
       * 用户填写的注册信息
       */
      registeredInformation: {
        userEmail: "",
        username: "",
        usersex: "女",
        userage: 18,
        registerTime: "",
        pwd: "",
      },
      /**
       * 用户填写的验证码
       */
      UserVerificationCode: "",
      verificationCode: "123",
      verificationCodeFormat: {
        authCode: "",
        title: "千禧蛋平台注册用户验证码",
        email: "",
      },
      codeTitle: "发送验证码",
      daojishi: null,
      daojishishijian: 61,
    };
  },
  methods: {
    /**
     * 发送验证码
     */
    sendVerificationCode() {
      if (this.daojishi != null) {
        return;
      }
      if (this.registeredInformation.userEmail == "") {
        this.$message({
          message: "请先填写邮箱内容",
          type: "warning",
        });
        return;
      }
      if (
        !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(
          this.registeredInformation.userEmail
        )
      ) {
        this.$message({
          message: "请填写正确邮箱",
          type: "warning",
        });
        return;
      }
      this.verificationCodeFormat.email = this.registeredInformation.userEmail;
      let code = createVerificationCode();
      this.verificationCodeFormat.authCode = code;
      this.verificationCode = code;
      this.loadingTitle="正在发送验证码..."
      this.loading=true
      sendCode(this.verificationCodeFormat).then((res) => {
        if ((res.data.code = "334")) {
          this.loading=false
          this.$message({
            message: "验证码发送成功，请注意接收",
            type: "success",
          });
          var _this = this;
          this.daojishi = setInterval(function () {
            if (_this.daojishishijian == 0) {
              clearInterval(_this.daojishi);
              _this.daojishishijian = 61;
              _this.daojishi = null;
              _this.codeTitle = "重发验证码";
              return;
            }
            _this.daojishishijian = _this.daojishishijian - 1;
            _this.codeTitle = "已发送(" + _this.daojishishijian + ")";
          }, 1000);
          return;
        }
        if ((res.data.code = "333")) {
          this.$message.error("验证码发送失败，请重试");
          this.loading=false
          this.verificationCode = "";
          return;
        }
        this.loading=false
        console.log(res);
        this.$message.error("系统出错，请联系管理员");
      });
    },
    /**
     * 注册用户
     */
    registered() {
      if (!this.xieyi) {
        this.$message({
          message: "请先阅读协议并勾选",
          type: "warning",
        });
        return;
      }
      if (
        this.registeredInformation.userEmail == "" ||
        this.registeredInformation.pwd == "" ||
        this.registeredInformation.username == ""
      ) {
        this.$message({
          message: "内容不能为空",
          type: "warning",
        });
        return;
      }
      if (this.UserVerificationCode != this.verificationCode) {
        this.$message({
          message: "验证码错误",
          type: "warning",
        });
        return;
      }
      this.loadingTitle="正在验证邮箱是否可用..."
      this.loading=true
      findOneByEmail({ userEmail: this.registeredInformation.userEmail }).then(
        (res) => {
          if (res.data.code == "200") {
            this.loading=false
            this.$message.error("该邮箱已被注册过");
            return;
          }
          this.loadingTitle="邮箱可用，正在注册，请稍后..."
          this.registeredInformation.registerTime = getTime();
          registerUser(this.registeredInformation).then((r) => {
            if (r.data.code == "100") {
              this.$message({
                message: "恭喜你，邮箱注册成功",
                type: "success",
              });
              this.loadingTitle="注册成功，正在登录..."
              //登录
              login({
                email: this.registeredInformation.userEmail,
                pwd: this.registeredInformation.pwd,
              }).then((res) => {
                if (res.data.code == "21") {
                  localStorage.setItem(
                    "qxplatformUserEmail",
                    this.registeredInformation.userEmail
                  );
                  localStorage.setItem("qxplatformIsLogin", true);
                  this.loading=false
                  this.$router.push({ name: "LiebiaoItem" });
                  this.$message({
                    message: "欢迎加入千禧平台",
                    type: "success",
                  });
                  return;
                }
                this.loading=false
                console.log(res);
                this.$message.error("网站出错啦，请联系管理员");
              });
              return;
            }
            this.loading=false
            this.$message.error("注册失败，请重试");
          });
        }
      );
    },
  },
};
</script>

<style>
.yzm {
  width: 120px;
  height: 40px;
  display: inline-block;
}
.yzm bottom {
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  font: 14px/1.4 "Microsoft YaHei";
  background-color: #edeff0;
}
a {
  color: #50b6e5;
}
.constr {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.regist-head {
  height: 60px;
  line-height: 60px;
  padding-left: 30px;
  background-color: #be3948;
  color: #fff;
  font-size: 18px;
}
.regist-body {
  min-height: 400px;
  padding: 100px 0;
  background-color: #fff;
}
.regist-main {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.regist-group {
  margin-top: 20px;
  overflow: hidden;
}
.regist-label {
  width: 70px;
  padding-top: 10px;
  float: left;
}
.regist-cell {
  display: table-cell;
  *display: inline-block;
}
.regist-input {
  height: 18px;
  line-height: 18px;
  width: 260px;
  padding: 10px 5px;
  margin: 0 10px 0 0;
  border: 1px solid #d0d6d9;
  vertical-align: top;
}
.regist-code-input {
  width: 130px;
}
.regist-btn {
  display: inline-block;
  width: 160px;
  line-height: 40px;
  background-color: #39b94e;
  color: #fff;
  text-align: center;
  text-decoration: none;
}
.regist-btn:hover {
  background-color: #33a646;
}
.icon-warn {
  display: inline-block;
  width: 20px;
  height: 21px;
}

.regist-star {
  position: absolute;
  margin-left: -1em;
  font-family: simsun;
  color: #f30;
}
.regist-remark {
  position: absolute;
  line-height: 21px;
  padding-top: 9px;
  color: #666;
}
.regist-warn {
  padding-left: 20px;
  color: #be3948;
}
.regist-warn > .icon-warn {
  position: absolute;
  margin-left: -20px;
}
</style>