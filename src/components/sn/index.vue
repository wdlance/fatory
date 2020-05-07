<template>
<div class="page-container">
<div class="search-wrapper">
<div class="block">
<div class="label">订单序号</div>
<el-input v-model="searchForm.orderId"></el-input>
</div>
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
        prop="num"
        label="订单序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="SN"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="KSN">
      </el-table-column>
      <el-table-column
        prop="num"
        label="箱号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="创建时间"
        width="180">
      </el-table-column>
     
    </el-table>
</div>
</template>
<script>
import {SN_API_PATH} from "../../service/api"

export default{
    data(){
        return{
           orderId:"",
            searchForm:{
                startTime:"",
                endTime:"",
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
        this.searchForm.startTime = new Date(new Date().getTime()-1*24*60*60*1000)
        this.searchForm.endTime = new Date()

        this.searchForm.orderId = this.$route.query.orderId
        
        this.getSnList()
    },
    methods:{
        getSnList(){
            let formData = new FormData()
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("Act","GetSnList")
        formData.append("Page",this.pageData.page)
        formData.append("RowNum",this.pageData.pageSize)
        let startTime = this.moment(this.searchForm.startTime).format("YYYY-MM-DD 00:00:00")
        let endTime = this.moment(this.searchForm.endTime).format("YYYY-MM-DD 00:00:00")
        formData.append("StartTime",new Date(startTime).getTime()/1000)
        formData.append("EndTime",new Date(endTime).getTime()/1000)
        formData.append("OrderID",this.searchForm.orderId)
       
        this.$axios.post(SN_API_PATH,formData).then(res=>{
          if(res.data.Ret == 0){
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