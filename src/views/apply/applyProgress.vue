<template>
    <div class="apply-progress">
      <div class="progress-list col-sm-3" v-for="(data,index) in progressList">
        <div :class="['progress-box',progress>index ? 'complete' : '']"><span>{{index+1}}</span> {{data}}</div>
        <!-- <div :class="['progress-line',progress-1>index ? 'complete' : '']" v-if="index<3"></div> -->
      </div>
    </div>  
</template>
<script>
import {
  userService
}from "api"
export default {
  // name: 'login',
  props:["progress","failCheck"],
  data () {
    return {
      progressList: this.failCheck? ["选择类型","填写资料","等待审核","审核失败"] : ["选择类型","填写资料","等待审核","开始使用"],
    }
  },
}
</script>
<style scoped>
  .apply-progress{
    width: 100%;
    height: 50px;
    padding: 10px 15% 0;
    background: white;
    border-bottom: 1px solid #cccccc; 
  }
  .progress-list{
    width:25%;
    height: 40px;
    padding: 0;
  }
  .progress-box{
    height: 40px;
    line-height:40px;
    text-align: center;
    margin: 0 auto;
  }
  .progress-box span{
    display: inline-block;
    line-height: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #dddddd;
    color: white;
  }
  .progress-box.complete span{
    background: #3DA8F5;
  }  
  .complete{
    border-bottom: 2px solid #3DA8F5;
    color: black;
    font-weight: bold;
  }
</style>

