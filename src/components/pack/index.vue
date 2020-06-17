<template>
	<div class="page-container">
		
		
			<div class="el-form">
				<div class="form-group">
							<div class="flex">
								<div class="label">箱号</div>
								<el-input v-model="formData.boxNum" ref="boxNumRef" placeholder="请扫描箱号" @input="changeInput('boxNum',$event)" @focus="focusInput('boxNum')"></el-input>
							</div>
							
							<div class="error" v-if="!boxRight">SN号起始 {{ formData.snStart }} 和箱号 {{ formData.boxNum }} 不匹配</div>
						</div>
						<div class="form-group">
							<div class="flex">
							<div class="label">SN号起始</div>
							<el-input v-model="formData.snStart" ref="snStartRef" placeholder="请扫描SN号起始" @input="changeInput('snStart',$event)" @focus="focusInput('snStart')"></el-input>
							
							</div>
							<div class="error" v-if="!snStartRight">SN号起始 {{ formData.snStart }}获取箱号失败</div>
						</div>
						<div class="form-group">
							<div class="flex">
								<div class="label">SN号终止</div>
								<el-input v-model="formData.snEnd" ref="snEndRef" placeholder="请扫描SN号终止" @input="changeInput('snEnd',$event)" @focus="focusInput('snEnd')"></el-input>
							</div>
							<div class="error" v-if="!snEndRight">SN号终止 {{ formData.snEnd }} 和箱号 {{ formData.boxNum }} 不匹配</div>
						</div>
				
					<div class="line"></div>
					<div style="margin-bottom:30px;">第{{ currentNum }}/{{ totalNum }}个</div>
					
						<div class="form-group">
							<div class="flex">
								<div class="label">SN号</div>
								<input class="el-input__inner" v-model="formData.sn" ref="snRef" placeholder="请扫描单个产品SN号" @input="changeInput('sn',$event)" @focus="focusInput('sn')" />
								
								<div class="box-right" v-if="snChecked && snRight"></div>
								<div class="box-error" v-if="snChecked && !snRight"></div>
							</div>
							
							<div class="error" v-if="snChecked && !snRight">SN号 {{ sn }} 和箱号 {{ formData.boxNum }} 不匹配</div>
						</div>
						<div class="form-group">
							<div class="flex">
								<div class="label"></div>
								<el-button type="primary" style="margin-top:50px;" @click="confirmSetStatusBoxClick">强制确认</el-button>
							</div>
						
						</div>
				
					
					<div style="margin: auto;
				border: 1px solid rgb(220, 220, 220);
				padding: 10px;
				display: flex;
				flex-wrap: wrap;
				align-items: center;width:80%;" v-if="snList.length>0">
						扫描记录:
						<span v-for="(item,index) in snList" :key="index" v-if="index<5">{{item}};</span>
					</div>
			</div>
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
			snList:[],
			snOkList: [],
			hasEnter:false,
			sn:"",
			formData: {
				boxNum: '',
				snStart: '',
				snEnd: '',
				sn: ''
			},
			isConfirmIng:false
		};
	},
	mounted() {
		document.body.onkeydown = e => {
			console.log('focus=' + this.focus+",code"+e.keyCode);
			if (e.keyCode == 13) {
				console.log("扫描枪enter"+e.target.value)
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
					if(!this.boxRight){
						this.focus = "boxNum"
						this.$refs.boxNumRef.focus()
						this.formData.boxNum = ""
							return false
					}
					if(!this.snStartRight){
						this.focus = "snStart"
						this.$refs.snStartRef.focus()
						this.formData.snStart = ""
							return false
					}
					if(!this.snEndRight){
						this.focus = "snEnd"
						this.$refs.snEndRef.focus()
						this.formData.snEnd = ""
							return false
					}
				return false
				}
			}else{
				if(this.formData.boxNum == ""){
					this.focus = "boxNum"
					this.$refs.boxNumRef.focus()
					this.formData.boxNum = ""
					return false
				}
				if(this.formData.snStart == ""){
					this.focus = "snStart"
					this.$refs.snStartRef.focus()
					this.formData.snStart = ""
					return false
				}
				if(this.formData.snEnd == ""){
					this.focus = "snEnd"
					this.$refs.snEndRef.focus()
					this.formData.snEnd = ""
					return false
				}
				return false
			}
			
		},
		// 内容输入
		changeInput(str,e){
			console.log("ctrl+v,"+str+"="+e)

			this.hasEnter = false
				if(this.focus == 'sn'&&!this.isConfirmIng){
					this.sn = this.formData.sn
				
				}
			
		},
		//enter回调	
		enterInput(){
			this.hasEnter = true
			if(this.focus!='sn'){
				let value = this.formData[this.focus]
				console.log("value="+value)
				this.formData[this.focus] = ""
				if(value.indexOf("/")!=-1){
					this.formData.boxNum = value
					if(this.formData.snStart!=''){
						this.checkBox()
					}
					this.goSn()
					
				}else{
					
					if(this.formData.snStart==""){
						this.formData.snStart = value
						
						this.getBoxBySnStart()
					}else{
						
						if(value>=this.formData.snStart){
							this.formData.snEnd = value
							if(this.formData.snStart!=''){
								
								this.checkSnEnd()
							}
							this.goSn()
						}else{
							this.formData.snEnd = this.formData.snStart
							this.formData.snStart = value
						if(this.formData.snStart!=''){
							this.checkSnEnd()
						}
						this.goSn()
						this.getBoxBySnStart()
						}
					}
				}
			}else{
				if(!this.isConfirmIng){
					this.checkSn()
					this.formData.sn = ""
					if(this.currentNum<this.totalNum){
						
					}else{
						this.isConfirmIng = true
						this.confirmSetStatusBoxClick()
					}
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
			this.snList.unshift(this.formData.sn)
			if (this.boxData.SnList.findIndex(v => v == sn) < 0) {
				
				this.snRight = false;
				return false
			} else {
				
				if(this.snOkList.findIndex(v=>v==sn)<0){
					this.currentNum += 1;
					this.snOkList = this.snOkList.concat([this.formData.sn]);
					this.snRight = true;
					return true
				}else{
					this.snRight = true;
					return true
				}
	
			}
		},
		getBoxBySnStart(snStart) {
			let formData = new FormData();
			formData.append('Act', 'GetBoxBySnStart');
			formData.append('Token', sessionStorage.getItem('token'));
			formData.append('SnStart', this.formData.snStart);
			console.log("开始请求Box信息="+JSON.stringify(this.formData.snStart))
			this.$axios.post(BOX_API_PATH, formData).then(res => {
				if (res.data.Ret == 0) {
					this.boxData = res.data.Data;
					this.totalNum = this.boxData.SnList.length;
					
					if(res.data.Data.StatusBox!=1){
						if(this.formData.boxNum!=""){
							 this.checkBox()
						}
						if(this.formData.snEnd!=""){
							this.checkSnEnd()
						}
						this.goSn()
						
						this.snStartRight = true
					}else{
						this.formData.boxNum = ""
						this.formData.snStart = ""
						this.formData.snEnd = ""
						this.boxData = ""
						this.focus = "boxNum"
						this.$refs.boxNumRef.focus()
						this.snStartRight = true
						this.$message({
							type:"error",
							message:"该箱已被验证正确，请继续扫描其它箱号",
							duration:5000
						})
					}
				} else {
					this.$message({
						type:"error",
						message:res.data.Msg
					});
					this.formData.snStart = ""
					this.snStartRight = false
					this.focus = "snStart"
					this.$refs.snStartRef.focus()
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
							duration:5000
						})
					} else {
						this.$message({
							type:"error",
							message:res.data.Msg,
							duration:5000
						});
					}
				})
				.finally(() => {
					this.isConfirmIng = false
					this.focus = 'boxNum';
					this.$refs.boxNumRef.focus();
					this.snOkList = [];
					this.snList = []
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
	padding-left: 160px;
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
