<template>
<div class="page-container">
<div class="search-wrapper">

<div class="block">
<div class="label">订单号</div>
    <el-input v-model="searchForm.orderId"></el-input>
  </div>
  <div class="block">
<div class="label">箱号</div>
    <el-input v-model="searchForm.boxNum"></el-input>
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
        prop="Box"
        label="箱号"
      >
      </el-table-column>
      <el-table-column
        prop="SnStart"
        label="SN号起始"
       >
      </el-table-column>
       <el-table-column
        prop="SnEnd"
        label="SN号终止"
       >
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        label="创建时间">
      </el-table-column>
			<el-table-column
			  prop="StatusBoxOkNum"
			  label="数量"
			 >
			 
			</el-table-column>
<el-table-column
        prop="address"
        label="操作">
           <template slot-scope="scope">
      <a @click="maintainClick(scope.row)">维修</a>
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
import {BOX_API_PATH} from "../../service/api"
export default{
    data(){
        return{
            searchForm:{
                boxNum:"",
                orderId:""
            },
            RowNum:0,
            pageData:{
              Page:1,
              RowNum:20
            },
            tableData:[]
        }
    },
    created(){
      this.getBoxList()
    },
    methods:{
        getBoxList(){
            let formData = new FormData()
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("Act","GetBoxList")
        formData.append("Page",this.pageData.Page-1)
        formData.append("RowNum",this.pageData.RowNum)
        formData.append("Box",this.searchForm.boxNum)
        formData.append("OrderID",this.searchForm.orderId)
        formData.append("StatusBox",2)
   
        this.$axios.post(BOX_API_PATH,formData).then(res=>{
          if(res.data.Ret == 0){
						res.data.Data = res.data.Data?res.data.Data:[]
            res.data.Data.map(v=>{
              v.CreateTime = this.moment(v.CreateTime*1000).format("YYYY-MM-DD HH:mm:ss")
            })
		
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
                boxNum:""
            }
        },
        searchClick(){
					this.getBoxList()

        },
        repairClick(scope){
            this.$prompt('SN号', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
         
        }).then(res=>{

        })
        },
         pageChange(){
          this.getBoxList()
        },
        maintainClick(item){
           this.$prompt('Sn', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        
        }).then(({value}) => {
          let formData = new FormData()
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("Act","SetStatusBoxBySn")
        formData.append("Box",item.Box)
        formData.append("Sn",value)
        formData.append("SnStart",item.SnStart)
		formData.append("SnEnd",item.SnEnd)
        this.$axios.post(BOX_API_PATH,formData).then(res=>{
          if(res.data.Ret == 0){
			  this.getBoxList()
           
						this.$message({
							message:"Sn维修成功",
							type:"success",
							duration:3000
						});
          }else{
           
			this.$message({
				message:res.data.Msg,
				type:"error",
				duration:3000
			});
          }
        })
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