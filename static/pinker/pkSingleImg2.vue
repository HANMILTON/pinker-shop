<template>
  <div>
    <div class="col-sm-12 pad-no" @mouseenter.stop="img ? showMask=true : ''" @mouseleave.stop="img ? showMask=false : ''">
      <div class="upload">
        <input @change='fileChange($event)' :id='fileId' class="jofile" type="file" accept="image/jpg,image/jpeg,image/gif,image/png">
        <img v-if="img" :src="img" width="100%">
        <label v-else class="prompt" :for="fileId">
          <div class="prompt-logo"><img src="./prompt-logo.png"></div>
          <div class="prompt-text">点击上传图片</div>
        </label>
      </div>
      <div class="mask" v-if="showMask">
          <button @click="deleteImg" class="del-btn btn btn-danger">&times;</button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  publicService
} from 'api'
export default {
  props: {
    img: {
      twoWay: true,
      required: true
    },
  },
  data() {
    return {
      file: {},
      showMask:false,
      doUpload:false,
      fileId: "file"+Math.floor(Math.random()*1000)
    }
  },
  methods: {
    fileChange(e) {
      let file = e.target.files[0]
      let reader = new window.FileReader()
      if(file.size > 200000){
        return alert("图片超过200k")
      }
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.file = {
          imgFile: file,
          imgBase64: reader.result,
          uploaded: false
        }
       this.upload()
      }
    },
    deleteImg(){
        this.img = "" 
        this.showMask=false
        this.$emit('update:img',"")
    },
    upload() {
      publicService.imgUpload(this.file.imgBase64)
      .then(res => this.uploadSuccess(res))
    },
    uploadSuccess(res){
      if(res.code==200){
        this.$emit('update:img', res.data)
        this.img = res.data     
      }
    },
    isNullObj(obj) {
      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          return false
        }
      }
      return true
    }
  }
}
</script>
<style scoped>
.pad-no{
  padding: 20px;
  position: relative;
}
.upload{
  min-height: 150px;
  position: relative;
  cursor: pointer;
}
.prompt{
  height: 50px;
  text-align: center;
  position: absolute;
  top:0;left:0;right: 0;bottom: 0;
  margin: auto;
  cursor: pointer;
}
.prompt-text{
  padding-top: 10px;
  color: grey;
}
.mask{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.3);
  position: absolute;
  top:0;left: 0;
}
.close{
  width: 20px;text-align: center;
  position: absolute;
  top:2px;
  right:2px;
  color: red;
}
.jofile {
  display: none;
}
.img-wrap {
  position: relative;
  display: inline-block;
  margin: 20px 2px;
  box-shadow: 2px 2px 10px #666;
}
.del-btn {
  width: 20px;
  height: 20px;
  font-size: 18px;
  line-height: 20px; 
  padding: 0;
  text-align: center;
  position: absolute;
  right: 1%;
  top: 1%;
}
</style>
