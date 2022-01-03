<template>
  <div class="shuangliebiao">
    <div v-if="websites.length>0">
      <ul class="shuangliebiao_ul">
        <li v-for="(info, index) in websites" :key="index">
          <router-view :info="info" />
        </li>
      </ul>
    </div>
    <div v-else>
      <el-empty description="还没有内容哦，有好网站记得上传哦！"></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    websites: Array,
  },
};
</script>

<style>
.shuangliebiao_ul li {
  float: left;
  width: 180px;
  height: 230px;
  margin-left: 20px;
  margin-top: 20px;
}
.shuangliebiao_ul {
  width: 100%;
  list-style-type: none;
  overflow: hidden;
  padding-bottom: 10px;
}

.shuangliebiao {
  width: 90%;
  overflow: hidden;
  margin: auto;
}
</style>