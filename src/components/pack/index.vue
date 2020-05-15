<template>
	<div class="page-container">
		<el-form label-position="right" label-width="120px" :model="formData">
			<el-form-item label="箱号"><el-input v-model="formData.boxNum" ref="boxNumRef" placeholder="请扫描箱号" @focus="focusInput('boxNum')"></el-input></el-form-item>
			<el-form-item label="SN号起始">
				<el-input v-model="formData.snStart" ref="snStartRef" placeholder="请扫描SN号起始" @focus="focusInput('snStart')"></el-input>
				<div class="error" v-if="!snStartRight">SN号起始 {{ formData.snStart }} 和箱号 {{ formData.boxNum }} 不匹配</div>
			</el-form-item>
			<el-form-item label="SN号终止">
				<el-input v-model="formData.snEnd" ref="snEndRef" placeholder="请扫描SN号终止" @focus="focusInput('snEnd')"></el-input>
				<div class="error" v-if="!snEndRight">SN号终止 {{ formData.snEnd }} 和箱号 {{ formData.boxNum }} 不匹配</div>
			</el-form-item>
		</el-form>
		<div class="line"></div>
		<div style="margin-bottom:30px;">第{{ currentNum }}/{{ totalNum }}个</div>
		<el-form label-position="right" label-width="120px">
			<el-form-item label="SN号">
				<input class="el-input__inner" v-model="formData.sn" ref="snRef" placeholder="请扫描单个产品SN号" @change="inputSn($event)" @focus="focusInput('sn')" />

				<div class="box-right" v-if="snChecked && snRight"></div>
				<div class="box-error" v-if="snChecked && !snRight"></div>
				<div class="error" v-if="snChecked && !snRight">SN号 {{ formData.sn }} 和箱号 {{ formData.boxNum }} 不匹配</div>
			</el-form-item>
		</el-form>
		<el-button type="primary" style="margin-top:50px;" @click="confirmSetStatusBoxClick">强制确认</el-button>
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
			boxData: {}, //从后台获取的每箱数据
			snOkList: [],
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
				if (this.focus == 'boxNum') {
					this.focus = 'snStart';
					this.$refs.snStartRef.focus();
				} else if (this.focus == 'snStart') {
					this.getBoxBySnStart(this.snStart);
				} else if (this.focus == 'snEnd') {
					if (this.checkSnEnd()) {
						this.focus = 'sn';
						this.$refs.snRef.focus();
					}
				} else if (this.focus == 'sn') {
					if (this.box == '' || this.snStart == '' || this.snEnd == '') {
						return;
					}
					this.checkSn();
					if (this.currentNum < this.totalNum) {
					} else {
						this.confirmSetStatusBoxClick();
					}
					
				}
			} else if (e.keyCode == 86) {
				this.formData.sn = '';
			} //ctrl+v
		};
		this.$nextTick(() => {
			this.$refs.boxNumRef.focus();
		});
	},
	methods: {
		focusInput(str) {
			this.focus = str;
		},
		checkBox() {
			if (this.formData.boxNum == this.boxData.Box) {
				return true;
			} else {
				return false;
			}
		},
		checkSnStart() {
			if (this.formData.snStart == this.boxData.SnStart) {
				
				this.snStartRight = true;
				return true;
			} else {
				this.$message("Sn号起始不匹配")
				this.snStartRight = false;
				return false;
			}
		},
		checkSnEnd() {
			if (this.formData.snEnd != this.boxData.SnEnd) {
				this.$message("Sn号终止不匹配")
				return false
				//this.snEndRight = false;
			} else {
				this.snEndRight = true;
				return true
			}
		},
		checkSn() {
			let sn = this.formData.sn;
			this.snChecked = true;
			if (this.boxData.SnList.findIndex(v => v == sn) < 0) {
				this.$message('Sn不匹配');
				this.snRight = false;
				return false
			} else {
				this.currentNum += 1;
				this.snOkList = this.snOkList.concat([this.formData.sn]);
				this.snRight = true;
				return true
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
					if (this.checkSnStart()) {
						this.focus = 'snEnd';
						this.$refs.snEndRef.focus();
					}
				} else {
					this.$message(res.data.Msg);
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
					} else {
						this.$message(res.data.Msg);
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

<style>
.el-form-item {
	position: relative;
}
.error {
	position: absolute;
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
.box-right,
.box-error {
	position: absolute;
	width: 50px;
	height: 50px;
	left: 100%;
	margin-left: 10px;
	top: 50%;
	transform: translateY(-50%);
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
