<template>
	<el-dialog title="" :visible.sync="dialogFormVisible">
	  <div class="form-group">
	  			<div class="flex">
	  				<div class="label">产品简称</div>
	  				<el-input v-model="formData.ProductBriefName"></el-input>
	  			</div>
	  			
	  			
	  		</div>
			<div class="form-group">
						<div class="flex">
							<div class="label">物流小件判定(<=该数量)</div>
							<el-input v-model="formData.ProductSmallLimit"></el-input>
						</div>
						
			
					</div>
					<div class="form-group">
								<div class="flex">
									<div class="label">小件单价(元)</div>
									<el-input v-model="formData.ProductSmallPrice"></el-input>
								</div>
								
								
							</div>
							<div class="form-group">
										<div class="flex">
											<div class="label">大件单价(元)</div>
											<el-input v-model="formData.ProductBigPrice"></el-input>
										</div>
										
										
									</div>
									<div class="form-group">
												<el-button type="primary" @click="confirm">确 定</el-button>
												    <el-button @click="dialogFormVisible = false">取 消</el-button>
												
												
											</div>
									
								
	</el-dialog>
</template>

<script>
	import {PRODUCT_API_PATH} from "../../service/api" 
	export default{
		data(){
			return{
				dialogFormVisible:false,
				formData:{
					ProductID:"",
					ProductBriefName:"",
					ProductSmallLimit:"",
					ProductSmallPrice:"",
					ProductBigPrice:"",
				},
				callback:()=>{}
			}
		},
		methods:{
			show(item,callback){
				this.dialogFormVisible = true
					
				this.formData = {
					...item
				}
				this.callback = callback
			},
			confirm(){
				let formData = new FormData()
				formData.append("Act","EditProduct")
				formData.append("Token",sessionStorage.getItem("token"))
				formData.append("ProductID",this.formData.ProductID)
				formData.append("ProductBriefName",this.formData.ProductBriefName)
				formData.append("ProductSmallLimit",this.formData.ProductSmallLimit)
				formData.append("ProductSmallPrice",this.formData.ProductSmallPrice)
				formData.append("ProductBigPrice",this.formData.ProductBigPrice)
				this.$axios.post(PRODUCT_API_PATH,formData).then(res=>{
				    if(res.data.Ret==0){
				        this.$message("产品编辑成功！")
						this.dialogFormVisible = false
						this.callback()
				    }else{
						this.$message({
							message:res.data.Msg,
							type:"error",
							duration:3000
						});
					}
				})
			}
		}
	}
</script>

<style>
</style>
