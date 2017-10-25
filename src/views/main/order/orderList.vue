<template>
	<div class="pad-left">
		<h3><span>套餐订单</span>
		<div class="no-float">	
			<div class="find-box">
				<input type="text" placeholder="请输入用户的Find码" @keyup.enter="getFind(findCode)" v-model="findCode" name="">
				<span @click="getFind(findCode)"><i class="el-icon-search"></i></span>
			</div>		
		</div> 
		</h3>

		<div class="order-detail" v-if="orderDetailList">
			<div class="detail-prompt col-sm-12">订单总体情况</div>
			<div class="detail-box col-sm-12">
				<div class="detail-list col-sm-4" v-for="data in orderDetailList">
					<div class="detail-list-title">{{data.text}}</div>
					<div class="detail-list-num">{{data.num}}</div>
				</div>	
			</div>
		</div>	
	     <div class="wrap"></div>
	    <el-row :gutter="20">
	  		<el-col :span="10">
		      <el-tabs v-model="selectedId">
		        <el-tab-pane :label="data.text+'('+data.num+')'" v-for="(data,index) in selectList"  @click="selectedId = String(index+1)" :name="String(index+1)"></el-tab-pane>
		      </el-tabs>
		    </el-col>
		    <el-col :span="4" :offset="2">			    
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
  			<el-col :span="4">
  			  <el-select v-model="serachObj.set_id" @change="refreshList++" placeholder="套餐选择">
			   	<el-option
			      v-for="item in menuList"
			      :label="item.set_name"
			      :value="item.id">
			    </el-option>
			  </el-select>
  			</el-col>
	    </el-row>
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

		<find-panel v-if="showFind" :show.sync="showFind" :data="findData" :refresh.sync="refreshList"></find-panel>
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
	import findPanel from "./findPanel"
	export default{
		components:{
			pkTable,
			pkInput,
			findPanel
		},
		data(){
			return{
				orderOpts,
				orderList:[],
				showFind: false,
				serachObj:{
					page:1,
					per_page:10,
					status:1,
					date_start:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
					// date_start:`2017-09-01`,
					date_end:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
					set_id:""
				},
				pageCount: 0,
				orderDetailList:"",
				refreshList: 0,
				selectedId:"1",
				findData:{},
				findCode:"",
				menuList:[],
				selectList:[{text:"已支付",value:1,num:0},{text:"已消费",value:2,num:0},{text:"已过期",value:3,num:0},{text:"已退款",value:4,num:0}],
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
			getMenuList(){
				userService.getMenuList()
				.then((data) =>{
					if(data.code == 200){
						this.menuList = data.data
					}
				})
			},
			search(){
				this.refreshList++
			},
			getOrderList(){
				userService.getOrderList(this.serachObj)
				.then((data) => {
					if(data.code == 200){
						let list = [{text:"今日下单人数",num:0},{text:"总下单人数",num:0},{text:"总消费人数",num:0},{text:"今日下单份数",num:0},{text:"总下单份数",num:0},{text:"总消费单数",num:0}]
						let countList = data.data.count_total
						countList.forEach(function(data,index){
							list[index].num = data
						})
						this.orderDetailList = list
						let selectList = [{text:"已支付",value:1,num:data.data.num_has_pay},{text:"已消费",value:2,num:data.data.num_has_consumed},{text:"已过期",value:3,num:data.data.num_has_expired},{text:"已退款",value:4,num:data.data.num_has_refunded}]
						this.selectList = selectList
						this.orderList = data.data.order_list
						this.pageCount = data.data.page_count
					}
				})
			},
			tableClick(e,row,type){
				if(type == "check") this.handleCheck(row)
			},
			getFind(code){
				userService.findSearch(code)
				.then((res) => {
					if(res.code == 200){
						this.findCode = ""
						this.showFind = true
						this.findData = res.data
					}
				})
			},

		},
		mounted(){
			this.refreshList++
			this.getMenuList()
		},
		watch:{
			"refreshList":"getOrderList",
			selectedId(newVal){
				this.serachObj.status = newVal
				this.refreshList++
			}
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
		position: relative;
	}
	.wrap{
		height: 20px;
	}
	.no-float{
		overflow: hidden;
	}
	.find-box{
		width: 20%;
		background: #64a1ff;
		height: 40px;
		border-radius: 20px;
		overflow: hidden;
		position: absolute;
		top:-10px;
		right: 0;
	}
	.detail-prompt{
		height: 40px;
		line-height: 40px;
		background: #fafafa;
		margin-bottom: 10px;
	}
	.find-box>input{
		display: inline-block;
	    background: 0 0;
	    border: none;
	    color: #fff;
	    line-height: 50px!important;
	    height: 40px;
	    box-sizing: border-box;
	    vertical-align: 4px;
	    font-size: 14px;
	    width: 100%;
	    padding-left: 20px;
	    transition: all .3s ease-in-out;
	}
	.find-box>input::placeholder{
		color: white;
		font-weight: lighter;
		opacity: 1;  
	}	
	.find-box>span{
		display: inline-block;
		width: 40px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		position: absolute;right: 0;top: 0;
		color: white;
		font-size: 18px;
		font-weight: lighter;

	}
	.detail-list-title{
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	.detail-list-num{
		height: 50px;
		line-height: 50px;
		font-size: 26px;
		text-align: center;
		color: #64a1ff;
	}
	.order-detail{
		border: 1px solid #ededed;
		margin: 20px 0;
		overflow: hidden;
		border-radius: 5px;
		overflow: hidden;
		padding-bottom: 10px; 
	}
	.detail-prompt{
		padding-left: 10px; 
	}
</style>