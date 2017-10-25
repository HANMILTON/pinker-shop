<template>
  <div class="login">
    <div class="login-box col-sm-3 col-xs-8">
      <h1 class="text-center">{{ name }}</h1>
      <form class="form-box">
        <div class="control-group">
           <input type="text" class="form-control" v-model="loginData.user_name" placeholder="邮箱/手机号">
        </div>
        <div class="control-group">
           <input type="password" class="form-control" v-model="loginData.password" placeholder="密码">
           <div class="forgot-password" @click="goForgot">忘记密码?</div>
        </div>
        <div class="control-group">
           <button type="button" class="btn btn-primary btn-full" @click="login">登录</button>
        </div>    
        <div class="wrap"></div>  
<!--         <div class="control-group">
           <button class="btn btn-chat">使用微信登录</button>
        </div>  --> 
        <div class="control-group">
           <div class="prompt">还没有账号？<span class="text-primary" @click="goRegister">注册新账号</span></div>    
        </div> 
<!--         <pk-input sm="12" label="aa">
          <input type="text" name="" class="form-control">
        </pk-input>  -->
      </form>   
    </div>
  </div>
</template>

<script>
import {
  pkInput
} from 'pk'
import {
  userService,
  publicService
}from "api"
export default {
  components:{
    pkInput
  },
  data () {
    return {
      name: 'Find',
      loginData:{},
      // validateStatus: this.$parent.validateStatus
    }
  },
  methods:{
    login(){
      userService.login(this.loginData)
      .then(res => this.loginSuccess(res))
    },
    loginSuccess(res){
      if(res.code == 200 || res.code == 207){
        let data = res.data
        localStorage.setItem("user_id",data.id)
        localStorage.setItem("upload_validate_str",data.upload_validate_str)
        this.getUserInfo()
        bus.$emit("showAlert",res.msg,"success")
      }else if(res.code == 203){
          this.$router.push({
            path:'/emailPrompt',
            query:{
              email: this.loginData.user_name,
              from: "login"
            }
          })
      }
    },
    goForgot(){
      this.$router.push('/forgot')
    },
    goRegister(){
      this.$router.push('/register')
    },
    setUserInfo(res){
      // console.log(res)
      if(res.code == 200){
        this.$router.push('/apply')
      }
    },
    getUserInfo(){
      userService.getUserInfo()
      .then((res) => {
        if(!res.data) return this.$router.push('/apply')
        let validateStatus = res.data.validate_status
        if(validateStatus == 1){
          this.$router.push('/shopEdit')
        }else{
          this.$router.push('/apply')
        }
      })
    }
  },
  // mounted(){
  //   publicService.getUserInfo()
  //   .then(res => this.setUserInfo(res))
  // }
  // asyncData(){
  //   alert(1)
  // }
}
</script>
<style scoped>
  h1{
    font-size: 30px;
    font-weight: bold;
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
  .forgot-password{
    height: 12px;
    line-height: 12px;
    position: absolute;
    bottom:4px;right: 0;
    color: grey;
    font-size: 12px;
    cursor: pointer;
  }
  .forgot-password:hover{
    color: #4395ff;
  }
  .btn-chat{
    width: 100%;
    /*font-size: 18px;*/
    color: #32C25A;
    border: 1px solid #32C25A;
    background: white;
  }
  .btn-chat:hover{
    color: white;
    background: #32C25A;
  }
  .wrap{
    height: 30px;
    border-top: 1px solid #d9d9d9;
  }
  .prompt{
    color:grey;
    text-align: center;
  }
</style>

