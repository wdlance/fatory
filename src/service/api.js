

let API_PATH_PRE="http://127.0.0.1:81"
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV!='development'){
	API_PATH_PRE = ""
}
//获取用户名列表GetUserList 
export const USER_API_PATH = API_PATH_PRE+"/User"
export const GET_USER_LIST_API_PATH = API_PATH_PRE+"/User?Act=GetUserList"
export const ADD_USER_API_PATH = API_PATH_PRE+"/User?Act=AddUser"
export const DEL_USER_API_PATH = API_PATH_PRE+"/User"

//登录 Login 
export const LOGIN_API_PATH = API_PATH_PRE+"/Login"
//产品列表GetProductList （查询条件 - 产品简称 下拉列表）
export const GET_PRODUCT_LIST_API_PATH=""

export const ORDER_API_PATH = API_PATH_PRE+"/Order"

export const PRODUCT_API_PATH = API_PATH_PRE+"/Product"
//创建新产品AddProduct 
export const ADD_PRODUCT_API_PATH = ""
//删除产品DelProduct 
export const DEL_PRODUCT_API_PATH = ""
//订单列表 GetOrderList 
export const GET_ORDER_LIST_API_PATH=""
//创建新订单 AddOrder 
export const ADD_ORDER_API_PATH = ""
//编辑订单EditOrder 
export const EDIT_ORDER_API_PATH = ""
//删除订单DelOrder 
export const DEL_ORDER_API_PATH = ""
//SN列表GetSnList 
export const GET_SN_LIST_API_PATH = ""
//删除SN DelSn 
export const DEL_SN_API_PATH = ""
//箱数列表GetBoxList 
export const GET_BOX_LIST_API_PATH=""
//删除箱数DelBox 
export const DEL_BOX_API_PATH = ""
//收件信息列表GetRecipientList 
export const GET_RECIPIENT_LIST_API_PATH=""
//分配SN号段AssignSn 
export const ASSIGN_SN_API_PATH = ""
//导入《SN》
export const UPLOAD_SN_API_PATH = ""
//导入《发货申请单》
export const UPLOAD_DISTRIBUTE_API_PATH = ""
//导入《五码合一》
export const UPLOAD_5CODE_API_PATH = ""
//导入《电子运单》
export const UPLOAD_WAY_BILL_API_PATH = ""
//导出《跨越物流的发货信息》
export const DOWNLOAD_KUAYU_EXPRESS_API_PATH=""
//导出《出货交接明细表》 及《出货信息表》
export const DOWNLOAD_HANDOVER_INFORMATION_API_PATH = ""
//判断箱号及SN是否正确GetBox
export const GET_BOX_API_PATH = ''
//强制确认 或 系统自动确认（全部正确）SetBox
export const SET_BOX_API_PATH = ""
//异常箱体待维修列表GetExceptionBoxList 
export const EXCEPTION_LIST_API_PATH = ""
//维修单个SN SetSn
export const SET_SN_API_PATH = ""