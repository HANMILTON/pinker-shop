<template>
  <div class="login">
    <div class="login-box col-sm-3 col-xs-8">
      <h1 class="text-center">{{ name }}</h1>
      <form class="form-box">
        <div class="control-group">
           <input type="text" class="form-control" v-model="forgotData.userName" placeholder="邮箱/手机号">
        </div>
        <div class="check-fail" v-if="isCheckFail"><i class="fa fa-warning fa-fw"></i>{{checkText}}</div>
        <div class="control-group">
           <button type="button" class="btn btn-primary btn-full" @click="next">下一步</button>
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
      forgotData:{},
      isCheckFail: false,
      checkType: '',
      checkText: '',
    }
  },
  methods:{
    next(){
      let userName = this.forgotData.userName
      if(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(userName)){
        this.checkType = "email"
      }else if(/^1[34578]\d{9}$/.test(userName)){
        this.checkType = "mobile"
      }else{
        this.checkType = ""
        this.isCheckFail = true
        this.checkText = "账号格式错误"
      }
      if(this.checkType) {
        userService.checkRegister(userName)
          .then((res) => {
            console.log(res)
            if(res.code == 200){
              this.isCheckFail = false
              if(this.checkType == "mobile"){
                this.$router.push({
                  path:'/backMobile',
                  query:{
                    mobile: this.forgotData.userName
                  }
                })                
              }else if(this.checkType == "email"){
                this.$router.push({
                  path:'/backEmail',
                  query:{
                    email: this.forgotData.userName
                  }
                })  
              }
              // this.disabled = true
            }else if(res.code == 201){
              this.isCheckFail = true
              this.checkText = "帐号不存在，请重新输入"
            }
          })
      }
    }
  }
}
</script>
<style scoped>
/*  h1{
    font-size: 18px;
    padding: 50px 20px 30px;
  }*/
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
</style>

