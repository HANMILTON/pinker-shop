<template>
	<div class="mask">
		<div class="check-box">
			<div class="check-img"><img src="./face.png" alt=""></div>
			<div class="check-prompt">您是否已经完成支付？</div>
			<div class="exit-pay" @click="closeBox">取消支付</div>
			<div class="pass-pay" @click="closeBox">完成支付</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:["show"],
		methods:{
			closeBox(){
				this.$emit("update:show",false)
			}
		}
	}
</script>
<style scoped>
	.mask{
		position: fixed;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    text-align: center;
	    background: rgba(0,0,0,.4);
	}
	.mask::after{
	    content: "";
	    display: inline-block;
	    height: 100%;
	    width: 0;
	    vertical-align: middle;
	}
	.check-box{
		width: 28%;
		height: 250px;
		background: white;
		position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    margin: auto;
	    border-radius: 3px;
	    /*border: none;*/
	}
	.check-img{
		padding: 30px;
	}
	.check-img>img{
		height: 70px;
	}
	.check-prompt{
		height: 30px;
		line-height: 30px;
		font-size: 18px;
	}
	.exit-pay{
		width: 30%;
		height: 40px;
		line-height: 40px;
		border: 1px solid #ededed;
		color: #999999;
		position: absolute;
		bottom: 20px;
		left: 16%;
		border-radius: 3px;
		font-size: 16px;
		cursor: pointer;
	}
	.pass-pay{
		width: 26%;
		height: 40px;
		line-height: 40px;
		background: #64a1ff;
		color: white;
		position: absolute;
		bottom: 20px;
		right: 15%;
		border-radius: 3px;
		font-size: 16px;
		cursor: pointer;
	}
</style>