<template>
	<div class="page-container">
    <div>
    <el-button type="primary" @click="addUserClick">+添加</el-button>
    </div>
		 <el-table
		      :data="userList"
		      style="width: 100%">
		      <el-table-column
		        prop="UserName"
		        label="账号"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="role"
		        label="角色"
		        width="180">
		      </el-table-column>
		      <el-table-column

		        label="操作">
                <template slot-scope="scope">
        <a @click="editUserClick(scope)">編輯</a>
        <a @click="delUserClick(scope)">刪除</a>
        </template>
		      </el-table-column>
		    </el-table>

          <el-pagination
    

      :current-page="currentPage"

    
      layout="total,pager, prev, next"
      :total="400"></el-pagination>  
      <AddUserDialog ref="addUserDialogRef"/>
	</div>
</template>

<script>
import AddUserDialog from "./add"
import {USER_API_PATH} from "../../service/api"

	export default{
        components:{AddUserDialog},
		data(){
			return{
                userList:[],
                currentPage:0,
			}
		},
        created(){
            this.getUserList()
        },
        methods:{
            getUserList(){
                let userInfo = localStorage.getItem("userInfo")
       
                let formData = new FormData()
                formData.append("RoleID",1)
                formData.append("Act","GetUserList")
                formData.append("Token",sessionStorage.getItem("token"))
                this.$axios.post(USER_API_PATH,formData).then(res=>{
                    this.userList = res.data.Data
                })
            },
            addUserClick(){
this.$refs.addUserDialogRef.show(0)
            },
            editUserClick(item){
                
                this.$refs.addUserDialogRef.show(1,item.row)
            },
            delUserClick(item){
                this.$confirm('', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let formData = new FormData()
            formData.append("UserName",item.row.UserName)
            formData.append("Token",sessionStorage.getItem("token"))
            formData.append("Act","DelUser")
         this.$axios.post(USER_API_PATH,formData).then(res=>{
             if(res.data.Ret == 0){
                 this.$message("刪除用戶成功")
                 this.getUserList()
             }else{
                 this.$message(res.data.Msg)
             }
         })
          });
         
        
            }
        }
	}
</script>

<style>
</style>
