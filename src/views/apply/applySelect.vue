<template>
	<div class="col-sm-12 apply_select"> 
		<div class="select-box">
			<div class="select-list col-sm-5 col-sm-offset-1" @click="apply">
				<img src="./shop.png">
			</div>
			<div class="select-list col-sm-5">
				<img src="./media.png">
			</div>		
		</div>
	</div>
</template>
<script>
import {
	pkPanel
} from "pk"
	export default{
		props:["progress"],
		components:{
			pkPanel
	  	},
	  methods:{
	  	apply(){
	  		this.$emit('update:progress', 2)
	  	}
	  }
	}
</script>
<style scoped>
.apply_select{
	margin: 0 auto;
	float: none;
	background: white;
	padding: 0 15%;
}
.col-sm-4{
	margin-left: 5%; 
}
.select-box{
	padding-top: 100px;
}
.select-list{
	
}
.select-list img{
	width: 100%;
	cursor: pointer;
	border-radius: 5px;
	overflow: hidden;
}
.select-list img:hover{
	box-shadow: 0 0 10px #ddebff;
}

</style>