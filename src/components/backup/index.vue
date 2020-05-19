<template>
<el-form label-position="right">
  <div class="">
	    <div class="form-group">
		<div class="label">每日自动备份时间</div>
    <el-input v-model="backupTime" @blur="changeBackupTime"></el-input>
	</div>
		 <div class="error" v-if="timeError">时间格式不正确，正确格式为00:00:00</div>
		 
  </div>
  <div class="" style="text-align: left;">
	   <div class="form-group">
		<div class="label">自动备份路径</div>
    <el-input v-model="backupPath"></el-input>
	</div>
    <div class="meta">备份文件以日期命名，格式：20200419.bak</div>
  </div>
   <div class="form-group">
		 <div class="label">定期删除日志</div>
    <el-input v-model="logClearTime" style="width:80%"></el-input>
    <span class="unit">单位：天</span>
  </div>
	<div class="operates">
		<el-button type="primary" @click="confirmClick">确定</el-button>
		 <el-button @click="cancelClick">取消</el-button>
	</div>
 
</el-form>
</template>
<script>
import {SYSTEM_API_PATH} from "../../service/api"
export default{
  data(){
    return{
			timeError:false,
      backupTime:"",
      backupPath:"",
      logClearTime:""
    }
  },
  created(){
    this.getSystemInfo()
  },
  methods:{
		changeBackupTime(){
			 var reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;     //时间格式的正则表达式
			
			                     
			
			                if (!reg.test(this.backupTime)) {
			
			                    this.timeError = true
			
			                    
			
			                }else{
				this.timeError = false
			}
	
		},
    getSystemInfo(){
      let formData = new FormData()
      formData.append("Token",sessionStorage.getItem("token"))
      formData.append("Act","GetSystem")
      this.$axios.post(SYSTEM_API_PATH,formData).then(res=>{
        if(res.data.Ret == 0){
          this.backupPath = res.data.Data.DatabaseBackupPath
          this.backupTime = res.data.Data.DatabaseBackupTime
          this.logClearTime = res.data.Data.LogAutocleanCycle
        }else{
          this.$message({
          	message:res.data.Msg,
          	type:"error",
          	duration:3000
          });
        }
      })
    },
    confirmClick(){
		this.changeBackupTime()
	if(this.timeError){
		return
	}
	
      let formData = new FormData()
      formData.append("Token",sessionStorage.getItem("token"))
      formData.append("Act","SetSystem")
      formData.append("DatabaseBackupPath",this.backupPath)
      formData.append("DatabaseBackupTime",this.backupTime)
      formData.append("LogAutocleanCycle",this.logClearTime)
      this.$axios.post(SYSTEM_API_PATH,formData).then(res=>{
        if(res.data.Ret == 0){
          this.$message({
          	message:"系统设置成功",
          	type:"success",
          	duration:3000
          })
        }else{
          this.$message({
          	message:res.data.Msg,
          	type:"error",
          	duration:3000
          });
        }
      })
    },
    cancelClick(){

    }
  }
}
</script>
<style scoped="script">
.el-form-item{
  text-align:left;
  margin-top: 30px;
}

.error{
  position: relative;
  left:0px;
  color:red;
  top: 100%;
  margin-top: 10px;
  text-align: left;
}
.unit{
	flex-shrink: 0;
}
</style>