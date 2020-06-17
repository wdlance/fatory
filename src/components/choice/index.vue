<template>
<div class="page-container">
<div class="search-wrapper">
<div class="block">
    <span class="label">开始时间</span>
    <el-date-picker
      v-model="searchForm.startTime"
      type="date"
	  :clearable="true"
	  format="yyyy-MM-dd 00:00:00"
      placeholder="选择日期">
    </el-date-picker>
  </div>
   <div class="block">
    <span class="label">结束时间</span>
    <el-date-picker
      v-model="searchForm.endTime"
      type="date"
	  :clearable="true"
	  format="yyyy-MM-dd 23:59:59"
      placeholder="选择日期">
    </el-date-picker>
  </div>
<div class="block">
<div class="label">订单号</div>
    <el-input v-model="searchForm.orderId"></el-input>
  </div>
	<div class="block">
	<div class="label" v-if="$route.path=='/choice'">仓库备货状态</div>
		<div class="label" v-else>品管状态</div>
	<el-select v-model="searchForm.status" placeholder="请选择">
	    <el-option
	      v-for="item in status"
	      :key="item.id"
	      :label="item.name"
	      :value="item.id">
	    </el-option>
	  </el-select>
	</div>
  <div class="operates">
  <el-button type="primary" @click="searchClick">查询</el-button>
  <el-button type="primary" @click="resetClick">重置</el-button>
</div>
</div>
<el-table
      :data="tableData"
      style="width:100%">
      <el-table-column
        prop="OrderID"
        label="订单号"
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
        prop="SnBox"
        label="发货SN号段及箱号"
				width="240">
				<template slot-scope="scope" v-if="scope.row.SnBox!=''">
				<div v-for="(item,index) in scope.row.SnBox" :key="index">
				<div>{{item.SnStart}}至{{item.SnEnd}}</div>
				  <div>{{item.BoxStart}}~{{item.BoxEnd}}号箱</div>
				  </div>
				</template>
      </el-table-column>
       <el-table-column
        prop="CreateTime"
        label="创建时间"
        >
      </el-table-column>
      <el-table-column
        prop="StatusPrepare"
        :label="path=='/choice'?'备货状态':'品管状态'"
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
	    :current-page.sync="pageData.Page"
	    :page-size="pageData.RowNum"
	    layout="total, prev, pager, next"
	    :total="RowNum">
	  </el-pagination>
</div>
</template>
<script>
import {RECIPIENT_API_PATH} from "../../service/api"
let StatusDefinite = [{
    id:0,
    name:"全部"
},{
    id:1,
    name:"正确"
},{
    id:2,
    name:"异常"
},{
    id:3,
    name:"进行中"
}]
export default{
    data(){
        return{
					status:StatusDefinite,
            searchForm:{
                orderId:"",
								status:0,
								startTime:new Date(new Date().toLocaleDateString()),
								endTime:new Date(new Date().toLocaleDateString()),
            },
            RowNum:0,
            pageData:{
              Page:1,
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
	watch: {
	  $route: {
	    handler: function(val, oldVal){
	      this.getRecipientList()
		  this.path = this.$route.path
		  this.resetClick()
	    },
	    // 深度观察监听
	    deep: true
	  }
	},
    methods:{
        handleCurrentChange(){
          this.getRecipientList()
        },
      getRecipientList(){
    let formData = new FormData()
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("Act","GetRecipientList")
		let startTime = this.moment(this.searchForm.startTime).format("YYYY-MM-DD 00:00:00")
		      let endTime = this.moment(this.searchForm.endTime).format("YYYY-MM-DD 23:59:59")
		      formData.append("StartTime",new Date(startTime).getTime()/1000)
		      formData.append("EndTime",new Date(endTime).getTime()/1000)
        formData.append("Page",this.pageData.Page-1)
        formData.append("RowNum",this.pageData.RowNum)
        formData.append("OrderID",this.searchForm.orderId)
		if(this.$route.path == '/choice'){
				formData.append("StatusPrepare",this.searchForm.status)
		}else{
					formData.append("StatusQc",this.searchForm.status)
		}
	
	
        this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
          if(res.data.Ret == 0){
						res.data.Data = res.data.Data?res.data.Data:[]
			  res.data.Data.map(v=>{
				  v.SnBox = v.SnBox&&v.SnBox!=""?JSON.parse(v.SnBox):""
				  v.CreateTime = this.moment(v.CreateTime*1000).format("YYYY-MM-DD HH:mm:ss")
			  })
            this.tableData = res.data.Data
						this.RowNum = res.data.Recordcount
          }
        })
      },
        resetClick(){
            this.searchForm = {
                boxNum:"",
				startTime:new Date(new Date().toLocaleDateString()),
				endTime:new Date(new Date().toLocaleDateString()),
				status:0
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
				
			 }else{
				 formData.append("Act","SetStatusQcByExpressID")
				
			 }
             
             formData.append("ExpressID",item.ExpressID)
           
             formData.append("ConfirmType",1)
             this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
				 if(res.data.Ret == 0){
					 if(this.path=='/choice'){
						  
							this.$message({
								message:"确认目测备货",
								type:"success",
								duration:3000
							});
					 }else{
						 this.$message({
						 	message:"确认目测品管",
						 	type:"success",
						 	duration:3000
						 });
						  
					 }
					
					 this.getRecipientList()
				 }else{
					 this.$message({
					 	message:res.data.Msg,
					 	type:"error",
					 	duration:3000
					 });
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
flex-wrap:wrap;
}

td a{
  margin:10px 0;
  display:block;
}
</style>