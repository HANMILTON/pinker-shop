<template>
	<div class="text-center">
		<div :class="ischeck ? 'check-success' : ''">
				
		</div>
		<div class="prompt">支付成功，<span class="info-font">{{timeCount}}s</span> 后跳转！</div>	
	</div>

</template>
<script>
	import{
		userService
	}from "api"
	export default{
		data(){
			return {
				ischeck: false,
				timeCount: 3
			}
		},	
		methods:{
			getOrderInfo(){
				userService.getOrderInfo(this.$route.query.out_trade_no)
				.then(res => {
					this.ischeck = true
					this.timeChange()
				})				
			},
			timeChange(){
				let that = this
				let timer1 = setInterval(function(){
					that.timeCount --
				},1000)
				setTimeout(function(){
					clearTimeout(timer1)
					that.$router.push('/userInfo')
				},3000)
			}

		},
		mounted(){
			this.getOrderInfo()
		}
	}
</script>
<style scoped>
	.text-center{
		padding-top: 150px;
	}
	.prompt{
		height: 100px;
		line-height: 100px;
		font-size: 20px;
	}
	.info-font{
		font-size: 26px;
	}
</style>