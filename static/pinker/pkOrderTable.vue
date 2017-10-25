<template>
  <div>
    <div :class="{'table-responsive':true,'nowrap':option.nowrap}">
      <table class="table table-hover table-bordered table-condensed">
        <!-- tr -->
        <tbody v-for="(row,key) in data">
          <tr class="tr-height">{{key}}</tr>
          <tr>
            <td colspan="7" class="td-pad">
          <table v-for="(row1,key1) in row">
            <tr class="table-head">
              <th v-for='col in option.columns' :class="['text-center',option.orderBy===col.field?'text-success':'text-info',]">
                {{col.th}}
              </th>
            </tr>          
            <tr class="tr-height">{{key1}}</tr>
              <tr v-for="row2 in row1.order_list">
                <td v-for='col in option.columns' class="text-center">
                  <div v-if='col.convertDom' @click='trclick($event,row2)' v-html="col.convertDom(row2[col.field])"></div>
                  <div v-if='col.convert'>
                    {{col.convert(row2[col.field])}}
                  </div>
                  <div v-if='col.merge' @click='trclick($event,row2)' v-html="multiFields(row2,col)"></div>
                  <div v-if='col.analy' v-html="multiAnalys(row2,col)"></div>
                  <div v-if="col.img">
                    <img :src="row2[col.field]" width="80px">
                  </div>
                  <div v-if='!col.convertDom && !col.convert && !col.merge && !col.img'>
                    {{row2[col.field]}}
                  </div>
                </td>
              </tr>
          </table>              
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      coerce(val) {
        return val ? val : []
      }
    },
    option: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
    }
  },
  mounted(){
    console.log(this.data)
  },
  methods: {
    trclick($event, row) {
      // console.log($event)
      // let Event = new Vue();
      let type = $event.target.dataset.type
      if (type) this.$emit('trclick', $event, row, type)
    },
    multiFields(row, col) {
      if (col.field.indexOf('@') !== -1) { // 多字段拼接方法
        let fieldArr = col.field.split('@') // 字段分割
        let colArr = fieldArr.map((v) => row[v]) // 获取字段值
        return col.merge(...colArr) // 执行拼接回调
      } else {
        return row[col.field]
      }
    },
    multiAnalys(row, col) {
      if (col.field.indexOf('@') !== -1) { // 多字段拼接方法
        let fieldArr = col.field.split('@') // 字段分割
        let colArr = []
        colArr.push(row[fieldArr.shift()])
        colArr = colArr.concat(fieldArr)
        let dataObj = colArr[0]
        for(let i=1;i<colArr.length;i++){
          dataObj = dataObj[colArr[i]]
        }
        return dataObj // 执行拼接回调
      } else {
        return row[col.field]
      }
    }
  },
}
</script>
<style scoped>
.table-responsive{
  border-radius: 5px;
    overflow: hidden;
}
.table-head{
  background: #cccccc;
}
tr,th,td{
  white-space: nowrap;
  padding: 5px;
  border: 1px solid #ddd;
  color: grey;
}
.text-left{
  width: 200px;
  margin: 0 auto;
}
table .btn{
  border: none;
  color: #31708f;
  background: none;
}
caption,table{
  /*display: block;*/
  width: 100%;
}
.tr-height{
  display: block;
  height: 31px;
  line-height: 31px;
  padding: 0 5px;
  border-right: 1px solid #ddd;
}
.td-pad{
  padding: 0;
}
</style>
