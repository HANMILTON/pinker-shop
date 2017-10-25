<template>
	<div class="pad-left">
	<div v-if="showList">
		<h3 class="text-left">商家列表</h3>
	   <ul class="nav nav-tabs">
	      <li :class="{active:selectedId===index}" v-for="(data,index) in selectList"  @click='searchStatus(data,index)'>
	        <a href="javascript:;">
	          <span>{{data.text}}</span>
	        </a>
	      </li>
	    </ul>
	    <div class="wrap"></div>
	    <!-- <div>{{button()}}</div> -->
		<pk-table :data="shopList" @trclick='tableClick' :option="checkOpts"></pk-table>		
	</div>
	<!-- <check-detail v-else :show.sync="showList" :data="selectData"></check-detail> -->

	</div>
</template>
<script>
	import{
		checkOpts
	}from "./check"
	import {
		pkTable
	}from "pk"
	import{
		userService
	}from "api"
	import checkDetail from "./checkDetail"
	export default{
		components:{
			pkTable,
			checkDetail
		},
		data(){
			return{
				selectedId:0,
				checkOpts,
				selectList:[{text:"未上线",value:0},{text:"已上线",value:1}],
				shopList:[],
				world:123,
				serachObj:{
					category_id:1,
					is_online: -1,
					page: 1,
					per_page: 20
				},
				selectData:{},
				showList:true
			}
		},
		methods:{
			// button(){
			// 	return `<button class='btn btn-xs btn-default' data-type='detail'>查看</button>`;
			// },
			tableClick(e,row,type){
				if(type == "detail"){
					this.selectData = row
					this.showList = false
				}
			},
			searchStatus(data,index){
				this.selectedId = index
				this.serachObj.validate_status=data.value
				userService.getShopValidateList(this.serachObj)
				.then((data) => {
					// console.log(data)
					if(data.code == 200){
						this.shopList = data.data.validate_list
					}
				})
			
			}
		},
		mounted(){
			userService.getShopList(this.serachObj)
				.then((data) => {
					// console.log(data)
					if(data.code == 200){
						this.shopList = data.data.validate_list
					}
				})
			}
	}
</script>
<style scoped>
	.pad-left{
		padding-left: 50px;
	}
	h3{
		margin: 20px;
		border-bottom: 1px solid #cccccc;
		padding-bottom:20px;
	}
	.wrap{
		height: 20px;
	}
</style>