<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	body{
		padding: 0px;
		margin:0px;
		min-width:1024px;
	}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  font-size:20px;
}
.el-input__inner{
		height:50px;
	}
	.el-form-item__label{
		font-size: 18px;
	}
	.el-form-item {
		margin-bottom: 30px;
	}
	a{
		text-decoration:none;
		color:#333;
		cursor:pointer;
	}
</style>
