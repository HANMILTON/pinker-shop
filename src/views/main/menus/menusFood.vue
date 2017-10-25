<template>
	<div class="col-sm-12">	
	  <div class="food-top">
	    <div class="food-right">
	      <button class="pk-btn-danger" @click="addList">添加菜单</button>
	    </div>
	  </div>
		<div v-for="(data,index) in data.item_list" class="col-sm-4">
			<div class="border border-box">
				<pk-input sm="12" label="名称">
					<input type="text" class="form-control" v-model="data.title" name="">
				</pk-input>
				<pk-input sm="12" label="描述">
					<textarea class="form-control" rows="4" v-model="data.description" name=""></textarea>
				</pk-input>		
			<span class="delete" @click="deleteItem(data.id,index)">
				<i class="el-icon-circle-cross"></i>
			</span>      
			</div>
		</div>
		<div class="btn-box col-sm-12 text-center" v-if="data.item_list.length>0">
			<button class="pk-btn-main" @click="submit(data)">提交</button>
		</div>
	</div>
</template>
<script>
	import {
		pkInput
	} from "pk"
	import{
		userService
	}from "api"	
	export default{
		props:["id","data","refresh"],
		components:{
			pkInput
		},
		data (){
			return {
				// foodsList: this.data.item_list
			}
		},
		methods:{
			edit(data){
				data.item_id = data.id
				userService.updataFood(data)
				.then((res) =>{
					if(res.code == 200){
						let num = Math.floor(Math.random()*1000) * (-1)
						this.$emit('update:refresh',num)
						bus.$emit("showAlert",res.msg,"success")
					}
				})
			},
			deleteItem(id,index){
				if(!id) {
					return this.data.item_list.splice(index,1)
				}
				userService.deleteFood(id)
				.then((res) =>{
					if(res.code == 200){
						let num = Math.floor(Math.random()*1000) * (-1)
						this.$emit('update:refresh',num)
						bus.$emit("showAlert","删除成功！")
					}
				})
			},
			submit(data){
				// if(!data.title) return bus.$emit("showAlert","请填写菜单名称！")
				// if(!data.description) return bus.$emit("showAlert","请填写菜单描述！")
				// let arr = []
				// arr.push(data)
				userService.addFood(this.id,this.data.item_list)
				.then((res) => {
					if(res.code == 200){
						let num = Math.floor(Math.random()*1000) * (-1)
						this.$emit('update:refresh',num)
						bus.$emit("showAlert",res.msg,"success")
					}
				})
			},
			addList(){
				this.data.item_list.push({})
			}
		},
	}
</script>
<style scoped>
	.col-sm-4{
		margin-bottom: 15px;
	}
  .wrap{
    padding-top: 20px;
    float: left;
  }
  .border-box{
    padding: 25px 0 10px; 
    box-shadow: 0 0 5px #ddebff;
    position: relative;
  }
  .border-box:hover > .delete{
  	display: block;
  }
  .food-top{
    text-align: right;
    padding-bottom: 20px; 
  }
  .btn-box{
    padding: 20px 0;
  }
  .delete{
  	position: absolute;
  	top: 0px;
  	right: 10px;
  	cursor: pointer;
  	display: none;
  	color: red;
  }

</style>