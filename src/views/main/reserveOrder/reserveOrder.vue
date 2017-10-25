<template>
	<div class="pad-left">
		<h3 class="text-left">预约订单</h3>
		<div class="wrap"></div>
		<el-row :gutter="20">
  			<el-col :span="4">			    
	  			<el-date-picker
				      v-model="serachObj.reserve_date_start"
				      @change="dateChange($event,'reserve_date_start')"
				      :clearable="true"  
				      placeholder="开始日期">
				   </el-date-picker>
			  </el-col>
  			<el-col :span="4">			   	
  				<el-date-picker
			      v-model="serachObj.reserve_date_end"
			      @change="dateChange($event,'reserve_date_end')"
				  :clearable="true" 
			      placeholder="结束日期">
			    </el-date-picker>	
			   </el-col>
  			<el-col :span="5">
  				<el-input v-model="serachObj.search_str" @change="refreshList++" placeholder="搜索手机号、姓名"></el-input>
  			</el-col>
<!--   			<el-col :span="4" :offset="2">
  				<button class="pk-btn-danger" @click="refreshList++">查询</button>
  			</el-col> -->
			</el-row>
	     <div class="wrap"></div>
	     <div class="">
		   	<ul class="nav-box f-left">
		      <li :class="{active:selectedId===index}" v-for="(data,index) in selectList"  @click='searchStatus(data,index)'>
		        <a href="javascript:;">
		          <span>{{data.text}}<span v-if="data.num">&nbsp;&nbsp;{{data.num}}</span></span>
		        </a>
		      </li>
		    </ul>		    
		    <div class=" f-right" v-if="selectedId == 0">
<!-- 			  <el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="下单时间排序" name="first"></el-tab-pane>
			    <el-tab-pane label="预约时间排序" name="second"></el-tab-pane>
			  </el-tabs> -->
			  <el-select width="100px" class="no-border" v-model="activeName" @change="handleClick(activeName)" placeholder="请选择">
				<el-option
				  label="下单时间排序"
				  value="first">
				</el-option>
				<el-option
				  label="预约时间排序"
				  value="second">
				</el-option>
			  </el-select>	
	    </div>     	
	     </div>

	    <div class="col-sm-12">
	    	<pk-table v-if="type == 1" :data="orderList" @trclick='tableClick' :option="orderOpts"></pk-table>
	    	<pk-order-table2 v-if="type == 2" :data="orderList" @trclick='tableClick' :option="orderOpts1"></pk-order-table2>
<!-- 	    	<div class="text-center">
				<el-pagination
			        @current-change="handleCurrentChange"
			        :current-page.sync="serachObj.page"
			        :page-size="serachObj.per_page"
			        layout="total, prev, pager, next"
			        :page-count="pageCount" 
			        >
		        </el-pagination>			
			</div> -->
	    </div>
	</div>
</template>
<script>
	import{
		orderOpts,
		orderOpts1
	}from "./order"
	import {
		pkTable,
		pkInput,
		pkOrderTable2
	}from "pk"
	import{
		userService
	}from "api"
	export default{
		components:{
			pkTable,
			pkInput,
			pkOrderTable2
		},
		data(){
			return{
				orderOpts,
				orderOpts1,
				orderList:[],
				showFind: false,
				serachObj:{
					reserve_date_start:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
					// reserve_date_start:`2017-09-01`,
					// reserve_date_end:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
					reserve_date_end:"",
					reserve_status:"00",
					paixu_type: "1"
				},
				type:1,
				refreshList: 0,
				selectedId:0,
				activeName:"first",
				findData:{},
				numArrived:"",
				numCancel:"",
				numConfirmed:"",
				numConfirmedNot:"",
				numConfirmedRefuse:"",
				findCode:"",
				selectList:[{text:"待确认",value:"00",num:""},{text:"已确认",value:"10",num:""},{text:"已到店",value:"11",num:""},{text:"已拒绝",value:"20",num:""},{text:"已取消",value:"40",num:""}]
			}
		},
		methods:{
			// handleCurrentChange(){
			// 	this.refreshList++
			// },
			dateChange(val,key) {
			    this.serachObj[key] = val
			    this.refreshList++
			},		
			handleClick(tab){
				let index = tab=="first" ? 1 : 2
				this.serachObj.paixu_type = index
				this.refreshList++
			},
			getOrderList(){
				userService.reserveOrderList(this.serachObj)
				.then((data) => {
					if(data.code == 200){
						var data = data.data
						this.numArrived = data.num_arrived
						this.selectList[2].num = data.num_arrived
						this.numCancel = data.num_cancel
						this.selectList[4].num = data.num_cancel
						this.numConfirmed = data.num_confirmed
						this.selectList[1].num = data.num_confirmed
						this.numConfirmedNot = data.num_confirmed_not
						this.selectList[0].num = data.num_confirmed_not
						this.numConfirmedRefuse = data.num_confirmed_refuse
						this.selectList[3].num = data.num_confirmed_refuse
						Array.isArray(data.order_list) ? this.type = 1 : this.type = 2
						// console.log(this.selectList)
						if(this.type == 1) {
							this.orderList = data.order_list
						}else{
							this.orderList = this.getformat(data.order_list)
						}
						// console.log(JSON.stringify(data.order_list))
					}
				})
			},
			getformat(obj){
				var orderList=[]
				for(data in obj){
					// console.log(data,obj[data])
					let obj2 =  obj[data]
					var data = data
					orderList.push({date:data})
					for(data2 in obj2){
						var data2 = data2
						let obj3 = obj2[data2]
						orderList.push({time:data2,num_r:obj3.num_reserve == undefined ? 0 : String(obj3.num_reserve) ,num_a:obj3.num_arrived == undefined ? 0 : String(obj3.num_arrived)})
						orderList=orderList.concat(obj3.order_list)
					}
				}
				return orderList
			},
			searchStatus(data,index){
				// alert(1)
				this.selectedId = index
				this.serachObj.reserve_status=data.value
				this.refreshList++
			},
			tableClick(e,row,type){
				if(type == "ok") this.handleCheck(row,"10")
				if(type == "exit") this.handleCheck(row,"20")
				if(type == "arrive") this.handleCheck(row,"11")
			},
			handleCheck(row,status){
				userService.reserveStatusAct({reserve_order_id:row.id,reserve_status:status})
				.then(res =>{
					if(res.code == 200){
						this.refreshList++
					}
				})
			}
		},
		mounted(){
			this.refreshList++
			this.getformat()
		},
		watch:{
			"refreshList":"getOrderList"
		}

	}
</script>
<style scoped>
	.pad{
		padding: 10px;
	}
	.pad-left{
		padding-left: 50px;
	}
	h3{
		/*padding-bottom:20px;*/
		font-size: 16px;
		font-weight: bold;
	}
	.wrap{
		height: 20px;
	}
	.no-float{
		overflow: hidden;
	}
	.order-title{
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	.order-num{
		height: 80px;
		line-height: 80px;
		font-size: 40px;
		text-align: center;
	}
</style>