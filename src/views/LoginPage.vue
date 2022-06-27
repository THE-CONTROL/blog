<template>
  <div class="w-full text-slate-900 border-t-2">
        <div class="bg-slate-400 m-auto h-full rounded-md
        w-10/12 sm:w-6/12 pb-4 mt-5">
            <h1 class="text-center text-2xl font-semibold pt-4">Login</h1>
            <p class="text-lg font-medium mt-4 ml-3">Username:</p>
            <div class="w-full flex justify-center">
                <input class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200 t
                ext-sm p-1" placeholder="Type in your username..." type="text" v-model="username">
            </div>
            <p class="text-lg font-medium mt-2 ml-3">Password:</p>
            <div class="w-full flex justify-center">
                <input class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200 p-1 text-sm" 
                type="password" v-model="password" placeholder="Type in your password...">
            </div>
            <div class="w-full flex justify-center mt-4">
                <button class="bg-green-700 hover:bg-green-500
                rounded-md p-1" @click="login()">Login</button>
            </div> 
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
    name: "LoginPage",
    props: {
        isLoggedInTrue: { type: Function },
        showFlash: { type: Function },
        getLoggedInUser: { type: Function },
    }, 
    setup( props ) {
        const username = ref("")
        const password = ref("")
        const route = useRoute()
        const router = useRouter()

        function login() {
            fetch("https://osamamwen.pythonanywhere.com/user/login", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({username: username.value, password: password.value})
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.success) {
                    localStorage.setItem('refresh-user', data.user.refresh)
                    localStorage.setItem('user-access', data.user.access)
                    props.isLoggedInTrue()
                    props.getLoggedInUser()
                    router.push({
                        name: "OthersProfile",
                        query: {
                            ...route.query
                        },
                        params: { username: username.value }
                    })
                }
                props.showFlash(data.message, data.success)
                })
            .catch(error => {
                console.log(error)
            })
        }  
        
    return { username, password, login, route, router }
    }
}
</script>

<style>

</style>