<template>
  <div>
    <!-- {{option|json}} -->
    <!-- {{data|json}} -->
    <!-- {{callback}} -->
    <div :class="{'table-responsive':true,'nowrap':option.nowrap}">
      <table class="table table-hover table-bordered table-condensed">
        <tr class="table-head">
          <th v-for='col in option.columns' :class="['text-center',option.orderBy===col.field?'text-success':'text-info',]">
            {{col.th}}
          </th>
        </tr>
        <tbody>
          <tr v-for="row in data">
            <td class="pad-left date" v-if="row.date" colspan="7">{{row.date}}</td>
            <td class="pad-left time" v-else-if="row.time" colspan="7">{{row.time}}&nbsp;&nbsp;&nbsp;&nbsp;<span v-if="row.num_r">预定：{{row.num_r}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span v-if="row.num_a">到店：{{row.num_a}}</span></td>
            <td v-else v-for='col in option.columns' class="text-center data">
              <div v-if='col.convertDom' @click='trclick($event,row)' v-html="col.convertDom(row[col.field])"></div>
              <div v-if='col.convert'>
                {{col.convert(row[col.field])}}
              </div>
              <div v-if='col.merge' @click='trclick($event,row)' v-html="multiFields(row,col)"></div>
              <div v-if='col.analy' v-html="multiAnalys(row,col)"></div>
              <div v-if="col.img">
                <img :src="row[col.field]" width="80px">
              </div>
              <div v-if='!col.convertDom && !col.convert && !col.merge && !col.img'>
                {{row[col.field]}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分页开始 -->
<!--     <div class="pagination-wrap text-center">
      <ul class="pagination">
        <li @click='startPage-=1' :class="{disabled:startPage<=0}">
          <a href="javascript:;">
            <span>&laquo;Pres</span>
          </a>
        </li>
        <li style="display:none;" @click='startPage=index' v-for='(num,index) in totalPage' :class="{active:startPage===index}">
          <a href="javascript:;">{{num+1}}</a>
        </li>
        <li @click='startPage+=1' :class="{disabled:startPage>=totalPage-1}">
          <a href="javascript:;">
            <span>Next&raquo;</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <select @change='startPage=0' v-model='pageCount'>
              <option value="5">5条/页</option>
              <option value="10">10条/页</option>
              <option value="15">15条/页</option>
              <option value="20">20条/页</option>
              <option value="25">25条/页</option>
              <option value="300">300条/页</option>
            </select>
          </a>
        </li>
      </ul>
    </div> -->
<!--     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="startPage"
      :page-size="pageCount"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination> -->
    <!-- 分页区结束 -->
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
      coerce(val) {
        return val ? val : []
      }
    },
    option: {
      type: Object,
      required: true
    },
    searchField: String,
    searchValue: String,
  },
  data() {
    return {
      startPage: 0,
      pageCount: 15
    }
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
  computed: {
    totalPage() { // 总页数计算
      return Math.ceil(this.data.length / this.pageCount)
    },
  },
  watch: {
    startPage(nowPage) { // 不能超限选取页码
      if (nowPage >= this.totalPage) this.startPage = this.totalPage - 1
      if (nowPage <= 0) this.startPage = 0
    },
    data(newData, oldData) {
      if (newData.length !== oldData.length) this.startPage = 0
    }
  }
}
</script>
<style scoped>
.table-responsive{
  border-radius: 2px;
    overflow: hidden;
}
.table-head{
  background: #fafafa;
  border-right: 1px solid #ddd;
}
tr,th,td{
  white-space: nowrap;
  padding: 10px;
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
th:last-of-type,td:last-of-type{
  border-right: 1px solid #ddd;
}
.text-center,.pad-left{
  padding: 10px;
  border-right: 1px solid transparent;
}
.pad-left{
  padding-left: 20px; 
}
tr:hover{
  background: #fafafa;
}
.date{
  background: #c9e5f5;
}
.time{
  background: #e2f0e4;
}
</style>
