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
	export default{
		data(){
			return{
				roles:RoleList,
				accounts:[],
				searchForm:{
					role:'',
					account:"",
					password:''
					
				}
			}
		},
		methods:{
			loginClick(){
				this.$router.push('orderManagement')
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