

let API_PATH_PRE="http://127.0.0.1:81"//"http://julide.itgcs.tech:1983"
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
export const LOGIN_OUT_API_PATH = API_PATH_PRE+"/Logout"
export const LOG_API_PATH = API_PATH_PRE+"/Log"
export const SYSTEM_API_PATH = API_PATH_PRE+"/System"
export const UPLOAD_SN_API_PATH = API_PATH_PRE+"/UploadSn"
export const UPLOAD_DISTRIBUTE_API_PATH = API_PATH_PRE+"/UploadDistributeRequest"
export const UPLOAD_WAYBILL_API_PATH = API_PATH_PRE+"/UploadWayBill"
export const UPLOAD_5CODE_API_PATH = API_PATH_PRE+"/Upload5Code"
export const DOWNLOAD_DISTRIBUTE_API_PATH = API_PATH_PRE+"/DownloadExportInfo"
export const DOWNLOAD_KUAYUEEXPRESS_API_PATH = API_PATH_PRE+"/DownloadKuayueExpress"
export const DOWNLOAD_HANDOVER_API_PATH = API_PATH_PRE+"/DownloadHandover"

export const DOWNLOAD_TODAY_DISTRIBUTE_API_PATH = API_PATH_PRE+"/DownloadExportInfo"
export const DOWNLOAD_TODAY_KUAYUEEXPRESS_API_PATH = API_PATH_PRE+"/DownloadKuayueExpress"
export const DOWNLOAD_TODAY_HANDOVER_API_PATH = API_PATH_PRE+"/DownloadHandover"
