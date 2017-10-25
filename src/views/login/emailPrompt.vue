<template>
  <div class="login">
    <div class="login-box col-sm-3 col-xs-8">
      <h1 class="text-center">{{ name }}</h1>
      <h4 class="text-center">验证邮件已发送至邮箱</h4>
      <form class="form-box">
        <div class="control-group">
           <button type="button" class="pk-btn-danger-full" @click="emailHasChecked">已完成认证</button>
        </div>
        <div class="control-group space">
          <button type="button" class="btn btn-default btn-full" v-if="isReceiveMsg">重发邮件({{timeCount}}s)</button>
          <button type="button" class="btn btn-primary btn-full" v-else @click="sendEmail">重发邮件</button>
        </div>
        <div class="control-group">
           <div class="text-primary text-center" @click="goRegister">使用其他账号</div>
        </div>      
      </form>   
    </div>
  </div>
</template>

<script>
// import login from "../../static/api/login"
import{
  userService
} from "api"
export default {
  // name: 'login',
  data () {
    return {
      name: 'Find',
      userData:{
      	mobile: this.$route.query.mobile
      },
      isCheckFail: false,
      imgCheckSuccess: '',
      checkText: '',
      disabled: false,
      isReceiveMsg: false,
      timeCount: 60
    }
  },
  methods:{
    emailHasChecked(){
      let email = this.$route.query.email
  		userService.emailHasChecked(email)
  		.then((res) =>{
  			if(res.code == 200){
  				this.$router.push("/login")
  			} 
  		})
    },
    goRegister(){
      this.$router.push("/register")
    },
    sendEmail(){
      let email = this.$route.query.email
      userService.mailSendAgain(email)
      .then((res) => {
        if(res.code == 200){
          this.countTime()
        }
      })
    },
    countTime(){
      this.isReceiveMsg = true
      let timer = setInterval(this.timeChange,1000)
      var that = this
      setTimeout(function(){
        clearInterval(timer)
        that.isReceiveMsg = false
        that.timeCount = 60
      },60000)
    },
    timeChange(){
      this.timeCount--
    }
  },
  mounted(){
   if(this.$route.query.from!="login"){
        this.countTime()
    }
  }
}
</script>
<style scoped>
  h1{
    font-size: 30px;
    font-weight: bold;
    padding: 50px 20px 30px;
  }
h4{
  margin-bottom: 30px;
}
  .space{
    border-bottom: 1px solid #dddddd; 
    padding-bottom:40px;
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
  .check-fail{
    padding-bottom: 20px; 
    color: red;
  }
  .receive-message{
    height: 40px;
    line-height: 40px;
    padding-right: 10px;
    position: absolute;
    right: 0;
    top: 0;
  }
  .btn-default{
    cursor: not-allowed;
  }
  .text-primary{
    height: 70px;
    line-height: 70px;
    cursor: pointer;
  }
</style>

