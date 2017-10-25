<template>
	<div>
		<div class="col-sm-7">
			<pk-input sm="12" label="标题">
				<input type="text" class="form-control" v-model="editData.title" name="">
			</pk-input>
			<pk-input sm="12" label="图片">
				<!-- <input type="text" v-model="editData.img" name=""> -->
				<div class="border">
					<!-- <pk-single-img :img.sync="editData.img"></pk-single-img> -->
					<pk-multi-imgs :imgs.sync="editData.img"></pk-multi-imgs>
				</div>
			</pk-input>
			<pk-input sm="12" label="文字说明">
				<textarea class="form-control" v-model="editData.description" rows="3"></textarea>
			</pk-input>
	<!-- 			<pk-input sm="10" label="详情页">
					<textarea class="form-control" v-model="editData.detail" rows="3"></textarea>
				</pk-input>	 -->

			<pk-input sm="12" label="详情页">
				<div class="border">
					<pk-editor :html.sync="editData.detail"></pk-editor>
				</div>	
			</pk-input>
			<div class="col-sm-12 btn-pad text-center"><button class="pk-btn-main" @click="submit">提交</button></div>
		</div>
	</div>
</template>
<script>
	import {
		pkInput,
		pkMultiImgs,
		pkEditor
	} from "pk"
	import{
		userService
	}from "api"
	export default{
		props:["data","refresh","show","selectedId"],
		components:{
			pkInput,
			pkMultiImgs,
			pkEditor
		},
		data (){
			return {
				editData:Object.assign({}, this.data),
				editorOption:{}
			}
		},
		methods:{
			submit(){
				let id =this.editData.id
				if(id) this.editData.news_id = id
				userService.newsSubmit(this.editData)
				.then((res) =>{
					if(res.code == 200){
						this.selectedId == 1 ? this.$emit('update:selectedId',0) : ""
						let num = this.refresh+1
						this.$emit('update:refresh',num)
						this.$emit('update:show',false)
					}
				})
			}
		}	
	}
</script>