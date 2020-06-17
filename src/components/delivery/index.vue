<template>
<div class="page-container">
<div class="search-wrapper">
	<div class="block">
	    <span class="label">开始时间</span>
	    <el-date-picker
	      v-model="searchForm.startTime"
	      type="date"
		  :clearable="true"
		  format="yyyy-MM-dd 00:00:00"
	      placeholder="选择日期">
	    </el-date-picker>
	  </div>
	   <div class="block">
	    <span class="label">结束时间</span>
	    <el-date-picker
	      v-model="searchForm.endTime"
	      type="date"
		  :clearable="true"
		  format="yyyy-MM-dd 23:59:59"
	      placeholder="选择日期">
	    </el-date-picker>
	  </div>
<div class="block">
<div class="label">订单号</div>
<el-input v-model="searchForm.orderId"></el-input>
</div>
<div class="block">
<div class="label">收件人</div>
<el-input v-model="searchForm.recipientor"></el-input>
</div>
<div class="block">
<div class="label">快运单号</div>
<el-input v-model="searchForm.expressId"></el-input>
</div>

 <div class="operates">
  <el-button type="primary" @click="searchClick">查询</el-button>
  <el-button type="primary" @click="resetClick">重置</el-button>
</div>
</div>
<div style="text-align: right;margin: 15px 0;">
	<a style="position: relative;">导入《当日电子运单》<input type="file" @change="changeFile($event)" style="position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    opacity: 0;
    height: 100%;"></a>
		<a :href="href1">
		导出《当日物流信息》
		 </a>
		 <a :href="href2">
		 导出《当日出货交接明细表》
		  </a>
		  <a :href="href3">
		  导出《当日出货信息表》
		   </a>
	</div>
<el-table
      :data="tableData"
      style="width:100%">
      <el-table-column
        prop="OrderID"
        label="订单号"
        >
      </el-table-column>
      <el-table-column
        prop="RecipientCompany"
        label="客户名称"
       >
      </el-table-column>
      <el-table-column
        prop="ExpressID"
        label="快运单号">
      </el-table-column>
      <el-table-column
        prop="RecipientName"
        label="收件人"
        >
      </el-table-column>
      <el-table-column
        prop="RecipientPhone"
        label="收件人电话">
      </el-table-column>
       <el-table-column
        prop="SnTotal"
        label="发货数量(台)">
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="SnBox"
				width="240"
        label="发货SN号段及箱号"> 
        <template slot-scope="scope">
        <div v-for="(item,index) in scope.row.SnBox" :key="index"  v-if="scope.row.SnBox!=''">
        <div>{{item.SnStart}}至{{item.SnEnd}}</div>
          <div>{{item.BoxStart}}~{{item.BoxEnd}}号箱</div>
        </div>
		<div>
			  <a @click="assignSnClick(scope.row)" v-if="scope.row.SnBox==''">
			  分配SN号段
			  </a>
			  <br>
			 
		  </div>
		 
        </template>

		
      </el-table-column>
    <el-table-column
 
      label="操作"
    >
      <template slot-scope="scope">
       <a @click="delSnClick(scope.row)">
       删除
       </a>
      </template>
    </el-table-column>
    </el-table>
    
             <el-pagination
               @current-change="pageChange"
      :current-page.sync="pageData.Page"
      :page-size="pageData.RowNum"
      layout="total, prev, pager, next"
      :total="RowNum">
    </el-pagination>  
</div>
</template>
<script>
import {RECIPIENT_API_PATH,ORDER_API_PATH,PRODUCT_API_PATH,UPLOAD_SN_API_PATH,UPLOAD_DISTRIBUTE_API_PATH,UPLOAD_WAYBILL_API_PATH,
UPLOAD_5CODE_API_PATH,DOWNLOAD_DISTRIBUTE_API_PATH,DOWNLOAD_HANDOVER_API_PATH,DOWNLOAD_KUAYUEEXPRESS_API_PATH,
DOWNLOAD_TODAY_DISTRIBUTE_API_PATH,DOWNLOAD_TODAY_KUAYUEEXPRESS_API_PATH,DOWNLOAD_TODAY_HANDOVER_API_PATH} from "../../service/api"

export default{
    data(){
        return{
            searchForm:{
                orderId:"",
                recipientor:"",
                expressId:"",
			startTime:new Date(new Date().toLocaleDateString()),
			endTime:new Date(new Date().toLocaleDateString()),
            },
            tableData:[],
            RowNum:0,
            pageData:{
                Page:1,
                RowNum:20,
          
            }
        }
    },
    created(){
       
        this.searchForm.orderId = this.$route.query.orderId?this.$route.query.orderId:""
        this.getRecipientList()
    },
	computed:{
		href1(){
			let startTime = this.searchForm.startTime?parseInt(this.searchForm.startTime.getTime()/1000):new Date(this.moment(new Date()).format("YYYY-MM-DD 00:00:00"))/1000
			let endTime = this.searchForm.endTime?parseInt((this.searchForm.endTime.getTime() +24*60*60*1000-1)/1000):new Date(this.moment(new Date()).format("YYYY-MM-DD 23:59:59"))/1000
			return DOWNLOAD_TODAY_KUAYUEEXPRESS_API_PATH+"?Token="+sessionStorage.getItem("token")+"&StartTime="+startTime+"&EndTime="+endTime
		},
		href2(){
	let startTime = this.searchForm.startTime?parseInt(this.searchForm.startTime.getTime()/1000):new Date(this.moment(new Date()).format("YYYY-MM-DD 00:00:00"))/1000
			let endTime = this.searchForm.endTime?parseInt((this.searchForm.endTime.getTime() +24*60*60*1000-1)/1000):new Date(this.moment(new Date()).format("YYYY-MM-DD 23:59:59"))/1000
			return DOWNLOAD_TODAY_HANDOVER_API_PATH+"?Token="+sessionStorage.getItem("token")+"&StartTime="+startTime+"&EndTime="+endTime
		},
		href3(){
	let startTime = this.searchForm.startTime?parseInt(this.searchForm.startTime.getTime()/1000):new Date(this.moment(new Date()).format("YYYY-MM-DD 00:00:00"))/1000
			let endTime = this.searchForm.endTime?parseInt((this.searchForm.endTime.getTime() +24*60*60*1000-1)/1000):new Date(this.moment(new Date()).format("YYYY-MM-DD 23:59:59"))/1000
		    return	DOWNLOAD_TODAY_DISTRIBUTE_API_PATH+"?Token="+sessionStorage.getItem("token")+"&StartTime="+startTime+"&EndTime="+endTime
		}	
			
		
	},
    methods:{
        getRecipientList(){
            let formData = new FormData()
        formData.append("Token",sessionStorage.getItem("token"))
        formData.append("Act","GetRecipientList")
        formData.append("Page",this.pageData.Page-1)
        formData.append("RowNum",this.pageData.RowNum)
       let startTime = this.moment(this.searchForm.startTime).format("YYYY-MM-DD 00:00:00")
             let endTime = this.moment(this.searchForm.endTime).format("YYYY-MM-DD 23:59:59")
             formData.append("StartTime",new Date(startTime).getTime()/1000)
             formData.append("EndTime",new Date(endTime).getTime()/1000)
        formData.append("OrderID",this.searchForm.orderId)
       formData.append("ExpressID",this.searchForm.expressId)
         formData.append("RecipientName",this.searchForm.recipientor)
        this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
          if(res.data.Ret == 0){
						
						if(res.data.Data){
							res.data.Data = res.data.Data.map(v=>{
							  	v.CreateTime = this.moment(new Date(v.CreateTime*1000)).format('YYYY-MM-DD HH:mm:ss')
							  v.SnBox = v.SnBox&&v.SnBox!=''?JSON.parse(v.SnBox):""
							  return v
							})
						}else{
							res.data.Data = []
						}
          
            this.tableData = res.data.Data
            
            this.RowNum = res.data.Recordcount
          }else{
						this.$message({
							message:res.data.Msg,
							type:"error",
							duration:3000
						});
					}
        })
        },
		changeFile(e){
			
			let file = e.target.files[0]
			let url = UPLOAD_WAYBILL_API_PATH
			
			let formData = new FormData()
		
		formData.append("Token",sessionStorage.getItem("token"))
					 formData.append("OrderID",this.searchForm.orderId)
		formData.append("file",file)
		this.$axios.post(url,formData).then(res=>{
			
			if(res.data.Ret == 0){
				
				
				this.$message({
					message:"成功导入"+res.data.Data+"条数据",
					type:"success",
					duration:3000
				});
				
			}else{
				
				this.$message({
					message:res.data.Msg,
					type:"error",
					duration:3000
				});
			}
		}).finally(()=>{
			e.target.value = ""
		})
		},
        resetClick(){
            this.searchForm = {
                orderId:"",
                startTime:new Date(new Date().getTime()-1*24*60*60*1000),
                endTime:new Data(),
                expressId:"",
                recipientor:""
            }
        },
        searchClick(){
          this.getRecipientList()
        },
       assignSnClick(item){
         
		 let formData = new FormData()
		  formData.append(     "RecipientID",item.RecipientID)

		 
		       formData.append(     "Token",sessionStorage.getItem("token"))
		       formData.append("Act","AssignSn")
		  this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
		      if(res.data.Ret == 0){
		        this.$message("sn号段分配成功！")
				this.getRecipientList()
		      }else{
		 			 this.$message({
		 			 	message:res.data.Msg,
		 			 	type:"error",
		 			 	duration:3000
		 			 });
		 		 }
		  })
		 
       },
	   delSnClick(item){
		   let formData = new FormData()
		    formData.append(     "RecipientID",item.RecipientID)
		   formData.append(     "RecipientName",item.RecipientName)
		   
		         formData.append(     "Token",sessionStorage.getItem("token"))
		         formData.append("Act","DelRecipient")
				 this.$confirm('确认删除?', '提示', {
				   confirmButtonText: '确定',
				   cancelButtonText: '取消',
				   type: 'warning'
				 }).then(res=>{
					 this.$axios.post(RECIPIENT_API_PATH,formData).then(res=>{
					     if(res.data.Ret == 0){
					       this.$message("删除成功！")
					 			this.getRecipientList()
					     }else{
					 		 this.$message({
					 		 	message:res.data.Msg,
					 		 	type:"error",
					 		 	duration:3000
					 		 });
					 	 }
					 })
				 })
		   
	   },
        pageChange(){
          this.getRecipientList()
        }
    }
}
</script>
<style scoped>
.search-wrapper{
display:flex;
justy-content:flex-start;
flex-wrap:wrap;
}

a{
	color: #3a8ee6;
}
</style>