<template>
<el-dialog title="" :visible.sync="dialogFormVisible">
  <el-form :model="formData">
    <el-form-item label="角色" label-width="100">
     <el-select v-model="formData.role" placeholder="">
		        <el-option
		          v-for="item in roleList"
		          :key="item.id"
		          :label="item.name"
		          :value="item.id">
		        </el-option>
		      </el-select>
    </el-form-item>
    <el-form-item label="账号" label-width="100">
      <el-input v-model="formData.account" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="密码" label-width="100">
      <el-input v-model="formData.password" autocomplete="off" type="password"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">

    <el-button type="primary" @click="addUserClick">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div>
  </el-dialog>
</template>
<script>
import {RoleList} from "../../service/constant"
import {USER_API_PATH,GET_USER_LIST_API_PATH} from "../../service/api"
export default{
    
    data(){
        return{
            type:0,//0新增，1編輯
            dialogFormVisible:false,
            roleList:RoleList,
            formData:{
                role:1,
                account:"",
                password:""
            }
        }
    },
    methods:{
    show(type,item){
        this.dialogFormVisible = true
        this.type = type
        if(this.type==0){
            this.formData={
                role:1,
                account:"",
                password:""
            }
        }else{
            if(item){
                this.formData.account = item.UserName
                
            }
        }
    },
    addUserClick(){
        let {role,account,password} = this
        if(role==""||account==""||password==""){
            return
        }
        let formData = new FormData()
                let act = this.type == 0 ?"AddUser":"EditUser"
        formData.append("Act",act)
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("UserName",this.formData.account)
        formData.append("Password",this.md5(this.formData.password))
        formData.append("RoleID",this.formData.role)

        this.$axios.post(USER_API_PATH,formData).then(res=>{
            if(res.data.Ret == 0){
                this.dialogFormVisible = false
                this.$message("用戶添加成功")
                this.$emit("getUserList")
            }else{
                this.$message(res.data.Msg)
            }
        })
    }
    }
}
</script>

<style scoped>
.el-input,.el-select{
    width:80%;
}
</style>