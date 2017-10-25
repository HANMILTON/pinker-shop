<template>
  <div class="login">
    <div class="login-box col-sm-3 col-xs-8">
      <h1>{{ name }}</h1>
      <form class="form-box">
        <div class="prompt">{{promptText}}</div>
        <div class="control-group">
           <input type="password" class="form-control" v-model="userData.password" placeholder="请填写你要修改的密码">
        </div>
        <div class="send-success" v-if="isSendSuccess">{{successText}}</div>
        <div class="control-group">
           <button type="button" class="btn btn-primary btn-full" @click="submit">修改密码</button>
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
      userData:this.$route.query,
      isSendSuccess:false,
      promptText:""
    }
  },
  methods:{
    submit(){
		userService.getbackPwdByEmail(this.userData)
  		.then((res) =>{
        this.isSendSuccess = true
  			if(res.code == 200){
  				bus.$emit("showAlert","密码修改成功！请登录")
          this.$router.push("./login")
  			}else{
  				this.successText = res.msg
  			} 
  		})
    },

  },
  mounted(){
    userService.getbackPwdEmailCheck(this.$route.query)
      .then((res) => {
        if(res.code == 200){
          this.promptText = res.msg
        }else{
          this.promptText = res.msg+",请认真核对"
        }
      })
  },  
}
</script>
<style scoped>
  h1{
    font-size: 20px;
    padding: 50px 20px 30px;
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
  .prompt{
    padding-bottom:20px; 
    color: green;
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

