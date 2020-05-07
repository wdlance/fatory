import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
			},{
				path:"/order",
				name:"Order",
				component:resolve => require(['@/components/order/index.vue'], resolve),
			},{
				path:"/sn",
				name:"Sn",
				component:resolve => require(['@/components/sn/index.vue'], resolve),
			},{
			path:"/delivery",
			name:"Delivery",
			component:resolve => require(['@/components/delivery/index.vue'], resolve),
		},{
			path:"/prepare",
			name:"Prepare",
			component:resolve => require(['@/components/prepare/index.vue'], resolve),
		},{
				path:"/",
				name:"Choice",
				component:resolve => require(['@/components/choice/index.vue'], resolve),
			},
			{
				path:"/pack",
				name:"Pack",
				component:resolve => require(['@/components/pack/index.vue'], resolve),
			},{
				path:"/exception-box",
				name:"ExceptionBox",
				component:resolve => require(['@/components/exceptionBox/index.vue'], resolve),
			},
			{
				path:"/choice",
				name:"Choice",
				component:resolve => require(['@/components/choice/index.vue'], resolve),
			},{
				path:"/orderStatus",
				name:"OrderStatus",
				component:resolve => require(['@/components/orderStatus/index.vue'], resolve),
		},{
			path:"/system",
			name:"System",
			component:resolve => require(['@/components/backup/index.vue'], resolve),
		},{
			path:"/log",
			name:"Log",
			component:resolve => require(['@/components/logList/index.vue'], resolve),
		}]
		}
  ]
})
