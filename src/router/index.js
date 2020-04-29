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
				name:"OrderManagement",
				component:resolve => require(['@/components/orderManagement/index.vue'], resolve),
			},
			{
				path:"/OrderManagement",
				name:"OrderManagerment",
				component:resolve => require(['@/components/orderManagement/index.vue'], resolve),
			}]
		}
  ]
})
