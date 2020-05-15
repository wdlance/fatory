<template>
<el-dialog title="" :visible.sync="dialogFormVisible">
  <el-form :model="formData">
    <el-form-item label="原密码" label-width="100">
      <el-input v-model="formData.old_password" autocomplete="off" type="password"></el-input>
    </el-form-item>
     <el-form-item label="新密码" label-width="100">
      <el-input v-model="formData.new_password" autocomplete="off" type="password"></el-input>
    </el-form-item>
     <el-form-item label="确认密码" label-width="100">
      <el-input v-model="formData.confirm_password" autocomplete="off" type="password"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">

    <el-button type="primary" @click="modifyPasswordClick">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div>
  </el-dialog>
</template>
<script>
import {USER_API_PATH} from "../../service/api"
export default{
    data(){
        return{
            dialogFormVisible:false,
            formData:{
                old_password:"",
                new_password:"",
                confirm_password:""
            }
        }
    },
    methods:{
        show(){
            this.formData = {
              old_password:"",
              new_password:"",
              confirm_password:""
            }
            this.dialogFormVisible = true
        },
        modifyPasswordClick(){
            let {new_password,confirm_password} = this.formData
            
            if(new_password!=confirm_password){
                this.$message("兩次輸入的密码不相同！")
                return
            }
            let formData = new FormData()
            formData.append("Token",sessionStorage.getItem("token"))
            formData.append("Act","ChangePassword")
            formData.append("OldPassword",this.md5(this.formData.old_password))
            formData.append("Password",this.md5(this.formData.new_password))
            this.$axios.post(USER_API_PATH,formData).then(res=>{
              if(res.data.Ret == 0){
                this.dialogFormVisible = false
                this.$message("密码修改成功")
                this.$router.push("/login")
              }else{
                this.$message(res.data.Msg)
              }
            })
        }
    }

}
</script>