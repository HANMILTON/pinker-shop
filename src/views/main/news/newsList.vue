<template>
	<div>
	<div class="header">
      <div class='left'><span :class="{'first-tab':showEdit}" @click="showEdit=false">消息列表&nbsp;&nbsp;</span><span v-if="showEdit"><i class="fa fa-angle-right"></i></span><span class="second-tab" v-if="showEdit">&nbsp;&nbsp;消息编辑</span></div>
      <div class='f-right' v-if="!showEdit"><button class="pk-btn-danger" @click="showEdit=true,selectData={}">添加消息</button></div>
    </div>
    <div v-if="!showEdit" class="news-box">
    	<div class="col-sm-12 status-box">
    	    <el-tabs v-model="selectedId">
        		<el-tab-pane :label="data.text" v-for="data in selectArr"  @click='selectedId = data.status' :name="data.status"></el-tab-pane>
      		</el-tabs> 
      		<div class="no-news" v-if="showEmpty">
    			暂无消息，快去添加吧！
    		</div>
    		<div v-else class="news-list col-xs-12 col-sm-3 col-lg-3" v-for="data in newsList">
    		<div class="new-box">
		    	<div class="news-header">
    				<!-- <div class="news-time">{{data.time_online}}</div> -->
    			</div>
			    <div class="news-title">
					{{data.title}}
				</div>
	    		
    			<div class="news-body">				
				   <el-carousel height="135px">
				      <el-carousel-item v-for="item in data.img.split(',')" :key="item">
				        <img class="news-img" :src="item">
				      </el-carousel-item>
				    </el-carousel>
    				<div class="news-description text-left">
    					{{data.description}}
    				</div>
    				<div v-if="data.is_suggest == 1" class="news-description text-left">
    					上次置顶：{{data.time_top}}
    				</div>
    			</div>

    			<div class="new-footer">
    				<ul v-if="data.is_online == 0">
    					<li class="f-left text-center col-sm-4" @click="editNews(data)">编辑</li>
    					<li class="f-left text-center col-sm-4" @click="onlineNews(data.id)">上线</li>
    					<li class="f-left text-center col-sm-4" @click="deleteNews(data.id)">删除</li>
    				</ul>
    				<ul v-else>
    					<li class="f-left text-center col-sm-4" @click="editNews(data)">查看</li>
						<li class="f-left text-center col-sm-4" @click="dealTopNews(data.id)">置顶</li>
    					<li class="f-left text-center col-sm-4" @click="deleteNews(data.id)">删除</li>
    				</ul>
    			</div>    			
    		</div>

    		</div>
    	<div class="col-sm-12 text-center" v-if="pageCount>1">
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
    </div>    					

    <news-edit v-else :data="selectData" :show.sync="showEdit" :selected-id.sync="selectedId" :refresh.sync="refreshList"></news-edit>
<!--     <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
      <el-button>下边</el-button>
    </el-tooltip> -->
	</div>
</template>
<script>
import{
	userService
}from "api"
import newsEdit from "./newsEdit"
	export default{
		components:{
			newsEdit
		},
		data() {
			return {
				newsList:[],
				showEdit: false,
				selectData:{},
				refreshList:0,
				showEmpty: false,
				restTime: 0,
				selectedId:"1",
				searchObj:{
					is_online: "1",
					page:1,
					per_page: 4
				},
				pageCount:0,
				selectArr: [{text:"上线中",status:"1"},{text:"下线中",status:"0"}],
			}
		},
		mounted(){
			this.refreshList++
			this.getUserLoginInfo()
		},
		methods:{
			handleCurrentChange(){
				this.refreshList++
			},
			getUserLoginInfo(){
				userService.getUserLoginInfo()
				.then(res =>{
					if(res.code == 200){
						this.restTime = res.data.num_news
					}
				})
			},
			getNewsList(){
				userService.getNewsList(this.searchObj)
				.then((res) =>{
					if(res.code == 200){
						let newsList = res.data.news_list
						// console.log(newsList)
						if(newsList.length == 0){
							this.showEmpty = true
						} else{
							this.showEmpty = false
						}
						this.newsList = newsList
						this.pageCount = res.data.page_count
						// this.newsList = {onlineList:[],offlineList:[]}
						// let that = this
						// newsList.forEach(function(data){
						// 	if(data.is_online == 1){
						// 		that.newsList.onlineList.push(data)
						// 	}else{
						// 		that.newsList.offlineList.push(data)
						// 	}
						// })
						// setTimeout(function(){
						// 	var mySwiper = new Swiper('.swiper-container', {
						// 		loop:true
						// 	})
						// },0)
					}
				})
			},
			dealTopNews(id){
				let userOpt = ""
				if(this.restTime == 0){
					var isBuy = ""
					this.$confirm('您已经没有置顶次数了, 是否购买?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	this.$router.push('/userInfo')
			        }).catch(() => {

			        });

				}else{
					this.$confirm('置顶需要消耗置顶次数，是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	this.setTopNews(id)
			        }).catch(() => {

			        });
				}
	
			},		
			setTopNews(id){
				userService.setNewsTop(id)
				.then((res) => {
					if(res.code == 200){
						bus.$emit("showAlert",res.msg)
						this.restTime = res.data
						this.refreshList++
					}
				})
			},	
			editNews(data){
				this.selectData = data
				this.showEdit = true
			},
			onlineNews(id){
				userService.newsSwitchOnline(id,1)
				.then((res) => {
					console.log(res)
					if(res.code == 200){
						this.refreshList++
					}
				})
			},
			deleteNews(id){
				userService.newsDelete(id)
				.then((res) => {
					if(res.code==200){
						this.refreshList++
					}
				})
			}
		},
		watch:{
			"refreshList":"getNewsList",
			selectedId(newVal){
				this.searchObj.is_online = newVal
				this.refreshList++
			}
		}
	}
</script>
<style scoped>
	.no-news{
		height: 150px;
		line-height: 150px;
		text-align: center;
		font-size: 16px;
	}
  .header{
    padding-top:20px;
    overflow: hidden;
    font-weight: bold;
  }
  .left{
    padding:6px 12px;
    font-size: 16px;
    float:left;
  }
  .news-bar{
  	cursor: pointer;
  }
  .f-right{
  	padding:6px;
  	cursor: pointer;
  }
  .bold{
  	font-weight: bold;
  	font-size: 16px;
  }
  .nav{
  	margin-bottom: 20px;
  }
  .new-box{
  	padding-top: 10px;
  	box-shadow: 0 0 10px #ddebff;
  	position: relative;
  }  
/*.swiper-container{
	width: 100%;
	height: 135px;
	overflow: hidden;
}*/
  .news-list{
  	font-size: 12px;
	padding: 10px;
  }
  .news-header{
  	position: absolute;
  	bottom: -34px;
  	height: 34px;
  	padding: 10px 6px 6px;
  }
  .news-img{
  	width: 100%;
  }
  .news-description{
  	height: 40px;
  	line-height: 40px;
  }
	.news-body{
		padding: 10px 20px 0;
		border-bottom: 1px solid #ededed;
	}
	.news-title{
		font-weight: bold;
		font-size: 14px;
		text-align: left;
		padding-left: 20px;
	}
	ul{
		margin: 0;
	}
	.new-footer{
		height: 40px;
		padding-top: 12px;
	}
	.new-footer li{
		border-right: 1px solid #ededed; 
		cursor: pointer;
	}
	.new-footer li:hover{
		color: #3DA8F5;
	}
	.new-footer li:last-of-type{
		border-right: none; 
	}
	.news-time{
		color: #333333;
		padding: 0;
		text-align: center;
	}
	.news-status{
		width: 50px;
		height: 16px;
		line-height: 16px;
		border:1px solid #ededed;
		color: #bfbfbf;
		-webkit-text-size-adjust:none;
		font-size: 12px;
	}
	.select{
		border:1px solid #aac9ff;
		color: #aac9ff;
	}
	.news-status span{
		transform:scale(0.8);
		display: inline-block;
	}
	.text-default{
		font-size: 16px;
	}
	.on-rect,.off-rect{
		height: 40px;
		line-height: 40px;
		position: relative;
		padding-left: 10px;
		font-size: 16px;
		margin-bottom: 5px;
	}
	.on-rect:before,.off-rect:before{
		content: " ";
		display:block;
		width: 5px;
		height: 16px;	
		position: absolute;
		top:12px;
		left: 0;
	}
	.on-rect:before{
		background: #64a1ff;
	}
	.off-rect:before{
		background: #fb4945;
	}	
	.status-box{
		margin-bottom: 20px;
	}	
</style>