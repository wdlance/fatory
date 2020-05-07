

let API_PATH_PRE="http://127.0.0.1:81"
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV!='development'){
	API_PATH_PRE = ""
}
//获取用户名列表GetUserList 
export const USER_API_PATH = API_PATH_PRE+"/User"


export const DEL_USER_API_PATH = API_PATH_PRE+"/User"





export const ORDER_API_PATH = API_PATH_PRE+"/Order"
export const PRODUCT_API_PATH = API_PATH_PRE+"/Product"
export const SN_API_PATH = API_PATH_PRE+"/Sn"


//创建新产品AddProduct 
export const BOX_API_PATH = API_PATH_PRE+"/Box"
export const RECIPIENT_API_PATH = API_PATH_PRE+"/Recipient"
export const LOGIN_API_PATH = API_PATH_PRE+"/Login"
export const LOG_API_PATH = API_PATH_PRE+"/Log"
export const SYSTEM_API_PATH = API_PATH_PRE+"/System"
export const UPLOAD_SN_API_PATH = API_PATH_PRE+"/UploadSn"
export const UPLOAD_DISTRIBUTE_API_PATH = API_PATH_PRE+"/UploadDistributeRequest"
export const DOWNLOAD_DISTRIBUTE_API_PATH = API_PATH_PRE+"/DownloadDistribute"
