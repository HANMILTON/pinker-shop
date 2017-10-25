<template>
	<div>
		<div class="top-info">
			<div class="top-logo"></div>
			<div class="top-list" v-for="data in infoList">
				<div class="top-propmt">{{data.text}}</div>
				<div class="top-num danger-font">{{data.num}}</div>
			</div>	
		</div>	
		<div class="pay-box">
			<div class="pay-list">
				<div class="pay-img"><img src="./card_1.png"></div>
				<div class="pay-hide-box">
					<div class="pay-info-box">
						<div class="pay-reduce" @click="num_first>1 ? num_first-- : ''"><img src="./reduce.png"></div>
						<div class="pay-num"><span class="danger-font">{{num_first}}</span></div>
						<div class="pay-add" @click="num_first++"><img src="./add.png"></div>
					</div>
					<button class="pk-btn-danger pay-btn" @click='payNews(1)'>立即支付</button>
					<div class="pay-money danger-font">¥{{money_first}}</div>					
				</div>
			</div>
			<div class="pay-list">
				<div class="pay-img"><img src="./card_2.png"></div>
				<div class="pay-hide-box">
				<div class="pay-info-box">
					<div class="pay-reduce" @click="num_second>1 ? num_second-- : ''"><img src="./reduce.png"></div>
					<div class="pay-num"><span class="danger-font">{{num_second}}</span></div>
					<div class="pay-add" @click="num_second++"><img src="./add.png"></div>
				</div>
				<button class="pk-btn-danger pay-btn" @click='payNews(2)'>立即支付</button>
				<div class="pay-money danger-font">¥{{money_second}}</div>
				</div>
			</div>
		</div>		
		<check-box v-if="showBox" :show.sync="showBox"></check-box>
<!-- 		<pk-input sm="4" label="消息次数">
			<input type="number" class="form-control" v-model="payObj.num" name="">
		</pk-input>
		<button @click='payNews' class="btn btn-success">消息支付</button> -->
	</div>
</template>
<script>
	import{
		userService,
		payService
	}from "api"
	import{
		pkInput
	}from "pk"
	import checkBox from "./checkBox"
	export default{
		components:{
			pkInput,
			checkBox
		},
		data(){
			return {
				payObj:{
					pay_mode: 2,
					id_related: 0,
					num:1
				},
				restNum: 0,
				buyNum: 0,
				usedNum: 0,
				infoList:[{text:"已购次数",num:"10"},{text:"剩余次数",num:"10"},{text:"已用次数",num:"10"}],
				refreshList:0,
				newUrl:"",
				num_first: 1,
				num_second: 1,
				money_first: 100,
				money_second: 700,
				showBox: false
			}
		},
		methods:{
			getUserLoginInfo(){
				userService.getUserLoginInfo()
				.then(res =>{
					if(res.code == 200){
						this.infoList[0].num = res.data.num_news_buy
						this.infoList[1].num= res.data.num_news
						this.infoList[2].num = res.data.num_news_used
					}
				})
			},
			payNews(type){
				type == 1 ? this.payObj.num = this.num_first : this.payObj.num = this.num_second * 10
				this.newUrl = window.open();
				userService.payOrder(this.payObj)
				.then(res => this.paySuccess(res.data))
			},
			paySuccess(id){
				this.showBox = true
				let newPage = window.location.href.replace("userInfo","pay")+"?orderId="+id
				this.newUrl.location = newPage;
			},
			// setInfo(){
			// 	this.$confirm('您是否已经完成支付?', '支付提示', {
		 //          confirmButtonText: '完成支付',
		 //          cancelButtonText: '取消支付',
		 //          type: 'success'
		 //        }).then(() => {
		 //        	this.refreshList++
		 //        }).catch(() => {
			// 		this.refreshList++
		 //        });
			// }
		},
		mounted(){
			this.refreshList++
		},
		watch:{
			"refreshList":"getUserLoginInfo",
			num_first(num){
				let first_num = Math.floor(num/10)
				let second_num = num%10
				this.money_first = 700*first_num + 100*second_num 
			},
			num_second(num){
				this.money_second = 700 * num
			},
			showBox(newVal){
				if(!newVal){
					this.refreshList++
				}
			}
		}
	}
</script>
<style scoped>
	.top-info{
		padding: 20px 10px;
		overflow: hidden; 
		font-size: 16px;
	}
	.top-logo{
		height: 26px;
		width: 26px;
		background: url("./logo.png");
		background-size: cover;
		margin-right: 30px;
		margin-top: 6px;
		float: left;
	}
	.top-list{
		width: 100px;
		height: 40px;
		line-height: 40px;
		margin-right: 30px;
		float: left;
	}
	.top-propmt{
		width: 70px;
		height: 40px;
		line-height: 40px;
		float: left;
	}
	.top-num{
		width: 30px;
		height: 40px;
		line-height: 40px;
		float: left;
	}
	.pay-box{
		width: 100%;
		overflow: hidden;
		font-size: 16px;
		padding: 10px;
	}
	.pay-list{
		width: 364px;
		height: 220px;
		float: left;
		position: relative;
		margin-right: 80px;
	}
	.pay-img > img{
		width:364px;
	}
	.pay-img{
		border-radius: 9px;
		overflow: hidden;
	}
	.pay-hide-box{
		display: none;
	}
	.pay-list:hover .pay-img{
		box-shadow: 0 0 5px #ddebff;
	}
	.pay-list:hover .pay-hide-box{
		display: block;
	}
	.pay-info-box{
		margin-top: 20px;
		overflow: hidden;
	}
	.pay-reduce,.pay-num,.pay-add{
		float: left;
		height: 20px;
	}
	.pay-reduce>img,.pay-add>img{
		width: 16px;
		height: 16px;
		margin: 2px;
		cursor: pointer;
	}
	.pay-num{
		width: 50px;
		line-height: 20px;
		text-align: center;
		margin-top: 3px;
	}
	.pay-btn{
		position: absolute;
		right: 0;
		top: 151px;
	}
	.pay-money{
		position: absolute;
		right: 0;bottom:0;
	}
</style>