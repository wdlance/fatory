<template>
	<div class="page-container">
    <div class="top-wrapper">
    <el-button type="primary" @click="addUserClick">+添加</el-button>
    </div>
		 <el-table
		      :data="userList"
		      style="width:100%">
		      <el-table-column
		        prop="UserName"
		        label="账号"
		        min-width="150">
		      </el-table-column>
		      <el-table-column
		        prop="RoleName"
		        label="角色"
		        min-width="150">
		      </el-table-column>
		      <el-table-column
              min-width="150"
		        label="操作">
                <template slot-scope="scope">
        <a @click="editUserClick(scope)">編輯</a>
        <a @click="delUserClick(scope)">刪除</a>
        </template>
		      </el-table-column>
		    </el-table>

          <el-pagination
    

      :current-page="pageData.Page"
      :page-size="pageData.RowNum"
      layout="total,pager, prev, next"
      :total="RowNum"></el-pagination>  
      <AddUserDialog ref="addUserDialogRef" @getUserList="getUserList"/>
	</div>
</template>

<script>
import AddUserDialog from "./add"
import {USER_API_PATH} from "../../service/api"
import {RoleList} from "../../service/constant"
	export default{
        components:{AddUserDialog},
		data(){
			return{
                userList:[],
                RowNum:0,
                pageData:{
                    Page:1,
                    RowNum:20,
                    
                }
			}
		},
        created(){
            this.getUserList()
           
        },
        methods:{
            getUserList(){
                let userInfo = localStorage.getItem("userInfo")
       
                let formData = new FormData()
                
                formData.append("Act","GetUserList")
                formData.append("Token",sessionStorage.getItem("token"))
                this.$axios.post(USER_API_PATH,formData).then(res=>{
                
                    this.userList = res.data.Data.map(v=>{
                        
                        let role = RoleList.find(item=>item.id == v.RoleID)
                        v.RoleName = role?role.name:""
                        return v
                    })
                        
                    this.RowNum = res.data.Recordcount
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

<style scoped>
.top-wrapper{
    display:flex;
    justy-content:flex-start;
}
</style>
