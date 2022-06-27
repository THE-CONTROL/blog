<template>
    <div v-if="!showModal && (!showModal1 && (!showModal2 && !showModal3))" 
    class="bg-slate-100 text-slate-100 pb-16 min-h-screen" 
    :class="flash ? 'pt-20':'pt-12'">
        <nav class="bg-slate-900 w-full flex flex-wrap sm:justify-between justify-start fixed top-0">
            <button @click="showNavFunc()" class="sm:hidden mx-2"><fa :icon="['fas', 'navicon']"/></button>
            <h1 class="text-3xl w-fit py-2 ml-3 text-green-900 font-bold">NAI<span 
            class="text-green-100">JA B</span>LOG</h1>
            <div class="hidden sm:flex sm:flex-wrap py-1">
                <h3 class="w-fit py-3 px-2 h-full hover:bg-blue-600">
                    <router-link to="/">Home</router-link>
                </h3>
                <h3 class="w-fit py-3 px-2 h-full hover:bg-blue-600" 
                v-if="isLoggedIn">
                <router-link :to="{ name: 'OthersProfile', params: { username:user} }">
                Profile</router-link></h3>
                <h3 class="w-fit py-3 px-2 h-full hover:bg-blue-600" 
                @click="showModalTrue()" v-if="isLoggedIn">Post</h3>
                <h3 class="w-fit py-3 px-2 h-full hover:bg-blue-600" 
                v-if="isLoggedIn"><router-link to="/posts">My Posts</router-link>
                </h3>
                <h3 class="w-fit py-3 px-2 h-full hover:bg-blue-600" 
                v-if="isLoggedIn"><router-link to="/comments">My Comments</router-link>
                </h3>
                <h3 class="w-fit py-3 px-2 h-full hover:bg-blue-600" 
                v-if="isLoggedIn" @click="logoutFunc('Logout successful!')">Logout</h3>
                <h3 class="w-fit py-3 px-2 h-full hover:bg-blue-600"
                v-if="!isLoggedIn"><router-link to="/login">Login</router-link></h3>
                <h3 class="w-fit py-3 px-2 h-full hover:bg-blue-600"
                v-if="!isLoggedIn"><router-link to="/signup">SignUp</router-link></h3>
            </div>
            <div class="w-full flex flex-nowrap justify-between pl-5 py-1"
            v-if="flash" :class="success ? 'bg-green-400':'bg-red-400'">
                <p>{{ flash }}</p>
                <button class="h-6 bg-red-900 hover:bg-red-700 mr-3 rounded-md px-1"
                @click="removeFlash()">Dismiss</button>
            </div>
        </nav>
        <nav class="bg-slate-800 sm:hidden" :class="showNav ? 'block':'hidden'">
            <h3 class="w-full py-3 px-2 h-fit hover:bg-blue-600 text-center"
            @click="showNavFunc()"><router-link to="/">Home</router-link></h3>
            <h3 class="w-full py-3 px-2 h-fit hover:bg-blue-600 text-center" 
            v-if="isLoggedIn" @click="showNavFunc()">
            <router-link :to="{ name: 'OthersProfile', params: { username:user} }">
            Profile
            </router-link></h3>
            <h3 class="w-full py-3 px-2 h-fit hover:bg-blue-600 text-center" 
            @click="showModalTrue(), showNavFunc()" v-if="isLoggedIn" >Post</h3>
            <h3 class="w-full py-3 px-2 h-fit hover:bg-blue-600 text-center" 
            v-if="isLoggedIn" @click="showNavFunc()"><router-link to="/posts">
            My Posts</router-link></h3>
            <h3 class="w-full py-3 px-2 h-fit hover:bg-blue-600 text-center" 
            v-if="isLoggedIn" @click="showNavFunc()"><router-link to="/comments">
            My Comments</router-link></h3>
            <h3 class="w-full py-3 px-2 h-fit hover:bg-blue-600 text-center" 
            v-if="isLoggedIn" @click="logoutFunc('Logout successful!'), 
            showNavFunc()">Logout</h3>
            <h3 class="w-full py-3 px-2 h-fit hover:bg-blue-600 text-center"
            v-if="!isLoggedIn" @click="showNavFunc()"><router-link to="/login">
            Login</router-link></h3>
            <h3 class="w-full py-3 px-2 h-fit hover:bg-blue-600 text-center"
            v-if="!isLoggedIn" @click="showNavFunc()"><router-link to="/signup">
            Sign up</router-link></h3>
        </nav>
        <router-view :showModalTrue1="showModalTrue1" :showModalTrue2="showModalTrue2"
        :isLoggedInTrue="isLoggedInTrue" :fetchNewToken="fetchNewToken"
        :showModalTrue3="showModalTrue3" :isLoggedIn="isLoggedIn" :showFlash="showFlash"
        :getLoggedInUser="getLoggedInUser"/>
        <div class="w-full bg-slate-700 text-right pr-3 py-1 fixed bottom-0 left-0">
            <h1 class="font-bold text-sm"><i>Created by:</i> CONTROL</h1>
        </div>
    </div>
    <div v-if="showModal" class="w-screen min-h-screen bg-slate-100 pt-20 pb-20">
        <AddPost :showModalFalse="showModalFalse" :fetchNewToken="fetchNewToken"
        :isLoggedIn="isLoggedIn" :showFlash="showFlash"/>
    </div>
    <div v-if="showModal1" class="w-screen min-h-screen bg-slate-100 pt-20 pb-20">
        <DeletePost :showModalFalse1="showModalFalse1" :postId="postId"
        :fetchNewToken="fetchNewToken" :isLoggedIn="isLoggedIn" :showFlash="showFlash"/>
    </div>
    <div v-if="showModal2" class="w-screen min-h-screen bg-slate-100 pt-20 pb-20">
        <UpdatePost :showModalFalse2="showModalFalse2" :postId="postId"
        :fetchNewToken="fetchNewToken" :isLoggedIn="isLoggedIn" :showFlash="showFlash"/>
    </div>
    <div v-if="showModal3" class="w-screen min-h-screen bg-slate-100 pt-20 pb-20">
        <DeleteClient :showModalFalse3="showModalFalse3" :fetchNewToken="fetchNewToken"
        :logoutFunc="logoutFunc" :isLoggedIn="isLoggedIn" :showFlash="showFlash"
        :isLoggedInFalse="isLoggedInFalse"/>
    </div>
</template>

<script>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import AddPost from "../modals/addPost.vue"
import DeletePost from "../modals/deletePost.vue"
import UpdatePost from "../modals/updatePost.vue"
import DeleteClient from "../modals/deleteClient.vue"
import { useRouter, useRoute } from 'vue-router'

export default {
    name: "HomeWorld",
    components: {
        AddPost,
        DeletePost,
        UpdatePost,
        DeleteClient
    },
    setup() {
        const showNav = ref(false)
        const showModal = ref(false)
        const showModal1 = ref(false)
        const showModal2 = ref(false)
        const showModal3 = ref(false)
        const postId = ref(null)
        const isLoggedIn = ref(false)
        const route = useRoute()
        const router = useRouter()
        const flash = ref("")
        const success = ref(true)
        const username = ref("")
        const interval = ref("")
        const user = ref("demo")

        function showNavFunc() {
            showNav.value = !showNav.value
        }

        function showModalFalse() {
            showModal.value = false
        }

        function showModalTrue() {
            showModal.value = true
        }

        function showModalFalse1() {
            showModal1.value = false
            postId.value = null
        }

        function showModalTrue1(index) {
            postId.value = index
            showModal1.value = true
        }

        function showModalFalse2() {
            postId.value = null
            showModal2.value = false
        }

        function showModalTrue2(index) {
            postId.value = index
            showModal2.value = true
        }

        function showModalFalse3() {
            showModal3.value = false
        }

        function showModalTrue3() {
            showModal3.value = true
        }

        function isLoggedInTrue() {
            isLoggedIn.value = true
        }

        function isLoggedInFalse() {
            isLoggedIn.value = false
        }

        function logoutFunc(value) {
            localStorage.clear('refresh-user')
            localStorage.clear('user-access')
            isLoggedInFalse()
            router.push({
                name: "LoginPage",
                query: {
                    ...route.query
                }
            })
            showFlash(value, true)
        }

        function fetchNewToken() {
            if (isLoggedIn.value) {
                fetch("https://osamamwen.pythonanywhere.com/user/refresh", {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${localStorage.getItem('refresh-user')}`
                    }
                })
                .then(resp => resp.json())
                .then((data) => {
                    if (data.access) {
                        localStorage.setItem('user-access', data.access)
                    }
                    else {
                        logoutFunc()                  
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }

        function removeFlash() {
            flash.value = ""
        }

        function showFlash(message, bool) {
            flash.value = message,
            success.value = bool
        }

        function getLoggedInUser() {
            if (isLoggedIn.value) {
                fetch(`https://osamamwen.pythonanywhere.com/user`, {
                    method: "GET",
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${localStorage.getItem('user-access')}`
                    }
                })
                .then(resp => resp.json())
                .then(data => {
                    user.value = data.username
                })
                .catch(error => {
                    console.log(error)
                })
            }
            
        }

        onBeforeMount(() => {
            if (localStorage.getItem('refresh-user')) {
                isLoggedInTrue()
                fetchNewToken()
                getLoggedInUser()
            }
            interval.value = setInterval(fetchNewToken, 240000)
        })

        onBeforeUnmount(() => {
            clearInterval(interval.value)
        })

        return { showNav, showNavFunc, showModal, showModalFalse,
        showModalTrue, showModalFalse1, showModalTrue1, showModal1,
        postId, showModal2, showModalFalse2, showModalTrue2, isLoggedIn,
        isLoggedInTrue, logoutFunc, route, router, isLoggedInFalse, fetchNewToken,
        showModal3, showModalFalse3, showModalTrue3, flash, removeFlash,
        success, showFlash, username, interval, getLoggedInUser, user }
    }
}
</script>

<style>

</style>