<template>
      <div class="w-full text-slate-900">
        <div class="bg-slate-300 m-auto h-full rounded-md w-8/12 md:w-7/12 pb-4 rounded-tr-md">
            <button class="bg-red-700 hover:bg-red-500 float-right font-semibold text-slate-100
            p-1 rounded-tr-md" @click="showModalFalse3()">X</button>
            <h1 class="text-center text-2xl font-semibold pt-4">Delete Account</h1>
            <p class="text-center mt-4 px-2">Are you sure you want to delete Your 
                Account?</p>
            <div class="w-full mt-2">
                <div class="w-full sm:w-8/12 sm:m-auto md:w-6/12 lg:w-4/12 xl:w-2/12">
                    <div class="w-10/12 flex flex-wrap p-1.5 bg-slate-400 m-auto sm:w-full pb-3">
                        <img :src="userDet.picture" :alt="userDet.username"
                        class="w-14 rounded-full mx-2">
                        <div class="h-14">
                            <h5 class="pt-4 font-medium">{{ userDet.username }}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full mt-4 flex flex-wrap justify-center">
                <button class="bg-green-700 hover:bg-green-500 p-1 ml-4 text-slate-100
                rounded-md text-sm" @click="deleteUser()">Yes</button>
                <button class="bg-red-700 hover:bg-red-500 p-1 ml-4 text-slate-100
                rounded-md text-sm" @click="showModalFalse3()">No</button>
            </div>
        </div>
    </div>
</template>

<script>
import { onBeforeMount, ref } from '@vue/runtime-core'
import { useRouter, useRoute } from 'vue-router'

export default {
    name: "DeleteClient",
    props: {
        showModalFalse3: { type: Function },
        fetchNewToken: { type: Function },
        logoutFunc: { type: Function },
        isLoggedIn: { type: Boolean },
        showFlash: { type: Function },
        isLoggedInFalse: { type: Function },
    }, 
    setup( props ) {
        const route = useRoute()
        const router = useRouter()
        const userDet = ref( {  } )

        function getUser() {
            fetch(`https://osamamwen.pythonanywhere.com/user`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('user-access')}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                userDet.value = data
            })
            .catch(error => {
                console.log(error)
            })
        }


        function deleteUser() {
            fetch(`https://osamamwen.pythonanywhere.com/user/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('user-access')}`
                },
            })
            .then(() => {
                props.logoutFunc("Account Deleted!")
                props.showModalFalse3() 
            })
            .catch(error => {
                console.log(error)
            })
        }

        onBeforeMount(() => {
            if (props.isLoggedIn) {
                getUser()
            } 
            else {
                router.push({
                    name: "LoginPage",
                    query: {
                        ...route.query
                    }
                })    
                props.showFlash("You are not logged in!", false) 
            }
        })

        return { deleteUser, route, router, userDet, getUser }
    }
}
</script>

<style>

</style>

