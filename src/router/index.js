import Vue from 'vue'
import VueRouter from 'vue-router'
import UserProfileView from '../views/UserProfileView.vue'
import SubscribeAddView from '../views/SubscribeAddView.vue'
import ReviewView from '../views/ReviewView.vue'
import NewsView from '../views/NewsView.vue'
import NecessityGoodsView from '../views/NecessityGoodsView.vue'
import BunkerView from '../views/BunkerView.vue'
import ArticleView from '../views/ArticleView.vue'
import BunkerAddView from '../views/BunkerAddView'
import NecessityGoodsAddView from '../views/NecessityGoodsAddView'
import NewsAddView from '../views/NewsAddView'
import ArticleAddView from '../views/ArticleAddView'
import ReviewAddView from '../views/ReviewAddView'
import LoginView from '../views/LoginView'
// import firebase from 'firebase/compat/app'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: UserProfileView
  },
  {
    path: '/subscribe',
    name: 'subscribe',
    component: SubscribeAddView
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
    path: '/add-bunker',
    name: 'add-bunker',
    component: BunkerAddView
  },
  {
    path: '/add-necessity-goods',
    name: 'add-necessity-goods',
    component: NecessityGoodsAddView
  },
  {
    path: '/add-news',
    name: 'add-news',
    component: NewsAddView
  },
  {
    path: '/add-article',
    name: 'add-article',
    component: ArticleAddView
  },
  {
    path: '/add-review',
    name: 'add-review',
    component: ReviewAddView
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

// router.beforeEach((to, from, next) => {
//   console.log("before each")
//   // if (to.matched.some(record => record.meta.authRequired)) {
//       if (firebase.auth().currentUser) {
//           next();
//       } else {
//           alert('You must be logged in to see this page');
//           next({
//               path: '/login',
//           });
//       }
//   // } else {
//   //     next();
//   // }
// });

export default router
