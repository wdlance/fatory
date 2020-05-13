<template>
<el-form label-position="right" label-width="160px">
  <el-form-item label="每日自动备份时间">
    <el-input v-model="backupTime"></el-input>
  </el-form-item>
  <el-form-item label="自动备份路径">
    <el-input v-model="backupPath"></el-input>
    备份文件以日期命名，格式：20200419.bak
  </el-form-item>
   <el-form-item label="定期删除日志">
    <el-input v-model="logClearTime" style="width:80%"></el-input>
    <span class="unit">单位：天</span>
  </el-form-item>
   <el-button type="primary" @click="confirmClick">确定</el-button>
    <el-button @click="cancelClick">取消</el-button>
</el-form>
</template>
<script>
import {SYSTEM_API_PATH} from "../../service/api"
export default{
  data(){
    return{
      backupTime:"",
      backupPath:"",
      logClearTime:""
    }
  },
  created(){
    this.getSystemInfo()
  },
  methods:{
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
          this.$message(res.data.Msg)
        }
      })
    },
    confirmClick(){
      let formData = new FormData()
      formData.append("Token",sessionStorage.getItem("token"))
      formData.append("Act","SetSystem")
      formData.append("DatabaseBackupPath",this.backupPath)
      formData.append("DatabaseBackupTime",this.backupTime)
      formData.append("LogAutocleanCycle",this.logClearTime)
      this.$axios.post(SYSTEM_API_PATH,formData).then(res=>{
        if(res.data.Ret == 0){
          this.$message("系统设置成功")
        }else{
          this.$message(res.data.Msg)
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
}
</style>