<template>
	<div class="check">
		<div :class="ischeck ? 'check-success' : ''">
			
		</div>
		<div class="prompt">{{promptText}}</div>
		<div class="col-sm-12 btn-pad text-center" v-if="ischeck"><button v-if="isPc" @click="goApply" class="pk-btn-danger">{{buttonText}}</button><span v-else>请在电脑上登录</span></div>
	</div>
</template>
<script>
import {
	userService
} from "api"
	export default{
		data(){
			return {
				ischeck: false,
				promptText:"",
				buttonText:"立即前往",
				isPc:false
			}
		},
		mounted(){
			this.checkVersion()
			userService.checkEmail(this.$route.query)
				.then(res => this.checkStatus(res))
		},
		methods:{
			checkVersion(){
			    let userAgentInfo = navigator.userAgent;
			    let Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPod"];
			    let flag = true;
			    for (let v = 0; v < Agents.length; v++) {
			        if (userAgentInfo.indexOf(Agents[v]) > 0) {
			            flag = false;
			            break;
			        }
			    }
			    this.isPc = flag
			},
			checkStatus(res){
				if(res.code == 200 || res.code == 203){
					if(res.code == 203){
						this.buttonText = "前往登录"
					}else{
				        let data = res.data
				        localStorage.setItem("user_id",data.id)
				        localStorage.setItem("upload_validate_str",data.upload_validate_str)
					}
					this.promptText = res.msg
					this.ischeck =true
				}else{
					this.promptText = res.msg
				}
			},
			goApply(){
				this.$router.push('/login')
			}
		}
	}
</script>
<style scoped>
	.prompt{
		padding:  50px 0 20px 0;
	}
	.check{
		padding-top: 100px; 
		text-align: center;
	}
</style>