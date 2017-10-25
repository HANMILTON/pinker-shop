<template>
  <div class="apply" v-if="isLoading">
<!--    <div class="top-bar">
     <div class="logo f-left">
       
     </div>
     <div class="user-pic f-right">
       
     </div>
   </div> -->
   <!-- {{userInfo}} -->
    <top-bar></top-bar>
    <div class="main" :style="{minHeight:setHeight()}">
      <apply-progress :progress="progress" :fail-check="failCheck"></apply-progress>
      <apply-select v-if="progress==1" :progress.sync="progress"></apply-select>
      <apply-write v-if="progress==2" :data="userInfo" :progress.sync="progress"></apply-write>
      <apply-check v-if="progress==3" :progress="progress"></apply-check>
      <apply-complete v-if="progress==4" :progress.sync="progress" :fail-check="failCheck"></apply-complete>     
    </div>
  </div>
</template>
<script>
import{
  userService
} from "api"
import topBar from "../topBar"
import applyProgress from "./applyProgress"
import applySelect from "./applySelect"
import applyWrite from "./applyWrite"
import applyCheck from "./applyCheck"
import applyComplete from "./applyComplete"
export default {
  // name: 'login',
  components:{
    topBar,
    applySelect,
    applyWrite,
    applyCheck,
    applyComplete,
    applyProgress
  },
  data () {
    return {
      forgotData:{},
      isCheck: false,
      isLoading:false,
      userInfo:{},
      progress: 0,
      failCheck: false,
    }
  },
  methods:{
    setHeight(){
      return document.documentElement.clientHeight-90 + "px"
    },
   setUserInfo(res){
    if(res.code == 299){
      return this.$router.push("./login")
    }
    // console.log(res,res.data,)
    let status =  res.data.validate_status
    if(status == null){
      this.progress = 1
    }else{
      // console.log(status)
      this.userInfo = res.data
      // status="2"
      switch(status){
        case "0":
          this.progress = 3
          break;
        case "1":
          this.progress = 4
          break;
        case "2":
          this.progress = 4
          this.failCheck = true
          break;                    
      }
      // this.progress = 2
    }
    this.isLoading = true
    console.log(this.progress)
   },
   setIndex(res){
    // alert(1)
    console.log(res)
   }
  },
  mounted(){
    userService.getUserInfo()
    .then(res => this.setUserInfo(res))
    // userService.getIndex()
    // .then(res => this.setIndex(res))
  },
  // asyncData(resolve,reject){
  //   userService.getUserInfo()
  //   .then(userInfo => resolve({
  //     userInfo
  //   }))
  // },
  watch:{
    userInfo:function(val,oldVal){
     console.log(val,oldVal) 
      // this.setUserInfo(newVal)
    }
  }
}
</script>
<style scoped>
  .apply{
    min-height: 100%;
    background: #ededed;
  }
  .main{
    width: 90%;
    margin: 0 auto;
    padding: 10px 70px 50px;
    margin-top: 20px;
    background: white;
  }
</style>
