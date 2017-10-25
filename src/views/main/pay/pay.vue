<template>
	<div></div>
</template>
<script>
	import{
	payService
	}from "api"
	export default{
		data(){
			return {
				// orderId: this.$route.query.orderId
			}
		},
		methods:{
			payOrder(id){
				payService.getPayInfo(id)
				.then(res => this.paySuccess(res.data))
			},
			paySuccess(data){
				$("#app").append(data)
			}
		},
		mounted(){
			console.log(this.$route.query.orderId)
			this.payOrder(this.$route.query.orderId)
		}
	}
</script>