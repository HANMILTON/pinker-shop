<template>
	<div>
	<div class="col-sm-7">
		<pk-input sm="12" label="套餐名称">
			<input type="text" class="form-control" v-model="data.set_name" name="">
		</pk-input>
		<pk-input sm="12" label="套餐图片">
    	<div class="border">
    		<pk-single-img :img.sync="data.set_img"></pk-single-img>
    	</div>
		</pk-input>		
		<pk-input sm="12" label="套餐介绍">
			<input type="text" class="form-control" v-model="data.set_description" name="">
		</pk-input>
		<pk-input sm="12" label="适合人数">
			<input type="number" class="form-control" v-model="data.suitable_number"></input>
		</pk-input>
		<pk-input sm="12" label="套价价格">
			<input type="number" class="form-control" v-model="data.set_price" name="">
		</pk-input>
		<pk-input sm="12" label="原先价格">
			<input type="number" class="form-control" v-model="data.set_price_old" name="">
		</pk-input>
		<pk-input sm="12" label="时间开始">
			<!-- <pk-datetime :value.sync="data.time_start"></pk-datetime> -->
			    <el-date-picker
			    @change="dateChange($event,'time_start')"
      v-model="data.time_start"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
		</pk-input>
		<pk-input sm="12" label="时间截止">
			<!-- <pk-datetime :value.sync="data.time_end"></pk-datetime> -->
			    <el-date-picker
			    @change="dateChange($event,'time_end')"
      v-model="data.time_end"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
		</pk-input>		
		<pk-input sm="12" label="备注">
			<textarea class="form-control" v-model="data.set_remark"></textarea>
		</pk-input>				
		<pk-input sm="12" label="退款">
			<div class="border pad-left">
				  <el-checkbox-group v-model="refund_select_list" @change="typeChange">
			    <el-checkbox v-for="data in refund_list" :label="data.val" :key="data.text">{{data.text}}</el-checkbox>
			  </el-checkbox-group>
			</div>
		</pk-input>			
		<div class="col-sm-12 btn-pad text-center"><button class="pk-btn-main" @click="submit">提交</button></div>
		</div>
	</div>
</template>
<script>
	import {
		pkInput,
		pkSingleImg,
		pkDatetime
	} from "pk"
	import{
		userService
	}from "api"	
	export default{
		props:["id","show","data"],
		components:{
			pkInput,
			pkSingleImg,
			pkDatetime
		},
		data (){
			return {
				refund_select_list:[],
				refund_list:[{text:"随时退",val:"1"},{text:"过期退",val:"2"}]
			}
		},
		methods:{
			typeChange(val){
				this.data.refund_type = val.join(",")
			},
			dateChange(val,key) {
			    this.data[key] = val
			},
			submit(){
				// return console.log(this.id)
				if(!this.data.time_start) return bus.$emit("showAlert","请选择套餐开始的时间！")
				if(!this.data.time_end) return bus.$emit("showAlert","请选择套餐结束的时间！")
				this.data.set_id = this.id ? this.id : 0
				userService.munuSubmit(this.data)
				.then((res) => {
					if(res.code == 200){
						this.$emit('update:show',false)
						bus.$emit("showAlert",res.msg,"success")
					}
				})
			},
			checkType(){
				let type = this.data.refund_type
				this.refund_select_list = type && type != 0 ? type.split(",") : []
				// alert(type)
			}
		},
		mounted(){
			let that = this
			setTimeout(function(){
				that.checkType()
			},100)
		}

	}
</script>