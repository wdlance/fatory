<template>
<div class="page-container">
<div class="search-wrapper">
<div class="block">
<div class="label">订单号</div>
<el-input v-model="searchForm.orderId"></el-input>
</div>
<div class="block">
<div class="label">开始时间</div>
<el-date-picker
      v-model="searchForm.startTime"
      type="date"
      placeholder="选择日期"
       format="yyyy-MM-dd">
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
<div class="label">SN</div>
<el-input v-model="searchForm.sn"></el-input>
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
       
    </el-table>
       <el-pagination
	   
	   @current-change="handleCurrentChange"
      :current-page="pageData.Page"
	  :page-size ="pageData.RowNumS"
      layout="total,pager, prev, next"
      :total="RowNum"></el-pagination>
</div>
</template>
<script>
import {SN_API_PATH} from "../../service/api"

export default{
    data(){
        return{
           orderId:"",
            searchForm:{
               startTime:new Date(new Date().toLocaleDateString()).getTime(),
					endTime:new Date(new Date(new Date().toLocaleDateString()).getTime()+1*24*60*60*1000),
                orderId:"",
                sn:""
            },
            tableData:[],
            RowNum:0,
            pageData:{
              Page:1,
              RowNum:20
            }
        }
    },
    created(){
      
        this.searchForm.orderId = this.$route.query.orderId?this.$route.query.orderId:""
		
        if(this.$route.query.startTime){
			this.searchForm.startTime = new Date(this.$route.query.startTime)
		}
		if(this.$route.query.endTime){
			this.searchForm.endTime = new Date(this.$route.query.endTime)
		}
        this.getSnList()
    },
    methods:{
		handleCurrentChange(){
			this.getSnList()
		},
        getSnList(){
            let formData = new FormData()
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("Act","GetSnList")
        formData.append("Page",this.pageData.Page-1)
        formData.append("RowNum",this.pageData.RowNum)
        let startTime = this.moment(this.searchForm.startTime).format("YYYY-MM-DD 00:00:00")
        let endTime = this.moment(this.searchForm.endTime).format("YYYY-MM-DD 00:00:00")
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

.label{
    flex-shrink:0;
    width:120px;

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