<template>
<div>
	<div class="col-sm-7">
	<!-- {{data.intro_content}} -->
    	<pk-input sm="12" label="标题">
    		<input type="text" class="form-control" v-model="data.intro_title" name="">
    	</pk-input>  
    	<pk-input sm="12" label="描述">
    		<textarea type="text" class="form-control" v-model="data.intro_description" name=""></textarea>
    	</pk-input>  
		<pk-input sm="12" label="详情页">
			<pk-editor :html.sync="data.intro_content"></pk-editor>	
		</pk-input>
    	<div class="f-left col-sm-12 btn-pad text-center">
    		<button class="pk-btn-main" @click="submit">提交</button>
    	</div>	
    	<div class="clear"></div>
    </div>
</div>
</template>
<script>
import {
	pkInput,
	pkEditor
} from "pk"
import {
	userService
}from "api"
	export default{
		props:["data"],
		components:{
			pkInput,
			pkEditor,
		},
		data(){
			return {
			}
		},
		methods:{
			submit(){
				this.data.detail_id = this.data.id
				userService.shopDetailSubmit(this.data)
				.then((res) =>{
					if(res.code==200){
						bus.$emit("showAlert",res.msg)
					}
				})
			},

		},
		mounted() {

		}
	}
</script>
<style scoped>
	#container,.mapBox{ 
    height: 500px; 
    overflow:hidden;
    margin-top:20px; 
    position: relative;
	}
	.mapBox{
		width: 50%;
	}
	#container{
		width: 100%;
	}
	.positionInfo{
		position: absolute;
		right: -50px;
		top:20px;
	}
	.col-sm-offset-6{
		margin-top: 30px;
		margin-bottom: 30px; 
	}
</style>