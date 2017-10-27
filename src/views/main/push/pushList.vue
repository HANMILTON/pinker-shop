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
			       <el-tab-pane :label="data" v-for="(data,index) in selectList"  @click="selectedId = String(index+1)" :name="String(index+1)"></el-tab-pane>
			    </el-tabs>
		    </el-col>
	    </el-row>
		<div class="push-box">
					<!-- {{pushList}} -->
			<div v-for="data in pushList" class="push-list">
				<div class="push-logo"><img v-if="data.push_type == 1" src="./order.png"><img v-else-if="data.push_type == 2" src="./finance.png"><img v-else-if="data.push_type == 3" src="./push.png"></div>
				<div class="push-info"><span @click="showEdit=true,selectData=data.content" class="has-content" v-if="data.content">{{data.title}}</span><span class="no-content" v-else>{{data.title}}</span></div>
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
			selectedId: "1",
			selectList: ["全部","订单","结算","通知"],
			bannerList:[],
			searchObj:{
				page:1,
				per_page:8,
			},
			pageCount:0,
			pushList:[],
			showEdit: false,
			selectData:{}
		}
	},
	methods:{
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
		}
	},
	mounted(){
		this.getBannerList()
		this.refreshList++
	},
	watch:{
		"refreshList":"getPushList"
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