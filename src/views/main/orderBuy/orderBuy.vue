<template>
	<div class="pad-left">
		<h3 class="text-left">买单订单</h3>
		<div class="no-float">
			 <el-row :gutter="20">
  			<el-col :span="4">			    
	  			<el-date-picker
				      v-model="serachObj.date_start"
				      @change="dateChange($event,'date_start')"
				      :clearable="true"
				      placeholder="开始日期">
				   </el-date-picker>
			  </el-col>
  			<el-col :span="4">			   	
  				<el-date-picker
			      v-model="serachObj.date_end"
			      @change="dateChange($event,'date_end')"
			      :clearable="true"
			      placeholder="结束日期">
			    </el-date-picker>	
			   </el-col>
  			<el-col :span="5">
  				<el-input v-model="serachObj.mobile" @change="refreshList++" placeholder="搜索手机号、姓名"></el-input>
  			</el-col>
<!--   			<el-col :span="4":offset="2">
  				<button class="pk-btn-danger" @click="refreshList++">查询</button>
  			</el-col> -->
  			<el-col :span="4":offset="7">
  				<div class="total-money">收入总计：<span class="danger-font">{{totalMoney}}元</span></div>
  			</el-col>
			</el-row>

		</div>
	     <div class="wrap"></div>
	    <!-- <div>{{button()}}</div> -->
		<pk-table :data="orderList" @trclick='tableClick' :option="orderOpts"></pk-table>	
		<div class="text-center" v-if="pageCount>1">
			<el-pagination
		        @current-change="handleCurrentChange"
		        :current-page.sync="serachObj.page"
		        :page-size="serachObj.per_page"
		        layout="total, prev, pager, next"
		        :page-count="pageCount" 
		        >
	        </el-pagination>			
		</div>	
	</div>
</template>
<script>
	import{
		orderOpts
	}from "./order"
	import {
		pkTable,
		pkInput
	}from "pk"
	import{
		userService
	}from "api"
	export default{
		components:{
			pkTable,
			pkInput
		},
		data(){
			return{
				orderOpts,
				orderList:[],
				showFind: false,
				serachObj:{
					page:1,
					per_page:10,
					date_start:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
					date_end:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
				},
				refreshList: 0,
				totalMoney:"0",
				pageCount: 0,
			}
		},
		methods:{
			handleCurrentChange(){
				this.refreshList++
			},
			dateChange(val,key) {
			    this.serachObj[key] = val
			    this.refreshList++
			},
			getOrderList(){
				userService.getBuyList(this.serachObj)
				.then((data) => {
					if(data.code == 200){
						this.orderList = data.data.maidan_list
						this.totalMoney = data.data.money_pay ? data.data.money_pay : "0"
						this.pageCount = data.data.page_count
					}
				})
			},
			tableClick(e,row,type){
				if(type == "check") this.handleCheck(row)
			}

		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList":"getOrderList"
		}

	}
</script>
<style scoped>
	.pad-left{
		padding-left: 50px;
	}
	h3{
		padding-bottom:20px;
		font-size: 16px;
		font-weight: bold; 
	}
	.wrap{
		height: 20px;
	}
	.no-float{
		overflow: hidden;
	}
	.total-money{
		height: 32px;
		line-height: 32px;
		font-size: 16px;
	}
</style>