<template>
<div class="page-container">
<div class="search-wrapper">
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
        prop="ProductBriefName"
        label="产品简称"
       >
      </el-table-column>
      <el-table-column
        prop="ProductTotal"
        label="产品总数">
      </el-table-column>
      <el-table-column
        prop="NumberPerBox"
        label="产品数/箱"
       >
      </el-table-column>
      <el-table-column
        prop="SnTotal"
        label="SN总数"
        >
      	<template slot-scope="scope">
				<a @click="toSnListClick(scope.row)">{{scope.row.SnTotal}}</a>
				</template>
      </el-table-column>
      <el-table-column
        prop="BoxTotal"
        label="总箱数">
        <template slot-scope="scope">
				<a @click="toBoxListClick(scope.row)">{{scope.row.BoxTotal}}</a>
				</template>
      </el-table-column>
       <el-table-column
        prop="RecipientTotal"
        label="发货信息（收件人总数）"
       >
       	<template slot-scope="scope">
				<a @click="toRecipientListClick(scope.row)">{{scope.row.RecipientTotal}}</a>
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
    name:"无"
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
					endTime:new Date(new Date(new Date().toLocaleDateString()).getTime()+1*24*60*60*1000),
                productId:"",
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
              Page:0,
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
					endTime:new Date(new Date(new Date().toLocaleDateString()).getTime()+1*24*60*60*1000),
                status1:0,
                status2:0,
                status3:0,
            }
        },
        toSnListClick(item){
this.$router.push({
	name:"Sn",
	query:{
		orderId:item.OrderID,
		startTime:this.searchForm.startTime.getTime(),
		endTime:this.searchForm.endTime.getTime()
	}
})
			},
						toBoxListClick(item){
this.$router.push({
	name:"Box",
	query:{
		orderId:item.OrderID,
		startTime:this.searchForm.startTime.getTime(),
		endTime:this.searchForm.endTime.getTime()
	}
})
			},
						toRecipientListClick(item){
this.$router.push({
	name:"Delivery",
	query:{
		orderId:item.OrderID,
		startTime:this.searchForm.startTime.getTime(),
		endTime:this.searchForm.endTime.getTime()
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
                }
            }).finally(()=>{
				 this.getOrderList()
			})
			},
          getOrderList(){
				let formData = new FormData()
				formData.append("Act","GetOrderList")
				formData.append("Token",sessionStorage.getItem("token"))
				formData.append("ProductID",this.searchForm.productId)
					formData.append("Page",this.pageData.Page)
			formData.append("RowNum",this.pageData.RowNum)
							formData.append("StartTime",this.searchForm.startTime/1000)
			formData.append("EndTime",this.searchForm.endTime/1000)
      		formData.append("StatusBox",this.searchForm.status1)
          		formData.append("StatusPrepare",this.searchForm.status2)
              		formData.append("StatusQc",this.searchForm.status3)
				this.$axios.post(ORDER_API_PATH,formData).then(res=>{
					
					if(res.data.Ret == 0){
						let data = res.data.Data
						data = data.map(v=>{
							let product = this.productList.find(item=>item.ProductID == v.ProductID)
							v.CreateTime = this.moment(new Date(v.CreateTime*1000)).format('YYYY-MM-DD hh:mm:ss')
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

.label{
    flex-shrink:0;
    width:80px;

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