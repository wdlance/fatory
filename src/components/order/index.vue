<template>
	<div class="page-container">
	<div class='add-wrapper'>
	<el-button type="primary" @click="addOrderClick">+添加</el-button>
	</div>
    <div class="search-wrapper">
	 <div class="block">
    <span class="label-text">开始时间</span>
    <el-date-picker
      v-model="searchForm.startTime"
      type="date"
	  format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
  </div>
   <div class="block">
    <span class="label-text">结束时间</span>
    <el-date-picker
      v-model="searchForm.endTime"
      type="date"
	  format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
  </div>
   <div class="block">
    <span class="label-text">产品简称</span>
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
  <div class="operate">
   <el-button type="primary" @click="searchClick">查询</el-button>
    <el-button type="primary" @click="resetClick">重置</el-button>
  </div>
    
    </div>
	
		 <el-table
		      :data="orderList"
		      style="width: 100%">
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
		        label="产品总数"
		        width="120">
		      </el-table-column>
		      <el-table-column
		        prop="NumberPerBox"
		        label="产品数/箱"
		        width="120">
		      </el-table-column>
			   <el-table-column
		       prop="SnTotal"
		        label="SN总数"
		        width="100">
				<template slot-scope="scope">
				<a @click="toSnListClick(scope.row)">{{scope.row.SnTotal}}</a>
				</template>
		      </el-table-column>
		      <el-table-column
		        prop="BoxTotal"
		        label="总箱数"
		        width="90">
	<template slot-scope="scope">
				<a @click="toBoxListClick(scope.row)">{{scope.row.BoxTotal}}</a>
				</template>
			
		      </el-table-column>
		      <el-table-column
		        prop="RecipientTotal"
		        label="收件信息"
		        width="120">
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
		        prop="role"
		        label="导入数据"
		        >
				<template slot-scope="scope">
				<div>
				<a>
				导入《SN》
				<input type="file" @change="changeFile($event,scope.row,1)">
				</a>
				</div>
				<div>
				<a>
				 导入《发货申请单》
				 	<input type="file" @change="changeFile($event,scope.row,2)">
				</a>
				</div>
				<div>
				<a>
				导入《五码合一》
					<input type="file" @change="changeFile($event,scope.row,3)">
				</a>
				</div>
				<div>
				<a>
				导入《电子运单》
					<input type="file" @change="changeFile($event,scope.row,4)">
				</a>
				</div>
				</template>
		      </el-table-column>
			   <el-table-column
		        prop="role"
		        label="导出数据"
		        >
				 <template slot-scope="scope">
				 <div>
				 <a :href="scope.row.href1">
				导出《跨越物流的发货信息》
				 </a>

    </div>
	 <div>
				 <a :href="scope.row.href2">
				 导出《出货交接明细表》
				 </a>

				  <a :href="scope.row.href3">
				 导出《出货信息表》
				 </a>

    </div>
	
        </template>
		      </el-table-column>
		      <el-table-column

		        label="操作">
                <template slot-scope="scope">
     
        <a @click="delOrderClick(scope)">刪除</a>
        </template>
		      </el-table-column>
		    </el-table>

         <el-pagination
		 
		 @current-change="handleCurrentChange"
      :current-page="pageData.Page"
	  :page-size ="pageData.RowNum"
      layout="total,pager, prev, next"
      :total="RowNum"></el-pagination>  
	  <AddOrderDialog ref="addOrderDialogRef" v-on:getOrderList="getOrderList"/>
	</div>
</template>

<script>
import {ORDER_API_PATH,PRODUCT_API_PATH,UPLOAD_SN_API_PATH,UPLOAD_DISTRIBUTE_API_PATH,UPLOAD_WAYBILL_API_PATH,UPLOAD_5CODE_API_PATH,DOWNLOAD_DISTRIBUTE_API_PATH,DOWNLOAD_HANDOVER_API_PATH,DOWNLOAD_KUAYUEEXPRESS_API_PATH} from "../../service/api"
import AddOrderDialog from "./add"
	export default{
		components:{AddOrderDialog},
		data(){
			return{
                orderList:[],
				productList:[],
				RowNum:0,
				searchForm:{
					startTime:new Date(new Date().toLocaleDateString()),
					endTime:new Date(new Date(new Date().toLocaleDateString()).getTime()+1*24*60*60*1000),
					productId:0
				},
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
			downloadKuayueExpress(item){
				let formData = new FormData()
				formData.append("Token",sessionStorage.getItem("token"))
				formData.append("OrderID",item.OrderID)
				this.$axios.get(DOWNLOAD_KUAYUEEXPRESS_API_PATH,{
					params:{
						Token:sessionStorage.getItem("token"),
						OrderID:item.OrderID
					}
				},{
    headers: {
      "Content-Type": "application/octet-stream"
    },
	  responseType: 'blob' 
  }).then(res=>{
					
					  var blob = this.data;
        var reader = new FileReader();
        reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
        reader.onload = function (e) {
          // 转换完成，创建一个a标签用于下载
          var a = document.createElement("a");
          a.download = name + ".xls";
          a.href = e.target.result;
          $("body").append(a); // 修复firefox中无法触发click
          a.click();
          resolve(200)
          $(a).remove();
        };
				})
			},
				downloadHandover(item){
			let formData = new FormData()
				formData.append("Token",sessionStorage.getItem("token"))
				formData.append("OrderID",item.OrderID)
				this.$axios.get(DOWNLOAD_HANDOVER_API_PATH,{
					params:{
						Token:sessionStorage.getItem("token"),
						OrderID:item.OrderID
					}
				})
			},	 
				downloadDistribute(item){
			let formData = new FormData()
				formData.append("Token",sessionStorage.getItem("token"))
				formData.append("OrderID",item.OrderID)
				this.$axios.get(DOWNLOAD_DISTRIBUTE_API_PATH,{
					params:{
						Token:sessionStorage.getItem("token"),
						OrderID:item.OrderID
					}
				})
			},
			changeFile(e,item,type){
				let file = e.target.files[0]
				let url = ""
				if(type==1){
					url = UPLOAD_SN_API_PATH
				}else if(type==2){
					url = UPLOAD_DISTRIBUTE_API_PATH
				}else if(type==3){
					url = UPLOAD_5CODE_API_PATH
					}else if(type==4){
					url = UPLOAD_WAYBILL_API_PATH
				}
				let formData = new FormData()
			
            formData.append("Token",sessionStorage.getItem("token"))
						 formData.append("OrderID",item.OrderID)
            formData.append("file",file)
			this.$axios.post(url,formData).then(res=>{
				
				if(res.data.Ret == 0){
					this.$message("成功导入"+res.data.Data+"条数据")
					this.getOrderList()
				}else{
					this.$message(res.data.Msg)
				}
			}).finally(()=>{
				e.target.value = ""
			})
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
							formData.append("StartTime",this.searchForm.startTime/1000)
			formData.append("EndTime",this.searchForm.endTime/1000)
				this.$axios.post(ORDER_API_PATH,formData).then(res=>{
					
					if(res.data.Ret == 0){
						let data = res.data.Data
						
						if(data){
							data = data.map(v=>{
								let product = this.productList.find(item=>item.ProductID == v.ProductID)
								v.CreateTime = this.moment(new Date(v.CreateTime*1000)).format('YYYY-MM-DD HH:mm:ss')
								v.ProductBriefName = product?product.ProductBriefName:""
								v.href1 = DOWNLOAD_KUAYUEEXPRESS_API_PATH+"?Token="+sessionStorage.getItem("token")+"&OrderID="+v.OrderID
								v.href2 = DOWNLOAD_HANDOVER_API_PATH+"?Token="+sessionStorage.getItem("token")+"&OrderID="+v.OrderID
								v.href3 = DOWNLOAD_DISTRIBUTE_API_PATH+"?Token="+sessionStorage.getItem("token")+"&OrderID="+v.OrderID
								return v
							})
						}else{
							data = []
						}
						
						this.orderList = data
						this.RowNum = res.data.Recordcount
						
					}
				})
            },
			addOrderClick(){
				this.$refs.addOrderDialogRef.show(0)
			},
			resetClick(){
				this.searchForm = {
						startTime:new Date(new Date().toLocaleDateString()),
					endTime:new Date(new Date(new Date().toLocaleDateString()).getTime()+1*24*60*60*1000),
					productName:""
				}
			},
			searchClick(){
				this.getProductList()
			},
			editOrderClick(scope){
				this.$refs.addOrderDialogRef.show(1,scope.row)
			},
			delOrderClick(scope){
				   this.$confirm('确认删除订单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
			let formData = new FormData()
			formData.append("Act","DelOrder")
			formData.append("Token",sessionStorage.getItem("token"))
			formData.append("OrderID",scope.row.OrderID)
			this.$axios.post(ORDER_API_PATH,formData).then(res=>{
				
				if(res.data.Ret == 0){
					this.$message("刪除订单成功")
					this.productList.splice(scope.$index,1)
					this.getOrderList()
				}
			})
		})
			}
        }
	}
</script>

<style scoped="scoped">
.search-wrapper{
	display:flex;
	flex-wrap:wrap;
	align-items:center;
	border:1px solid #dcdcdc;
	padding:15px;
	justy-content:flex-start;
}
.block{

	padding:15px;
	box-sizing:border-box;
	display:flex;
	justy-content:flex-start;
	align-items:center;
}
.label-text{
	min-width:120px;
}
.operate{
	//display:flex;
}
.add-wrapper{
	display:flex;
	justy-content:flex-start;
	margin-bottom:15px;
}
td a{
	position:relative;
	display:block;
	margin:10px 0;
	color: #3a8ee6;
}
input[type=file]{
	position:absolute;
	left:0px;
	top:0px;
	width:100%;
	height:100%;
	opacity:0;
}
</style>
