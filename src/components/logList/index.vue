<template>
<div class="page-container">
<div class="search-wrapper">
<div class="block">
<div class="label">开始时间</div>
 <el-date-picker
      v-model="searchForm.startTime"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
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
<div class="label">账号</div>
 <el-input v-model="searchForm.account"></el-input>
</div>
<div class="block">
<div class="label">内容</div>
 <el-input v-model="searchForm.content"></el-input>
</div>

</div>
<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="CreateTime"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="UserName"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Content"
        label="内容">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageData.page"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="pageData.total">
      </el-pagination>
</div>
</template>
<script>
import {LOG_API_PATH} from "../../service/api"
export default{
    data(){
        return {
            tableData:[],
            searchForm:{
                startTime:new Date(new Date().getTime()-1*24*60*60*1000),
                endTime:new Date()
            },
            pageData:{
              page:1,
              pageSize:20,
              total:0
            }
        }
    },
    created(){
      this.getLogList()
    },
    methods:{
      getLogList(){
        let formData = new FormData()
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("Act","GetLogList")
        formData.append("Page",this.pageData.page)
        formData.append("RowNum",this.pageData.pageSize)
        formData.append("StartTime",this.searchForm.StartTime)
        formData.append("EndTime",this.searchForm.EndTime)
        ormData.append("UserName",this.searchForm.account)
        formData.append("Content",this.searchForm.content)
        this.$axios.post(LOG_API_PATH,formData).then(res=>{
          if(res.data.Ret == 0){
            this.tableData = res.data.Data
            this.pageData = res.data.Recordcount
          }
        })
      }
    }
}
</script>
<style scoped="scoped">
.search-wrapper{
    display:flex;
    flex-wrap:wrap;
}
.block{
    width:50%;
    padding:15px;
    box-sizing:border-box;
    display:flex;
    align-items:center;
    justy-content:flex-start;
}
.label{
    min-width:100px;
    text-align:right;
    margin-right:10px;
}
</style>