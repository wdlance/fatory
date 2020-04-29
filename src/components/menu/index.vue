<template>
	<div class="page-container">
		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
		  <el-radio-button :label="false">展开</el-radio-button>
		  <el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group>
		<el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
		 <el-menu-item index="1">
		   <i class="el-icon-menu"></i>
		   <span slot="title">导航二</span>
		 </el-menu-item>
		  <el-menu-item index="2">
		    <i class="el-icon-menu"></i>
		    <span slot="title">导航二</span>
		  </el-menu-item>
		  <el-menu-item index="3">
		    <i class="el-icon-menu"></i>
		    <span slot="title">导航三</span>
		  </el-menu-item>
		  <el-menu-item index="4">
		    <i class="el-icon-menu"></i>
		    <span slot="title">导航四</span>
		  </el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isCollapse:false
			}
		}
	}
</script>

<style>
</style>
