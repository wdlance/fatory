<template>
	<div class="page-container" @click="toggleMenu(0)">
		<el-container>
		  <el-header>
			  <div class="header-left">
				  <el-button type="primary" class="toggle-menu-btn" @click.stop="toggleMenu(1)">菜单</el-button>
			  </div>
			  <div class="header-right">
				  <a @click="modifyPasswordClick">修改密码</a>
				  &nbsp;
				   <a @click="exitClick">退出</a>
			  </div>
		  </el-header>
		  <el-container>
		    <el-aside style="width:220px;" :class="isPhone&&!showMenu?'hide':'show'">
				<Menu></Menu>
			</el-aside>
		    <el-main>
				<router-view></router-view>
			</el-main>
		  </el-container>
		</el-container>
		<modifyPassword ref="modifyPasswordRef"></modifyPassword>
	</div>
</template>

<script>
	import Menu from "@/components/menu/index"
	import modifyPassword from "./modifyPassword"
	import {LOGIN_OUT_API_PATH} from "../../service/api"
	export default{
		components:{Menu,modifyPassword},
		data(){
			return{
				showMenu:false
			}
		},
		computed:{
			isPhone(){
				return window.screen.width * window.devicePixelRatio>768?false:true
			}
		},
		methods:{
			toggleMenu(type){
				if(type==0){
					if(this.showMenu){
						this.showMenu = false
					}
					
				}else{
					this.showMenu = !this.showMenu
				}
				
				
			},
			modifyPasswordClick(){
				this.$refs.modifyPasswordRef.show()
			},
			exitClick(){
				 this.$confirm('确认退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
			let formData = new FormData()
			formData.append("Token",sessionStorage.getItem("token"))
			this.$axios.post(LOGIN_OUT_API_PATH,formData).finally(()=>{
				   localStorage.clear()
				sessionStorage.clear()
				this.$router.push("/login")
			})
     
        })
				
			}
		}
	}
</script>


<style scoped="scoped">
	.el-header{
		display: flex;
		justify-content: space-between;
		box-shadow:0 0 5px #dcdcdc;
		align-items: center;
	}
	.el-main{
		padding-top:15px;
	}
	.header-right{
	line-height:60px;
}
.header-left{
	display: flex;
	align-items: center;
	justify-content: center;
}

.hide{
	display: none;
}
.show{
	display: block;
}
</style>
<style>
@media screen and (max-device-width:768px) {
	.el-aside{
		position: absolute;
		z-index:100;
		box-shadow: 0 0 5px #dcdcdc;
	}
	.toggle-menu-btn{
		display: block;
	}
}
@media screen and (min-device-width:768px) {
	
	.toggle-menu-btn{
		display: none;
	}
}
</style>