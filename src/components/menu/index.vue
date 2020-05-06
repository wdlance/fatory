<template>
	<div class="page-container">
		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
		  <el-radio-button :label="false">展开</el-radio-button>
		  <el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group>
		<el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
			
		 <el-menu-item v-for="menu in menus" :index="menu.id" :key="menu.id" @click="gotoPageClick(menu)">
		
		   <i class="el-icon-menu"></i>
		   <span slot="title">{{menu.name}}</span>
		 </el-menu-item>
		  
		</el-menu>
	</div>
</template>

<script>
	import {MenuList} from "../../service/constant"
	export default{
		data(){
			return{
				isCollapse:false,
				menus:MenuList
			}
		},
		methods:{
			gotoPageClick(menu){
				this.$router.push(menu.url)
			}
		}
	}
</script>

<style>
</style>
