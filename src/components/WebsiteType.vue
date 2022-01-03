<template>
  <div>
    <ul class="type_ul" v-if="typesbzk">
      <li>
        <span @click="all(typeid)">全部</span>
      </li>
      <li
        v-for="(info, index) in contentNames.length < 8 ? contentNames : contentNames.slice(0, 8)"
        :key="index"
        @click="getWebsiteByContentId(info.contentId)"
      >
        <span  v-text="info.contentName"></span>
      </li>
      <li v-if="contentNames.length>8" @click="websiteUnfoldTakeback(false)">更多</li>
    </ul>
    <ul class="type_ul" v-else>
      <li v-for="(info, index) in contentNames" :key="index" @click="getWebsiteByContentId(info.contentId)">
        <span v-text="info.contentName"></span>
      </li>
      <li @click="websiteUnfoldTakeback(true)">收回</li>
    </ul>
    <div class="list">
      <ul>
        <li v-if="liebiao">
          <svg class="iconfont ic" aria-hidden="true">
            <use xlink:href="#icon-liebiao-copy"></use>
          </svg>
        </li>
        <li v-else @click="liebiaos()">
          <svg class="iconfont ic" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </li>
        <li v-if="shuangliebiao">
          <svg class="ic" aria-hidden="true">
            <use xlink:href="#icon-shuanglieliebiao-copy"></use>
          </svg>
        </li>
        <li v-else @click="shuangliebiaos()">
          <svg class="ic" aria-hidden="true">
            <use xlink:href="#icon-shuanglieliebiao"></use>
          </svg>
        </li>
      </ul>
    </div>
    <router-view :websites="websites"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typesbzk: true,
      liebiao: true,
      shuangliebiao: false,
    };
  },
  props:{
    /**
     * 当前展示的类型下的所有总名称
     */
    contentNames:Array,
    websites:Array,
    typeid:Number,
    all:Function,
    getWebsiteByContentId:Function
  },
  created(){
    let l=localStorage.getItem("liebiaozs")
    if(l=="true"){
      this.liebiao=true,
      this.shuangliebiao=false
      if(this.$route.path=="/main/screen/websitetype/shuangliebiao/item")
      this.$router.push({ name: "LiebiaoItem" });
    }else{
      this.liebiao=false,
      this.shuangliebiao=true
      if(this.$route.path=="/main/screen/websitetype/liebiao/item")
      this.$router.push({ name: "ShuangliebiaoItem" });
    }

  },
  methods: {
    //展开或收回
    websiteUnfoldTakeback(is) {
      console.log(this.currentTypeId);
      this.typesbzk = is;
    },
    //双列表
    shuangliebiaos() {
      this.shuangliebiao = true;
      this.liebiao = false;
      localStorage.setItem("liebiaozs",false)
      this.$router.push({ name: "ShuangliebiaoItem" });
    },
    //单列表
    liebiaos() {
      this.shuangliebiao = false;
      this.liebiao = true;
      localStorage.setItem("liebiaozs",true)
      this.$router.push({ name: "LiebiaoItem" });
    },
  },
};
</script>

<style>
.list {
  width: 1000px;
  height: 50px;
  margin: auto;
  margin-top: 10px;
  position: relative;
}
.list ul {
  list-style-type: none;
  position: absolute;
  width: 150px;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  margin-top: 5px;
  right: 0px;
}
.list ul li {
  float: left;
  width: 40px;
  height: 40px;
  margin-left: 20px;
  cursor: pointer;
}
.type_ul {
  list-style-type: none;
  width: 940px;
  margin: auto;
  overflow: hidden;
  padding-bottom: 10px;
  border-bottom: solid 1px #999797;
}
.type_ul li {
  float: left;
  font-size: 20px;
  margin-right: 14px;
  text-align: left;
  max-width: 90px;
  cursor: pointer;
  margin-top: 5px;
}
.type_ul li:hover {
  color: gold;
}
</style>