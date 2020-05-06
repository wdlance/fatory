<template>
<el-dialog title="" :visible.sync="dialogFormVisible">
  <el-form :model="formData">
   <el-form-item label="订单号" label-width="100">
      <el-input v-model="formData.orderId" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="产品简称" label-width="100">
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
    </el-form-item>
    
     <el-form-item label="产品总数" label-width="100">
      <el-input v-model="formData.productTotalNum" autocomplete="off" type="number"></el-input>
    </el-form-item>
      <el-form-item label="产品数/每箱" label-width="100">
      <el-input v-model="formData.productNumberInPerBox" autocomplete="off" type="number"></el-input>
    </el-form-item>
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
                }
            })
        },
        addProductNameClick(){
         
            this.hasClick = true
            this.$prompt('产品简称', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
         
        }).then(res=>{
            if(res.value == ""){
                this.$message("请填写产品简称")
                return 
            }
            let formData = new FormData()
            formData.append("Act","AddProduct")
            formData.append("Token",sessionStorage.getItem("token"))
            formData.append("ProductBriefName",res.value)
            this.$axios.post(PRODUCT_API_PATH,formData).then(res=>{
                if(res.data.Ret==0){
                    this.$message("产品添加成功")
                     this.productNames.push(res.value)
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
                this.$message("请填写信息")
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
                    this.$message("订单创建成功")
                    this.dialogFormVisible = false

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
                    this.$message("刪除产品成功")
                    this.productList.splice(index,1)
                    this.getProductList()
                }
            }).finally(()=>{
                this.hasClick = false
            })
        }
    }
}
</script>
<style>
.el-form-item{
display:flex;
align-items:center;
justy-content:space-between;

}
.el-input{
    width:100%;
}
.el-form-item__content{
    flex:1;
    display:flex;
}
.el-select{
    flex:1;
}
.el-form-item__label{
    width:120px;
    text-align:right;
}
.el-select-dropdown__item{
    display:flex;
    justy-content:space-between;
    align-items:center;
}
</style>;