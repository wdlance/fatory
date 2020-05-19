<template>
<div class="page-container">
<el-form label-position="right" label-width="120px" :model="formData">
  <div class="form-group">
		<div class="label">订单号</div>
    <el-input v-model="formData.orderId" ref="boxNumRef" placeholder="" readonly></el-input>
  </div>
    <div class="form-group">
			<div class="label">客户名称</div>
    <el-input v-model="formData.recipientor" ref="boxNumRef" placeholder="" readonly></el-input>
  </div>
    <div class="form-group">
			<div class="label">发货数量（台）</div>
    <el-input v-model="formData.snTotal" ref="boxNumRef" placeholder="" readonly></el-input>
  </div>

 <div style="display:flex;align-items:center;">
 <div style="flex:1">
  <template v-for="(item,index) in formData.snBox">
	  <div  :key="index">
		  <div class="form-group">
		  		<div class="label">SN号起始</div>
		    <el-input v-model="item.SnStart"></el-input>
		  </div>
		  <div  class="form-group">
		  		<div class="label">SN号终止</div>
		    <el-input v-model="item.SnEnd"></el-input>
		  </div>
	  </div>
 
   </template>
  </div>
  <i class="el-icon-circle-plus-outline" style="font-size:50px;margin-left:15px;" @click="addSnBoxClick"></i>
  </div>
<div class="operates">
   <el-button type="primary" @click="confirmClick">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
</div>
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
.div{
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