<template>
	<div class="page-container">
	<el-table
	      :data="productList"
	      style="width:100%">
	      <el-table-column
	        prop="ProductID"
	        label="产品ID"
	       >
	      </el-table-column>
	      <el-table-column
	        prop="ProductBriefName"
	        label="产品简称"
	       >
	      </el-table-column>
	      <el-table-column
	        prop="ProductSmallLimit"
	        label="物流小件判定(<=该数量)">
	      </el-table-column>
	      <el-table-column
	        prop="ProductSmallPrice"
	        label="小件单价(元)"
	       >
	      </el-table-column>
	      <el-table-column
	        prop="ProductBigPrice"
	        label="大件单价(元)"
	       >
	      </el-table-column>
	       <el-table-column
	         prop=""
	         label="操作"
	        >
			<template slot-scope="scope">
				 <a @click="edit(scope)">编辑</a>
			</template>
	       </el-table-column>
	    </el-table>
	   <!--  <el-pagination
	                @current-change="pageChange"
	       :current-page.sync="pageData.Page"
	       :page-size="pageData.RowNum"
	       layout="total, prev, pager, next"
	       :total="RowNum">
	     </el-pagination> -->
		 <Edit ref="editRef"></Edit>
	</div>
</template>

<script>
import {PRODUCT_API_PATH} from "../../service/api" 
import Edit from "./edit"
	export default{
		components:{Edit},
		data(){
			return{
				productList:[],
				pageData:{
					Page:1,
					RowNum:0
				},
				RowNum:0
			}
		},
		created(){
			this.getProductList()
		},
		methods:{
			getProductList(){
				let formData = new FormData()
				formData.append("Act","GetProductList")
				formData.append("Token",sessionStorage.getItem("token"))
				formData.append("Page",this.pageData.Page-1)
				formData.append("RowNum",this.pageData.RowNum)
				this.$axios.post(PRODUCT_API_PATH,formData).then(res=>{
				    if(res.data.Ret==0){
				        this.productList = res.data.Data
				    }else{
						this.$message({
							message:res.data.Msg,
							type:"error",
							duration:3000
						});
					}
				})
			},
			edit(item){
				
				this.$refs.editRef.show(item.row,()=>{
					this.getProductList()
				})
			},
			pageChange(){
				this.getProductList()
			}
		}
	}
</script>

<style>
</style>
