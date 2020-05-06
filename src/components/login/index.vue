<template>
	<div class="page-container">
		<el-form ref="loginFormRef" label-width="100px">
		  <el-form-item
		    label="角色"
		    prop="role"
		    
		  >
		    <el-select v-model="searchForm.role" placeholder="">
		        <el-option
		          v-for="item in roles"
		          :key="item.id"
		          :label="item.name"
		          :value="item.name">
		        </el-option>
		      </el-select>
		  </el-form-item>
		  <el-form-item
		    label="账号"
		    prop="role"
		    
		  >
		    <el-select v-model="searchForm.account" placeholder="">
		        <el-option
		          v-for="item in accounts"
		          :key="item.id"
		          :label="item.name"
		          :value="item.name">
		        </el-option>
		      </el-select>
		  </el-form-item>
		  <el-form-item
		    label="密码"
		    prop="role"
		    
		  >
		   <el-input type="password" v-model="searchForm.password"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="loginClick" size="big">登录</el-button>
		
		  </el-form-item>
		</el-form>
	</div>
	
</template>

<script>
	import {RoleList} from "../../service/constant"
	import {USER_API_PATH,LOGIN_API_PATH} from '../../service/api';
	
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
			this.getRoleUserList()
			
		},
		methods:{
		
			 getRoleUserList(){
                let userInfo = localStorage.getItem("userInfo")
                
                let role = this.searchForm.role
                let formData = new FormData()
                formData.append("RoleID",role)

                this.$axios.post(USER_API_PATH,formData).then(res=>{
                    this.roles = res.data.Data
                })
            },
			loginClick(){
				if(this.searchForm.role==1){
				this.searchForm.account = "superadmin"
				this.searchForm.password = "jld_chaoguan_*()"
			}

			let formData = new FormData()
			formData.append("UserName",this.searchForm.account)
			let md5_password = this.md5(this.searchForm.password)
			formData.append("Password",md5_password)
				this.$axios.post(LOGIN_API_PATH,formData).then(res=>{
					console.log(this)
					if(res.data.Ret == 0 ){
						sessionStorage.setItem("token",res.data.Token)
							let userInfo = JSON.stringify(Object.assign(this.searchForm,{
								password:md5_password
							}))
							localStorage.setItem("userInfo",userInfo)
							this.$router.push('user')
							
					}else{
						this.$message(res.Msg)
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
		justify-content: center;
		align-items: center;
	}
	.el-form{
		width:500px;
	}
	.el-select{
		width:100%;
	}
	
</style>