<template>
	<div class="page-container">
		<el-form label-position="right" label-width="160px">
			<div style="margin-bottom: 20px;">第{{ currentNum }}/{{ totalNum }}箱</div>
			<div class="form-group">
				<div class="flex">
					<div class="label">快运单号</div>
					<el-input v-model="formData.expressId" ref="expressIdRef" placeholder="请扫描快运单号" @input="changeInput" @focus="focusInput('expressId')"></el-input>
				</div>
				
			</div>
			<div class="form-group">
				<div class="flex">
					<div class="label">SN号起始</div>
					<el-input v-model="formData.snStart" ref="snStartRef" placeholder="请扫描SN号起始"@input="changeInput"  @focus="focusInput('snStart')"></el-input>
				</div>
			</div>
			<div class="form-group">
				<div class="flex">
					<div class="label">SN号终止</div>
					<el-input v-model="formData.snEnd" ref="snEndRef" @input="changeInput" placeolder="请扫描SN号终止" @focus="focusInput('snEnd')"></el-input></div>
				</div>
				
			<div class="form-group">
				<div class="flex">
					<div class="label">箱号</div>
					<el-input v-model="formData.boxNum" ref="boxNumRef" placeholder="请扫描箱号" @input="changeInput" @focus="focusInput('boxNum')"></el-input>
					<div class="box-right" src="../../assets/right.png" v-if="boxChecked && boxRight"></div>
					<div class="box-error" src="../../assets/error.png" v-if="boxChecked && !boxRight"></div>
				</div>
				
				<div class="error" v-if="boxChecked && !boxRight">快运单号 {{ formData.expressId }} 和箱号 {{ box }} 不匹配</div>
			
			</div>
			<div class="operates">
				<el-button type="primary" style="margin-top:50px;" @click="confirmTypeByScan">强制确认</el-button>
			</div>
			
		</el-form>
	</div>
</template>
<script>
import { RECIPIENT_API_PATH } from '../../service/api';
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
			path: '',
			focus: 'expressId',
			totalNum: 0,
			currentNum: 0,
			boxChecked: false,
			boxRight: true,
			hasError: false,
			snList: [], //从后台获取的每箱数据
			ksnList: [],
			errorBoxList: [],
			snOkList: [],
			ksnOkList: [],
			box:"",
			hasEnter:false,
			formData: {
				boxNum: '',
				snStart: '',
				snEnd: '',
				expressId: ''
			}
		};
	},
	mounted() {
		this.path = this.$route.query.type;
		console.log('path=' + this.path);
		document.body.onkeydown = e => {
			if (e.keyCode == 13) {
				this.enterInput()
			} else if (e.keyCode == 86) {
				
			}
		};
		this.$nextTick(() => {
			this.$refs.expressIdRef.focus();
		});
	},
	methods: {
		changeInput(){
		
				this.hasEnter = false
				console.log("ctrl+v")
				setTimeout(()=>{
					
					if(!this.hasEnter){
						
						console.log("程序自动enter")
							this.enterInput()
					}
				
				},1000)
			},
		enterInput(){
			this.hasEnter = true
			if (this.focus == 'expressId') {
				this.focus = 'snStart';
				this.$refs.snStartRef.focus();
				this.getBoxListByExpressID(this.snStart);
			} else if (this.focus == 'snStart') {
				this.checkSnStart();
				this.focus = 'snEnd';
				this.$refs.snEndRef.focus();
				this.boxChecked = false;
			} else if (this.focus == 'snEnd') {
				this.checkSnEnd();
				this.focus = 'boxNum';
				this.$refs.boxNumRef.focus();
			} else if (this.focus == 'boxNum') {
				this.checkBox();
				
				console.log('currentNum=' + this.currentNum);
				if (this.currentNum < this.totalNum) {
					this.focus = 'snStart';
					this.$refs.snStartRef.focus();
					this.formData.snStart = '';
					this.formData.snEnd = '';
					this.formData.boxNum = '';
				} else {
					this.confirmTypeByScan();
				}
			}
		},
		focusInput(str) {
			this.focus = str;
		},
		checkBox() {
			this.boxChecked = true;
			this.box = this.formData.boxNum
			if (this.snList.find(v => v.Box == this.formData.boxNum)) {
				this.boxRight = true;
				if (this.snOkList[this.currentNum]) {
					Object.assign(this.snOkList[this.currentNum], {
						Box: this.formData.boxNum
					});
				} else {
					this.snOkList[this.currentNum] = {
						Box: this.formData.boxNum
					};
				}
				this.currentNum = this.snOkList.length;
				return true;
			} else {
				if (this.ksnList.find(v => v.Box == this.formData.boxNum)) {
					this.boxRight = true;
					if (this.ksnOkList[this.currentNum]) {
						Object.assign(this.ksnOkList[this.currentNum], {
							Box: this.formData.boxNum
						});
					} else {
						this.ksnOkList[this.currentNum] = {
							Box: this.formData.boxNum
						};
					}
					this.currentNum = this.ksnOkList.length;
					return true;
				} else {
					this.boxRight = false;
					this.errorBoxList.push(this.formData.boxNum);
					if (this.snOkList[this.currentNum]) {
						this.snOkList.splice(this.currentNum, 1);
					}
					if (this.ksnOkList[this.currentNum]) {
						this.ksnOkList.splice(this.currentNum, 1);
					}
					return false;
				}
			}
		},
		checkSnStart() {
			
			if (this.snList.find(v => v.SnStart == this.formData.snStart)) {
				if (this.snOkList[this.currentNum]) {
					Object.assign(this.snOkList[this.currentNum], {
						SnStart: this.formData.snStart
					});
				} else {
					this.snOkList[this.currentNum] = {
						SnStart: this.formData.snStart
					};
				}

				return true;
			} else {
				if (this.ksnList.find(v => v.SnStart == this.formData.snStart)) {
					if (this.ksnOkList[this.currentNum]) {
						Object.assign(this.ksnOkList[this.currentNum], {
							SnStart: this.formData.snStart
						});
					} else {
						this.ksnOkList[this.currentNum] = {
							SnStart: this.formData.snStart
						};
					}

					return true;
				} else {
					this.hasError = true;
					this.$message({
						type:'error',
						message:'Sn号起始与快运单号不匹配'
					});
					if (this.snOkList[this.currentNum]) {
						this.snOkList.splice(this.currentNum, 1);
					}
					if (this.ksnOkList[this.currentNum]) {
						this.ksnOkList.splice(this.currentNum, 1);
					}
					return false;
				}

				return false;
			}
		},
		checkSnEnd() {
			if (this.snList.find(v => v.SnEnd == this.formData.snEnd)) {
				if (this.snOkList[this.currentNum]) {
					Object.assign(this.snOkList[this.currentNum], {
						SnEnd: this.formData.snEnd
					});
				} else {
					this.snOkList[this.currentNum] = {
						SnEnd: this.formData.snEnd
					};
				}
				return true;
			} else {
				if (this.ksnList.find(v => v.SnEnd == this.formData.snEnd)) {
					if (this.ksnOkList[this.currentNum]) {
						Object.assign(this.ksnOkList[this.currentNum], {
							SnEnd: this.formData.snEnd
						});
					} else {
						this.ksnOkList[this.currentNum] = {
							SnEnd: this.formData.snEnd
						};
					}
					return true;
				} else {
					this.hasError = true;
					this.$message({
						message:'Sn号终止与快运单号不匹配',
						type:"error"
					});
					if (this.snOkList[this.currentNum]) {
						this.snOkList.splice(this.currentNum, 1);
					}
					if (this.ksnOkList[this.currentNum]) {
						this.ksnOkList.splice(this.currentNum, 1);
					}
					return false;
				}
			}
		},

		confirmTypeByScan() {
			if (!this.hasError && this.errorBoxList.length <= 0) {
				let formData = new FormData();
				formData.append('Token', sessionStorage.getItem('token'));

				formData.append('ExpressID', this.formData.expressId);
				if (this.path == 'choice') {
					formData.append('Act', 'SetStatusPrepareByExpressID');
					//formData.append("StatusPrepare",item.StatusPrepare)
				} else {
					formData.append('Act', 'SetStatusQcByExpressID');
					//formData.append("StatusQc",item.StatusQc)
				}

				formData.append('ConfirmType', 2);
				this.$axios
					.post(RECIPIENT_API_PATH, formData)
					.then(res => {
						if (res.data.Ret == 0) {
							this.$message({
								type:"success",
								message:"整单正确",
								duration:3000
							})
						} else {
							this.$message({
								message:res.data.Msg,
								type:"error",
								duration:3000
							});
						}
					})
					.finally(() => {
						this.focus = 'expressId';
						this.$refs.expressIdRef.focus();
						this.formData = {
							boxNum: '',
							snStart: '',
							snEnd: '',
							expressId: ''
						};
						this.box = ""
						this.totalNum = 0;
						this.currentNum = 0;
						this.boxChecked = false;
					});
			} else {
				let formData = new FormData();
				formData.append('Token', sessionStorage.getItem('token'));

				formData.append('ExpressID', this.formData.expressId);
				if (this.path == 'choice') {
					formData.append('Act', 'SetStatusPrepare');
				} else {
					formData.append('Act', 'SetStatusQc');
				}

				this.snOkList = this.snOkList.filter(v => {
					return v && v.SnStart && v.SnEnd && v.Box;
				});
				this.ksnOkList = this.ksnOkList.filter(v => {
					return v && v.SnStart && v.SnEnd && v.Box;
				});
				formData.append('SnOkList', JSON.stringify(this.snOkList));
				formData.append('KsnOkList', JSON.stringify(this.ksnOkList));

				this.$axios.post(RECIPIENT_API_PATH, formData).then(res => {
					
					if (res.data.Ret == 0) {
						
					} else {
						this.$message({
							type:"error",
							message:res.data.Msg
						});
					}
				}).finally(()=>{
					this.focus = 'expressId';
					this.$refs.expressIdRef.focus();
					this.formData = {
						boxNum: '',
						snStart: '',
						snEnd: '',
						expressId: ''
					};
					this.totalNum = 0;
					this.currentNum = 0;
					this.boxChecked = false;
				});
			}
		},
		getBoxListByExpressID() {
			let formData = new FormData();
			formData.append('Act', 'GetBoxListByExpressID');
			formData.append('Token', sessionStorage.getItem('token'));
			formData.append('ExpressID', this.formData.expressId);

			this.$axios.post(RECIPIENT_API_PATH, formData).then(res => {
				if (res.data.Ret == 0) {
					this.snList = res.data.Data && res.data.Data.SnList ? res.data.Data.SnList : [];
					this.ksnList = res.data.Data && res.data.Data.KsnList ? res.data.Data.KsnList : [];
					this.totalNum = res.data.Data&& res.data.Data.SnList?res.data.Data.SnList.length:0
					console.log("snList="+JSON.stringify(this.snList))
					console.log("ksnList="+JSON.stringify(this.ksnList))
				}else{
					this.$message({
						message:res.data.Msg,
						type:"error"
					})
				}
			});
		},
		pasteSn(e) {
			console.log(e.target.value);
			this.formData.boxNum = e.target.value;
		}
	}
};
</script>

<style scoped="scoped">
.div {
	position: relative;
}
.error {
	
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
.el-button{
	width: 100%;
}
.el-table,.div__label,.div__content,.error,.el-menu-item,.el-submenu__title,.el-message__content,div{
	font-size:28px;
}
</style>
