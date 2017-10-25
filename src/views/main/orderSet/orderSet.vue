<template>
	<div>
		<div class="header">		
			<h3 class="header-prompt">预定信息</h3>
		</div>
		<pk-input sm="3" label="普通定金">
			<input type="text" class="form-control" v-model="editData.front_money_normal" name="">
		</pk-input>
		<pk-input sm="3" label="包房定金">
			<input type="text" class="form-control" v-model="editData.front_money_room" name="">
		</pk-input>
		<div class="col-sm-6 text-right">
			<button class="pk-btn-danger" @click="addList">添加时间段</button>
		</div>
		<div>
			<div class="border col-sm-12" v-for="(itemData,index) in editData.items">
			<el-row :gutter="25">
			  <el-col :md="6" :lg="6">
 			  <el-select v-model="itemData.reserve_type" @change="setReserveType(itemData)" placeholder="预约类型">
				<el-option
				  v-for="item in labelArr"
				  :label="item.text"
				  :value="item.id">
				</el-option>
			  </el-select>			  	
			  </el-col>
			  <el-col :md="6" :lg="6">
<!-- 				<el-time-select
				  @change="setStartStr(itemData)"
				  v-model="itemData.time_start"
				  :picker-options="{
				    start: '00:00',
				    step: '00:30',
				    end: '23:30'
				  }"
				  placeholder="开始时间">
				</el-time-select>	 -->
				<el-select v-model="itemData.time_start" @change="setStartStr(itemData)" placeholder="开始时间">
					<el-option
					  v-for="time in timeArr"
					  :label="time.text"
					  :value="time.id">
					</el-option>
				</el-select>		  	
			  </el-col>
			  <el-col :md="6" :lg="6">
	 			  <el-select v-model="itemData.time_end" @change="setEndStr(itemData)" placeholder="结束时间">
					<el-option
					  v-for="time in timeArr"
					  :label="time.text"
					  :value="time.id">
					</el-option>
				  </el-select>			  	
			  </el-col>
			  <el-col :md="4" :lg="4">
			  	<span>是否包厢&nbsp;&nbsp;</span>
				  <pk-switch
				    v-model="itemData.is_room"
				    on-value="1"
				    off-value="0">
				  </pk-switch>
			  </el-col>
			  <el-col :md="2" :lg="2">
			  	<button class="pk-btn-danger-empty" @click="delItem(itemData.id,index)">删除</button>
			  	</el-col>
			</el-row>    		
	    	
			</div>

		</div>
		<div class="col-sm-12 btn-pad text-center">
			<button class="pk-btn-main" @click="submit">提交</button>		
		</div>	
		
	</div>
</template>
<script>
	import{
		pkInput,
		pkSwitch
	}from "pk"
	import{
		orderSetOpts
	}from "./setOpt"
	import{
		userService
	}from "api"
	export default{
		components:{
			pkInput,
			pkSwitch
		},
		data(){
			return {
				editData:{
					// items:[{reserve_type:"",time_start:"",time_end:"",is_room:"0"}]
				},
				orderSetOpts,
				value1:"",
				labelArr:orderSetOpts.labelArr,
				timeArr:orderSetOpts.timeArr,
				refreshList:0
			}
		},
		mounted(){
			// var arr=[];
			// for(var i=0;i<30;i++){
			// 	var id = i<10 ? "0"+i : i
			// 	var text = i>23? "凌晨0"+(i-24) : (i<10 ?  "0"+i : i)
			// 	arr.push({id:id+":00",text:text+":00"})
			// 	arr.push({id:id+":30",text:text+":30"})
			// }
			// console.log(JSON.stringify(arr))
			this.refreshList++
		},
		watch:{
			"refreshList":"getSetInfo"
		},
		methods:{
			setReserveType(data){
				let typeSelectArr=[]
				let itemsArr = this.editData.items
				for(let i=0;i<itemsArr.length;i++){
					// if(!itemsArr[i].time_start||!itemsArr[i].time_end){
					// 	return bus.$emit("showAlert","时间段选择不能为空！","warning")
					// }
					typeSelectArr.push(itemsArr[i].reserve_type)
				}
				if(this.isRepeat(typeSelectArr)){
					data.reserve_type = ""
					return bus.$emit("showAlert","类型选择不能重复！","warning")
				}
			},
			setStartStr(dataObj){
				// console.log(dataObj)
				dataObj.time_end = ""
			},
			setEndStr(dataObj){
				let time_start = dataObj.time_start
				let time_end = dataObj.time_end
				let startNum = Number(time_start.split(":")[0])
				let endNum = Number(time_end.split(":")[0])
				let startMin = Number(time_start.split(":")[1])
				let endMin = Number(time_end.split(":")[1])
				if(!time_end) return
				if(!time_start) {
					dataObj.time_end = ""
					return bus.$emit("showAlert","请先选择开始时间！","warning")
				}
				if(startNum > endNum){
					dataObj.time_end = ""
					return bus.$emit("showAlert","结束时间必须大于开始时间","warning")	
				}else if(startNum == endNum){
					if(startMin == endMin){
						dataObj.time_end = ""
						return bus.$emit("showAlert","时间重复","warning")						
					}else if(startMin > endMin){
						dataObj.time_end = ""
						return bus.$emit("showAlert","结束时间必须大于开始时间","warning")
					}
				}
			},
			getSetInfo(){
				userService.reserveSettingGet()
				.then(res => {
					if(res.code == 200){
						this.editData = res.data
						if(this.editData.items.length == 0){
							this.editData.items.push({reserve_type:"",time_start:"",time_end:"",is_room:"0"})
						}
					}
				})
			},
			submit(){
				let timeSelectArr=[]
				let itemsArr = this.editData.items
				for(let i=0;i<itemsArr.length;i++){
					if(!itemsArr[i].time_start||!itemsArr[i].time_end){
						return bus.$emit("showAlert","时间段选择不能为空！","warning")
					}
					let startIndex = this.getIndex(itemsArr[i].time_start)
					let sendIndex = this.getIndex(itemsArr[i].time_end)
					for(let j=startIndex;j<=sendIndex;j++){
						timeSelectArr.push(j)
					}
				}
				if(this.isRepeat(timeSelectArr)) return bus.$emit("showAlert","选择时间段不能重复","warning")
				let itemStr = JSON.stringify(this.editData.items)
				userService.reserveSettingSubmit(this.editData.front_money_normal,this.editData.front_money_room,itemStr)
				.then(res => {
					if(res.code ==200){
						bus.$emit("showAlert",res.msg)
						this.refreshList++
					}
				})
			},
			isRepeat(arr){ 
				let hash = {}; 
				for(let i in arr) { 
				if(hash[arr[i]]) return true; 
					hash[arr[i]] = true; 
				} 
				return false; 
			} ,
			getIndex(timeStr){
				let firstNum = Number(timeStr.split(":")[0])
				let sencondNum = Number(timeStr.split(":")[1]) == 30 ? 1 : 0
				return firstNum*2+sencondNum
			},
			addList(){
				this.editData.items.push({reserve_type:"",time_start:"",time_end:"",is_room:"0"})
			},
			delItem(id,index){
				if(id){
					userService.reserveSettingDelete(id)
					.then(res => {
						if(res.code == 200){
							this.refreshList++
						}
					})
				}else{
					let len = this.editData.items.length
					if(len > 1){
						this.editData.items.splice(index,1)
					}
				}
			}
		}
	}
</script>
<style scoped>
	.header{
		padding: 20px 0;
		text-align: right;
	}
	.header-prompt{
		width: 100%;
		height: 32px;
		line-height: 32px;
		margin: 0;
		padding-left: 10px;
		float: left;
		text-align: left;	
		font-size: 16px;
		font-weight: bold;			
	}
	.border{
		padding: 10px;
		border: none;
	}
</style>