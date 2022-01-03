<template>
  <div class="liebiaoitem">
    <div class="websiteImg" @click="openUrl(info.websiteUrl)">
      <img
        :src="info.websiteImage"
      />
    </div>
    <div class="websiteInformation">
      <span class="websiteName" v-text="info.websiteName"></span>
      <span class="websiteUrl" v-text="info.websiteUrl"></span>
      <span class="websiteIntorduce" v-text="info.introduce"></span
      >
      <span class="websiteUpdateTime">最近更新时间：{{info.addTime}}</span>
      <el-button class="fankui" type="primary" round @click="feedback(info.websiteId)"
        >反馈</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props:{
    info:Object
  },
  methods: {
    feedback() {
      this.$prompt("请输入反馈原因", "反馈", {
        confirmButtonText: "提交",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "内容已反馈给管理员，请稍后再查看",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消反馈",
          });
        });
    },
    /**
     * 跳转链接地址
     */
    openUrl(url){
      window.open(url)
    }
  },
  
};
</script>

<style scoped>
.fankui {
  position: absolute;
  right: 20px;
  bottom: 10px;
}
.websiteUpdateTime {
  position: absolute;
  top: 100px;
  font-size: 13px;
}
.websiteIntorduce {
  position: absolute;
  top: 65px;
  font-size: 18px;
  width: 400px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.websiteUrl {
  position: absolute;
  font-size: 13px;
  top: 45px;
  color: rgb(25, 164, 228);
  width: 400px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.websiteName {
  font-weight: bold;
  position: absolute;
  font-size: 22px;
  top: 10px;
  width: 400px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.websiteInformation {
  height: 120px;
  position: relative;
  left: 230px;
  width: 75%;
}
.websiteImg {
  position: absolute;
  width: 200px;
  height: 120px;
  top: 4px;
  left: 10px;
  border-radius: 10px 10px;
  overflow: hidden;
  cursor: pointer;
}
.websiteImg img {
  width: 100%;
  height: 100%;
}
.liebiaoitem {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>