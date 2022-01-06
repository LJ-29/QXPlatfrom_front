<template>
  <div @mousedown="generateTitle">
    <div class="header" id="hear">
      <div class="platform_img">
        <img
          src="http://loveqx.top:8321/images/qxplatform/backgroundImage/backgroundimage1.jpg"
        />
      </div>
      <div class="platformName"></div>
      <div class="header_seach">
        <ul class="titles_ul">
          <li>首页</li>
          <li>历史</li>
          <li @click="uploadWindow = true">上传</li>
        </ul>
        <div class="seach">
          <el-input id="baidu" v-model="baidudata" placeholder="百度一下">
            <el-button
              @click="baidu"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </div>
      </div>
      <div class="myInformation">
        <!-- 登录状态 -->
        <div
          v-if="isLogin"
          style="width: 100%; height: 100%; position: relative"
        >
          <div class="myimage">
            <img :src="userInformation.headPortrait" />
          </div>
          <el-dropdown class="myname" :hide-on-click="false">
            <span v-text="userInformation.username"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 未登录状态 -->
        <div v-else style="width: 100%; height: 100%; position: relative">
          <ul class="login_ul">
            <li @click="login">登录</li>
            <li>注册</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="body">
      <router-view />
    </div>

    <!-- 上传弹窗 -->
    <el-dialog
      title="上传你认为很不错的网站"
      center
      :visible.sync="uploadWindow"
      v-loading="uploadLoading"
      element-loading-text="网站上传中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-form :model="uploadData">
        <el-form-item label="网站名称：" label-width="120px">
          <el-input v-model="uploadData.websiteName"></el-input>
        </el-form-item>
        <el-form-item label="网站链接：" label-width="120px">
          <el-input v-model="uploadData.websiteUrl"></el-input>
        </el-form-item>
        <el-form-item label="网站简介：" label-width="120px">
          <el-input v-model="uploadData.websiteDescription"></el-input>
        </el-form-item>
      </el-form>
      <div class="fasong">
        <el-button
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="sendUpload"
          >发送</el-button
        >
        <p></p>
        <el-button
          type="danger"
          icon="el-icon-s-promotion"
          @click="uploadWindow = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findOneByEmail, uploadWebsite } from "../../api/getData";
import { getTime } from "../../config/public";
import $ from 'jquery'
export default {
  data() {
    return {
      isLogin: false,
      baidudata: "",
      titleIndex:0,
      userInformation: {},
      uploadWindow: false,
      uploadLoading: false,
      uploadData: {
        websiteUrl: "",
        userEmail: "",
        uptime: "",
        websiteName: "",
        websiteDescription: "",
        state: "1",
        cause: "信息提交，等待审核",
      },
      titleBackgrand:[
        {t:"小千禧",b:"#e42c2c"},
        {t:"超爱你",b:"#68ec4e"},
        {t:"你是我",b:"#f3f72e"},
        {t:"小宝贝",b:"#2e64f7"},
        {t:"共努力",b:"#46daff"},
        {t:"赚大钱",b:"#f53dd6"},
        {t:"你拍一",b:"#fa2a57"},
        {t:"我拍一",b:"#1317ec"}
      ]
    };
  },
  created() {
    this.isLogin = localStorage.getItem("qxplatformIsLogin");
    //如果用户已登录，查询用户信息
    if (this.isLogin == "true") {
      let email = localStorage.getItem("qxplatformUserEmail");
      findOneByEmail({ userEmail: email }).then((res) => {
        if (res.data.code == "200") {
          this.userInformation = res.data.data;
          return;
        }
        this.$message.error("数据出错，请联系管理员");
      });
    }
  },
  mounted() {
    var baiduInput=document.getElementById("baidu")
    baiduInput.focus()
    var this_=this
    //百度一下回车监听事件
    $(document).keydown(function (event) {
      if (event.keyCode==13&&this_.baidudata!="") {
        this_.baidu()
      }
    });
  },
  methods: {
    /**
     * 鼠标点击原地生成文字
     */
    generateTitle(event){
      if(event.button==0){
        console.log(event);
        let x=event.pageX
        let y=event.pageY
        var date=new Date().getMilliseconds()
        var tit=$("<span></span>").text("♥"+this.titleBackgrand[this.titleIndex].t+"♥").addClass(""+date).css({"left":x-45,"top":y-30,"position":"absolute","color":this.titleBackgrand[this.titleIndex].b,"z-index":"10"}).animate({
          top:y-180,
          opacity:0
        },1000)
        this.titleIndex+=1
        if (this.titleIndex==this.titleBackgrand.length) {
          this.titleIndex=0
        }
        $("#hear").append(tit)
        setTimeout(()=>{
          $("."+date).remove()
        },1000)
      }
    },
    /**
     * 未登录时跳转登录界面
     */
    login() {
      this.$router.push({ name: "Login" });
    },
    /**
     * 发送上传信息
     */
    sendUpload() {
      if (
        this.uploadData.websiteName == "" ||
        this.uploadData.websiteUrl == "" ||
        this.uploadData.websiteDescription == ""
      ) {
        this.$message({
          message: "请先填写信息然后再提交",
          type: "warning",
        });
        return;
      }
      this.uploadLoading = true;
      this.uploadData.uptime = getTime();
      this.uploadData.userEmail = this.userInformation.userEmail;
      uploadWebsite(this.uploadData).then((res) => {
        if (res.data.code == "100") {
          this.$message({
            message: "上传成功，感谢您的帮助",
            type: "success",
          });
          this.uploadLoading = false;
          this.uploadData.websiteName = "";
          this.uploadData.websiteDescription = "";
          this.uploadData.websiteUrl = "";
          this.uploadWindow = false;
          return;
        }
        console.log(res);
        this.uploadLoading = false;
        this.$message.error("上传出错啦，请稍后再试");
      });
    },
    /**
     * 退出登录
     */
    logout() {
      localStorage.setItem("qxplatformUserEmail", {});
      localStorage.setItem("qxplatformIsLogin", false);
    },
    /**
     * 百度一下
     */
    baidu() {
      window.open("https://www.baidu.com/s?wd=" + this.baidudata);
      this.baidudata = "";
    },
  },
};
</script>

<style scoped>
.platform_img {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
}
.platform_img img {
  width: 100%;
  height: 100%;
}
.login_ul {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}
.login_ul li {
  float: left;
  margin-left: 30px;
  cursor: pointer;
  color: #ffffff;
  font-size: 25px;
}
.login_ul li:hover {
  color: gold;
}
.myname {
  position: absolute;
  cursor: pointer;
  left: 90px;
  top: 30px;
  width: 100px;
  font-size: 18px;
  color: #ffffff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.myimage img {
  width: 100%;
  height: 100%;
}
.myimage {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  overflow: hidden;
}
.myInformation {
  width: 200px;
  height: 150px;
  position: absolute;
  right: 100px;
  top: 10px;
}
.seach {
  width: 400px;
  float: right;
  margin-top: 10px;
}
.titles_ul {
  list-style-type: none;
  width: 300px;
  overflow: hidden;
  display: inline-block;
  margin: 0px;
  padding: 0px;
}
.titles_ul li {
  float: left;
  color: #ffffff;
  cursor: pointer;
  font-size: 25px;
  font-family: "楷体";
  margin-right: 40px;
  margin-top: 20px;
}
.header_seach {
  width: 800px;
  height: 150px;
  margin: auto;
}
.platformName {
  width: 300px;
  height: 80%;
  float: left;
}
.header {
  width: 100%;
  margin: auto;
  height: 200px;
  position: relative;
}
.fasong button {
  width: 100%;
}
.body {
  width: 1200px;
  height: 1000px;
  margin: auto;
}
</style>

