<template>
  <div class="login">
    <div class="login-box col-sm-3 col-xs-8">
      <h1 class="text-center">{{ name }}</h1>
      <form class="form-box">
        <div class="control-group">
           <input type="text" class="form-control" v-model="userData.mobile" placeholder="邮箱/手机号" disabled>
        </div>
<!--         <div class="control-group" v-if="isCheck">
           <input type="password" class="form-control" v-model="userData.password" placeholder="密码">
        </div> -->  
        <pk-check :check-Status.sync="imgCheckSuccess"></pk-check>
        <div class="control-group" v-if="imgCheckSuccess">
        <!-- <div class="control-group"> -->
          <input type="text" class="form-control" v-model="userData.v_code_getback" placeholder="短信验证码">
          <div class="receive-message">
            <div class="text-default" v-if="isReceiveMsg">重新获取({{timeCount}}s)</div>
            <div class="text-primary" v-else @click="sendMessage">重新获取</div>
          </div>
        </div>
        <div class="control-group" v-if="imgCheckSuccess">
           <input type="password" class="form-control" v-model="userData.password" placeholder="填写您的新密码">
        </div>
        <!-- <div class="check-fail" v-if="isCheckFail"><i class="fa fa-warning fa-fw"></i>{{checkText}}</div> -->
        <div class="control-group">
           <button type="button" class="btn btn-primary btn-full" @click="reset">重置密码</button>
        </div>      
      </form>   
    </div>
  </div>
</template>

<script>
// import login from "../../static/api/login"
import{
  pkCheck
} from "pk"
import{
  userService
} from "api"
export default {
  // name: 'login',
  components:{
    pkCheck
  },
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
    reset(){
		userService.getbackPwdByMobile(this.userData)
		.then((res) =>{
			if(res.code == 200){
				bus.$emit("showAlert","修改成功！")
				this.$router.push("/login")
			} 
		})
    },
    sendMessage(){
      let mobile = this.userData.mobile
      userService.getbackPwdSendSms(mobile)
      .then((res) => {
        if(res.code == 200){
          this.countTime()
        }else{
          this.isCheckFail = true
          this.checkText = res.msg
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
  watch:{
    'imgCheckSuccess'(val){
      if(val){
        this.sendMessage()
      }
    }
  }
}
</script>
<style scoped>
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
</style>

