<template>
	<div class="pad-left">
		<div v-if="showObj.show">
			<div class="header">		
				<h3 class="header-prompt">分店信息</h3>
				<button class="pk-btn-danger" @click="showObj.show=false,selectData={sheng:'',shi:'',xian:'',shangquan_id:''},mode='add'">添加分店</button>
			</div>
			<pk-table :data="branchList" @trclick='tableClick' :option="branchOpts"></pk-table>		
		</div>
		<branch-detail v-else :show="showObj" :data="selectData" :mode="mode"></branch-detail>
	</div>
</template>
<script>
	import{
		branchOpts
	}from "./branch"
	import {
		pkTable
	}from "pk"
	import{
		userService
	}from "api"
	import branchDetail from "./branchDetail"
	export default{
		components:{
			pkTable,
			branchDetail
		},
		data(){
			return{
				branchOpts,
				branchList:[],
				selectData: {},
				showObj:{
			        show: true,
			        refresh: 0
			     },
				refreshList: 0,
				mode:""
			}
		},
		methods:{
			getBranchList(){
				userService.getBranchList()
					.then((data) => {
						if(data.code == 200){
							this.branchList = data.data
						}
					})
			},
			tableClick(e,row,type){
				if(type == "edit") this.showEdit(row)
				if(type == "delete") this.showDelete(row.id)
			},
			showEdit(row){
					this.selectData = row
					this.mode = "edit"
					this.showObj.show = false
			},
			showDelete(id){
				userService.branchDelete(id)
				.then((res) => {
					if(res.code == 200) this.refreshList++
					this.$emit("shwoAlert",res.msg)
				})
			},
		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"showObj.refresh"(newVal){
				this.refreshList++
			},
			"refreshList":"getBranchList"
		}
	}
</script>
<style scoped>
	.header{
		padding: 20px 0;
		text-align: right;
	}
	.header-prompt{
		width: 50%;
		height: 32px;
		line-height: 32px;
		margin: 0;
		padding: 0;
		float: left;
		text-align: left;	
		font-size: 16px;
		font-weight: bold;			
	}
	.pad-left{
		padding-left: 25px;
	}

	.wrap{
		height: 20px;
	}
	.text-info{
		cursor: pointer;
	}
</style>