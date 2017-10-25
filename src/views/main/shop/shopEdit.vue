<template>
	<div>
    <div class="header">    
      <h3 class="header-prompt">餐厅信息</h3>
    </div>
    <div class="relative">
      <el-tabs v-model="selectedId">
        <el-tab-pane :label="data" :disabled="index>0 && first" v-for="(data,index) in selectArr"  @click='selectedId = String(index)' :name="String(index)"></el-tab-pane>
      </el-tabs> 
      <div class="right" v-if="showStatus"> 
        <div class="status">{{statusTest}}</div>
<!--         <input type="checkbox" @change="changeStatus" name="check" id="checkbox" v-model="status" :true-value="'1'" :false-value="'0'">
        <label for="checkbox"></label> -->
          <pk-switch
            v-model="status"
            on-value="1"
            off-value="0">
          </pk-switch>
      </div>   
    </div>
    <!-- {{editData}} -->
    <shop-info v-if="selectedId==0 && showType" :refresh.sync="refreshList" :first="first" :name="shopName" :data="editData"></shop-info>                                
    <shop-address v-if="selectedId==1" :data="editData"></shop-address>                                
    <shop-foods v-if="selectedId==2"></shop-foods>    
    <shop-detail v-if="selectedId==3" :id="editData.id" :data="editData"></shop-detail>	    		    	    	    	
	</div>
</template>
<script>
import {
	pkInput,
	pkSingleImg,
  pkSwitch
} from "pk"
import {
  userService
}from "api"
import shopInfo from "./shopInfo"
import shopAddress from "./shopAddress"
import shopFoods from "./shopFoods"
import shopDetail from "./shopDetail"

	export default{
		components:{
			pkInput,
			pkSingleImg,
			shopInfo,
      shopAddress,
      shopFoods,
      shopDetail,
      pkSwitch
		},
		data(){
			return {
				selectedId: "0",
				editData: {},
        showType: false,
        shopName: "",
        status: "0",
        statusTest: "",
        showStatus: false,
        first: false,
        selectArr: ["餐厅信息","地址信息","推荐菜","餐厅详情"],
        refreshList: 0
			}
		},
    methods:{
      getDetailRow(){
        userService.getDetailRow()
        .then((res) => {
          if(res.code == 200){
            this.showType = true
            let shopData = res.data
            if(shopData.id){
              this.editData = shopData
              this.showStatus =true
              this.status = shopData.is_online
              this.statusTest = shopData.is_online == 0 ? "已下线" : "在线中" 
              this.first = false
            }else{
              this.editData.shop_type_2 = shopData.validate_info.shop_type 
              this.first = true
            }             
            this.shopName = shopData.validate_info.business_name
          }
        })
      },
      changeStatus(){
        // return console.log(this.status)
        let is_online = this.status

        userService.shopDetailSwitchOnline(is_online)
        .then((res) => {
          bus.$emit("showAlert",res.msg)
          this.getDetailRow()
        })
      }
    },
    mounted(){
      this.refreshList++
    },
    watch:{
      "refreshList": "getDetailRow"
    }
	}
</script>
<style scoped>
  .header{
    padding: 20px 0;
    margin-bottom:20px; 
  }
  .header-prompt{
    width: 80%;
    margin: 0;
    padding-left: 30px;
    float: left;
    text-align: left; 
    font-size: 16px;
    font-weight: bold;      
  }
  .relative{
    position: relative;
    padding-left: 30px;
  }
  .right{
    position: absolute;
    right: 16px;
    top:0;
    padding-top: 9px;
  }
  .status{
    width: 50px;
    position: absolute;
    top: 10px;
    right: 100%;
  }
  .nav{
  	margin-bottom: 20px;
  }
</style>