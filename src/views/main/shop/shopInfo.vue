<template>
	<div class="col-sm-7">
	<!-- {{data}} -->
		<pk-input sm="10" label="餐厅名称">
    		<!-- <input type="text" class="form-control" :value="name" disabled> -->
    		<input type="text" class="form-control" v-model="name" name="" disabled>

    	</pk-input>
    	<pk-input sm="10" label="商家类型">
    		<!-- <input type="text" class="form-control" v-model="data.shop_type_2" name=""> -->
    		<!-- <div class="te"> -->
	    	<div v-for="(data1,index) in shopTypeList" :class="{'pad-right-no':index == shopTypeList.length-1}" class="col-sm-6 pad-left-no">	 
	    	<el-select v-model="data1.id"  @visible-change="setType(true,index)" placeholder="选择商家类型">
				<el-option
				  v-for="item in getList(index)"
				  :label="item.category_name"
				  :value="item.id">
				</el-option>
			  </el-select>   		
	    	</div>
<!-- 	    	<div v-for="(data,index) in shopTypeList" class="col-sm-6">
	    		<select class="form-control" @change="setType($event,index)" v-model="data.id">
	    			<option v-for="data in getList(index)" :value="data.id">{{data.category_name}}</option>
	    		</select>	    		
	    	</div> -->
	    	<!-- </div> -->
    	</pk-input>
    	<pk-input sm="10" label="人均价格">
    		<input type="number" class="form-control" v-model="data.price_average" name="">
    	</pk-input>
    	<pk-input sm="10" label="优惠信息">
    		<input type="text" class="form-control" v-model="data.prompt" name="">
    	</pk-input>     	
    	<pk-input sm="10" label="营业时间">
    		<input type="text" class="form-control" v-model="data.business_time" name="">
    	</pk-input>
    	<pk-input sm="10" label="一句话介绍">
    		<input type="text" class="form-control" v-model="data.brief" name="">
    	</pk-input>    
    	<pk-input sm="10" label="备注">
    		<textarea type="text" class="form-control" v-model="data.remark" name="" rows="3"></textarea>
    	</pk-input>  
    	<pk-input sm="10" label="商家图标">
	    	<div :class="{'border':!data.img_logo}">
	    		<pk-single-img size="small" :img.sync="data.img_logo"></pk-single-img>
	    	</div>
    	</pk-input>   	
    	<pk-input sm="10" label="商家列表图">
	    	<div :class="{'border':!data.img_logo}">
	    		<pk-single-img :img.sync="data.img_first"></pk-single-img>
	    	</div>
    	</pk-input> 
    	<pk-input sm="10" label="商家详情轮播">
	    	<div class="border">
	    		<pk-multi-imgs :imgs.sync="data.img_shop"></pk-multi-imgs>
	    	</div>	
    	</pk-input> 
    	<div class="f-left col-sm-10 btn-pad text-center">
    		<button class="pk-btn-main offset-left-100" @click="submit">提交</button>
    	</div>
	</div>
</template>
<script>
import {
	pkInput,
	pkSingleImg,
	pkMultiImgs
} from "pk"
import {
	userService
}from "api"
import shopInfo from "./shopInfo"
	export default{
		props:["data","name","first","refresh"],
		components:{
			pkInput,
			pkSingleImg,
			shopInfo,
			pkMultiImgs
		},
		data(){
			return {
				categoryList0:[],
				shopTypeList:[{id:""},{id:""}],
				categoryList1:[],
				categoryList2:[],
				categoryList3:[],
				categoryList4:[],
				categoryList5:[],
				categoryList6:[]
			}
		},
		methods:{
			submit(){
				// return console.log(this.data)
				userService.shopDetailSubmit(this.data)
				.then((res) =>{
					if(res.code==200){
						bus.$emit("showAlert",res.msg)
						if(this.first) {
							this.$emit("update:refresh",-1)
						}
					}
				})
			},
			getShopCategorySub(id,index,flag){
				userService.getShopCategorySub(id)
				.then((res) => {
					if(res.code==200){
						let len = res.data.length
						if(len > 0){
							this['categoryList'+index] = res.data
							return
							if(flag){
								this.shopTypeList.push({})
								this.shopTypeList[index]={id:"",category_name:""}						
							}
						}else{
							this['categoryList'+index] = []
						}
					}
				})	
			},
			setType(flag,index){
				console.log(flag,index)
				let value = this.shopTypeList[index].id
				if(!value) return
				index++
				// this.shopTypeList.splice(index)
				if(index==1) this.shopTypeList[1].id=""
				this.data.shop_type_2 = this.data.shop_type_2.split(",").splice(0,index).join()
				// console.log(parentId,value)
				this.data.shop_type_2 +=  ","+value
				console.log(this.data.shop_type_2)
				this.getShopCategorySub(value,index,true);
			},			
			getList(index){
				let str =  "categoryList"+index
				return this[str]
			},			
			initSelect(){
				let selectArr = this.data.shop_type_2.split(",")
				for(let i=0;i<selectArr.length;i++){
					if(i>0) this.shopTypeList[i-1].id = selectArr[i]
					// this['categoryList'+i] = {id:selectArr[i]}
					// if(i!==0 && i==selectArr.length-1){
					// 	this.getShopCategorySub(selectArr[i],i,true)
					// }else{
						this.getShopCategorySub(selectArr[i],i)
					// }
				}
			}			
		},
		mounted(){
			this.initSelect()	
		}		
	}
</script>