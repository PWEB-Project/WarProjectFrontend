import Vue from 'vue'
import VueRouter from 'vue-router'
import UserProfileView from '../views/UserProfileView.vue'
import SubscribePage from '../views/SubscribePage.vue'
import ReviewView from '../views/ReviewView.vue'
import NewsView from '../views/NewsView.vue'
import NecessityGoodsView from '../views/NecessityGoodsView.vue'
import BunkerView from '../views/BunkerView.vue'
import ArticleView from '../views/ArticleView.vue'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: UserProfileView
  },
  {
    path: '/subscribe',
    name: 'subscribe',
    component: SubscribePage
  },
  {
    path: '/review',
    name: 'review',
    component: ReviewView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView
  },
  {
    path: '/necessity-goods',
    name: 'necessity-goods',
    component: NecessityGoodsView
  },
  {
    path: '/bunker',
    name: 'bunker',
    component: BunkerView
  },
  {
    path: '/article',
    name: 'article',
    component: ArticleView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
