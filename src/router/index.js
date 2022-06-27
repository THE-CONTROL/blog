import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import ContentPage from '../views/ContentPage.vue'
import DeletePage from '../views/DeletePage.vue'
import SignupPage from '../views/SignupPage.vue'
import LoginPage from '../views/LoginPage.vue'
import UpdatePage from '../views/UpdatePage.vue'
import CommentPage from '../views/CommentPage.vue'
import OthersProfile from '../views/OthersProfile.vue'
import OthersComments from '../views/OthersComments.vue'
import OthersPosts from '../views/OthersPosts.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: "MainPage",
    component: MainPage
  },
  {
    path: '/content/:contentId',
    name: "ContentPage",
    component: ContentPage,
    props: true
  },
  {
    path: '/posts',
    name: "DeletePage",
    component: DeletePage,
  },
  {
    path: '/login',
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: '/signup',
    name: "SignupPage",
    component: SignupPage,
  },
  {
    path: '/update/profile',
    name: "UpdatePage",
    component: UpdatePage,
  },
  {
    path: '/comments',
    name: "CommentPage",
    component: CommentPage,
  },
  {
    path: '/profile/:username',
    name: "OthersProfile",
    component: OthersProfile,
    props: true
  },
  {
    path: '/comments/:username',
    name: "OthersComments",
    component: OthersComments,
    props: true
  },
  {
    path: '/posts/:username',
    name: "OthersPosts",
    component: OthersPosts,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: "PageNotFound",
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
