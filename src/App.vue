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
	/* 	min-width:1024px; */
	}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  font-size:22px;
}
.el-table,.el-form-item__label,.el-form-item__content,.error,.el-menu-item,.el-submenu__title{
	font-size:22px;
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
</style>
