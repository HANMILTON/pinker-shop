<template>
  <div class="control-group check-box">
  <!-- <div class="control-group check-box"> -->
    <div class="check-prompt">点击图中的{{checkName}}获取验证码</div>
    <div class="check-imgs">
      <span class="col-sm-2" v-for="(data, index) in checkObj.checkList" @click="checkGoods(index)">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-'+data.iconName"></use>
        </svg>
      </span>
    </div>
    <span class="refresh" @click="refresh"><i class="fa fa-refresh fa-fw"></i></span>
    <div class="check-mask" v-if="isImgCheck === true">
      <span><i class="text-primary fa fa-check-circle-o fa-fw"></i>图片验证成功</span>
    </div>
    <div class="check-fail" v-if="isImgCheck === false"><i class="fa fa-warning fa-fw"></i>图片验证失败</div>
  </div>
</template>
<script>
  import checkList from "../js/checkList"
  export default{
    props:["checkStatus"],
    data() {
      return {
        checkName: "",
        checkList,
        isImgCheck: '',
        checkObj: {},
        checkIndex: 0,
      }
    },
    methods:{
      refresh(){
        let listIndex = Math.floor(Math.random()*6);
        this.checkObj = this.checkList[listIndex]
        this.checkIndex = Math.floor(Math.random()*5);
        this.checkName = this.checkObj.checkList[this.checkIndex].chineseName
      },
      checkGoods(index){
        if (this.checkIndex == index){
          this.isImgCheck = true
          this.$emit('update:checkStatus', true)
          this.disabled = true
        }else{
          this.$emit('update:checkStatus', false)
          this.isImgCheck = false
          this.refresh()
        }
      },
    },
  mounted(){
    this.refresh()
  },
  }
</script>
<style scoped>
    .check-box{
    border: 1px solid #cccccc;
    margin-bottom: 30px; 
    border-radius: 4px; 
    padding-bottom: 10px; 
    padding-left: 10px;
    text-align: left;
    position: relative;
  }
  .check-prompt{
    padding: 10px 0;
  }
  .check-imgs{
    width: 80%;
    overflow: hidden;
    font-size: 22px;
  }
  .refresh{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 22px;
    cursor: pointer;
  }
  .check-imgs span{
    padding: 3px 0;
    text-align: center;
    margin-right: 7px; 
  }
  .refresh:hover{
    color: #3DA8F5;
  }
  .icon{
    cursor: pointer;
  }
  .icon:hover{
    color: #3DA8F5;
  }
  .check-mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0; left:0;
    line-height: 83px;
    text-align: center;
    background: rgba(255,255,255,.7);
  }
  .check-fail{
    position: absolute;
    bottom: -26px;
  }
</style>