<template>
	<div class="pad">
		<div class="setList">
			<div class="setLogo"><img src="./maidan.png"></div>
			<div class="set-info">
				<span class="set-prompt">买单功能&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<pk-switch
				  v-model="maidan_status"
				  on-value="1"
				  @change="submit"
				  off-value="0">
				</pk-switch>			
			</div>
		</div>
		<div class="setList">
			<div class="setLogo"><img src="./reserve.png"></div>
						<div class="set-info">
				<span class="set-prompt">预约功能&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<pk-switch
				  v-model="reserve_status"
				  on-value="1"
				  @change="submit"
				  off-value="0">
				</pk-switch>			
			</div>
		</div>
	<div v-if="showPrompt">请前去添加总店信息</div>
	<br>
	</div>
</template>
<script>

	import {
	  userService
	}from "api"
	import{
		pkSwitch
	}from "pk"
	export default{
		data(){
			return{
		        maidan_status: "0",
		        reserve_status: "0",
		        status:"0",
		        statusTest:"",
		        showPrompt: false
			}
		},
		components:{
			pkSwitch
		},
		methods:{
	      getDetailRow(){
	      	// console.log(9)
	        userService.getDetailRow()
	        .then((res) => {
	          if(res.code == 200){
	            let shopData = res.data
	            if(shopData.id){
	              this.maidan_status = shopData.is_online_maidan 
	              this.reserve_status = shopData.is_online_reserve 
	            }else{
								this.showPrompt=true
	            }             
	          }
	        })
	      },
	      submit(){
	      	userService.userSetOnline(this.maidan_status,this.reserve_status)
	      	.then(res =>{
	      		if(res.code == 200){
	      			bus.$emit("showAlert",res.msg)
	      			this.getDetailRow()
	      		}
	      	})
	      }
		},
		mounted(){
			this.getDetailRow()
		}
	}
</script>
<style scoped>
	.pad{
		padding: 20px 10px;
	}
	.setList{
		width: 200px;
		height: 200px;
		padding-top: 40px;
		border: 1px solid #ededed;
		border-radius: 9px;
		float: left;
		margin-right: 50px; 
	}
	.setList:hover{
		box-shadow: 0 0 5px #ddebff;
	}
	.setLogo,.set-info{
		width: 200px;
		height: 60px;
		text-align: center;
	}
	.setLogo{
		margin-bottom: 45px;
	}
</style>