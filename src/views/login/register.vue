<template>
  <div class="login">
    <div class="login-box col-lg-3 col-md-4 col-sm-5 col-xs-8">
      <h1 class="text-center">{{ name }}</h1>
      <ul class="nav">
        <li :class="{active:selectedId===0}"  @click='selectedId = 0'>
          <a href="javascript:;">
            <span>手机号注册</span>
          </a>
        </li>
        <div class="wap"></div>  
        <li :class="{active:selectedId===1}"  @click='selectedId = 1'>
          <a href="javascript:;">
            <span>邮箱注册</span>
          </a>
        </li>
      </ul>
      <form class="form-box" v-if="selectedId===0">
        <div class="control-group">
           <input type="text" class="form-control" v-model="mobileData.mobile" @keyup="checkMobile" placeholder="注册手机号" :disabled="disabled">
        </div>
        <div class="control-group" v-if="isMobileCheck">
           <input type="password" ref="el" class="form-control" v-model="mobileData.password" placeholder="密码（至少6位）">
           <span class="clear" v-if="mobileData.password" @click="mobileData.password = ''"><i class="fa fa-close fa-fw"></i></span>
           <span class="eye" v-if="isShow" @click="isShow = !isShow"><i class="fa fa-eye fa-fw"></i></span>
           <span class="eye" v-else @click="isShow = !isShow"><i class="fa fa-eye-slash fa-fw"></i></span>
        </div>
        <div class="control-group check-box" v-if="mobileData.password.length >= 6">
        <!-- <div class="control-group check-box"> -->
          <div class="check-prompt">点击图中的{{checkName}}获取验证码</div>
          <div class="check-imgs">
            <span class="col-sm-2" v-for="(data, index) in checkObj.checkList" @click="checkGoods(index)">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#icon-'+data.iconName"></use>
              </svg>
            </span>
          </div>
          <span class="refresh" @click="refresh"><i class="fa fa-refresh fa-fw"></i></span>
          <div class="check-mask" v-if="isImgCheck">
            <span><i class="text-primary fa fa-check-circle-o fa-fw"></i>图片验证成功</span>
          </div>
        </div>
        <div class="control-group" v-if="mobileData.password.length >= 6">
        <!-- <div class="control-group"> -->
          <input type="text" class="form-control" v-model="mobileData.v_code" placeholder="短信验证码">
          <div class="receive-message" v-if="isImgCheck">
            <div class="text-default" v-if="isReceiveMsg">重新获取({{timeCount}}s)</div>
            <div class="text-primary" v-else @click="sendMessage">重新获取</div>
          </div>
          
        </div>
        <div class="check-fail" v-if="imgCheckFail"><i class="fa fa-warning fa-fw"></i>图片验证失败</div>
        <div class="control-group">
           <button type="button" class="btn btn-primary btn-full" @click="mobileRegister">立即注册</button>
        </div>    
      </form>   
      <form v-if="selectedId===1">
      <!-- {{emailData|json}} -->
        <div class="control-group">
           <input type="text" class="form-control" v-model="emailData.e_mail" placeholder="邮箱" @blur="checkEmail">
        </div>
        <div class="control-group">
           <input type="password" class="form-control" v-model="emailData.password" placeholder="请设置密码">
        </div>
        <div class="check-fail" v-if="emailSuccess"><i class="fa fa-warning fa-fw"></i>注册成功，请前往邮箱完成验证!</div>
        <div class="control-group">
           <button type="button" class="btn btn-primary btn-full" @click="emailRegister">邮箱注册</button>
        </div> 
      </form>
    </div>
  </div>
</template>

<script>
import checkList from "../../checkList"
import {
  userService
}from "api"
export default {
  data () {
    return {
      name: 'Find',
      mobileData:{
        register_mode:"mobile",
        password:"",
        mobile: this.$route.query.type == "mobile" ? this.$route.query.account : ""
      },
      emailData:{
        register_mode:"e_mail",
        e_mail: this.$route.query.type == "email" ? this.$route.query.account : ""
      },
      isMobileCheck: this.$route.query.type == "mobile" ? true : false,
      isShow: false,
      checkObj: {},
      checkList,
      checkName: "",
      checkIndex: 0,
      isImgCheck: false,
      imgCheckFail: false,
      isReceiveMsg: false,
      timeCount:60,
      disabled:false,
      selectedId: this.$route.query.type=="email" ? 1 : 0,
      emailSuccess: false,
      isRepeat: false
    }
  },
  methods:{
    checkMobile(){
      if(/^1[34578]\d{9}$/.test(this.mobileData.mobile)){
        this.checkRepeat(this.mobileData.mobile)
      }else{
        this.isMobileCheck = false
      }
    },
    checkEmail(){
      if(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.emailData.e_mail)){
        this.checkRepeat(this.emailData.e_mail)
      }
    },
    checkRepeat(name){
      let checkObj = {
        register_mode: this.selectedId == 0 ? "mobile" : "e_mail",
      }
      this.selectedId == 0 ? checkObj.mobile = name : checkObj.e_mail = name
      userService.registerNameCheck(checkObj)
      .then(res=>{
        if(res.code == 200){
          if(this.selectedId == 0){
            this.disabled = true
            this.isMobileCheck = true            
          }
        }else{
          if(this.selectedId == 0){
            this.disabled = false
            this.isMobileCheck = false 
          }
          // bus.$emit("showAlert","账号已经存在，请直接登录！","warning")
        }
      })
    },
    mobileRegister(){
        userService.register(this.mobileData)
        .then(res => this.successRegister(res))
    },
    successRegister(res){
        if(res.code == 210){
          this.$router.push({
            path:'/emailPrompt',
            query:{
              email: this.emailData.e_mail
            }
          })
        }else if(res.code == 200){
          localStorage.setItem("user_id",res.data.id)
          localStorage.setItem("upload_validate_str",res.data.upload_validate_str)
          this.$router.push('/apply')
        }
    },
    emailRegister(){
      if(this.emailData.password == '' ||this.emailData.password.length<6){
        return bus.$emit("showAlert","密码最少为六位！","warning")
      }
      userService.register(this.emailData)
        .then(res => this.successRegister(res))
    },
    refresh(){
      let listIndex = Math.floor(Math.random()*6);
      this.checkObj = this.checkList[listIndex]
      this.checkIndex = Math.floor(Math.random()*5);
      this.checkName = this.checkObj.checkList[this.checkIndex].chineseName
    },
    checkGoods(index){
      if (this.checkIndex == index){
        this.isImgCheck = true
        this.imgCheckFail = false
        this.disabled = true
        this.sendMessage()
      }else{
        this.imgCheckFail = true
        this.refresh()
      }
    },
    sendMessage(){
      let mobile = this.mobileData.mobile
      this.isReceiveMsg = true
      let timer = setInterval(this.timeChange,1000)
      var that = this
      setTimeout(function(){
        clearInterval(timer)
        that.isReceiveMsg = false
        that.timeCount = 60
      },60000)
      userService.sendMessage(mobile)
        .then(res => this.successSend(res))
    },
    successSend(res){
      this.mobileData.v_code = res.data
    },
    timeChange(){
      this.timeCount--
    }
  },
  mounted(){
    this.refresh()

  },
  watch:{
    "isShow"(newVal){
      if(newVal){
        this.$refs.el.type = "text"
      }else{
        this.$refs.el.type = "password"
      }
    }
  }
}
</script>
<style scoped>
  h1{
    font-size: 30px;
    padding: 50px 20px 10px;
    font-weight: bold;
  }
  .nav {
    padding-left: 20%;
    margin-bottom: 10px; 
  }
  .nav a{
    color: grey;
  }
  .nav>.active>a{
    color: #64a1ff;
        background: none;
  }
  .nav li{
    float: left;
  }
  .nav a:hover{
    background: white;
  }
  .nav .wap{
    width: 1px;
    height: 12px;
    border-right: 1px solid #cccccc;
    float: left;
    margin-top: 14px;
  }
  .login{
    /*background-image: url("../assets/login_bg.png");    */
    background: white;
  }
  .login-box{
    margin: 0 auto;
    padding: 0 10px;
    float: none;
    overflow: hidden;
  }
  .control-group{
    position: relative;
    top:0;left: 0;
  }
  .clear,.eye{
    position: absolute;
    top: 0px;
    color: #cccccc;
    cursor: pointer;
    padding: 10px;
  }
  .clear:hover,.eye:hover{
    color: #3DA8F5;
  }
  .clear{
    right:30px; 
  }
  .eye{
    right: 5px;
  }
  .check-box{
    border: 1px solid #cccccc;
    margin-bottom: 30px; 
    border-radius: 4px; 
    padding-bottom: 10px; 
    padding-left: 10px;
    text-align: left;
  }
  .check-prompt{
    padding: 10px 0;
  }
  .check-imgs{
    width: 80%;
    overflow: hidden;
    font-size: 22px;
  }
  .refresh{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 22px;
    cursor: pointer;
  }
  .check-imgs span{
    padding: 3px 0;
    text-align: center;
    margin-right: 7px; 
  }
  .refresh:hover{
    color: #3DA8F5;
  }
  .icon{
    cursor: pointer;
  }
  .icon:hover{
    color: #3DA8F5;
  }
  .check-mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0; left:0;
    line-height: 83px;
    text-align: center;
    background: rgba(255,255,255,.7);
  }
  .text-primary{
    font-size: 20px;
    position: relative;
    top:2px;
  }
  .check-fail{
    position: relative;
    top: -10px;
    color: red;
    text-align: left;
  }
  .receive-message{
    height: 40px;
    line-height: 40px;
    padding-right: 10px; 
    position: absolute;
    right: 0;
    top: 0;
  }
  .receive-message .text-primary{
    font-size: 14px;
  }
  .nav-tabs{
    margin-bottom: 15px; 
  }
</style>

