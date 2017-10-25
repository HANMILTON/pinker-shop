<template>
	<div>
		<div class="col-sm-7">
		<pk-input sm="10" label="账号">
			<input type="text" class="form-control" v-model="editData.admin_mobile" name="">
		</pk-input>
		<pk-input sm="10" label="密码">
			<input type="password" class="form-control" v-model="editData.admin_password" name="" placeholder="密码不可见，可以修改！" :disabled="disable">
		</pk-input>		
		<pk-input sm="10" label="是否修改密码" v-if="data.user_branch_info.id">
			<div class="border">
<!-- 				<input type="radio" name="change" value="0" @click="disable=true">否
				<input type="radio" name="change" value="1" @click="disable=false">是 -->
				<el-radio-group v-model="radio" @change="setDisable">
					<el-radio class="radio" label="0">否</el-radio>
	  				<el-radio class="radio" label="1">是</el-radio>
  				</el-radio-group>
			</div>
		</pk-input>
		<div class="f-left col-sm-10 btn-pad text-center" v-if="!disable">
			<button class="pk-btn-main offset-left-50" @click="submit">提交</button>		
		</div>			
		</div>

	</div>
</template>
<script>
	import{
		pkInput
	}from "pk"
	import{
		userService
	}from "api"
	export default{
		props:["data","show"],
		components:{
			pkInput
		},
		data(){
			return{
				editData:{
					admin_mobile:""
				},
				radio:"0",
				disable: false
			}
		},
		methods:{
			submit(){
				if(!/^1[34578]\d{9}$/.test(this.editData.admin_mobile)) return bus.$emit("showAlert","手机号格式错误！","warning")
				if(!this.editData.admin_password) return bus.$emit("showAlert","密码不能为空","warning")
				this.editData.shop_branch_id = this.data.id
				userService.shopBranchAdminSubmit(this.editData)
				.then(res => {
					if(res.code==200){
						bus.$emit("showAlert",res.msg,"success")
						this.show.show = true
						this.show.refresh ++
					}
				})
			},
			setDisable(){
				this.radio == 1 ? this.disable = false : this.disable = true
			}
		},
		mounted(){
			if(this.data.user_branch_info.id){
				this.editData.admin_mobile = this.data.user_branch_info.mobile
				this.disable  = true
			}
		}
	}
</script>