<template>
	<div>
	<el-tabs v-model="selectedId">
    	<el-tab-pane label="信息" name="0"  @click='selectedId = 0'></el-tab-pane>
    	<el-tab-pane v-if="editData.id" label="菜单" name="1"  @click='selectedId = 1'></el-tab-pane>
    </el-tabs>
		<menus-info :id="id" :show.sync="show" :data="editData" v-if="selectedId == 0"></menus-info>
		<menus-food :id="id" :data="editData" :refresh.sync="refreshList" v-if="selectedId == 1"></menus-food>
	</div>
</template>
<script>
	import {
		pkInput,
		pkSingleImg,
		pkEditor
	} from "pk"
	import{
		userService
	}from "api"
	import menusInfo from "./menusInfo"
	import menusFood from "./menusFood"
	export default{
		props:["id","show"],
		components:{
			menusInfo,
			menusFood
		},
		data (){
			return {
				editData:Object.assign({time_start:"",time_end:"",refund_type:""}, this.data),
				editorOption:{},
				selectedId: "0",
				refreshList: 0
			}
		},
		methods:{
			getMenuRow(){
				userService.getMenuRow(this.id)
				.then((res) => {
					if(res.code == 200){
						this.editData = res.data
						// this.$emit('update:select',"0")
					}
				})
			}
		},
		mounted(){
			if(this.id) this.getMenuRow()
		},
		watch:{
			show(newVal){
				if(!newVal){
					this.$emit('update:show',false)
				}
			},
			"refreshList":"getMenuRow"
		}	
	}
</script>