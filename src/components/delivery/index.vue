<template>
<div class="page-container">
<div class="search-wrapper">
<div class="block">
<div class="label">订单序号</div>
<el-input v-model="searchForm.orderId"></el-input>
</div>
<div class="block">
<div class="label">收件人</div>
<el-input v-model="searchForm.recipientor"></el-input>
</div>
<div class="block">
<div class="label">快运单号</div>
<el-input v-model="searchForm.expressId"></el-input>
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
        label="发货数量(台)">
      </el-table-column>
      <el-table-column
        prop="num"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="发货SN号段及箱号"
        width="180">
      </el-table-column>
     <el-table-column
      
      label="操作"
      width="120">
      <template slot-scope="scope">
        <a>
        分配SN号段
        </a>
      </template>
    </el-table-column>
    </el-table>
</div>
</template>
<script>
import {RECIPIENT_API_PATH } from "../../service/api"

export default{
    data(){
        return{
            searchForm:{
                orderId:"",
                recipientor:"",
                expressId:""
            },
            tableData:[],
            pageData:{
                page:1,
                pageSize:20,
                total:0
            }
        }
    },
    created(){
        this.searchForm.startTime = new Date(new Date().getTime()-1*24*60*60*1000)
        this.searchForm.endTime = new Date()
        this.searchForm.orderId = this.$route.query.orderId
        this.getRecipientList()
    },
    methods:{
        getRecipientList(){
            let formData = new FormData()
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("Act","GetRecipientList")
        formData.append("Page",this.pageData.page)
        formData.append("RowNum",this.pageData.pageSize)
        let startTime = this.moment(this.searchForm.startTime).format("YYYY-MM-DD 00:00:00")
        let endTime = this.moment(this.searchForm.endTime).format("YYYY-MM-DD 00:00:00")
        formData.append("StartTime",new Date(startTime).getTime()/1000)
        formData.append("EndTime",new Date(endTime).getTime()/1000)
        formData.append("OrderID",this.searchForm.orderId)
       formData.append("ExpressId",this.searchForm.expressId)
        this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
          if(res.data.Ret == 0){
            this.tableData = res.data.Data
            this.pageData = res.data.Recordcount
          }
        })
        },
        resetClick(){
            this.searchForm = {
                orderId:"",
                startTime:new Date(new Date().getTime()-1*24*60*60*1000),
                endTime:new Data(),
                sn:""
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