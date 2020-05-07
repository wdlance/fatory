<template>
	<div class="page-container">
		<el-container>
		  <el-header>
			  <div class="header-right">
				  <a>修改密碼</a>
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
	</div>
</template>

<script>
	import Menu from "@/components/menu/index"
	export default{
		components:{Menu},
		data(){
			return{
				
			}
		}
	}
</script>
<style>

</style>

<style scoped="scoped">
	.el-header{
		display: flex;
		justify-content: flex-end;
		box-sizing:0 0 5px #dcdcdc;
	}
	.el-main{
		padding-top:15px;
	}
	.header-right{
	line-height:60px;
}
</style>
