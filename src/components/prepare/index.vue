<template>
<div class="page-container">
<el-form label-position="right" label-width="120px" :model="formData">
<div style="margin-bottom: 20px;">第{{currentNum}}/{{totalNum}}箱</div>
  <el-form-item label="快运单号">
    <el-input v-model="formData.expressId" ref="expressIdRef" placeholder="请扫描快运单号" @focus="focusInput('expressId')"></el-input>
  </el-form-item>
  <el-form-item label="SN号起始">
    <el-input v-model="formData.snStart" ref="snStartRef" placeholder="请扫描SN号起始" @focus="focusInput('snStart')"></el-input>
  </el-form-item>
  <el-form-item label="SN号终止">
    <el-input v-model="formData.snEnd" ref="snEndRef" placeholder="请扫描SN号终止"  @focus="focusInput('snEnd')"></el-input>
  </el-form-item>
  <el-form-item label="箱号">
    <el-input v-model="formData.boxNum" ref="boxNumRef" placeholder="请扫描箱号"  @focus="focusInput('boxNum')"></el-input>
	<div class="box-right" src="../../assets/right.png" v-if="boxChecked&&boxRight"></div>
	 <div class="box-error" src="../../assets/error.png" v-if="boxChecked&&!boxRight"></div>
	 <div class="error" v-if="boxChecked&&!boxRight">快运单号 {{formData.expressId}} 和箱号 {{formData.boxNum}} 不匹配</div>
  </el-form-item>
  <el-button type="primary" style="margin-top:50px;" @click="confirmTypeByScan">强制确认</el-button>
</el-form>
</div>
</template>
<script>
import {RECIPIENT_API_PATH} from "../../service/api"
import Vue from "vue"
Vue.directive('paste', {

  // 因为一个元素只有插入dom之后，才能获取焦点
  updated: function (el) {
    alert(el.value)
  },
})

export default{
data(){
  return {
	  path:"",
    focus:'expressId',
    totalNum:50,
    currentNum:0,
	boxChecked:false,
	boxRight:true,
    hasError:false,
    boxData:[],//从后台获取的每箱数据
	errorBoxList:[],
	okList:[],
    formData:{
      boxNum:"",
      snStart:"",
      snEnd:"",
      expressId:""
    }
  }
},
mounted(){
this.path = this.$route.query.type
console.log("path="+this.path)
document.body.onkeydown = (e)=>{

  if(e.keyCode == 13){
if(this.focus == 'expressId'){
    this.focus = 'snStart'
    this.$refs.snStartRef.focus()
    this.getBoxListByExpressID(this.snStart)
  }else if(this.focus == 'snStart'){
	  this.checkSnStart()
    this.focus = 'snEnd'
    this.$refs.snEndRef.focus()

  }else if(this.focus == 'snEnd'){
        this.checkSnEnd()
    this.focus = 'boxNum'
    this.$refs.boxNumRef.focus()
  }else if(this.focus == 'boxNum'){
	  this.checkBox()
    if(this.currentNum<this.totalNum-1){
      
    this.currentNum+=1
		this.focus = "snStart"
		this.$refs.snStartRef.focus()
		this.formData.snStart = ""
		this.formData.snEnd = ""
		this.formData.boxNum = ""
		this.boxChecked = false

    }else{
      this.currentNum+=1
	    this.confirmTypeByScan()
   

    }

  }
  }else if(e.keyCode==86){
    this.formData.boxNum = ""
  }
  
}
this.$nextTick(()=>{
  this.$refs.expressIdRef.focus()
})
},
methods:{
	focusInput(str){
		this.focus = str
	},
    checkBox(){
		    this.boxChecked = true
    if(this.boxData.find(v=>v.Box == this.formData.boxNum)){
		this.boxRight = true
      return true
    }else{
				this.boxRight = false
		this.errorBoxList.push(this.formData.boxNum)
		this.$message("箱号与快运单号不匹配")
      return false
    }
  },
   checkSnStart(){
    if(this.boxData.find(v=>v.SnStart == this.formData.snStart)){
		
      return true
    }else{
		this.hasError = true
		this.$message("Sn号起始与快运单号不匹配")
      return false
    }
  },
  checkSnEnd(){
      if(this.boxData.find(v=>v.SnEnd == this.formData.snEnd)){
      return true
    }else{
		this.hasError = true
		this.$message("Sn号终止与快运单号不匹配")
      return false
    }
  },

	confirmTypeByScan(){
		if(!this.hasError&&this.errorBoxList.length<=0){
			let formData = new FormData()
			    formData.append("Token",sessionStorage.getItem("token"))
		
			    formData.append("ExpressID",this.formData.expressId)
				if(this.path =='choice'){
						    formData.append("Act","SetStatusPrepareByExpressID")
					//formData.append("StatusPrepare",item.StatusPrepare)
				}else{
						    formData.append("Act","SetStatusQcByExpressID")
					//formData.append("StatusQc",item.StatusQc)
				}
			    
			    formData.append("ConfirmType","ConfirmTypeByEyes")
			    this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
							 if(res.data.Ret == 0){
							
								 this.focus = "expressId"
								 this.$refs.expressIdRef.focus()
								 this.formData = {
								    boxNum:"",
								 snStart:"",
								 snEnd:"",
								 expressId:""
								 }
								 this.totalNum = 0
								 this.currentNum = 0
								 this.boxChecked =false
							 }else{
								 this.$message(res.data.Msg)
							 }
						 })
		}else{
			let formData = new FormData()
			    formData.append("Token",sessionStorage.getItem("token"))
		
			    formData.append("ExpressID",this.formData.expressId)
				if(this.path =='choice'){
						    formData.append("Act","SetStatusPrepare")
				
				}else{
						    formData.append("Act","SetStatusQc")
			
				}
			    	formData.append("OkList",this.errorBoxList)

			    this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
							 if(res.data.Ret == 0){
								 this.focus = "expressId"
								 this.$refs.expressIdRef.focus()
								 this.formData = {
								    boxNum:"",
								 snStart:"",
								 snEnd:"",
								 expressId:""
								 }
								 this.totalNum = 0
								 this.currentNum = 0
								 this.boxChecked = false
							 }else{
								 this.$message(res.data.Msg)
							 }
						 })
		}
		
	},
  getBoxListByExpressID(){
    let formData = new FormData()
    formData.append("Act",'GetBoxListByExpressID')
    formData.append("Token",sessionStorage.getItem("token"))
      formData.append("ExpressID",this.formData.expressId)
   
    this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
      if(res.data.Ret == 0){
        this.boxData = res.data.Data
				this.totalNum = res.data.Data.length
      }
    })
  },
  pasteSn(e){
    
    console.log(e.target.value)
    this.formData.boxNum = e.target.value
  }
}
}
</script>



<style>
.el-form-item{
  position:relative;
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
.box-right,.box-error{
  position:absolute;
  width:50px;
  height: 50px;
  left:100%;
  margin-left:10px;
  top:50%;
  transform:translateY(-50%);
}
.box-right{
	background: url(../../assets/right.png)no-repeat center;
	background-size: contain;
}
.box-error{
	background: url(../../assets/error.png)no-repeat center;
	background-size: contain;
}
.el-form{
  width:90%;
}
</style>