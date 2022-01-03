<template>
  <div>
    <ul class="title_ul" v-if="titlezk">
      <li
        v-for="(info, index) in title.length < 8 ? title : title.slice(0, 8)"
        :key="index"
        @click="getContentNameByTypeId(info.typeId)"
      >
        <div class="titleImg">
          <svg class="iconfont ic" aria-hidden="true">
            <use :xlink:href="info.typeIcon"></use>
          </svg>
        </div>
        <span class="titleName" v-text="info.typeName"></span>
      </li>
      <li v-if="title.length > 8" @click="titleUnfoldTakeback(false)">
        <div class="titleImg">
          <svg class="iconfont ic" aria-hidden="true">
            <use xlink:href="#icon-gengduo"></use>
          </svg>
        </div>
        <span class="titleName">更多</span>
      </li>
    </ul>
    <ul class="title_ul" v-else>
      <li
        v-for="(info, index) in title"
        :key="index"
        @click="getContentNameByTypeId(info.typeId)"
      >
        <div class="titleImg">
          <svg class="iconfont ic" aria-hidden="true">
            <use :xlink:href="info.typeIcon"></use>
          </svg>
        </div>
        <span class="titleName" v-text="info.typeName"></span>
      </li>
      <li @click="titleUnfoldTakeback(true)">
        <div class="titleImg">
          <svg class="iconfont ic" aria-hidden="true">
            <use xlink:href="#icon-shouhui"></use>
          </svg>
        </div>
        <span class="titleName">收回</span>
      </li>
    </ul>
    <router-view
      :contentNames="contentNames"
      :websites="websites"
      :typeid="typeid"
      :all="all"
      :getWebsiteByContentId="getWebsiteByContentId"
    />
  </div>
</template>

<script>
import {
  findAllByOnLine,
  findTitleByTypeId,
  findWebsiteByTitle,
  findAllIsOnLine,
} from "../api/getData";
export default {
  data() {
    return {
      /**
       * 类型列表
       */
      title: [],
      titlezk: true,
      /**
       * 网站总名称类别
       */
      contentNames: [],
      /**
       * 网站信息列表
       */
      websites: [],
      typeid:null
    };
  },
  created() {
    //获取所有上线的网站类型
    findAllByOnLine().then((res) => {
      if (res.data.code == "200") {
        this.title = res.data.data;
        this.typeid=res.data.data[0].typeId
        this.getContentNameByTypeId(res.data.data[0].typeId);
        return;
      }
    });
  },
  methods: {
    /**
     * 展开或收回
     * */
    titleUnfoldTakeback(is) {
      this.titlezk = is;
    },
    /**
     * 根据类型id查询所有网站信息
     */
    all(id){
      findAllIsOnLine({typeId:id}).then((re) => {
            if (re.data.code == "200") {
              this.websites = re.data.data;
              return;
            }
            console.log(re);
            this.$message.error("网站出错了哦，请联系管理员");
          });
    },
    /**
     * 根据网站类型id获取网站总名称
     */
    getContentNameByTypeId(typeId) {
      findTitleByTypeId({ typeId: typeId }).then((res) => {
        if (res.data.code == "200") {
          this.contentNames = res.data.data;
          findAllIsOnLine({typeId:typeId}).then((re) => {
            if (re.data.code == "200") {
              this.typeid=typeId
              this.websites = re.data.data;
              return;
            }
            console.log(re);
            this.$message.error("网站出错了哦，请联系管理员");
          });
          return;
        }
        console.log(res);
        this.$message.error("网站出错了哦，请联系管理员");
      });
    },
    /**
     * 根据网站总名称id获取网站详细信息
     */
    getWebsiteByContentId(contentId) {
      if (contentId == 0) {
        this.websites = [];
        return;
      }
      findWebsiteByTitle({ contentId: contentId }).then((res) => {
        if (res.data.code == "200") {
          this.websites = res.data.data;
          return;
        }
        console.log(res);
        this.$message.error("网站出错了哦，请联系管理员");
      });
    },
  },
};
</script>
<style>
.titleName {
  font-weight: bold;
  color: rgb(94, 89, 89);
}
.ic {
  width: 90%;
  height: 90%;
}
.title_ul {
  list-style-type: none;
  width: 1000px;
  margin: auto;
  overflow: hidden;
}
.title_ul li {
  float: left;
  width: 70px;
  height: 80px;
  text-align: center;
  margin: 20px;
  cursor: pointer;
}

.title_ul li:hover {
  background-color: rgb(228, 220, 236);
  border-radius: 10px;
  color: rgb(239, 243, 19);
}
.titleImg {
  width: 60px;
  height: 60px;
  border-radius: 20px 20px;
  overflow: hidden;
  margin: auto;
}
</style>