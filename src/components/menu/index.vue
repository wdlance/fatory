<template>
	<div class="page-container">
		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
		  <el-radio-button :label="false">展开</el-radio-button>
		  <el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group>
		<el-menu :default-active="(menuList[0].id).toString()" :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
		 <template v-for="item in menuList">
		  <el-submenu :key="item.id" :default-active="item.children[0].id" :index="item.id.toString()" v-if="item.children">
		  <template slot="title">
     <div @click="gotoPage(item.url)">
		   <i class="el-icon-menu"></i>
		  <span>{{item.name}}</span>
		   </div>
		  
    </template>
		   <el-menu-item  v-if="item.children" v-for="sub in item.children" :key="sub.id" :index="sub.id.toString() ">
		    <div @click="gotoPage(sub.url)">
		   <i class="el-icon-menu"></i>
		  <span>{{sub.name}}</span>
		   </div>
		   </el-menu-item>
		   
		 </el-submenu>
		<el-menu-item :key="item.id" :index="item.id.toString()" v-else>
		    <div @click="gotoPage(item.url)">
		   <i class="el-icon-menu"></i>
		  <span>{{item.name}}</span>
		   </div>
		   </el-menu-item>
		 </template>
		
		
		</el-menu>
	</div>
</template>

<script>
import {MenuList} from "../../service/constant"
	export default{
		data(){
			return{
				isCollapse:false,
				menuList:MenuList
			}
		},
		created(){
			let auth = localStorage.getItem("auth")
			if(auth){
				this.menuList = this.menuList.filter(item=>{
					return JSON.parse(auth).find(v=>v==item.id)
				})
			}else{
				this.$router.push("/login")
			}
		},
		methods:{
			gotoPage(path){
				if(!path){
					return
				}
				this.$router.push(path)
			}
		}
	}
</script>

<style scoped="scoped">
.el-menu-item,.el-submenu{
	text-align:left;
}
</style>
