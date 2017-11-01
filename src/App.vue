<template>
  <div id="app" v-if="showApp">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <login v-if="isLogin"></login> -->
    <div v-if="showMainPage">
      <top-bar></top-bar>
      <div class="main" :style="{minHeight:setHeight()}">
        <div class="col-xs-12 col-sm-3 col-lg-2 side-box" :style="{minHeight:setHeight()}">
          <side-bar></side-bar>
        </div>
        <!-- 内容区 -->
        <div class="col-xs-12 col-sm-9 col-lg-10 router-box" :style="{minHeight:setHeight()}">
        <!--  <audio ref="notify">
            <source :src='notifyMp3' type="audio/mpeg">
            <source :src='notifyOgg' type='audio/ogg'>
          </audio> -->
          <router-view transition='fade' transition-mode='out-in'></router-view>
        </div>         
      </div>
        <!-- 侧边栏 -->     
    </div>
    <!-- <div> -->
      <router-view v-else transition='fade' transition-mode='out-in'></router-view>
    <!-- </div> -->
  </div>
</template>
<script>
import topBar from "./views/topBar"  
import sideBar from "./views/sideBar"
import {
  userService
} from 'api'
import Vue from 'vue'
export default {
  name: 'app',
  components:{
    topBar,
    sideBar
  },
  data () {
    return {
      isLogin: true,
      showMainPage: true,
      notMainPageList:["active","apply","login","register","forgot","backMobile","backEmail","e_mail_confirm","e_mail_getback_pwd","emailPrompt"],
      showApp:false,
      // nitifyMp3: require('./assets/notify.mp3'),
      // notifyOgg: require('./assets/notify.ogg'),    
      uid: localStorage.getItem("user_id")
    }
  },
  methods:{
    setHeight(){
      return document.documentElement.clientHeight-52 + "px"
    }, 
    setUserInfo(res){
        // console.log(res.code)

        this.showApp = true 
        if(res.code == 200){
          if(res.data == null){
            return this.$router.push("apply")
          }
          let validateStatus = res.data.validate_status
          if(validateStatus == 1){
            if(!this.showMainPage){
              this.$router.push('/shopEdit')
            }
          }else{
            this.$router.push("apply")
          }
        }else if(res.code == 299){
          if(this.showMainPage){
           this.$router.push('/login')
          }
        }
      },
      chageLayout(){
        let routeName = this.$route.name
        let pageList = this.notMainPageList
        let flag = false
        for(let i=0;i<pageList.length;i++){
          if(routeName == pageList[i]){
            flag = true
          }
        }
        // console.log(flag)
        if(flag){
          this.showMainPage = false
        }else{
          this.showMainPage = true
        }
        // if(this.showMainPage){
        this.getUserInfo()
        // }else{
        //   this.showApp = true 
        // }
    },
    getUserInfo(){
      userService.getUserInfo()
      .then(res => this.setUserInfo(res))      
    },
    playAudio() {
      this.$refs.notify.load()
      this.$refs.notify.play()
    },
    setPushInfo(){
      let socket = io('http://116.62.68.103:2120');
      // uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
      let uid = this.uid;
      // socket连接后以uid登录
      socket.on('connect', function(){
        socket.emit('login', uid);
      });
      // 后端推送来消息时
      socket.on('new_msg', function(msg){
        console.log(msg)
          bus.$emit("showAlert",msg,"success")
      });
      // this.playAudio()
    }
  },
  mounted(){
    this.chageLayout()
    window.bus = new Vue()
    bus.$on('showAlert', (msg, theme) => {
        if(!theme) theme = "success"
        this.$notify({
          type:theme,
          message: msg,
          offset: 100,
          duration:2000
        });      
    })      
    this.setPushInfo()
  },
  watch:{
    "$route": "chageLayout"
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  background: white;
  min-height: 100%;
  height: 100%;
  overflow-y: scroll;
}
  .main{
    margin: 0 auto;
    overflow: hidden;
  }
  .side-box{
    padding: 0;
    background: #eef1f6;
  }
  .router-box{
    padding: 5px 20px;
    background: white;
  }
</style>
