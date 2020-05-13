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
        label="收件人电话"
       >
      </el-table-column>
      <el-table-column
        prop="RecipientAddress"
        label="发货SN号段及箱号">
      </el-table-column>
       <el-table-column
        prop="CreateTime"
        label="创建时间"
        >
      </el-table-column>
      <el-table-column
        prop="StatusPrepare"
        label="备货状态"
        >
        <template slot-scope="scope">
        <div v-if="scope.row.StatusPrepare==0">无</div>
        <div v-if="scope.row.StatusPrepare==1">正确</div>
        <div v-if="scope.row.StatusPrepare==2">异常</div>
        <div v-if="scope.row.StatusPrepare==3">进行中</div>
        </template>
      </el-table-column>
<el-table-column
        prop="address"
        label="操作">
           <template slot-scope="scope">
           <template v-if="path=='/choice'">  
           <a @click="confirmTypeByEyes(scope.row)">目测备货</a>
      <a @click="gotoPrepare(scope.row)">扫码备货</a>
           
           </template>
                <template v-if="path=='/qc'">  
           <a @click="confirmTypeByEyes(scope.row)">目测品管</a>
      <a @click="gotoPrepare(scope.row)">扫码品管</a>
           
           </template>
    
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
import {RECIPIENT_API_PATH} from "../../service/api"
export default{
    data(){
        return{
            searchForm:{
                orderId:""
            },
            RowNum:0,
            pageData:{
              Page:0,
              RowNum:20
            },
            tableData:[],
            path:""
        }
    },
    created(){
      this.path = this.$route.path
      this.getRecipientList()
    },
    methods:{
        handleCurrentChange(){
          this.getRecipientList()
        },
      getRecipientList(){
    let formData = new FormData()
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("Act","GetRecipientList")
        formData.append("Page",this.pageData.Page)
        formData.append("RowNum",this.pageData.RowNum)
        formData.append("OrderID",this.searchForm.orderId)
        this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
          if(res.data.Ret == 0){
            this.tableData = res.data.Data
          }
        })
      },
        resetClick(){
            this.searchForm = {
                boxNum:""
            }
        },
        searchClick(){
          this.getRecipientList()
        },
        confirmTypeByEyes(item){
					let tip = this.path == '/choice'?"确认备货？":"确认品管？"
 this.$confirm(tip, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         let formData = new FormData()
             formData.append("Token",sessionStorage.getItem("token"))
			 if(this.path=='/choice'){
				 formData.append("Act","SetStatusPrepareByExpressID")  
				 formData.append("StatusPrepare","StatusPrepareOK")
			 }else{
				 formData.append("Act","SetStatusQcByExpressID")
				   formData.append("StatusQc","StatusQcOK")
			 }
             
             formData.append("ExpressID",item.ExpressID)
           
             formData.append("ConfirmType","ConfirmTypeByEyes")
             this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
				 if(res.data.Ret == 0){
					 if(this.path=='/choice'){
						  this.$message("确认目测备货")
					 }else{
						  this.$message("确认目测品管")
					 }
					
					 this.getRecipientList()
				 }else{
					 this.$message(res.data.Msg)
				 }
			 })
        })
        },
        gotoPrepare(item){
					let param = this.path == '/choice'?'choice':'qc'
          this.$router.push({
			  name:"Prepare",
			  query:{
				  type:param,
					
			  }
		  })
        }
    }
}
</script>
<style scoped>
.search-wrapper{
display:flex;
justy-content:flex-start;
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
}
td a{
  margin:10px 0;
  display:block;
}
</style>