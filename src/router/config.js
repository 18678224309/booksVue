const Routes = [
  {
    name: 'login',
    path: '/',
    component: () => import('@/models/home/login'),
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/models/home/home'),
    children:[
      {
        path: '/order',
        component: () => import('@/models/order/order'),
      }
    ]
  },
]
export default Routes
