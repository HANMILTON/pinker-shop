t<template>
  <modal effect="fade" :show.sync="show" :callback='confirm' confirmText="确认消费" title="确认消费">
    <div class="modal-body row" slot="modal-body">
      <pk-input sm='12' label="Find码">
        <input type="text" class="form-control" v-model="data.find_code" name="">
      </pk-input>
      <pk-input sm='12' label="套餐">
        <input type="text" class="form-control" v-model="data.order_item[0].goods_name" name="">
      </pk-input>
      <pk-input sm='12' label="数量">
        <input type="text" class="form-control" v-model="data.order_item[0].num" name="">
      </pk-input>
      <pk-input sm='12' label="用户">
        <input type="text" class="form-control" v-model="data.aa" name="">
      </pk-input>       
      <pk-input sm='12' label="手机">
        <input type="text" class="form-control" v-model="data.mobile" name="">
      </pk-input> 
      <pk-input sm='12' label="下单时间">
        <input type="text" class="form-control" v-model="data.time_add" name="">
      </pk-input>                        
    </div>
  </modal>	
</template>
<script>
import {
  pkInput,
  modal,
  pkSingleImg
} from 'pk'
import {
  userService
} from 'api'

export default {
  props: ['show','data',"refresh"],
  components: {
    modal,
    pkInput,
  },
  data() {
    return {
      // selectData:{}
    }
  },
  methods: {
    confirm() {
      // alert(1)
      userService.confirmConsumption(this.data.id)
      .then(res => this.updateList(res))
  	},
    updateList(res){
      bus.$emit("showAlert",res.msg)
      if(res.code==200){
        let num = Math.floor(Math.random()*1000)
        this.$emit("update:refresh",num)
        this.$emit("update:show",false)
      }
    }
  },
  mounted(){
  	// this.getSceneList(1)
  },
  watch:{
    "show"(newval){
      if(!newval) this.$emit("update:show",false)
    }
  }
}
</script>
