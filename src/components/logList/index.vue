<template>
<div class="page-container">
<div class="search-wrapper">
<div class="block">
<div class="label">开始时间</div>
 <el-date-picker
      v-model="searchForm.startTime"
      type="date"
      format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
</div>
<div class="block">
<div class="label">结束时间</div>
 <el-date-picker
      v-model="searchForm.endTime"
      type="date"
     format="yyyy-MM-dd"
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
  <div class="operate">
   <el-button type="primary" @click="searchClick">查询</el-button>
    <el-button type="primary" @click="resetClick">重置</el-button>
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
        prop="RoleName"
        label="角色"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Content"
        label="内容">
      </el-table-column>
    </el-table>
    <el-pagination
    
      @current-change="handleCurrentChange"
      :current-page.sync="pageData.Page"
      :page-size="pageData.RowNum"
      layout="total, prev, pager, next"
      :total="RowNum">
      </el-pagination>
</div>
</template>
<script>
import {LOG_API_PATH} from "../../service/api"
import {RoleList} from "../../service/constant"
export default{
    data(){
        return {
            tableData:[],
            searchForm:{
                     startTime:new Date(new Date().toLocaleDateString()),
					endTime:new Date(new Date(new Date().toLocaleDateString()).getTime()+1*24*60*60*1000),
                account:"",
                content:""
            },
            RowNum:0,
            pageData:{
             Page:1,
             RowNum:20
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
        formData.append("Page",this.pageData.Page-1)
        formData.append("RowNum",this.pageData.RowNum)
       let startTime = this.moment(this.searchForm.startTime).format("YYYY-MM-DD 00:00:00")
        let endTime = this.moment(this.searchForm.endTime).format("YYYY-MM-DD 00:00:00")
        formData.append("StartTime",new Date(startTime).getTime()/1000)
        formData.append("EndTime",new Date(endTime).getTime()/1000)
        formData.append("UserName",this.searchForm.account)
        formData.append("Content",this.searchForm.content)
        this.$axios.post(LOG_API_PATH,formData).then(res=>{
          if(res.data.Ret == 0){
						res.data.Data = res.data.Data?res.data.Data:[]
            res.data.Data.map(v=>{
              v.CreateTime = this.moment(v.CreateTime*1000).format("YYYY-MM-DD HH:mm:ss")
              v.RoleName = RoleList.find(role=>role.id == v.RoleID)?RoleList.find(role=>role.id == v.RoleID).name:""
            })
            this.tableData = res.data.Data
            this.RowNum = res.data.Recordcount
          }else{
            this.$message(res.data.Msg)
          }
        })
      },
      handleCurrentChange(){
        this.getLogList()
      },
      searchClick(){
        this.getLogList()
      },
      resetClick(){
        this.searchForm = {
           startTime:new Date(new Date().getTime()-1*24*60*60*1000),
                endTime:new Date(),
                account:"",
                content:""
        }
      }
    }
}
</script>
<style scoped="scoped">
.search-wrapper{
    display:flex;
    flex-wrap:wrap;
		justy-content:flex-start;
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