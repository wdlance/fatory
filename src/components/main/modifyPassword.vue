<template>
<el-dialog title="" :visible.sync="dialogFormVisible">
  <el-form :model="formData">
    <el-form-item label="原密码" :label-width="100">
      <el-input v-model="formData.old_password" autocomplete="off" type="password"></el-input>
    </el-form-item>
     <el-form-item label="新密码" :label-width="100">
      <el-input v-model="formData.new_password" autocomplete="off" type="password"></el-input>
    </el-form-item>
     <el-form-item label="確認密码" :label-width="100">
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
            this.dialogFormVisible = true
        },
        modifyPasswordClick(){
            let {new_password,confirm_password} = this.formData
            if(new_password!=confirm_password){
                this.$message("兩次輸入的密碼不相同！")
                return
            }
        }
    }

}
</script>