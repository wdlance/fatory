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
				path:"/",
				name:"User",
				component:resolve => require(['@/components/user/index.vue'], resolve),
			},
			{
				path:"/user",
				name:"User",
				component:resolve => require(['@/components/user/index.vue'], resolve),
			},{
				path:"/order",
				name:"Order",
				component:resolve => require(['@/components/order/index.vue'], resolve),
			}]
		}
  ]
})
