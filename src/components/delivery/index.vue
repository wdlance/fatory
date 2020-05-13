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
        prop="OrderID"
        label="订单序号"
        >
      </el-table-column>
      <el-table-column
        prop="RecipientCompany"
        label="客户名称"
       >
      </el-table-column>
      <el-table-column
        prop="ExpressID"
        label="快运单号">
      </el-table-column>
      <el-table-column
        prop="RecipientName"
        label="收件人"
        >
      </el-table-column>
      <el-table-column
        prop="RecipientPhone"
        label="收件人电话">
      </el-table-column>
       <el-table-column
        prop="SnTotal"
        label="发货数量(台)">
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="SnBox"
        label="发货SN号段及箱号">
        <template slot-scope="scope" v-if="scope.row.SnBox!=''">
        <div v-for="(item,index) in scope.row.SnBox" :key="index">
        <div>{{item.SnStart}}至{{item.SnStart}}</div>
          <div>{{item.BoxStart}}~{{item.BoxEnd}}号箱</div>
          </div>
        </template>
      </el-table-column>
     <el-table-column
 
      label="操作"
    >
      <template slot-scope="scope">
        <a @click="assignSnClick(scope.row)">
        分配SN号段
        </a>
      </template>
    </el-table-column>
    </el-table>
    
          <el-pagination
    
@current-change="handleCurrentChange"
      :current-page="pageData.Page"
      :page-size="pageData.RowNum"
      layout="total,pager, prev, next"
      :total="RowNum">
      </el-pagination>  
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
            RowNum:0,
            pageData:{
                Page:0,
                RowNum:20,
          
            }
        }
    },
    created(){
       
        this.searchForm.orderId = this.$route.query.orderId?this.$route.query.orderId:""
        this.getRecipientList()
    },
    methods:{
        getRecipientList(){
            let formData = new FormData()
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("Act","GetRecipientList")
        formData.append("Page",this.pageData.Page)
        formData.append("RowNum",this.pageData.RowNum)
       
        formData.append("OrderID",this.searchForm.orderId)
       formData.append("ExpressID",this.searchForm.expressId)
         formData.append("RecipientName",this.searchForm.recipientor)
        this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
          if(res.data.Ret == 0){
            res.data.Data = res.data.Data.map(v=>{
              
              v.SnBox = v.SnBox&&v.SnBox!=''?JSON.parse(v.SnBox):""
              return v
            })
            this.tableData = res.data.Data
            
            this.RowNum = res.data.Recordcount
          }
        })
        },
        resetClick(){
            this.searchForm = {
                orderId:"",
                startTime:new Date(new Date().getTime()-1*24*60*60*1000),
                endTime:new Data(),
                expressId:"",
                recipientor:""
            }
        },
        searchClick(){
          this.getRecipientList()
        },
       assignSnClick(item){
         this.$router.push({
           name:"AssignSn",
           query:{
             orderId:item.OrderID,
             recipientCompany:item.RecipientCompany,
             recipientId:item.RecipientID,
             snTotal:item.SnTotal
           }
         })
       },
        handleCurrentChange(){
          this.getRecipientList()
        }
    }
}
</script>
<style scoped>
.search-wrapper{
display:flex;
justy-content:flex-start;
flex-wrap:wrap;
}

.label{
    flex-shrink:0;
    width:100px;

}
.block{
    display:flex;
    align-items:center;
    padding:0 15px;
    box-sizing:border-box;
  min-width:33%;
    margin-bottom:15px;
}
</style>