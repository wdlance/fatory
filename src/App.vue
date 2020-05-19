<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
	  setTimeout(()=>{
		  sessionStorage.clear()
		  localStorage.clear()
	  },19*60*60*1000)
  }
}
</script>

<style>
	body{
		padding: 0px;
		margin:0px;
	
	}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  font-size:22px;
}
.el-table,.el-form-item__label,.el-form-item__content,.error,.el-menu-item,.el-submenu__title,.el-message__content,.el-dialog__body{
	font-size:22px;
}

.el-message__icon{
	    font-size: 50px;
}
.el-input__inner{
		height:50px;
	}

	.el-form-item {
		margin-bottom: 30px;
	}
	.el-input__inner{
		height:60px;
		font-size:22px;
	}
	.el-button{
		font-size:22px;
	}
	a{
		text-decoration:none;
		color:#333;
		cursor:pointer;
	}
	td a{
		color:#3a8ee6;
	}
	.search-wrapper{
		padding:20px 0px;
	}
	
	.form-group,.block,.operates{
		display: flex;
		flex-direction: row;
		margin-top:30px;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		
	}
	.error{
		position: absolute;
	}
	.block{
		margin:15px;
	}
	.label{
			flex-shrink: 0;
			margin-right: 10px;
			
		}
		.meta{
			color:#dcdcdc;
		}
	@media screen and (max-device-width:640px) {
			.el-date-editor.el-input, .el-date-editor.el-input__inner{
				width: 100%;
			}
			#app,.el-table,.el-form-item__label,.el-form-item__content,.error,.el-menu-item,.el-submenu__title,.el-message__content,.el-dialog__body{
				font-size:20px;
			}
				
			.form-group,.block{
				flex-direction:column;
				align-items: flex-start;
				justify-content: center;
			}
			
			.label{
				margin-bottom: 10px;
			}
				.el-dialog,.el-message-box {
					width:90%;
				}
				.el-message{
					width:90%;
					min-width:unset;
				}
		}
</style>
