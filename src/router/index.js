import Vue from 'vue'
import Router from 'vue-router'
import { MenuList } from '../service/constant'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/components/login/index.vue'], resolve),
    },
		{
		  path: '/login',
		  name: 'Login',
		  component: resolve => require(['@/components/login/index.vue'], resolve),
		},
		{
			path:"/home",
			name:'Home',
			component:resolve => require(['@/components/main/index.vue'], resolve),
			children:[{
				path:"/user",
				name:"User",
				component:resolve => require(['@/components/user/index.vue'], resolve),
				meta:{
					auth:[1]
				}
			},{
				path:"/order",
				name:"Order",
				component:resolve => require(['@/components/order/index.vue'], resolve),
				meta:{
					auth:[2]
				}
			},{
				path:"/sn",
				name:"Sn",
				component:resolve => require(['@/components/sn/index.vue'], resolve),
				meta:{
					auth:[3]
				}
			},{
			path:"/delivery",
			name:"Delivery",
			component:resolve => require(['@/components/delivery/index.vue'], resolve),
			meta:{
				auth:[4]
			}
		},{
			path:"/prepare",
			name:"Prepare",
			component:resolve => require(['@/components/prepare/index.vue'], resolve),
			meta:{
				auth:[7,8]
			}
		},{
				path:"/",
				name:"Choice",
				component:resolve => require(['@/components/choice/index.vue'], resolve),
				meta:{
					auth:[8]
				}
			},
			{
				path:"/pack",
				name:"Pack",
				component:resolve => require(['@/components/pack/index.vue'], resolve),
				meta:{auth:[6]}
			},{
				path:"/exceptionBox",
				name:"ExceptionBox",
				component:resolve => require(['@/components/exceptionBox/index.vue'], resolve),
				meta:{auth:[6]}
			},
			{
				path:"/choice",
				name:"Choice",
				component:resolve => require(['@/components/choice/index.vue'], resolve),
				meta:{
					auth:[8]
				}
			},
			{
				path:"/qc",
				name:"Qc",
				component:resolve => require(['@/components/choice/index.vue'], resolve),
				meta:{
					auth:[8]
				}
			},{
				path:"/orderStatus",
				name:"OrderStatus",
				component:resolve => require(['@/components/orderStatus/index.vue'], resolve),
				meta:{
					auth:[8]
				}
		},{
			path:"/system",
			name:"System",
			component:resolve => require(['@/components/backup/index.vue'], resolve),
			meta:{
				auth:[9]
			}
		},{
			path:"/log",
			name:"Log",
			component:resolve => require(['@/components/logList/index.vue'], resolve),
			meta:{
				auth:[10]
			}
		},{
			path:"/box",
			name:"Box",
			component:resolve => require(['@/components/box/index.vue'], resolve),
			meta:{
				auth:[5]
			}
		}]
		}
  ]
})




router.beforeEach ((to, from, next)=>{
	
	if(to.path == '/login'){
		next()
	}else{
		let auth = localStorage.getItem("auth")
		if(auth){
			let menuList = JSON.parse(auth).map(v=>{
				let temp = MenuList.find(item=>item.id==v)
				
				return temp?temp:""
			})
			
			if(menuList.find(item=>{
				return to.meta.auth.findIndex(v=>v==item.id)>-1
				
			})
			){
				next()
			}else{
				next("/login")
			}
		}else{
			next("/login")
		}
	}
  })

  export default router