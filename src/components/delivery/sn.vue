<template>
<div class="page-container">
<el-form label-position="right" label-width="120px" :model="formData">
  <el-form-item label="订单序号">
    <el-input v-model="formData.orderId" ref="boxNumRef" placeholder="" readonly></el-input>
  </el-form-item>
    <el-form-item label="客户名称">
    <el-input v-model="formData.recipientor" ref="boxNumRef" placeholder="" readonly></el-input>
  </el-form-item>
    <el-form-item label="发货数量（台）">
    <el-input v-model="formData.snTotal" ref="boxNumRef" placeholder="" readonly></el-input>
  </el-form-item>

 <div style="display:flex;align-items:center;">
 <div style="flex:1">
  <template v-for="item in formData.snBox">
  <el-form-item label="SN号起始">
    <el-input v-model="item.SnStart"></el-input>
  </el-form-item>
  <el-form-item label="SN号终止">
    <el-input v-model="item.SnEnd"></el-input>
  </el-form-item>
   </template>
  </div>
  <i class="el-icon-circle-plus-outline" style="font-size:50px;margin-left:15px;" @click="addSnBoxClick"></i>
  </div>

   <el-button type="primary" @click="confirmClick">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>

</el-form>


</div>
</template>
<script>
import {RECIPIENT_API_PATH} from "../../service/api"
import Vue from "vue"


export default{
data(){
  return {
 
    formData:{
      orderId:"",
      recipientor:"",
      recipientId:"",
      snTotal:"",
      snBox:[{
           SnStart:"",
      SnEnd:"",
      }]
      
    }
  }
},
created(){
this.formData.recipientId = this.$route.query.recipientId?this.$route.query.recipientId:""
this.formData.recipientor = this.$route.query.recipientCompany? this.$route.query.recipientCompany:""
this.formData.orderId = this.$route.query.orderId?this.$route.query.orderId:""
this.formData.snTotal = this.$route.query.snTotal? this.$route.query.snTotal:""

},
methods:{
   addSnBoxClick(){
       this.formData.snBox.push({
           SnStart:"",
           SnEnd:""
       })
   },
   confirmClick(){
       
       let formData = new FormData()
       formData.append(     "RecipientID",this.formData.recipientId)
      formData.append(     "SnBox",JSON.stringify(this.formData.snBox))
      debugger
            formData.append(     "Token",sessionStorage.getItem("token"))
            formData.append("Act","AssignSn")
       this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
           if(res.data.Ret == 0){
             this.$router.go(-1)
           }else{
						 this.$message(res.data.Msg)
					 }
       })

   }
}
}
</script>



<style>
.el-form-item{
  position:relative;
  margin:20px 0;
}
.error{
  position:absolute;
  left:0px;
  color:red;
}
.el-icon-check,.el-icon-close{
  position:absolute;
  left:100%;
  margin-left:10px;
  top:50%;
  transform:translateY(-50%);
}
.el-form{
  width:90%;
}
</style>