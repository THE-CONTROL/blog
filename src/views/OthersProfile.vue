<template>
  <div class="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 m-auto 
  text-slate-900">
      <h1 class="text-center text-2xl font-semibold pt-4" v-if="userDet.username == user"
      >My Profile</h1>
      <h1 class="text-center text-2xl font-semibold pt-4" v-else
      >{{username}}'s Profile</h1>
      <div class="w-full mt-5">
        <img :src="userDet.picture" :alt="userDet.username" class="w-40 h-40 m-auto
        rounded-full bg-red-900">
      </div>
      <h2 class="text-center text-lg font-medium mt-3">{{ userDet.username }}</h2>
      <p class="text-center text-lg mt-3">Email: {{ userDet.email }}</p>
      <p class="text-center mt-3" v-if="userDet.about">About: {{ userDet.about }}</p>
      <p class="text-center mt-3">Gender: {{ userDet.gender }}</p>
      <p class="text-center mt-3" v-if="userDet.pronouns">About: {{ userDet.pronouns }}</p>
      <p class="text-center mt-3 text-xs">Date Joined: {{ userDet.date }}</p>
      <div class="w-full flex flex-nowrap justify-center mt-7 text-white"
      v-if="userDet.username == user">
        <button class="bg-blue-900 p-1 mr-4 hover:bg-blue-700 rounded-md">
            <router-link to="/update/profile">Update</router-link></button>
        <button class="bg-red-900 p-1 hover:bg-red-700 rounded-md"
        @click="showModalTrue3()">Delete</button>
      </div>
      <div class="w-full flex flex-nowrap justify-center mt-7 text-white" v-else>
        <button class="bg-slate-900 p-1 mr-4 hover:bg-slate-700 rounded-md">
         <router-link :to="{ name: 'OthersPosts', params: { username: username } }">
            Posts</router-link></button>
        <button class="bg-slate-900 p-1 mr-4 hover:bg-slate-700 rounded-md">
         <router-link :to="{ name: 'OthersComments', params: { username: username } }">
            Comments</router-link></button>
      </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
    name: "OthersProfile",
    props: {
        username: { type: String, required:true },
        fetchNewToken: { type: Function },
        showModalTrue3: { type: Function },
        isLoggedIn: { type: Boolean }
    },
    setup( props ) {
        const userDet = ref( {  } )
        const route = useRoute()
        const router = useRouter()
        const user = ref("")

        function getUser() {
            fetch(`https://osamamwen.pythonanywhere.com/user/${props.username}`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                }
            })
            .then(resp => resp.json())
            .then(data => {
                userDet.value = data
                getLoggedInUser()
            })
            .catch(error => {
                console.log(error)
            })
        }

        function getLoggedInUser() {
            if (props.isLoggedIn) {
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
            getUser()
        })

        return { userDet, getUser, route, router, getLoggedInUser, user }
    }
}
</script>

<style>

</style>