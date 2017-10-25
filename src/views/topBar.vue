<template>
   <div class="top-bar">
     <div class="logo f-left">
       <img src="../assets/logo.png">
     </div>
     <div class="user-pic f-right" v-if="showInfo">
       <img :src="img">
       <span class="padding">{{name}}</span>
       <span @click="logout" class="exit">退出</span>
     </div>
  </div> 
</template>
<script>
import {
  userService
}from "api"
export default {
  data () {
    return {
      name: '',
      showInfo: false,
      img:"https://p.pstatp.com/thumb/216f001f419ecb468145",
      name:"未知"
    }
  },
  methods:{
   logout(){
    userService.logout()
    .then(res => {
      if(res.code == 200){
        this.$router.push('/login')
        localStorage.clear()
        this.sessionStorage.clear()
      }
    })
   },
  getDetailRow(){
    userService.getDetailRow()
    .then((res) => {
      if(res.code == 200){
        this.showInfo = true
        this.img = res.data.img_logo ? res.data.img_logo : "http://img.findfit.cn/Uploads/www/img/head-img.png"
        this.name = res.data.shop_name ? res.data.shop_name : "未知"
      }else{
        this.showInfo = false
      }
    })
  },
  },
  mounted(){
    this.getDetailRow()
  }
}
</script>
<style scoped>
  .logo,.user-pic{
    /*width: 70px;*/
    height: 50px;
    line-height: 50px;
  }
  .logo img{
    width: 75px;
    height: 25px;
  }
  .user-pic img{
    width: 50px;
    height: 50px;
    border-radius: 50%; 
  }
  .user-pic img{
    width: 30px;
    height: 30px;
  }
  .top-bar{
    width: 100%;
    height: 52px;
    padding: 0 30px;
    background: white;
    border-bottom: 1px solid #cccccc;
  }
  .padding{
    padding: 10px;
  }
  .exit{
    cursor: pointer;
  }
  .exit:hover{
    color: red;
  }
</style>

