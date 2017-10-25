<template>
  <div class="login">
    <div class="login-box col-sm-3 col-xs-8">
      <h1 class="text-center">{{ name }}</h1>
      <form class="form-box">
        <div class="control-group">
           <input type="text" class="form-control" v-model="email" disabled>
        </div>
        <div class="send-success" v-if="isSendSuccess">{{successText}}</div>
        <div class="control-group">
           <button type="button" class="btn btn-primary btn-full" @click="sendEmail">发送邮件</button>
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
      email: this.$route.query.email,
      isSendSuccess: false,
      successText:""
    }
  },
  methods:{
    sendEmail(){
		userService.getbackPwdSendMail(this.email)
  		.then((res) =>{
        this.isSendSuccess = true
  			if(res.code == 200){
  				this.successText = "邮件发送成功，查看邮件修改密码"
  			}else{
  				this.successText = res.msg
  			} 
  		})
    },

  },
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
  .send-success{
    padding-bottom: 20px;
    color: green;
  }
</style>

