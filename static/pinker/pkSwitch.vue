<template>
    <span class="bg_con">
    <!-- {{value}} -->
        <input :id="checkedId" type="checkbox" class="switch" 
        ref="input"
        :true-value="onValue"
        :false-value="offValue"
        @change="handleChange"/>
        <label class="label" :for="checkedId"></label>
    </span>
</template>
<script>
  export default{
    props:{
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      onValue: {
        type: [Boolean, String, Number],
        default: true
      },
      offValue: {
        type: [Boolean, String, Number],
        default: false
      },     
    },
    data(){
      return{
        checkedId: "checked_"+Math.floor(Math.random()*1000),
      }
    },
    created() {
      if (!~[this.onValue, this.offValue].indexOf(this.value)) {
        this.$emit('input', this.offValue);
      }
    },
    watch: {
      checked() {
        this.$refs.input.checked = this.checked;
      }
    },
    computed: {
      checked() {
        return this.value === this.onValue;
      },
    },
    methods:{
      handleChange(){
        console.log(this.checked)
        this.$emit('input', !this.checked ? this.onValue : this.offValue);
        this.$emit('change', !this.checked ? this.onValue : this.offValue);
      }
    },
    mounted() {
      // console.log(this.value,this.onValue,this.checked);
      this.$refs.input.checked = this.checked;
    }
  }
</script>
<style scoped>
.bg_con{
    width: 50px;
      display: inline-block;
    position: relative;
    font-size: 14px;
    line-height: 22px;
    height: 22px;
    vertical-align: middle;
}
    .switch{
        display:none;
    }
    .label{
        position:relative;
        display: block;
        border-radius: 24px;
        height: 22px;
        /*background-color: black;*/
        cursor: pointer;
        vertical-align: middle;
    }
    .label:before{
        content: '';
        display: block;
        border-radius: 11px;
        width: 50px;
        height: 22px;
        background-color: #ff9eb7;
        -webkit-transform: scale(1, 1);
        -webkit-transition: all 0.3s ease;
        position: absolute;
        top:0px;
        left: 0px;
    }
    .label:after{
        content: '';
        position: absolute;
        top: 0px;  
        left: 9px;  
/*        margin-top: -11px;  
        margin-left: -11px;*/
        width: 22px;
        height: 22px;
        border-radius:11px;
        background-color: white;
        box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.08);
        -webkit-transform: translateX(-9px);
        -webkit-transition: all 0.3s ease;
        background: url("./off.png");
        background-size: cover;
    }
    .switch:checked~.label:after{
        -webkit-transform: translateX(19px);
        background: url("./on.png");
        background-size: cover;
    }
    
    .switch:checked~.label:before{
        background-color:#9ed5ff;
    }
</style>