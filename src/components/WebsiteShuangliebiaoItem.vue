<template>
  <div class="shuangItem">
    <div class="shuangItem_img"  @click="openUrl(info.websiteUrl)">
      <img
        :src="info.websiteImage"
      />
    </div>
    <div class="shuangItemInformation">
      <span class="shuang_name" v-text="info.websiteName"></span>
      <span class="shuang_url" v-text="info.websiteUrl"></span>
      <span class="shuang_informtion" v-text="info.introduce"></span>
      <span class="shuang_time" v-text="info.addTime"></span>
      <span class="fankuis" @click="feedback(info.websiteId)">反馈</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    info:Object
  },
  methods:{
    feedback(){
      this.$prompt('请输入反馈原因', '反馈', {
          confirmButtonText: '提交',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: "内容已反馈给管理员，请稍后再查看"
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消反馈'
          });       
        });
    },
    /**
     * 跳转链接地址
     */
    openUrl(url){
      window.open(url)
    }
  }
};
</script>

<style>
.fankuis{
  position: absolute;
  right: 5px;
  top: 75px;
  font-size: 13px;
  cursor: pointer;
}
.fankuis:hover{
  color: aqua;
}
.shuang_time {
  position: absolute;
  left: 10px;
  width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
  font-family: "楷体";
  top: 75px;
}
.shuang_informtion {
  position: absolute;
  left: 10px;
  top: 50px;
  font-size: 13px;
  width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.shuang_url {
  position: absolute;
  left: 10px;
  top: 30px;
  font-size: 12px;
  color: rgb(8, 99, 236);
  width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.shuang_name {
  position: absolute;
  font-size: 16px;
  left: 10px;
  top: 5px;
  width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.shuangItemInformation {
  position: relative;
}
.shuangItem_img img {
  width: 100%;
  height: 100%;
}
.shuangItem_img {
  width: 90%;
  height: 120px;
  margin: auto;
  cursor: pointer;
  margin-top: 8px;
}
.shuangItem {
  width: 100%;
  height: 100%;
  position: relative;
  border: solid 1px rgb(185, 181, 181);
}
</style>