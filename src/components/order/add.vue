<template>
<el-dialog label-position="right" :visible.sync="dialogFormVisible"  label-width="140">
  <el-form :model="formData">
   <div class="form-group" label="">
	   <div class="label">订单号</div>
      <el-input v-model="formData.orderId" autocomplete="off"></el-input>
    </div> 
      <div class="form-group" label="产品简称">
		    <div class="label">产品简称</div>
      <el-select v-model="formData.productId" placeholder="请选择">
  <el-option
      v-for="(item,index) in productList"
      :key="item.ProductID"
      :label="item.ProductBriefName"
      :value="item.ProductID">
      <div style="width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;">
        <span>{{ item.ProductBriefName }}</span>
   
      <i class="el-icon-remove-outline" @click.stop="delProductClick(index)"></i>
      </div>
    
    </el-option>
    </el-select>
    <el-button type="primary" @click="addProductNameClick">+新增</el-button>
    </div>
    
     <div class="form-group">
		   <div class="label">产品总数</div>
      <el-input v-model="formData.productTotalNum" autocomplete="off" type="number"></el-input>
    </div>
      <div class="form-group">
		   <div class="label">产品数/每箱</div>
      <el-input v-model="formData.productNumberInPerBox" autocomplete="off" type="number"></el-input>
    </div>
  </el-form>
  <div slot="footer" class="dialog-footer">

    <el-button type="primary" @click="addOrderClick">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div>
  </el-dialog>
</template>
<script>
import {ORDER_API_PATH,PRODUCT_API_PATH} from "../../service/api"
export default{
    props:['callback'],
    data(){
        return {
            hasClick:false,
            dialogFormVisible:false,
            productList:[],
            formData:{
                orderId:"",
                productId:"",
                productTotalNum:"",
                productTotalNum:"",
                productNumberInPerBox:"",
            }
        }
    },
    
    methods:{
        show(type,item){
            this.type = type
            this.dialogFormVisible = true
            this.getProductList()
            if(type==0){
                this.formData={
                      orderId:"",
                productId:"",
                productTotalNum:"",
                productTotalNum:"",
                productNumberInPerBox:"",
                }
            }else{
                this.formData = {
                     orderId:"",
                productId:"",
                productTotalNum:"",
                productTotalNum:"",
                productNumberInPerBox:"",
                }
            }
        },
        getProductList(){
            let formData = new FormData()
            formData.append("Act","GetProductList")
            formData.append("Token",sessionStorage.getItem("token"))
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
        addProductNameClick(){
         
            this.hasClick = true
            this.$prompt('产品简称', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
         
        }).then(data=>{
            if(data.value == ""){
                
				this.$message({
					message:"请填写产品简称",
					type:"error",
					duration:3000
				});
                return 
            }
            let formData = new FormData()
            formData.append("Act","AddProduct")
            formData.append("Token",sessionStorage.getItem("token"))
            formData.append("ProductBriefName",data.value)
            this.$axios.post(PRODUCT_API_PATH,formData).then(res=>{
                if(res.data.Ret==0){
                    
					this.$message({
						message:"产品添加成功",
						type:"success",
						duration:3000
					});
                     this.productNames.push(data.value)
                }else{
					this.$message({
						message:res.data.Msg,
						type:"error",
						duration:3000
					});
				}
            })
           
        }).finally(()=>{
            this.hasClick = false
        })
        },
        
        addOrderClick(){
            if(this.hasClick){
                return 
            }
            this.hasClick = true
             if(this.formData.orderId==""||this.formData.productName==""||this.formData.productTotalNum==""||this.productNumberInPerBox==""){
                
				this.$message({
					message:"请填写信息",
					type:"error",
					duration:3000
				});
                return
            }
            let formData = new FormData()
            formData.append("OrderID",this.formData.orderId)
            formData.append("ProductID",this.formData.productId)
            formData.append("ProductTotal",this.formData.productTotalNum)
            formData.append("NumberPerBox",this.formData.productNumberInPerBox)
            formData.append("Act","AddOrder")
            formData.append("Token",sessionStorage.getItem("token"))
            this.$axios.post(ORDER_API_PATH,formData).then(res=>{
                if(res.data.Ret==0){
                    this.$emit("getOrderList")
                    
					this.$message({
						message:"订单创建成功",
						type:"success",
						duration:3000
					});
                    this.dialogFormVisible = false

                }else{
					this.$message({
						message:res.data.Msg,
						type:"error",
						duration:3000
					});
				}
            }).finally(()=>{
                this.hasClick = false
            })
        },
        delProductClick(index){
            if(this.hasClick){
                return
            }
            this.hasClick = true
            let formData = new FormData()
            let item = this.productList[index]
            formData.append("ProductID",item.ProductID)
           
            formData.append("Act","DelProduct")
            formData.append("Token",sessionStorage.getItem("token"))
            this.$axios.post(PRODUCT_API_PATH,formData).then(res=>{
                if(res.data.Ret == 0){
                   
					this.$message({
						message:"删除产品成功",
						type:"success",
						duration:3000
					});
                    this.productList.splice(index,1)
                    this.getProductList()
                }else{
					this.$message({
						message:res.data.Msg,
						type:"error",
						duration:3000
					});
				}
            }).finally(()=>{
                this.hasClick = false
            })
        }
    }
}
</script>
<style scoped="scoped">

.el-input{
    width:100%;
}

.el-select{
    flex:1;
}

.el-select-dropdown__item{
    display:flex;
    justy-content:space-between;
    align-items:center;
}
.label{
	min-width:120px;
}
</style>;