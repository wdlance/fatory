<template>
<div class="page-container">
<el-form label-position="right" label-width="100px" :model="formData">
  <el-form-item label="箱号">
    <el-input v-model="formData.boxNum" ref="boxNumRef" placeholder="请扫描箱号"></el-input>
  </el-form-item>
  <el-form-item label="SN号起始">
    <el-input v-model="formData.snStart" ref="snStartRef" placeholder="请扫描SN号起始"></el-input>
  </el-form-item>
  <el-form-item label="SN号终止">
    <el-input v-model="formData.snEnd" ref="snEndRef" placeholder="请扫描SN号终止"></el-input>
  </el-form-item>
</el-form>
<div class="line"></div>
<div>第{{currentNum}}/{{totalNum}}个</div>
<el-form label-position="right" label-width="100px">
  <el-form-item label="SN号">

    <input class="el-input__inner" v-model="formData.sn" ref="snRef" placeholder="请扫描单个产品SN号" @paste="pasteSn($event)" />
    <i class="el-icon-check" v-if="snChecked&&snRight"></i>
     <i class="el-icon-close" v-if="snChecked&&!snRight"></i>
     <div class="error" v-if="snChecked&&!snRight">SN号 {{formData.sn}} 和箱号 {{formData.boxNum}} 不匹配</div>
  </el-form-item>
  
</el-form>
<el-button type="primary" style="margin-top:50px;">强制确认</el-button>
</div>
</template>
<script>
import {BOX_API_PATH} from "../../service/api"
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
    focus:'boxNum',
    totalNum:50,
    currentNum:0,
    snChecked:false,
    snRight:true,
    boxData:{},//从后台获取的每箱数据
    formData:{
      boxNum:"",
      snStart:"",
      snEnd:"",
      sn:""
    }
  }
},
mounted(){

document.body.onkeydown = (e)=>{

  if(e.keyCode == 13){
if(this.focus == 'boxNum'){
    this.focus = 'snStart'
    this.$refs.snStartRef.focus()

  }else if(this.focus == 'snStart'){

    this.focus = 'snEnd'
    this.$refs.snEndRef.focus()
    this.getBoxBySnStart(this.snStart)
  }else if(this.focus == 'snEnd'){
        this.checkSnEnd()
    this.focus = 'sn'
    this.$refs.snRef.focus()
  }else if(this.focus == 'sn'){

    if(this.currentNum<this.totalNum-1){
      
    this.currentNum+=1

    }else{
      this.currentNum+=1
      this.focus = "boxNum"
      this.$refs.boxNumRef.focus()
      this.formData = {
         boxNum:"",
      snStart:"",
      snEnd:"",
      sn:""
      }
      this.totalNum = 0
      this.currentNum = 0

    }

  }
  }
  
}
this.$nextTick(()=>{
  this.$refs.boxNumRef.focus()
})
},
methods:{
    checkBox(){
    if(this.formData.boxNum ==  this.boxData.Box){
      return true
    }else{
      return false
    }
  },
    checkSnStart(){
    if(this.formData.snStart ==  this.boxData.SnStart){
      return true
    }else{
      return false
    }
  },
  checkSnEnd(){
    if(this.formData.snEnd ==  this.boxData.SnEnd){
      return true
    }else{
      return false
    }
  },
  checkSn(sn){
    if(this.boxData.SnList.findIndex(sn)>-1){
      return true
    }else{
      return false
    }
  },
  getBoxBySnStart(snStart){
    let formDatam = new formData()
    formData.append("Act",getBoxBySnStart)
    formData.append("Token",sessionStorage.getItem("token"))
      formData.append("SnStart",this.formData.snStart)
   
    this.$axios.post(BOX_API_PATH,formData).then(res=>{
      if(res.data.Ret == 0){
        this.boxData = res.data.Data
        if(!this.checkBox())
        this.checkSnStart()
      }
    })
  },
  pasteSn(e){
    
    console.log(e.target.value)
    this.formData.sn = e.target.value
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
.el-form{
  width:90%;
}
</style>