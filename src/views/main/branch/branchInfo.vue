<template>
	<div>
		<div class="col-sm-9">
			<pk-input sm="6" label="名称">
	    		<input type="text" class="form-control" v-model="data.shop_name" name="">
	    	</pk-input>
			<pk-input sm="6" label="省份">
	    		<el-select v-model="data.sheng"  @change="getAreaList(1,data.sheng,true)" placeholder="选择省份">
					<el-option
					  v-for="item in proList"
					  :label="item.sheng"
					  :value="item.id">
					</el-option>
				  </el-select> 
	    	</pk-input>
	    	<pk-input sm="6" label="市">
			  <el-select v-model="data.shi"  @change="getAreaList(2,data.shi,true)" placeholder="选择地级市">
				<el-option
				  v-for="item in cityList"
				  :label="item.shi"
				  :value="item.id">
				</el-option>
			  </el-select> 
	    	</pk-input>
	    	<pk-input sm="6" label="县（区）">   
			  <el-select v-model="data.xian"  @change="getAreaList(3,data.xian,true)" placeholder="选择县（区）">
				<el-option
				  v-for="item in districtList"
				  :label="item.xian"
				  :value="item.id">
				</el-option>
			  </el-select>    				
	    	</pk-input>
	     	<pk-input sm="6" label="商圈">
			  <el-select v-model="data.shangquan_id"  @change="setAddress(data.shangquan_id)" placeholder="选择商圈">
				<el-option
				  v-for="item in busList"
				  :label="item.shangquan"
				  :value="item.id">
				</el-option>
			  </el-select>     		   		
	    	</pk-input> 
	    	<pk-input sm="6" label="地址">
	    		<input type="text" class="form-control" @change="searchByStationName()" v-model="data.address" name="">
	    		<input type="hidden" v-model="data.senderLatitude" value="1">
				<input type="hidden" v-model="data.senderLongitude" value="1">	
	    	</pk-input>
	    	<pk-input sm="6" label="楼层">
	    		<input type="text" class="form-control" v-model="data.floor" name="">
	    	</pk-input>    
	    	<pk-input sm="6" label="电话 021-">
	    		<input type="text" class="form-control" v-model="data.tel" name="">
	    	</pk-input>  
	    	<pk-input sm="6" label="联系人">
				<input type="text" class="form-control" v-model="data.contacter" name="">
	    	</pk-input>    
	    	<pk-input sm="6" label="WIFI名称">
				<input type="text" class="form-control" v-model="data.wifi_name" name="">
	    	</pk-input> 
	    	<pk-input sm="6" label="WIFI密码">
				<input type="text" class="form-control" v-model="data.wifi_password" name="">
	    	</pk-input> 
	    	<pk-input sm="6" label="停车场">
				<input type="text" class="form-control" v-model="data.park_address" name="">
	    	</pk-input> 
	    	<pk-input sm="6" label="停车场备注">
				<input type="text" class="form-control" v-model="data.park_remark" name="">
	    	</pk-input> 	    		 
	    	<div class="f-left col-sm-12 btn-pad text-center">
	    		<button class="pk-btn-main offset-left-50" @click="submit">提交</button>
	    	</div>
    	</div>
    	<div class="mapBox">
		<!-- <pk-input label="经纬度" sm="6"> -->
			<input type="hidden" class="form-control" v-model="positionInfo" disabled>
		<!-- </pk-input>	 -->
			<div id="container"></div>
		</div>
	</div>
</template>
<script>
import {
	pkInput,
	pkSingleImg
} from "pk"
import {
	userService,
	publicService
}from "api"
	export default{
		props:["data","show"],
		components:{
			pkInput,
			pkSingleImg,
		},
		data(){
			return {
				proList:[],
				cityList:[],
				districtList:[],
				busList:[],
				positionInfo:"",
				proName:"",
				cityName:"",
				districtName:"",
			}
		},
		methods:{
			getList(level){
				switch(level){
					case 1:
						return this.proList
						break;
					case 2:
						return this.cityList
						break;
					case 3:
						return this.districtList
						break;												
				}
			},
			getAreaList(level,parent_id,flag){
				var id = parent_id
				if(!id) return
				if(flag){
					let str = ""
					// console.log(str)
					let dataArr = this.getList(level)
					for(let i=0;i<dataArr.length;i++){
						if(dataArr[i].id == id){
							if(level == 1){
								str = dataArr[i].sheng
							}else if(level == 2){
								str = dataArr[i].sheng + dataArr[i].shi
							}else if(level == 3){
								str = dataArr[i].sheng + dataArr[i].shi + dataArr[i].xian
							}
						}
					}
					this.data.address = str
					this.searchByStationName()					
				}
				publicService.getCitySub(level,id)
				.then((res) => {
					if(res.code==200){
						if(level==1){
							this.cityList = res.data	
							if(flag){
								this.districtList = []	
								this.data.shi = ""	
								this.data.xian = ""
								this.data.shangquan_id = ""	
								this.busList = []								
							}
						}else if(level==2){
							this.districtList = res.data
							if(flag){
								this.data.xian = ""
								this.data.shangquan_id = ""	
								this.busList = []
							}
						}else{
							this.busList = res.data
						}
					}
				})
			},
			setAddress(id){
				let str = ""
				for(let i=0;i<this.busList.length;i++){
					if(this.busList[i].id == id){
						this.data.address = this.busList[i].sheng + this.busList[i].shi + this.busList[i].xian　+　this.busList[i].shangquan
					}
				}
				this.searchByStationName()
			},
			searchByStationName(){
			    window.map.clearOverlays();//清空原来的标注
			    let keyword = this.data.address;
			    if(!keyword) return
			    var that = this
			    window.localSearch.setSearchCompleteCallback(function (searchResult) {
			        let poi = searchResult.getPoi(0);
			        that.positionInfo = poi.point.lng + "," + poi.point.lat;
			        that.data.y = poi.point.lat
			        that.data.x = poi.point.lng
			        map.centerAndZoom(poi.point, 13);
			        let marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
			        map.addOverlay(marker);
			        let content = keyword + "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat;
			        let infoWindow = new BMap.InfoWindow("<p style='font-size:12px;'>" + content + "</p>");
			        marker.openInfoWindow(infoWindow)
			        // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
			    });
			    localSearch.search(keyword);
			},			
			submit(){
				this.data.id ? this.data.shop_branch_id = this.data.id : this.data.shop_branch_id = 0
				userService.shopBranchSubmit(this.data)
				.then((res) =>{
					if(res.code==200){
						bus.$emit("showAlert",res.msg,"success")
						this.show.show = true
						this.show.refresh++
					}
				})
			},
			initCity(){
				if(this.data.address) this.searchByStationName()
				publicService.getCityTop()
				.then((res) => {
					if(res.code==200){
						this.proList = res.data
					}
				})
				if(this.data.sheng) {
					this.getAreaList(1,this.data.sheng)
				}
				if(this.data.shi){
					this.getAreaList(2,this.data.shi)
				} 
				if(this.data.xian){
					this.getAreaList(3,this.data.xian)
				}
			},
			initData(){
				if(!this.data.sheng || this.data.sheng == "0") this.data.sheng=""
				if(!this.data.shi || this.data.shi == "0") this.data.shi=""
				if(!this.data.xian || this.data.xian == "0") this.data.xian=""
				if(!this.data.shangquan_id || this.data.shangquan_id == "0") this.data.shangquan_id=""
			}
		},
		mounted(){
			this.initData()
			// 百度地图
			window.map = new BMap.Map("container");
		    map.centerAndZoom("上海", 12);
		    map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
		    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
		    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
		    window.localSearch = new BMap.LocalSearch(map);
		    localSearch.enableAutoViewport();
		    this.initCity()	
		}		
	}
</script>
<style scoped>
	#container,.mapBox{ 
    height: 260px; 
    overflow:hidden;
    margin-top:20px; 
    position: fixed;
    bottom:0;
    right: 0;
	}
	.mapBox{
		width: 24%;
	}
	#container{
		width: 100%;
	}
	.positionInfo{
		position: absolute;
		right: -50px;
		top:20px;
	}
</style>