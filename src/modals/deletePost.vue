<template>
      <div class="w-full text-slate-100">
        <div class="bg-slate-400 m-auto h-full rounded-md w-8/12 md:w-7/12 pb-4 rounded-tr-md">
            <button class="bg-red-700 hover:bg-red-500 float-right font-semibold text-slate-100
            p-1 rounded-tr-md" @click="showModalFalse1()">
                <router-link to="/posts">X</router-link>
            </button>
            <h1 class="text-center text-2xl font-semibold pt-4 text-slate-900">Delete Post</h1>
            <p class="text-center mt-4 text-slate-900 px-2">Are you sure you want to delete this post?</p>
            <div class="w-full mt-2">
                <div class="w-full sm:w-8/12 sm:m-auto md:w-6/12 lg:w-4/12 xl:w-2/12">
                    <div class="w-10/12 bg-slate-600 m-auto sm:w-full pb-3">
                        <div class= "w-full px-4 my-2 text-base overflow-auto text-center">
                            <h6>{{ oldHeading }}</h6>
                        </div>
                        <img v-if="oldImage" :src="oldImage" alt="Image to delete" class="w-8/12
                        m-auto">
                    </div>
                </div>
            </div>
            <div class="w-full mt-4 flex flex-wrap justify-center">
                <button class="bg-green-700 hover:bg-green-500 p-1 ml-4 
                rounded-md text-sm" @click="deletePost()">
                    <router-link to="/posts">Yes</router-link>
                </button>
                <button class="bg-red-700 hover:bg-red-500 p-1 ml-4 
                rounded-md text-sm" @click="showModalFalse1()">
                    <router-link to="/posts">No</router-link>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { onBeforeMount, ref } from '@vue/runtime-core'
import { useRouter, useRoute } from 'vue-router'

export default {
    name: "DeletePost",
    props: {
        showModalFalse1: { type: Function },
        postId: { type: [Object, Number] },
        fetchNewToken: { type: Function },
        isLoggedIn: { type: Boolean },
        showFlash: { type: Function }
    }, 
    setup( props ) {
        const route = useRoute()
        const router = useRouter()
        const oldHeading = ref("")
        const oldContent = ref("")
        const oldImage = ref(null)

        function getPostDetails() {
            fetch(`https://osamamwen.pythonanywhere.com/posts/${props.postId}`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .then(resp => resp.json())
            .then((data) => {
                oldHeading.value = data.result.heading
                oldContent.value = data.result.content
                oldImage.value = data.result.image
            })
            .catch(error => {
                console.log(error)
            })
        }  


        function deletePost() {
            fetch(`https://osamamwen.pythonanywhere.com/posts/delete/${props.postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('user-access')}`
                },
            })
            .then(() => {
                router.push({
                    name: "DeletePage",
                    query: {
                        ...route.query
                    }
                })
                props.showFlash("Post Deleted", true)
                props.showModalFalse1()
            })
            .catch(error => {
                console.log(error)
            })
        }

        onBeforeMount(() => {
            if (props.isLoggedIn) {
                getPostDetails()
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

        return { deletePost, route, router, getPostDetails, oldHeading, oldContent, oldImage }
    }
}
</script>

<style>

</style>