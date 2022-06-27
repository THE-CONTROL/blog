<template>
  <div class="bg-slate-100 text-slate-900">    
    <div class="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 m-auto flex flex-wrap
    border-x-2">
        <div class="w-full">
            <div v-if="posts.length">
                <div v-for="(post, index) in posts" :key="index"
                class="w-full pb-2 mt-5 bg-slate-300">
                    <router-link :to="{ name: 'OthersProfile', params: { username:post.username } }">
                        <div class="w-full flex flex-wrap p-1.5 bg-slate-500 hover:bg-slate-600">
                            <img :src="post.user_image" :alt="post.username"
                            class="w-14 rounded-full mx-2">
                            <div class="h-14">
                                <h5 class="pt-4 font-medium ">{{post.username}}</h5>
                            </div>
                        </div>
                    </router-link>
                    <router-link :to="{ name: 'ContentPage', params: { contentId:post.id } }">
                        <div class="bg-slate-300 hover:bg-slate-400">
                            <div class= "w-full px-5 overflow-auto mt-2 hover">
                                <h6>{{ post.heading }}</h6>
                            </div>
                            <img v-if="post.image" :src="post.image" :alt="post.id" class="w-7/12 m-auto 
                            sm:w-80 mt-2">
                            <div class= "w-full text-right px-5 overflow-auto mt-2 text-xs">
                                <h6>Date Created: {{ post.date }}</h6>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div v-else>
                <h3 class="text-center text-xl font-medium pt-4">No posts yet...</h3>
            </div>
        </div>
        <div class="w-full bg-slate-400 py-1 mt-5 flex flex-nowrap justify-center" v-if="meta.pages">
            <button class="bg-slate-100 mr-2 border border-slate-900 rounded-md
            hover:bg-slate-300 px-1" v-if="meta.has_prev" @click="getPosts(meta.prev_page)"
            >prev</button>
            <button class="bg-slate-100 mr-2 border border-slate-900 rounded-md
            hover:bg-slate-300 px-1 text-sm" v-for="(page, index) in meta.pages" :key="index"
            :class="page == meta.page ? 'bg-slate-300':''" @click="getPosts(page)"
            >{{ page }}</button>
            <button class="bg-slate-100 mr-2 border border-slate-900 rounded-md
            hover:bg-slate-300 px-1" v-if="meta.has_next" @click="getPosts(meta.next_page)"
            >next</button>
        </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'

export default {
    name: "MainPage",
    setup() {
        const posts = ref([  ])
        const meta = ref({ })

        function getPosts(page) {
            fetch("https://osamamwen.pythonanywhere.com/posts/all", {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "page": page
                },
            })
            .then(resp => resp.json())
            .then((data) => {
                posts.value = data.result
                meta.value = data.meta
            })
            .catch(error => {
                console.log(error)
            })
        }

        onBeforeMount(() => {
            getPosts()
        })

        return { posts, getPosts, meta }
    }
}
</script>

<style>

</style>