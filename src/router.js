import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PostEdit from '@/components/PostEdit.vue'
import Blogsdash from '@/components/Blogsdash.vue'
import BlogSettings from '@/views/BlogSettings.vue'
import BlogPages from '@/views/BlogPages.vue'
import Planner from '@/views/Planner.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import ImageEdit from '@/components/ImageEdit.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },   
    {
      path: '/hello',
      name: 'helloWorld',
      component: HelloWorld
    },
    {
      path: '/blogsettings',
      name: 'blogsettings',
      component: BlogSettings
    },
    {
      path: '/blogpages',
      name: 'blogpages',
      component: BlogPages
    },
    {
      path: '/planner',
      name: 'planner',
      component: Planner
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue')
    },
    {
      path: '/postedit/:blog/:post_id',
      name: 'postedit',
      component: PostEdit
    },
    {
      path: '/blogsdash',
      name: 'blogsdash',
      component: Blogsdash
    },
    {
      path: '/image',
      name: 'image',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "image" */ './views/Image.vue')
    },
    {
      path: '/imageEdit/:mvision_id',
      name: 'imageEdit',
      component: ImageEdit
    }
  ]
})
