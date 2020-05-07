export const ROLE_ID_SUPERADMIN = 1
export const ROLE_ID_SYSADMIN = 2
export const ROLE_ID_PMC = 3
export const ROLE_ID_BOX = 4
export const ROLE_ID_PREPARE  = 5
export const ROLE_ID_QC = 6


export const RoleList = [{
	id:ROLE_ID_SUPERADMIN,
	name:"超级管理员"
},{
	id:ROLE_ID_SYSADMIN,
	name:"系统管理员"
},{
	id:ROLE_ID_PMC,
	name:"PMC"
},{
	id:ROLE_ID_BOX,
	name:"扫描装箱"
},{
	id:ROLE_ID_PREPARE,
	name:"仓库备货"
},{
	id:ROLE_ID_QC,
	name:"品管"
}]

export const MenuList = [{
	id:1,
	name:"用户管理",
	url:"/user"
},{
	id:2,
	name:"订单管理",
	url:"/order"
},{
	id:3,
	name:"SN管理",
	url:"/sn"
},{
	id:4,
	name:"发货管理",
	url:"/delivery"
},{
	id:5,
	name:"箱号管理",
	url:"/box"
},{
	id:6,
	name:"扫描装箱",
	url:"/pack"
},{
	id:7,
	name:"仓库备货",
	url:"/prepare"
},{
	id:8,
	name:"品管",
	
	children:[{
		id:81,
		name:"发货信息管理",
		url:"/choice"
	},{
		id:82,
		name:"订单状态",
		url:"/orderStatus"
	}]
},{
	id:9,
	name:"系统管理",
	url:"/system"
},{
	id:10,
	name:"系统日志",
	url:"/log"
}]