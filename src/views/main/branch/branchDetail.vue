<template>
  <div class="apply">
      <div class="title">
      <div class='left'><span @click="show.show=true" class="first-tab">分店列表&nbsp;&nbsp;</span><span><i class="fa fa-angle-right"></i></span><span class="second-tab">&nbsp;&nbsp;分店信息</span></div>
    </div>
   <div class="col-sm-12 col-xs-12">
<!--       <ul class="nav nav-tabs">
        <li :class="{active:selectedId===index}" v-for="(data,index) in selectList"  @click='selectedId = index'>
          <a href="javascript:;">
            <span>{{data}}</span>
          </a>
        </li>
      </ul> -->
      <el-tabs v-model="selectedId">
        <el-tab-pane :label="data" v-for="(data,index) in selectList"  @click='selectedId = String(index)' :name="String(index)"></el-tab-pane>
      </el-tabs> 
      <branch-info v-if="selectedId == 0" :show="show" :data="editData"></branch-info>
      <branch-admin v-if="selectedId == 1" :show="show" :data="editData"></branch-admin>
   </div>
  </div>
</template>
<script>
import branchInfo from "./branchInfo"
import branchAdmin from "./branchAdmin"
export default{
	props:["data","show","mode"],
  components:{
    branchInfo,
    branchAdmin
  },
  data () {
    return {
      editData:Object.assign({}, this.data),
      selectedId:0,
      selectList: this.mode == "add" ? ["编辑信息"] : ["编辑信息","账号信息"],
    }
  },
  methods:{
    
  },
}
</script>
<style scoped>

.apply{
	overflow: hidden;
	text-align: center;
}
  .top-bar{
    height: 70px;
    border-bottom: 1px solid #cccccc;
    background: #64a1ff;
  }
  .position{
  	position: absolute;
  	right: -150px;
  	top:0px;
  }
  .title{
    padding: 10px 15px;
    overflow: hidden;
  }
  .left{
    height: 37px;
    line-height: 37px;
    font-size: 18px;
    float:left;
  }
  .left span:first-of-type{
    cursor: pointer;
  }
  .right{
    float:right;
  } 
  .fa-angle-right{
    position: relative;
    top:1px;
  }
</style>

