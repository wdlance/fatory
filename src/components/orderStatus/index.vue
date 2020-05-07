<template>
<div class="page-container">
<div class="search-wrapper">
<div class="block">
<div class="label">开始时间</div>
<el-date-picker
      v-model="searchForm.startTime"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd">
    </el-date-picker>
</div>
<div class="block">
<div class="label">结束时间</div>
<el-date-picker
      v-model="searchForm.endTime"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
</div>
<div class="block">
<div class="label">产品简称</div>
<el-select v-model="searchForm.productId" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div>
<div class="block">
<div class="label">扫码装箱状态</div>
<el-select v-model="searchForm.status1" placeholder="请选择">
    <el-option
      v-for="item in status1"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</div>
<div class="block">
<div class="label">仓库备货状态</div>
<el-select v-model="searchForm.status2" placeholder="请选择">
    <el-option
      v-for="item in status2"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</div>

<div class="block">
<div class="label">品管状态</div>
<el-select v-model="searchForm.status3" placeholder="请选择">
    <el-option
      v-for="item in status3"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</div>
 <div class="block">
  <el-button type="primary" @click="searchClick">查询</el-button>
  <el-button type="primary" @click="resetClick">重置</el-button>
</div>
</div>
<el-table
      :data="tableData"
      style="width:100%">
      <el-table-column
        prop="num"
        label="订单序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="客户名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="快运单号">
      </el-table-column>
      <el-table-column
        prop="num"
        label="收件人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="收件人电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="发货SN号段及箱号">
      </el-table-column>
       <el-table-column
        prop="num"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="备货状态"
        width="180">
      </el-table-column>
<el-table-column
        prop="address"
        label="操作">
           <template slot-scope="scope">
      <a>目测备货</a>
      <a>扫码备货</a>
      </template>
      </el-table-column>
   
    </el-table>
</div>
</template>
<script>
let StatusDefinite = [{
    id:0,
    name:"正确"
},{
    id:1,
    name:"异常"
},{
    id:2,
    name:"未确认"
},{
    id:3,
    name:"无"
}]
export default{
    data(){
        return{
            searchForm:{
                startTime:"",
                endTime:"",
                productId:"",
                status1:0,
                status2:0,
                status3:0
            },
            status1:StatusDefinite,
            status2:StatusDefinite,
            status3:StatusDefinite,
            tableData:[]
        }
    },
    created(){
        this.searchForm.startTime = new Date(new Date().getTime()-1*24*60*60*1000)
        this.searchForm.endTime = new Date()
    },
    methods:{
        resetClick(){
            this.searchForm = {
                boxNum:""
            }
        },
        searchClick(){

        },
        repairClick(scope){
            this.$prompt('SN号', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
         
        }).then(res=>{

        })
        }
    }
}
</script>
<style scoped>
.search-wrapper{
display:flex;
justy-content:space-between;
flex-wrap:wrap;
}

.label{
    flex-shrink:0;
    width:80px;

}
.block{
    display:flex;
    align-items:center;
    padding:0 15px;
    box-sizing:border-box;
    width:50%;
    margin-bottom:15px;
}
</style>