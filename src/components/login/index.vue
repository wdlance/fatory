<template>
	<div class="page-container">
		<h1> 聚力得生产计划出入库系统</h1>
		<el-form ref="loginFormRef" label-width="100px">
		  <div class="form-group"
		  >
		  <div class="label">角色</div>
		    <el-select v-model="searchForm.role" placeholder="" @change="roleChange">
		        <el-option
		          v-for="item in roles"
		          :key="item.id"
		          :label="item.name"
		          :value="item.id">
		        </el-option>
		      </el-select>
		  </div>
		  <div class="form-group"
		  
		  >
		  <div class="label">账号</div>
		    <el-select v-model="searchForm.account" placeholder="">
		        <el-option
		          v-for="(item,index) in accounts"
		          :key="index"
		          :label="item.UserName"
		          :value="item.UserName">
		        </el-option>
		      </el-select>
		  </div>
		  <div
		   class="form-group"
		    
		  >
		  <div class="label">密码</div>
		   <el-input type="password" v-model="searchForm.password"></el-input>
		  </div>
		 
		    <el-button type="primary" @click="loginClick" size="big">登录</el-button>
		

		</el-form>
	</div>
	
</template>

<script>
	import {RoleList} from "../../service/constant"
	import {USER_API_PATH,LOGIN_API_PATH} from "../../service/api"
	export default{
		data(){
			return{
				roles:RoleList,
				accounts:[],
				searchForm:{
					role:1,
					account:"",
					password:''
					
				}
			}
		},
		created(){
			this.getUserList()
		},

		methods:{
			roleChange(){
this.getUserList(),
this.searchForm.password = ""
			},
		getUserList(){
               
                let formData = new FormData()
                formData.append("RoleID",this.searchForm.role)
                formData.append("Act","GetUserList")
                this.$axios.post(USER_API_PATH,formData).then(res=>{
                    this.accounts = res.data.Data
					
					this.searchForm.account = this.accounts&&this.accounts[0]?this.accounts[0].UserName:""
                })
            },
			loginClick(){
				if(this.searchForm.account==""||this.searchForm.password==""){
					
					this.$message({
						message:"账号/密码不能为空",
						type:"error",
						duration:3000
					});
					return 
				}
				
				let formData = new FormData()
				formData.append("UserName",this.searchForm.account)
				formData.append("Password",this.md5(this.searchForm.password))
				this.$axios.post(LOGIN_API_PATH,formData).then(res=>{
					if(res.data.Ret == 0){
						sessionStorage.setItem("token",res.data.Token)
						if(this.searchForm.role==1){
					localStorage.setItem("auth",JSON.stringify([1]))
					this.$router.push('/user')
				}else if(this.searchForm.role==2){
					localStorage.setItem("auth",JSON.stringify([2,3,4,5,6,7,8,9,10]))
					this.$router.push('/order')
				}else if(this.searchForm.role==3){
					localStorage.setItem("auth",JSON.stringify([2,3,4,5]))
					this.$router.push('/order')
				}else if(this.searchForm.role==4){
					localStorage.setItem("auth",JSON.stringify([6]))
					this.$router.push('/pack')
				}else if(this.searchForm.role==5){
					localStorage.setItem("auth",JSON.stringify([7]))
					this.$router.push('/choice')
				}else if(this.searchForm.role==6){
					localStorage.setItem("auth",JSON.stringify([8,3,4,5]))
					this.$router.push('/qc')
				}else{
					localStorage.setItem("auth",JSON.stringify([2,3,4,5,6,7,8,9,10]))
					this.$router.push('/order')
				}
				
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


<style scoped="scoped">
	
	.page-container{
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction:column;
		align-items:center;
		justify-content: center;
	}
	.el-form{
		width:650px;
		margin-top:20px;
		
	}
	@media screen and (max-device-width:640px) {
		.el-form{
			width: 90%;
		}
		h1{
			font-size: 20px;
		}
	}
	.el-select,.el-input{
		width:100%;
	}
	
	button{
		width: 100%;
		height: 60px;
		margin-top: 30px;
	}
	
</style>