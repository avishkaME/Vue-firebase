import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddMenu from '@/components/AddMenu'
import EditMenu from '@/components/EditMenu'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, 
    {
      path: '/add-menu',
      name: 'AddMenu',
      component: AddMenu
    },
    {
      path: '/edit-menu/:menu_slug',
      name: 'EditMenu',
      component: EditMenu
    } 
       

  ]
})
