<template>
	<div class="page-container">
		<el-container>
		  <el-header>
			  <div class="header-right">
				  <a @click="modifyPasswordClick">修改密碼</a>
				   <a>退出</a>
			  </div>
		  </el-header>
		  <el-container>
		    <el-aside width="200px">
				<Menu></Menu>
			</el-aside>
		    <el-main>
				<router-view></router-view>
			</el-main>
		  </el-container>
		</el-container>
		<ModifyPasswordDialog ref="modifyPasswordRef"/>
	</div>
</template>

<script>
	import Menu from "@/components/menu/index"
	import ModifyPasswordDialog from "./modifyPassword"
	export default{
		components:{Menu,ModifyPasswordDialog},
		data(){
			return{
				
			}
		},
		methods:{
			
			modifyPasswordClick(){
				this.$refs.modifyPasswordRef.show()
			},
			logoutClick(){
				             this.$confirm('', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         
          });
				this.$roouter.push("login")
			}
		}
	}
</script>

<style scoped="scoped">
	.el-header{
		display: flex;
		justify-content: flex-end;
	}
</style>
