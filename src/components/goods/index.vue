<template>
	<div class="page-container"></div>
	<el-form label-position="right" label-width="80px" :model="formLabelAlign">
	  <el-form-item label="箱号">
	    <el-input v-model="formLabelAlign.name"></el-input>
	  </el-form-item>
	  <el-form-item label="SN起始号">
	    <el-input v-model="formLabelAlign.region"></el-input>
	  </el-form-item>
	  <el-form-item label="SN终止号">
	    <el-input v-model="formLabelAlign.type"></el-input>
	  </el-form-item>
	  
	  
	</el-form>
	<div></div>
	<el-form label-position="right" label-width="80px" :model="formLabelAlign">
	  <el-form-item label="箱号">
	    <el-input v-model="formLabelAlign.name"></el-input>
	  </el-form-item>
	  <el-form-item label="SN起始号">
	    <el-input v-model="formLabelAlign.region"></el-input>
	  </el-form-item>
	  <el-form-item label="SN终止号">
	    <el-input v-model="formLabelAlign.type"></el-input>
	  </el-form-item>
	  
	  
	</el-form>
</template>

<script>
</script>

<style>
</style>
