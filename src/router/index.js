import Vue from 'vue'
import Router from 'vue-router'
import Routes from './config'
import global from '@/components/Global'
Vue.use(Router)



const routers = new Router({
  routes: Routes
})

// 导航守卫
routers.beforeEach((to, from, next) => {
    if (to.name === 'login') {
     next()
    } else {
     if(global.User_.user!=undefined){
       next();
     }else{
       next("/");
     }
  }
})
export default routers
