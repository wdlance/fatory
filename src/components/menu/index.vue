<template>
	<div class="page-container">
		
		<el-menu :default-active="defaultActive" :unique-opened="true" class="el-menu-vertical-demo" :collapse="isCollapse">
		 <template v-for="item in menuList">
		  <el-submenu :key="item.id" :index="item.id.toString()" v-if="item.children">
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
		computed:{
			defaultActive(){
				
				let path = this.$route.path
				let sub_menu
				
				let menu = this.menuList.filter(v=>!v.children).find(v=>v.url==path)

				for(let i=0;i<this.menuList.length;i++){
					let v = this.menuList[i]
					if(v.children){
						sub_menu = v.children.find(v1=>v1.url==path)
						break;
					}
				}
				return menu?menu.id.toString():sub_menu?sub_menu.id.toString():this.menuList[0].id.toString()
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
	.el-menu{
		min-height: 100vh;
	}
.el-menu-item,.el-submenu{
	text-align:left;
}
</style>
