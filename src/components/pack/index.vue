<template>
	<div class="page-container">
		
		<el-form label-position="right" label-width="160px">
			<div class="form-group">
				<div class="flex">
					<div class="label">箱号</div>
					<el-input v-model="formData.boxNum" ref="boxNumRef" placeholder="请扫描箱号" @input="changeInput" @focus="focusInput('boxNum')"></el-input>
				</div>
				
				<div class="error" v-if="!boxRight&&formData.boxNum!=''">SN号起始 {{ formData.snStart }} 和箱号 {{ formData.boxNum }} 不匹配</div>
			</div>
			<div class="form-group">
				<div class="flex">
				<div class="label">SN号起始</div>
				<el-input v-model="formData.snStart" ref="snStartRef" placeholder="请扫描SN号起始" @input="changeInput" @focus="focusInput('snStart')"></el-input>
				</div>
			</div>
			<div class="form-group">
				<div class="flex">
					<div class="label">SN号终止</div>
					<el-input v-model="formData.snEnd" ref="snEndRef" placeholder="请扫描SN号终止" @input="changeInput" @focus="focusInput('snEnd')"></el-input>
				</div>
				<div class="error" v-if="!snEndRight&&formData.snEnd!=''">SN号终止 {{ formData.snEnd }} 和箱号 {{ formData.boxNum }} 不匹配</div>
			</div>
		</el-form>
		<div class="line"></div>
		<div style="margin-bottom:30px;">第{{ currentNum }}/{{ totalNum }}个</div>
		<el-form label-position="right" label-width="160px">
			<div class="form-group">
				<div class="flex">
					<div class="label">SN号</div>
					<input class="el-input__inner" v-model="formData.sn" ref="snRef" placeholder="请扫描单个产品SN号" @input="changeInput" @focus="focusInput('sn')" />
					
					<div class="box-right" v-if="snChecked && snRight"></div>
					<div class="box-error" v-if="snChecked && !snRight"></div>
				</div>
				
				<div class="error" v-if="snChecked && !snRight">SN号 {{ sn }} 和箱号 {{ formData.boxNum }} 不匹配</div>
			</div>
			<div class="form-group">
				<el-button type="primary" style="margin-top:50px;" @click="confirmSetStatusBoxClick">强制确认</el-button>
			</div>
		</el-form>
		
		
	</div>
</template>
<script>
import { BOX_API_PATH } from '../../service/api';
import Vue from 'vue';
Vue.directive('paste', {
	// 因为一个元素只有插入dom之后，才能获取焦点
	updated: function(el) {
		alert(el.value);
	}
});

export default {
	data() {
		return {
			
			focus: 'boxNum',
			totalNum: 0,
			currentNum: 0,
			snChecked: false,
			snRight: true,
			snStartRight: true,
			snEndRight: true,
			boxRight:true,
			boxData: {
				SnList:[]
			}, //从后台获取的每箱数据
			snOkList: [],
			hasEnter:false,
			sn:"",
			formData: {
				boxNum: '',
				snStart: '',
				snEnd: '',
				sn: ''
			}
		};
	},
	mounted() {
		document.body.onkeydown = e => {
			console.log('focus=' + this.focus);
			if (e.keyCode == 13) {
				console.log("扫描枪enter")
				this.enterInput()
			} else if (e.keyCode == 86) {//CTRL+V
		
				
			} //ctrl+v
		};
		this.$nextTick(() => {
			
		});
	},

	methods: {
		
		goSn(){
			if(this.formData.boxNum!=""&&this.formData.snStart!=''&&this.formData.snEnd!=''){
				if(this.boxRight&&this.snStartRight&&this.snEndRight){
					this.focus = "sn"
					this.$refs.snRef.focus();
					return true
				}else{
					return false
				}
			}else{
				return false
			}
		},
		// 内容输入
		changeInput(){
			console.log("ctrl+v")
			this.hasEnter = false
				
				if(this.focus == 'sn'){
					this.sn = this.formData.sn
				}
				setTimeout(()=>{
					if(!this.hasEnter){
						console.log("程序自动enter")
						this.enterInput()
					}
				},100)
				
					
						
		},
		//enter回调	
		enterInput(){
			this.hasEnter = true
			if(this.focus!='sn'){
				let value = this.formData[this.focus]
				this.formData[this.focus] = ""
				if(value.indexOf("/")!=-1){
					this.formData.boxNum = value
					if(!this.goSn()){
						if(this.formData.snStart==""){
							this.$refs.snStartRef.focus()
						}else{
							this.$refs.snEndRef.focus()
						}
					}
				}else{
					if(this.formData.snStart==""){
						this.formData.snStart = value
						if(!this.goSn()){
							if(this.formData.boxNum==""){
								this.$refs.boxNumRef.focus()
							}else{
								
								this.$refs.snEndRef.focus()
							}
						}
						this.getBoxBySnStart()
					}else{
						
						if(value>this.formData.snStart){
							this.formData.snEnd = value
							if(!this.goSn()){
								if(this.formData.boxNum==""){
									this.$refs.boxNumRef.focus()
								}else{
									this.$refs.snStartRef.focus()
								}
							}
						}else{
							this.formData.snEnd = this.formData.snStart
							this.formData.snStart = value
							if(this.formData.boxNum==""){
								this.$refs.boxNumRef.focus()
							}else{
								this.$refs.snEndRef.focus()
							}
							this.getBoxBySnStart()
						}
					}
				}
			}else{
				this.checkSn()
				if(this.currentNum<this.totalNum){
					this.formData.sn = ""
				}else{
					this.confirmSetStatusBoxClick()
				}
			}
			
			
			
		},
		focusInput(str) {
			this.focus = str;
		},
		checkBox() {
			if(this.formData.boxNum == ""){
				
				if(this.focus == 'boxNum'){
					this.boxRight = false
				}
			}else{
				if (this.formData.boxNum == this.boxData.Box) {
					this.boxRight = true
					
				} else {
					this.boxRight = false
					
				}
			}
		
		},
		checkSnStart() {
			if (this.formData.snStart == this.boxData.SnStart) {
				this.snStartRight = true;
				return true;
			} else {
				this.$message({
					message:"Sn号起始不匹配",
					type:"error"
				})
				this.snStartRight = false;
				return false;
			}
		},
		checkSnEnd() {
			if(this.formData.snEnd==''){
				if(this.focus =='snEnd'){
					this.snEndRight = false
				}
			}else{
				if (this.formData.snEnd != this.boxData.SnEnd) {
					
					this.snEndRight = false;
				} else {
					this.snEndRight = true;
					
				}
			}
		
		},
		checkSn() {
			let sn = this.formData.sn;
			this.snChecked = true;
			
			if (this.boxData.SnList.findIndex(v => v == sn) < 0) {
				this.$message({
					message:'Sn不匹配',
					type:"error"
				});
				this.snRight = false;
				return false
			} else {
				
				if(this.snOkList.find(v=>v==sn)<0){
					this.currentNum += 1;
					this.snOkList = this.snOkList.concat([this.formData.sn]);
					this.snRight = true;
					return true
				}else{
					this.snRight = false;
					return false
				}
	
			}
		},
		getBoxBySnStart(snStart) {
			let formData = new FormData();
			formData.append('Act', 'GetBoxBySnStart');
			formData.append('Token', sessionStorage.getItem('token'));
			formData.append('SnStart', this.formData.snStart);

			this.$axios.post(BOX_API_PATH, formData).then(res => {
				if (res.data.Ret == 0) {
					this.boxData = res.data.Data;
					this.totalNum = this.boxData.SnList.length;
					if(this.formData.boxNum!=""){
						 this.checkBox()
					}
					if(this.formData.snEnd!=""){
						this.checkSnEnd()
					}
			       
					
			
				} else {
					this.$message({
						type:"error",
						message:res.data.Msg
					});
				}
			});
		},
		confirmSetStatusBoxClick() {
			if(this.totalNum==0||this.currentNum==0){
				return 
			}
			let formData = new FormData();
			formData.append('Act', 'SetStatusBox');
			formData.append('Token', sessionStorage.getItem('token'));
			formData.append('SnStart', this.formData.snStart);
			formData.append('SnEnd', this.formData.snEnd);
			formData.append('Box', this.formData.boxNum);
			formData.append('SnOkList', JSON.stringify(Array.from(new Set(this.snOkList))));
			this.$axios
				.post(BOX_API_PATH, formData)
				.then(res => {
					if (res.data.Ret == 0) {
						this.$message({
							type:"success",
							message:"整箱正确",
							duration:3000
						})
					} else {
						this.$message({
							type:"error",
							message:res.data.Msg,
							duration:3000
						});
					}
				})
				.finally(() => {
					this.focus = 'boxNum';
					this.$refs.boxNumRef.focus();
					this.snOkList = [];
					this.formData = {
						boxNum: '',
						snStart: '',
						snEnd: '',
						sn: ''
					};
					this.totalNum = 0;
					this.currentNum = 0;
					this.snChecked = false;
				});
		},
		pasteSn(e) {
			this.formData.sn = e.target.value;
		},
		inputSn(e) {
			// this.snOkList = this.snOkList.concat([this.formData.sn])
		}
	}
};
</script>

<style scoped="scoped">
.div {
	position: relative;
}
.error {
	text-align: left;
	left: 0px;
	color: red;
	top: 100%;
	margin-top: 10px;
}
.el-icon-check,
.el-icon-close {
	position: absolute;
	left: 100%;
	margin-left: 10px;
	top: 50%;
	transform: translateY(-50%);
	font-size: 50px;
}
.el-button{
	width:100%;
}
.box-right,
.box-error {
	position: absolute;
	width: 50px;
	height: 50px;
	left: 100%;
	margin-left: 10px;
	top: 0px;
	
}
.el-table,.div__label,.div__content,.error,.el-menu-item,.el-submenu__title,.el-message__content,div{
		font-size:28px;
	}
.box-right {
	background: url(../../assets/right.png) no-repeat center;
	background-size: contain;
}
.box-error {
	background: url(../../assets/error.png) no-repeat center;
	background-size: contain;
}
.el-form {
	width: 90%;
}
</style>
