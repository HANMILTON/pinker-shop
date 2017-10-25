<template>
	<div class="apply-commplete">
		<div class="check-success" v-if="!failCheck">
			<h1>审核成功</h1>
			<h5>恭喜您审核成功，快去使用吧!</h5>	
			<button class="btn btn-info" @click="goToMain">开始使用</button>		
		</div>
		<div class="check-fail" v-else>
			<h1>审核未通过</h1>
			<h5>您的信息有缺少,请重新填写</h5>			
			<span class="write" @click="writeAgain">重新编辑</span>		
		</div>
	</div>
</template>
<script>
	export default{
		props:["failCheck","progress"],
		data () {
			return {

			}
		},
		methods:{
			goToMain(){
				this.$router.push('/shopEdit')
			},
			writeAgain(){
				this.$emit('update:progress', 2)
			}
		}
	}
</script>
<style scoped>
	.apply-commplete{
		background: white;
		text-align: center;
	}
	h1{
		padding: 50px auto 20px;
		font-size: 26px;
		font-weight: bold;
	}
	h5{
		padding-bottom: 10px;
		color: grey;
	}
	.write{
		cursor: pointer;
		color: #3DA8F5;
	}
</style>