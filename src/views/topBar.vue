<template>
   <div class="top-bar">
     <div class="logo f-left">
       <img src="../assets/logo.png">
     </div>
     <div class="user-pic f-right" v-if="showInfo">
        <div v-if="mesNum>0" class="mes-box danger-font" @click="goToPush"><span class="mes-num">{{mesNum}}</span></div>
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
      name:"未知",
      mesNum: sessionStorage.getItem("pushNum") ? Number(sessionStorage.getItem("pushNum")) : 0,
      uid: localStorage.getItem("user_id"),
    }
  },
  methods:{
    logout(){
      userService.logout()
      .then(res => {
        if(res.code == 200){
          this.$router.push('/login')
          localStorage.clear()
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
    setPushInfo(){
      let socket = io('http://116.62.68.103:2120');
      // uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
      let uid = this.uid;
      let that = this;
      // socket连接后以uid登录
      socket.on('connect', function(){
        socket.emit('login', uid);
      });
      // 后端推送来消息时
      socket.on('new_msg', function(msg){
        // console.log(that.$route)
        bus.$emit("showAlert",msg,"success")
        if(that.$route.name == "pushList") return
        that.mesNum += 1
        sessionStorage.setItem("pushNum",that.mesNum)
      });
      // this.playAudio()
    },
    goToPush(){
      this.$router.push('/pushList')
      this.mesNum = 0 
      sessionStorage.setItem("pushNum",0)
    },
    chageLayout(){
      let routeName = this.$route.name
      if(routeName == "pushList") {
        this.mesNum = 0
        sessionStorage.setItem("pushNum",0)
      }
    }
  },
  mounted(){
    this.getDetailRow()
    this.setPushInfo()
  },
  watch:{
    "$route": "chageLayout"
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
  .mes-box{
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    background: url("../assets/prompt.png") no-repeat;
    background-size: cover; 
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    top: 10px;
    margin-right: 15px;    
  }
  .mes-num{
    position: absolute;
    right: -8px;
    top: -5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    background: #fb4945;
    color: white;
    transform: scale(.7);
  }
</style>

