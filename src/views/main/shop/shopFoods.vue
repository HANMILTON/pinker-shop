<template>
	<div class="col-sm-12">
  <!-- <button class="btn btn-info"> 添加推荐菜</button> -->
  <div class="food-top">
    <div class="food-right">
      <button class="pk-btn-danger" @click="addFoods()">添加推荐菜</button>
    </div>
  </div>
  <div v-for="(data,index) in foodLists" class="col-sm-4">
    <div class="border border-box">
        <pk-input sm="12" label="名称">
          <input type="text" class="form-control" v-model="data.dish_name" name="">
        </pk-input>
        <pk-input sm="12" label="图片">
          <div class="border">
            <pk-single-img size="width" :img.sync="data.dish_img"></pk-single-img>
          </div>
        </pk-input> 
        <pk-input sm="12" label="推荐理由">
          <textarea class="form-control" v-model="data.recommend_words" name=""></textarea>
        </pk-input>     
      <span class="delete" @click="deleteFood(data.id,index)">
        <i class="el-icon-circle-cross"></i>
      </span> 
      </div> 

<!--       <div class="btn-box col-sm-12 text-center">
        <button class="pk-btn-main-small" @click="updateFood(data,'update')">保存</button>    
        <span class="danger-font" @click="updateFood(data,'del',index)">删除</span>         
      </div> -->
  </div>
    <div class="btn-box col-sm-12 text-center" v-if="foodLists.length>0">
      <button class="pk-btn-main" @click="submit()">提交</button>
    </div>
  </div>
</template>
<script>
import {
	pkInput,
	pkSingleImg
} from "pk"
import{
  userService
} from "api"
import shopInfo from "./shopInfo"
	export default{
		components:{
			pkInput,
			pkSingleImg,
			shopInfo
		},
		data(){
			return {
				foodLists:[],
        // refresh
			}
		},
    methods:{
      getFoodList(){
        userService.shopRecommendList()
        .then((res) => {
          if(res.code==200){
            this.foodLists = res.data
          }
        })
      },
      addFoods(){
        this.foodLists.push({id:"0"})
      },
      deleteFood(id,index){
          if(id!=0){
            userService.shopRecommendDelete(id)
            .then(res => this.updateList(res))            
          }else{
            this.foodLists.splice(index,1)
          }
      },
      submit(){
        userService.shopRecommendSubmit(this.foodLists)
        .then(res => this.updateList(res))
      },
      updateList(res){
        if(res.code==200){
          bus.$emit("showAlert",res.msg)
          this.getFoodList()
        }
      }
    },
    mounted(){
      this.getFoodList()
    }
	}
</script>
<style scoped>
  .wrap{
    padding-top: 20px;
    float: left;
  }
  .col-sm-4{
    margin-bottom: 30px;
  }
  .border-box{
    padding: 25px 0 20px; 
    box-shadow: 0 0 5px #ddebff;
    position: relative;
  }
  .border-box:hover > .delete{
    display: block;
  }
  .food-top{
    text-align: right;
    padding-bottom: 20px; 
  }
  .btn-box{
    padding: 20px 0;
  }
  .delete{
    position: absolute;
    top: 0px;
    right: 10px;
    cursor: pointer;
    display: none;
    color: red;
  }
</style>