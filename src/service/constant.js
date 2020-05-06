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
	name:"Box"
},{
	id:ROLE_ID_PREPARE,
	name:"超级管理员"
},{
	id:ROLE_ID_QC,
	name:"超级管理员"
}]

export const MenuList = [{
	id:0,
	name:"用户管理系统",
	url:"/user"
},{
	id:1,
	name:"订单管理",
	url:"/order"
}]