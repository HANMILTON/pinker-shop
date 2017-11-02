<template>
  <div>
    <div v-for='(side,index) in mainSide'>
      <el-menu :default-active="selectedClass" :default-openeds="openList" class="el-menu-vertical-demo">
        <el-submenu :index="String(index)">
          <template slot="title"><i class="fa" :class="side.icon"></i>&nbsp;&nbsp;&nbsp;{{side.header}}</template>
          <el-menu-item-group>
            <el-menu-item :index="String('' + index + '-' + index2)" @click="resetBg('' + index + '-' + index2)" :class="{'is-active': selectedClass === '' + index + '-' + index2}" v-for="(data,index2) in side.subPage">
              <router-link :to="{name:data.path}">{{data.title}}</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>      
    </div>
  </div>
</template>
<script>
import {
  mainSide
} from './sideList'
export default {
  components: {
  },
  data() {
    return {
      mainSide,
      selectedClass: "",
      openList:["0","1","2"]
    }
  },
  methods:{
    getIndex() {
      let name = this.$route.name;
      let mainSide = this.mainSide;
      for (let i = 0; i < mainSide.length; i++) {
        for (let j = 0; j < mainSide[i].subPage.length; j++) {
          let mainList = mainSide[i].subPage[j];
          if (mainList.path == name) {
            return this.selectedClass = "" + i + "-" + j;
          }
        }
      }

    },
    resetBg(str) {
      this.selectedClass = str;
    }
  },
  mounted(){
   this.getIndex()
  },
  watch:{
    "$route": "getIndex"
  }
}
</script>
<style>
.el-submenu .el-menu-item {
  padding: 0!important;
}
.el-menu-item a {
  display: block;
  width: 100%;
  height: 100%;
  color: #666;
  text-decoration: none;
  font-size: 12px;
  outline: none;
  padding-left: 55px;
}
.el-menu-item-group__title{
  padding: 0!important;
}
.el-menu-item {
  background: #eef1f6;
}

.el-menu-item.is-active {
  background: #fff;
}

.el-menu-item.is-active>a {
  color: #64a1ff;
}

.el-submenu__title {
  padding-left: 32px!important;
}

.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}

.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: rotate(0deg)!important;
  transform: rotate(0deg)!important;
}
</style>
