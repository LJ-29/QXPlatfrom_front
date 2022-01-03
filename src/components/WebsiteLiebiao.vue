<template>
  <div>
    <div v-if="websites.length>0">
      <div v-for="(info, index) in websites" :key="index" class="item">
        <router-view :info="info" />
      </div>
    </div>
    <div v-else>
        <el-empty description="还没有内容哦，有好网站记得上传哦！"></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    websites: Array,
  },
  methods: {
    bb() {
      console.log(this.websites);
    },
  },
};
</script>

<style scoped>
.item {
  width: 78%;
  margin: auto;
  height: 130px;
  overflow: hidden;
  margin-top: 20px;
  border-bottom: 1px solid #7e7a7a;
}
</style>

