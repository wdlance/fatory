<template>
<div class="page-container">
<div class="search-wrapper">

<div class="block">
<div class="label">订单序号</div>
    <el-input v-model="searchForm.boxNum"></el-input>
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
export default{
    data(){
        return{
            searchForm:{
                boxNum:""
            },
            tableData:[]
        }
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
}
</style>