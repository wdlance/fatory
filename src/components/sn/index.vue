<template>
<div class="page-container">
<div class="search-wrapper">\
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
<div class="label">箱号</div>
<el-input v-model="searchForm.boxNum"></el-input>
</div>
	<div class="block">
	<div class="label">扫描装箱状态</div>

	<el-select v-model="searchForm.status" placeholder="请选择">
	    <el-option
	      v-for="item in status"
	      :key="item.id"
	      :label="item.name"
	      :value="item.id">
	    </el-option>
	  </el-select>
	</div>
 

<div class="block">
<div class="label">SN</div>
<el-input v-model="searchForm.sn"></el-input>
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
        prop="Sn"
        label="SN"
       >
      </el-table-column>
      <el-table-column
        prop="Ksn"
        label="KSN">
      </el-table-column>
      <el-table-column
        prop="BoxNum"
        label="箱号"
       >
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        label="创建时间"
       >
      </el-table-column>
       <el-table-column
         prop="StatusBox"
         label="扫描装箱状态"
         >
         <template slot-scope="scope">
         <div v-if="scope.row.StatusBox==0">无</div>
         <div v-if="scope.row.StatusBox==1">正确</div>
         <div v-if="scope.row.StatusBox==2">异常</div>
         <div v-if="scope.row.StatusBox==3">进行中</div>
         </template>
       </el-table-column>
    </el-table>
     <el-pagination
                @current-change="pageChange"
       :current-page.sync="pageData.Page"
       :page-size="pageData.RowNum"
       layout="total, prev, pager, next"
       :total="RowNum">
     </el-pagination>
</div>
</template>
<script>
import {SN_API_PATH} from "../../service/api"
let StatusDefinite = [{
    id:0,
    name:"全部"
},{
    id:1,
    name:"正确"
},{
    id:2,
    name:"异常"
}]
export default{
    data(){
        return{
           orderId:"",
            searchForm:{
        startTime:new Date(new Date().toLocaleDateString()),
        endTime:new Date(new Date().toLocaleDateString()),
		boxNum:"",
		status:0,
                orderId:"",
                sn:""
            },
            tableData:[],
			status:StatusDefinite,
            RowNum:0,
            pageData:{
              Page:1,
              RowNum:20
            }
        }
    },
    created(){
      
        this.searchForm.orderId = this.$route.query.orderId?this.$route.query.orderId:""
		this.searchForm.boxNum = this.$route.query.boxNum?this.$route.query.boxNum:""
        if(this.$route.query.startTime){
			this.searchForm.startTime = new Date(this.$route.query.startTime)
		}
		if(this.$route.query.endTime){
			this.searchForm.endTime = new Date(this.$route.query.endTime)
		}
        this.getSnList()
    },
    methods:{
		pageChange(){
			this.getSnList()
		},
        getSnList(){
			
            let formData = new FormData()
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("Act","GetSnList")
		formData.append("Box",this.searchForm.boxNum)
		formData.append("StatusBox",this.searchForm.status)
        formData.append("Page",this.pageData.Page-1)
        formData.append("RowNum",this.pageData.RowNum)
       let startTime = this.moment(this.searchForm.startTime).format("YYYY-MM-DD 00:00:00")
             let endTime = this.moment(this.searchForm.endTime).format("YYYY-MM-DD 23:59:59")
             formData.append("StartTime",new Date(startTime).getTime()/1000)
             formData.append("EndTime",new Date(endTime).getTime()/1000)
        formData.append("OrderID",this.searchForm.orderId)
       formData.append("Sn",this.searchForm.sn)
        this.$axios.post(SN_API_PATH,formData).then(res=>{
          if(res.data.Ret == 0){
			  if(res.data.Data){
				  res.data.Data.map(v=>{
				    v.CreateTime = this.moment((v.CreateTime*1000)).format("YYYY-MM-DD HH:mm:ss")
				  })
			  }else{
				  res.data.Data = []
			  }
           
            this.tableData = res.data.Data
            this.RowNum = res.data.Recordcount
		
          }else{
			  this.$message({
			  	message:res.data.Msg,
			  	type:"error",
			  	duration:3000
			  });
		  }
        })
        },
        resetClick(){
            this.searchForm = {
                orderId:"",
                startTime:new Date(new Date().toLocaleDateString()),
                endTime:new Date(new Date().toLocaleDateString()),
                sn:""
            }
        },
        searchClick(){
          this.getSnList()
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
justy-content:flex-start;
flex-wrap:wrap;
}

</style>