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
<div class="label">产品简称</div>
 <el-select v-model="searchForm.productId" placeholder="请选择">
    <el-option
      v-for="item in productList"
      :key="item.ProductID"
      :label="item.ProductBriefName"
      :value="item.ProductID">
	  {{item.ProductBriefName}}
    </el-option>
  </el-select>
</div>
<div class="block">
<div class="label">扫码装箱状态</div>
<el-select v-model="searchForm.status1" placeholder="请选择">
    <el-option
      v-for="item in status1"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</div>
<div class="block">
<div class="label">仓库备货状态</div>
<el-select v-model="searchForm.status2" placeholder="请选择">
    <el-option
      v-for="item in status2"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</div>

<div class="block">
<div class="label">品管状态</div>
<el-select v-model="searchForm.status3" placeholder="请选择">
    <el-option
      v-for="item in status3"
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
        prop="ProductBriefName"
        label="产品简称"
       >
      </el-table-column>
      <el-table-column
        prop="ProductTotal"
		width="120"
        label="产品总数">
      </el-table-column>
      <el-table-column
        prop="NumberPerBox"
		width="160"
        label="产品数/箱"
       >
      </el-table-column>
      <el-table-column
        prop="SnTotal"
		width="120"
        label="SN总数"
        >
      	<template slot-scope="scope">
				<a @click="toSnListClick(scope.row)">{{scope.row.SnTotal}}</a>
				</template>
      </el-table-column>
      <el-table-column
        prop="BoxTotal"
		width="120"
        label="总箱数">
        <template slot-scope="scope">
				<a @click="toBoxListClick(scope.row)">{{scope.row.BoxTotal}}</a>
				</template>
      </el-table-column>
       <el-table-column
        prop="RecipientTotal"
		width="120"
        label="收件信息"
       >
       	<template slot-scope="scope">
				<a @click="toRecipientListClick(scope.row)">{{scope.row.RecipientTotal}}<span v-if="scope.row.RecipientSnTotal&&scope.row.RecipientSnTotal!=''">({{scope.row.RecipientSnTotal}})</span></a>
				</template>
      </el-table-column>

      <el-table-column
        prop="CreateTime"
        label="创建时间"
       >
      </el-table-column>
       <el-table-column
        prop="StatusBox"
        label="扫描装箱状态">
          <template  slot-scope="scope">
         <div v-if="scope.row.StatusBox==0">无</div>
        <div v-if="scope.row.StatusBox==1">正确</div>
        <div v-if="scope.row.StatusBox==2">异常</div>
        <div v-if="scope.row.StatusBox==3">进行中</div>
         </template>
      </el-table-column>
       <el-table-column
        prop="StatusPrepare"
        label="备货状态"
       >
        <template  slot-scope="scope">
       <div v-if="scope.row.StatusPrepare==0">无</div>
        <div v-if="scope.row.StatusPrepare==1">正确</div>
        <div v-if="scope.row.StatusPrepare==2">异常</div>
        <div v-if="scope.row.StatusPrepare==3">进行中</div>
         </template>
      </el-table-column>
       
      <el-table-column
        prop="StatusQc"
        label="品管状态"
       >
        <template  slot-scope="scope">
         <div v-if="scope.row.StatusQc==0">无</div>
        <div v-if="scope.row.StatusQc==1">正确</div>
        <div v-if="scope.row.StatusQc==2">异常</div>
        <div v-if="scope.row.StatusQc==3">进行中</div>
        </template>
      </el-table-column>

   
    </el-table>
    
         <el-pagination 
		 @current-change="handleCurrentChange"
      :current-page="pageData.Page"
	  :page-size ="pageData.RowNum"
      layout="total,pager, prev, next"
      :total="RowNum"></el-pagination>  
</div>
</template>
<script>
import {ORDER_API_PATH,PRODUCT_API_PATH} from "../../service/api"
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
          productList:[],
            searchForm:{
           startTime:new Date(new Date().toLocaleDateString()),
           endTime:new Date(new Date().toLocaleDateString()),
                productId:0,
                status1:0,
                status2:0,
                status3:0
            },
            status1:StatusDefinite,
            status2:StatusDefinite,
            status3:StatusDefinite,
            tableData:[],
            RowNum:0,
            pageData:{
              Page:1,
              RowNum:20
            }
        }
    },
    created(){
      
        this.getProductList()
    },
    methods:{
        resetClick(){
            this.searchForm = {
              productId:0,
                boxNum:"",
               	startTime:new Date(new Date().toLocaleDateString()),
					endTime:new Date(new Date().toLocaleDateString()),
                status1:0,
                status2:0,
                status3:0,
            }
        },
        toSnListClick(item){
			
			let startTime = this.moment(this.searchForm.startTime).format("YYYY-MM-DD 00:00:00")
			 let endTime = this.moment(this.searchForm.endTime).format("YYYY-MM-DD 23:59:59")
			
this.$router.push({
	name:"Sn",
	query:{
		orderId:item.OrderID,
		startTime:startTime,
		endTime:endTime
	}
})
			},
						toBoxListClick(item){
							let startTime = this.moment(this.searchForm.startTime).format("YYYY-MM-DD 00:00:00")
							 let endTime = this.moment(this.searchForm.endTime).format("YYYY-MM-DD 23:59:59")
this.$router.push({
	name:"Box",
	query:{
		orderId:item.OrderID,
	startTime:startTime,
	endTime:endTime
	}
})
			},
						toRecipientListClick(item){
							let startTime = this.moment(this.searchForm.startTime).format("YYYY-MM-DD 00:00:00")
							 let endTime = this.moment(this.searchForm.endTime).format("YYYY-MM-DD 23:59:59")
this.$router.push({
	name:"Delivery",
	query:{
		orderId:item.OrderID,
	startTime:startTime,
	endTime:endTime
	}
})
			},
        	getProductList(){
				 let formData = new FormData()
            formData.append("Act","GetProductList")
            formData.append("Token",sessionStorage.getItem("token"))
		
            this.$axios.post(PRODUCT_API_PATH,formData).then(res=>{
                if(res.data.Ret==0){
					
                    this.productList = [{
						ProductID:0,
						ProductBriefName:"全部"
					}].concat(res.data.Data)
					this.RowNum = res.data.Recordcount
                }else{
					this.$message({
						message:res.data.Msg,
						type:"error",
						duration:3000
					});
				}
            }).finally(()=>{
				 this.getOrderList()
			})
			},
			handleCurrentChange(){
			  this.getOrderList()
			},
          getOrderList(){
				let formData = new FormData()
				formData.append("Act","GetOrderList")
				formData.append("Token",sessionStorage.getItem("token"))
				formData.append("ProductID",this.searchForm.productId)
					formData.append("Page",this.pageData.Page-1)
			formData.append("RowNum",this.pageData.RowNum)
  let startTime = this.moment(this.searchForm.startTime).format("YYYY-MM-DD 00:00:00")
        let endTime = this.moment(this.searchForm.endTime).format("YYYY-MM-DD 23:59:59")
        formData.append("StartTime",new Date(startTime).getTime()/1000)
        formData.append("EndTime",new Date(endTime).getTime()/1000)
      		formData.append("StatusBox",this.searchForm.status1)
          		formData.append("StatusPrepare",this.searchForm.status2)
              		formData.append("StatusQc",this.searchForm.status3)
				this.$axios.post(ORDER_API_PATH,formData).then(res=>{
					
					if(res.data.Ret == 0){
						res.data.Data = res.data.Data?res.data.Data:[]
						let data = res.data.Data
						
						data = data.map(v=>{
							let product = this.productList.find(item=>item.ProductID == v.ProductID)
							v.CreateTime = this.moment(new Date(v.CreateTime*1000)).format('YYYY-MM-DD HH:mm:ss')
							v.ProductBriefName = product?product.ProductBriefName:""
						
							return v
						})
						this.tableData = data
						this.RowNum = res.data.Recordcount
						
					}
				})
            },
        searchClick(){
          this.getOrderList()
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