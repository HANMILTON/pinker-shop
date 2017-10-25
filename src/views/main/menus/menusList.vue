<template>
	<div>
	<div class="header">
      <div class='left'><span :class="{'first-tab':showEdit}" @click="showEdit=false">套餐列表&nbsp;&nbsp;</span><span v-if="showEdit"><i class="fa fa-angle-right"></i></span><span class="second-tab" v-if="showEdit">&nbsp;&nbsp;套餐编辑</span></div>
      <div class='f-right' v-if="!showEdit"><button class="pk-btn-danger" @click="showEdit=true,selectData=''">添加套餐</button></div>
    </div>
    <div v-if="!showEdit" class="menus-box">
    	<div class="col-sm-12 status-box">
    	   	<el-tabs v-model="selectedId">
        		<el-tab-pane :label="data.text" v-for="data in selectArr"  @click='selectedId = data.status' :name="data.status"></el-tab-pane>
      		</el-tabs> 
    		<div class="no-menu" v-if="showEmpty">
			暂无套餐，快去添加吧！
			</div>
    		<div class="menus-list col-xs-12 col-sm-4 col-lg-3" v-for="data in menusList">
    		<div class="menu-box">
    			<div class="menus-header">
    				<div class="menus-status f-left">{{data.set_name}}</div>
    				<div class="menus-status f-right danger-font">{{data.set_price}}元</div>
    			</div>
    			<div class="menus-body">
    				<img class="menus-img" :src="data.set_img">
    				<div class="menus-description text-left">
    					{{data.set_description}}
    				</div>
    			</div>
    			<div class="menus-footer">
    				<ul v-if="data.is_online == 0">
    					<li class="f-left col-sm-4" @click="editmenus(data)">编辑</li>
    					<li class="f-left col-sm-4" @click="onlinemenus(data.id,1)">上线</li>
    					<li class="f-left col-sm-4" @click="deletemenus(data.id)">删除</li>
    				</ul>
    				<ul v-else>
    					<li class="f-left col-sm-6" @click="editmenus(data)">查看</li>
    					<li class="f-left col-sm-6" @click="onlinemenus(data.id,0)">下线</li>
    				</ul>
    			</div>    			
    		</div>
    		</div>
    	</div>
    </div>
    <menus-edit v-else :id="selectData" :show.sync="showEdit" :refresh.sync="refreshList"></menus-edit>
	</div>
</template>
<script>
import{
	userService
}from "api"
import Vue from 'vue'

import menusEdit from "./menusEdit"
	export default{
		components:{
			menusEdit
		},
		data() {
			return {
				menusList:[],
				showEdit: false,
				selectData:"",
				refreshList:0,
				showEmpty: false,
				selectedId:"1",
				searchObj:{
					is_online: "1"
				},
				selectArr: [{text:"上线中",status:"1"},{text:"下线中",status:"0"}],				
			}
		},
		mounted(){
			this.refreshList++
		},
		methods:{
			getmenusList(){
				// console.log(this)
				userService.getMenuList(this.searchObj)
				.then((res) =>{
					if(res.code == 200){
						let menusList = res.data
						if(menusList.length == 0){
							this.showEmpty = true
						} else{
							this.showEmpty = false
						}
						this.menusList = menusList
					}
				})
			},
			editmenus(data){
				this.selectData = data.id
				this.showEdit = true
			},
			onlinemenus(id,status){
				userService.menuOnline(id,status)
				.then((res) => {
					if(res.code==200){
						bus.$emit("showAlert",res.msg,"success")
						this.refreshList++
					}
				})
			},
			deletemenus(id){
				userService.menuDelete(id)
				.then((res) => {
					if(res.code==200){
						bus.$emit("showAlert",res.msg,"success")
						this.refreshList++
					}
				})
			}
		},
		watch:{
			"refreshList":"getmenusList",
			"showEdit"(newval){
				if(newval == false){
					this.refreshList++
				}
			},
			selectedId(newVal){
				this.searchObj.is_online = newVal
				this.refreshList++
			}
		}
	}
</script>
<style scoped>
	.no-menu{
		height: 150px;
		line-height: 150px;
		text-align: center;
		font-size: 16px;
	}
  .header{
    padding-top:20px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .left{
    padding:6px 12px;
    font-size: 16px;
    float:left;
    font-weight: bold;
  }
  .nav{
  	margin-bottom: 20px;
  }
  .menus-list{
  	font-size: 12px;
  	/*margin-top: 10px; */
  	padding: 10px;
  	
  }
  .menu-box{  	
  	box-shadow: 0 0 10px #ddebff;
  }
  .menus-header{
  	height: 30px;
  	padding: 10px 20px;
  	line-height: 27px;
  }
  .menus-img{
  	width: 100%;
  	height: 135px;
  }
  .menus-description{
  	line-height: 20px;
  	padding-top: 10px;
  }
	.menus-body{
		padding: 15px;
		border-bottom: 1px solid #ededed;
	}
	.menus-footer{
		height: 40px;
   	 	padding-top: 12px;
   	 	text-align: center;
	}
	.menus-footer li{
		border-right: 1px solid #ededed; 
		cursor: pointer;
	}
	.menus-footer li:hover{
		color: #3DA8F5;
	}
	.menus-footer li:last-of-type{
		border-right: none; 
	}
	.hover{
		cursor: pointer;
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