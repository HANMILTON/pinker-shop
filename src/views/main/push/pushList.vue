<template>
	<div class="pad-left">
	<div class="header">
      <div class='left'><span :class="{'first-tab':showEdit}" @click="showEdit=false">推送列表&nbsp;&nbsp;</span><span v-if="showEdit"><i class="fa fa-angle-right"></i></span><span class="second-tab" v-if="showEdit">&nbsp;&nbsp;推送编辑</span></div>
    </div>
    <div v-if="!showEdit" class="text-center">
    <!-- {{bannerList}} -->
		<el-row :gutter="100">
			<el-col :span="20" :offset="2">
			<el-carousel trigger="click":interval="4000" height="250px" type="card">
			    <el-carousel-item v-for="data in bannerList">
			      	<img v-if="data.content" @click="showEdit=true,selectData=data.content" class="has-content" :src="data.banner_img">
			      	<img v-else class="no-content" :src="data.banner_img">
			    </el-carousel-item>
	  		</el-carousel>
	  		</el-col>
  		</el-row>
		<el-row :gutter="20">
		  	<el-col :span="10">
		 		<el-tabs v-model="selectedId">
			       <el-tab-pane :label="data.text" v-for="(data,index) in selectList"  @click="selectedId = String(index)" :name="String(index)"></el-tab-pane>
			    </el-tabs>
		    </el-col>
	    </el-row>
		<div class="push-box">
					<!-- {{pushList}} -->
			<div v-for="data in pushList" class="push-list">
			<div v-if="data.push_type == 1">
				<div class="push-logo"><img src="./order.png"></div>		
				<div class="push-info"><span class="no-content"><span class="black-font">{{data.content}} </span>用户下了{{calType(data.push_type_2)}}，订单金额为<span class="danger-font"> {{data.title}} </span>元</span></div>
			</div>
			<div v-if="data.push_type == 2">
				<div class="push-logo"><img src="./finance.png"></div>		
				<div class="push-info"><span class="no-content"><span class="black-font">{{data.time_online}} </span>后台操作结账，结账金额为<span class="danger-font"> {{data.title}} </span>元</span></div>
			</div>
			<div v-if="data.push_type == 3">
				<div class="push-logo"><img src="./push.png"></div>		
				<div class="push-info"><span @click="showEdit=true,selectData=data.content" class="has-content" v-if="data.content">{{data.title}}</span><span class="no-content" v-else>{{data.title}}</span></div>
			</div>			
			</div>
		</div>
		<div class="text-center" v-if="pageCount>1">
			<el-pagination
		        @current-change="handleCurrentChange"
		        :current-page.sync="searchObj.page"
		        :page-size="searchObj.per_page"
		        layout="total, prev, pager, next"
		        :page-count="pageCount" 
		        >
	        </el-pagination>			
		</div>    	
    </div>
    <push-detail v-else :data="selectData"></push-detail>

	</div>
</template>
<script>
import{
	userService
}from "api"
import pushDetail from "./pushDetail"
export default{
	components:{
		pushDetail
	},
	data(){
		return {
			refreshList: 0,
			selectedId: "0",
			selectList: [{text:"全部",value:"-1"},{text:"订单",value:"1"},{text:"结算",value:"2"},{text:"通知",value:"3"}],
			bannerList:[],
			searchObj:{
				page:1,
				per_page:8,
				push_type:-1
			},
			pageCount:0,
			pushList:[],
			showEdit: false,
			selectData:{}
		}
	},
	computed:{
		// calType(val){
		// 	switch(val){
		// 		case "1":
		// 			return "套餐订单"
		// 			break;
		// 		case "2":
		// 			return "买单订单"
		// 			break;
		// 		case "3":
		// 			return "预定订单"
		// 			break;										
		// 	}
		// },		
	},
	methods:{
		calType(val){
			switch(val){
				case "1":
					return "套餐订单"
					break;
				case "2":
					return "买单订单"
					break;
				case "3":
					return "预定订单"
					break;										
			}
		},		
		handleCurrentChange(){
			this.refreshList++
		},
		getBannerList(){
			userService.pushBannerList()
			.then(res => {
				if(res.code == 200){
					this.bannerList = res.data
				}
			})
		},
		getPushList(){
			userService.getPushList(this.searchObj)
			.then(res => {
				if(res.code == 200){
					this.pushList = res.data.push_list
					this.pageCount = res.data.page_count
				}
			})	
		},
	    setPushInfo(){
	      let socket = io('http://116.62.68.103:2120');
	      // uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
	      let uid = localStorage.getItem("user_id");
	      let that = this;
	      // socket连接后以uid登录
	      socket.on('connect', function(){
	        socket.emit('login', uid);
	      });
	      // 后端推送来消息时
	      socket.on('new_msg', function(msg){
	      	if(that.selectedId == "0"){
	      		that.refreshList++
	      	}else{
	      		that.selectedId = "0"
	      	}
	      });
	    }
	},
	mounted(){
		this.setPushInfo()
		this.getBannerList()
		this.refreshList++
	},
	watch:{
		"refreshList":"getPushList",
		"selectedId"(newVal){
			this.searchObj.push_type = newVal == "0" ? "-1" : newVal
			this.refreshList++
		},
	}	
}
</script>
<style scoped>
	  .left{
	    padding:6px 12px;
	    font-size: 16px;
	    text-align: left;
	  }
	.header{
		padding: 20px 0;
		text-align: right;
	}
	.header-prompt{
		width: 100%;
		height: 32px;
		line-height: 32px;
		margin: 0;
		/*padding-left: 10px;*/
		float: left;
		text-align: left;	
		font-size: 16px;
		font-weight: bold;			
	}
	.push-box{
		overflow: hidden;
	}
	.push-list{
		height: 50px;
		padding-top: 10px;
	}
	.push-logo,.push-info{
		float: left;
		line-height: 30px;
	}
	.push-logo{
		padding-right: 10px; 
	}
	.push-logo>img{
		width: 20px;
	}
	.no-content{
		cursor:not-allowed;
		color: #8391a5;
	}
	.has-content{
		cursor: pointer;
		color: #333333;
		text-decoration: underline;
	}
	.has-content:hover{
		color: #00a4ed;
	}
	img.no-content,img.has-content{
		height: 250px;
	}
</style>