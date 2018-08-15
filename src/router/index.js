import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from './../views/Home'
import Forum from './../views/Forum'
import Posts from './../views/Post/Posts'
import Post from './../views/Post/Post'
import CreatePost from './../views/Post/CreatePost'
import Signin from './../views/User/Signin'
import Signup from './../views/User/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'CreatePost',
      component: CreatePost,
      beforeEnter: AuthGuard
    },
    {
      path: '/posts/:id',
      name: 'post',
      props: true,
      component: Post
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
