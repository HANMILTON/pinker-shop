<template>
  <div class="apply">
   <div class="center col-sm-8 col-xs-12">
   	<!-- {{applyData|json}} -->
	<div class="write-list">
		<div class="write-top">商家信息</div>
		<pk-input sm="10" label="商家类型">
			<!-- <input class="form-control" v-model="applyData.shop_type" type="text"></input> -->
			<div class="category">
				<label v-for="data in categoryList">
					<!-- <input type="radio" v-model="applyData.shop_type" name="shop_type" :value="data.id"> -->
					 <el-radio class="radio" v-model="applyData.shop_type" :label="data.id">{{data.category_name}}</el-radio>
				</label>			
			</div>
		</pk-input>
		<pk-input sm="10" label="商家名称">
			<input class="form-control" v-model="applyData.business_name" type="text"></input>
		</pk-input>
		<pk-input sm="10" label="公司名称">
			<input class="form-control" v-model="applyData.company_name" type="text"></input>
		</pk-input>
		<pk-input sm="10" label="餐饮许可证">
			<div class="border">
				<pk-single-img :img.sync="applyData.health_permit"></pk-single-img>
			</div>
		</pk-input>
		<pk-input sm="10" label="营业执照">
			<div class="border">
				<pk-single-img :img.sync="applyData.business_licence"></pk-single-img>
			</div>
		</pk-input>		
		<div class="clear"></div>
	</div>							

	<div class="write-list">
		<div class="write-top">商家信息</div>
		<pk-input sm="10" label="姓名">
			<input class="form-control" v-model="applyData.contact_name" type="text"></input>
		</pk-input>
		<pk-input sm="10" label="身份证号码">
			<input class="form-control" v-model="applyData.id_number" type="text"></input>
		</pk-input>
		<pk-input sm="10" label="手机号">
			<input class="form-control" v-model="applyData.contact_mobile" type="text"></input>
		</pk-input>
<!-- 		<pk-input sm="10" label="图片码">
			<input class="form-control" type="text"></input>
		</pk-input> -->
		<pk-input sm="10" label="验证码">
			<input class="form-control" v-model="applyData.v_code" type="text"></input>
			<!-- <button class="btn btn-info position getCode" @click="getCode">获取验证码</button> -->
			<div class="receive-message">
            	<div class="text-default" v-if="isReceiveMsg">重新获取({{timeCount}}s)</div>
            	<div class="text-primary" v-else @click="getCode">立即获取</div>
          	</div>
		</pk-input>	
		<pk-input sm="10" label="身份证正面">
			<div class="border">
				<pk-single-img :img.sync="applyData.id_card_1"></pk-single-img>
			</div>
		</pk-input>	
		<pk-input sm="10" label="身份证反面">
			<div class="border">
				<pk-single-img :img.sync="applyData.id_card_2"></pk-single-img>
			</div>
		</pk-input>											
      </div>
    </div> 
    <div class="f-left col-sm-10 btn-pad text-center">
    	<button class="pk-btn-main offset-left-100" @click="submit">提交</button>
    </div>
	
   </div>
   
  </div>
</template>
<script>
import {
	pkInput,
	pkPanel,
	pkSingleImg
} from "pk"
import{
	userService
}from "api"
export default{
	props:["data","progress"],
  components:{
  	pkInput,
		pkPanel,
	// applyTop
	pkSingleImg
  },
  data () {
    return {
      applyData:Object.assign({shop_type:""}, this.data),
      isCheck: false,
      categoryList:[],
      isReceiveMsg: false,
      timeCount:60
    }
  },
  methods:{
   submit(){
   	// return console.log(this.applyData)
   	if(!this.applyData.shop_type) return bus.$emit('showAlert', "请选择商家类型","success")
   	if(!this.applyData.business_name) return bus.$emit('showAlert', "请填写商家名称","success")
   	if(!this.applyData.health_permit) return bus.$emit('showAlert', "请上传餐饮许可证","success")
   	if(!this.applyData.business_licence) return bus.$emit('showAlert', "请上传营业执照","success")
    if(!this.applyData.contact_name) return bus.$emit('showAlert', "请填写您的姓名","success")
    if(!this.applyData.id_number) return bus.$emit('showAlert', "请填写您的身份证号","success")
    if(!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.applyData.id_number)) return bus.$emit('showAlert', "您的身份证号格式错误","warning")
    if(!this.applyData.contact_mobile) return bus.$emit('showAlert', "请填写您的手机号","success")
    if(!/^1[34578]\d{9}$/.test(this.applyData.contact_mobile)) return bus.$emit('showAlert', "您的手机号格式错误","warning")
   	if(!this.applyData.v_code) return bus.$emit('showAlert', "请填写手机验证码","success")
   	if(!this.applyData.id_card_1) return bus.$emit('showAlert', "请上传身份证正面","success")
   	if(!this.applyData.id_card_2) return bus.$emit('showAlert', "请上传身份证反面","success")
		userService.apply(this.applyData)
		.then(res => this.submitSuccess(res))
   },
   submitSuccess(res){
   		if(res.code == 200){
   			this.$emit('update:progress', 3)
   		}
   },
   getCode(){
   	userService.smsValidate(this.applyData.contact_mobile)
   	.then(res => {
   		if(res.code == 200){
			bus.$emit('showAlert', res.msg,"success")
			this.countTime()
   		}

   	})
   },
   setList(res){
   	if(res.code == 200){
   		this.categoryList = res.data
   	}
   },
    countTime(){
      this.isReceiveMsg = true
      let timer = setInterval(this.timeChange,1000)
      var that = this
      setTimeout(function(){
        clearInterval(timer)
        that.isReceiveMsg = false
        that.timeCount = 60
      },60000)
    },
    timeChange(){
      this.timeCount--
    }
  },
 mounted(){
 	// console.log(this.data)
 	userService.getCategoryList()
 	.then(res => this.setList(res))
 }
}
</script>
<style scoped>
.center{
	margin: 10px auto;
	float: none; 
	overflow: hidden;
}
.apply{
	overflow: hidden;
	text-align: center;
	background: white;
}
.write-top{
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #cccccc;
	margin-bottom: 20px; 
	text-align: left;
}
.category{
	text-align: left;
}
.code{
	width: 70%;
	border-right:none;
}
.getCode{
	width: 30%;
}
  .top-bar{
    height: 70px;
    border-bottom: 1px solid #cccccc;
    background: #64a1ff;
  }
  .position{
  	width: 30%;
  	position: absolute;
  	right: 0;
  	top:0px;
  	background: #64a1ff;
  }
  .submit{
  	padding-bottom: 20px; 
  }
  .receive-message{
    height: 34px;
    line-height: 34px;
    padding-right: 10px;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>

