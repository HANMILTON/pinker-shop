<template>
	<div>
		<div class="header">		
			<h3 class="header-prompt">评论信息</h3>
		</div>
		<!-- <pk-table :data="orderEvalList" :option="orderOpts"></pk-table>	 -->
		<div class="no-eval" v-if="showEmpty">
			暂无评论！
		</div>
		<div class="panel-box col-sm-11" v-for="data in orderEvalList">
			<div class="panel-header">
				<div class="col-sm-6 text-left"><span>{{data.comment_time}}&nbsp;&nbsp;&nbsp;</span><span class="danger-font">&nbsp;&nbsp;消费金额：{{data.money_pay}}元</span></div>
				<div class="col-sm-6 text-right"><span>订单编号：{{data.order_number}}</span></div>
			</div>
			<div class="panel-info">
				<div class="panel-total-score"><strong>总分：</strong><span class="info-font">{{data.comment_score}}分</span></div>
				<el-row :gutter="25">
				  <el-col :md="6" :lg="6" v-for="row in data.comment_score_list">
				  	<div class="eval-list"><div class="eval-name">{{row.comment_item_parent_name}}</div><div class="eval-num">{{row.score_sum}}</div><div class="eval-logo"><i class="el-input__icon el-icon-caret-bottom"></i></div></div>
				  	<ul class="eval-detail-box">
				  		<li class="eval-detail-list" v-for="t in row.sub">
					  		<div class="eval-detail-name">{{t.comment_item_name}}</div>
					  		<!-- <div class="star-list"><div class="start-img" v-for="data in 5"><img src="./heart-select.png"></div></div> -->
					  		<div class="star-list"><div class="start-img" v-for="(data,index) in 5"><img :src="Number(t.score)/2<=index ? 'http://img.findfit.cn/Uploads/www/img/heart.png' : 'http://img.findfit.cn/Uploads/www/img/heart-select.png'"></div></div>
				  		</li>
				  	</ul>
				  </el-col>			  				  				  
				</el-row>				
			</div>
			<div v-if="data.comment_text" :class="!data.id ? 'panel-body': 'hid-panel panel-body'" :style="!data.id ? {height:'auto'} : {height:'0px'}">
				<div class="eval-body" v-for="data2 in data.comment_text.detail">
					<div class="eval-text">{{data2.text}}</div>
					<div class="eval-img"><img v-for="img in data2.images.split(',')" :src="img" height="100"></div>
				</div>
			</div>
			<div v-if="data.comment_text" class="panel-footer" @click="data.id = data.id == 0 ? 1 : 0"><i :class="data.id ? 'el-input__icon el-icon-caret-bottom' : 'el-input__icon el-icon-caret-top'"></i>{{data.id=="0" ? "收起" : "查看详细"}}</div>

		</div>
		<div class="col-sm-12 text-center" v-if="pageCount>1">
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
		userService
	}from "api"
	import{
		orderOpts
	}from "./orderOpt"
	export default{
		data(){
			return{
				orderEvalList:[],
				serachObj:{
					page:1,
					per_page:5
				},
				refreshList:0,
				orderOpts,
				showEmpty:false,
				pageCount:0
			}
		},
		methods:{
			handleCurrentChange(){
				this.refreshList++
			},
			getEvalList(){
				userService.orderCommentList(this.serachObj)
				.then(res => {
					let orderEvalList = res.data.order_comment_list
					if(orderEvalList.length==0){
						this.showEmpty = true
					}else{
						this.showEmpty = false
					}
					// orderEvalList.forEach(function(){})
					this.orderEvalList=orderEvalList
					this.pageCount = res.data.page_count
				})
			}
		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList":"getEvalList"
		}
	}
</script>
<style scoped>
	.no-eval{
		height: 150px;
		line-height: 150px;
		text-align: center;
		font-size: 16px;
	}
	.header{
	    padding: 20px;
	    overflow: hidden;
	    margin-bottom: 20px; 
	}
	.header-prompt{
		width: 80%;
		margin: 0;
		padding: 0;
		float: left;
		text-align: left;	
		font-size: 16px;
		font-weight: bold;			
	}
	.panel-box{
		border-radius: 3px;
		/*overflow: hidden;*/
		padding: 0;
		border: 1px solid #fafafa;
		margin-bottom: 10px;
	}
	.panel-total-score{
		margin-bottom: 15px;
	}
	.panel-header,.panel-footer{
		background: #fafafa;
		height: 40px;
		line-height: 40px;
		padding: 0;
	}
	.panel-footer{
		border-top: 1px solid #ededed; 
		text-align: center;
	}
	.el-col{
		position: relative;
	}
	.panel-body{
		transition: height 1s;
		-webkit-transition: height 1s;
	}
	.hid-panel{
		padding: 0;
		overflow: hidden;
	}
	.panel-info{
		padding: 15px;
	}
	.panel-footer>.el-input__icon{
		position: relative;
		top:0;left:0;
	}
	.eval-list{
		border:1px solid #ededed;
		height: 40px;
		padding: 10px;
		position: relative;
	}
	.eval-name{
		float: left;
		margin-right: 10px;
	}
	.eval-num{
		float: left;
		color: #64a1ff;
	}
	.eval-detail-box{
		width:-webkit-calc(100% - (25px));
		position: absolute;
		top: 55px;
		box-shadow: 0 0 10px #cccccc;
		display: none;
		z-index: 99;
		background: white;
	}
	.eval-list:hover + .eval-detail-box{
		display: block;
	}
	.eval-detail-list{
		height: 30px;
		padding-left: 5%;
	}
	.eval-detail-name{
		width: 30%;
		height: 30px;
		line-height: 30px;
		float: left;
	}
	.star-list{
		width: 65%;
		height: 30px;
		line-height: 30px;
		float: left;
	}
	.start-img,.start-img>img{
		width: 15px;
		height: 15px;
	}
	.start-img{
		float: left;
		margin-right: 5px; 
	}
	.eval-text{
		height: 40px;
		line-height: 40px;
	}
	.eval-img>img{
		margin-right: 10px;
		padding-left: 10px; 
	}
</style>