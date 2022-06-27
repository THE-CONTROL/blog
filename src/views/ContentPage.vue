<template>
  <div class="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 m-auto
  h-full px-5 pt-3 pb-6 text-center text-slate-900">
    <router-link :to="{ name: 'OthersProfile', params: { username: user } }"> 
      <div class="w-full flex flex-wrap p-1.5 bg-slate-500 hover:bg-slate-600 ">
            <img :src="postDetails.user_image" :alt="postDetails.username"
            class="w-14 rounded-full mx-2">
            <div class="h-14">
                <h5 class="pt-4 font-medium ">{{postDetails.username}}</h5>
            </div>
      </div>
    </router-link>
      <h1 class=" text-2xl font-semibold">{{ postDetails.heading }}</h1>
      <img :src="postDetails.image" :alt="postDetails.id" v-if="postDetails.image"
      class="sm:w-6/12 w-60 m-auto mt-3">
      <p class="mt-3">{{ postDetails.content }}</p>
      <p class="text-right text-xs mt-2">Date Created: {{ postDetails.date }}</p>
      <div class="w-full mt-5">
          <h2 class="text-2xl font-medium">Comments</h2>
          <div v-if="comments.length">
            <div v-for="(comment, index) in comments" :key="index" class="w-full">
              <div class="w-full mt-2 pb-1 bg-slate-300 rounded-md text-sm">
                <router-link :to="{ name: 'OthersProfile', params: { username:comment.username } }">
                  <div class="w-full flex flex-wrap justify-start bg-slate-500 hover:bg-slate-600 p-1.5">
                    <img :src="comment.user_image" :alt="comment.username" class="w-10 h-10 
                    rounded-full mx-2">
                    <h1 class="text-lg font-medium pt-1.5">{{comment.username}}</h1>
                  </div>
                </router-link>
                  <p class="my-4 mx-5 text-left">{{ comment.content }}</p>
                  <p class="text-right text-xs pr-3">Date Created: {{ comment.date }}</p>
                  <div v-if="!showUpdateInput && (isLoggedIn && comment.username == username)" 
                  class="w-full flex justify-center text-xs text-slate-100 mt-0.5">
                      <button class="mr-5 p-0.5 rounded-sm bg-blue-700 hover:bg-blue-500" 
                      @click="showUpdateInputTrue(index)">Update</button>
                      <button class="bg-red-700 p-0.5 rounded-sm
                      hover:bg-red-500" @click="deleteComment(comment.id)">Delete</button>
                  </div>
                  <div class="w-full text-xs mt-1" v-if="(showUpdateInput && count == index)  
                  && (isLoggedIn && comment.username == username)">
                      <div class="w-full">
                          <input class="w-11/12 border-2 rounded-md bg-slate-100 h-6
                        focus:bg-slate-200 p-2 text-sm border-slate-900 mt-1"
                          placeholder="Type in the comment..." type="text" v-model="otherComment">
                      </div>
                      <div class="w-full flex justify-center text-xs text-slate-100 mt-0.5">
                          <button class="mr-5 p-0.5 rounded-sm bg-blue-700 hover:bg-blue-500" 
                          @click="updateComment(comment.id)">Update</button>
                          <button class="bg-red-700 p-0.5 rounded-sm
                        hover:bg-red-500" @click="showUpdateInputFalse()">Cancel</button>
                      </div>
                  </div>
              </div>
           </div>
          </div>
            <div v-else>
                <h3 class="text-base font-medium">No comments yet...</h3>
            </div>
           <div class="w-full bg-slate-400 py-1 mt-5 flex flex-nowrap justify-center" v-if="meta.pages">
                <button class="bg-slate-100 mr-2 border border-slate-900 rounded-md
                hover:bg-slate-300 px-1" v-if="meta.has_prev" @click="getComments(meta.prev_page)"
                >prev</button>
                <button class="bg-slate-100 mr-2 border border-slate-900 rounded-md
                hover:bg-slate-300 px-1 text-xs" v-for="(page, index) in meta.pages" 
                :key="index" :class="page == meta.page ? 'bg-slate-300':''" 
                @click="getComments(page)">{{ page }}</button>
                <button class="bg-slate-100 mr-2 border border-slate-900 rounded-md
                hover:bg-slate-300 px-1" v-if="meta.has_next" @click="getComments(meta.next_page)"
                >next</button>
            </div>
      </div>
      <div class="w-full mt-6" v-if="isLoggedIn">
          <h3 class="text-xl">Add Comment</h3>
          <div class="w-full">
              <input class="w-11/12 border-2 rounded-md bg-slate-100 focus:bg-slate-200 p-2 text-sm
            border-slate-900 mt-2" placeholder="Type in the comment..." type="text" v-model="newComment">
          </div>
          <button class="bg-green-700 hover:bg-green-500 rounded-md p-1 
          text-slate-100 mt-3" @click="addComment()">Add</button>
      </div>
</div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
    name: "ContentPage",
    props: {
        contentId: { type: [Number, String], required:true },
        fetchNewToken: { type: Function },
        isLoggedIn: { type: Boolean },
        showFlash: { type: Function }
    },
    setup( props ) {
        const comments = ref([])
        const newComment = ref("")
        const newComObj = ref({"content": ""})
        const postDetails = ref({})
        const route = useRoute()
        const router = useRouter()
        const showUpdateInput = ref(false)
        const otherComment = ref("")
        const count = ref(null)
        const meta = ref({  })
        const username = ref("")
        const user = ref("demo")

        function getPostDetails() {
            fetch(`https://osamamwen.pythonanywhere.com/posts/${props.contentId}`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .then(resp => resp.json())
            .then((data) => {
                postDetails.value = data.result
                user.value = postDetails.value.username
                getComments()
            })
            .catch(error => {
                console.log(error)
            })
        }        

        function getComments(page) {
            fetch( `https://osamamwen.pythonanywhere.com/comments/post/${postDetails.value.id}`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                    "page": page
                }
            })
            .then(resp => resp.json())
            .then(data => {
                comments.value = data.result
                meta.value = data.meta
                getUser()
            })
            .catch(error => {
                console.log(error)
            })
        }

        function addComment() {
            fetch(`https://osamamwen.pythonanywhere.com/comments/add/${postDetails.value.id}`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('user-access')}`
                },
                body: JSON.stringify({content: newComment.value})
            })
            .then(resp => resp.json())
            .then((data) => {
                props.showFlash(data.message, data.success)
                newComment.value = ""
                getComments()
            })
            .catch(error => {
                console.log(error)
            })    
        }

        function deleteComment(commentId) {
            fetch(`https://osamamwen.pythonanywhere.com/comments/delete/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('user-access')}`
                },
            })
            .then(() => {
                props.showFlash("Comment Deleted!", true)
                getComments()   
            })
            .catch(error => {
                console.log(error)
            })
        }

        function showUpdateInputTrue(index) {
            showUpdateInput.value = true
            otherComment.value = comments.value[index].content
            count.value = index
        }

        function showUpdateInputFalse() {
            showUpdateInput.value = false
            otherComment.value = ""
            count.value = null
        }

        function updateComment(commentId) {
            fetch(`https://osamamwen.pythonanywhere.com/comments/update/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('user-access')}`
                    },
                    body: JSON.stringify({content: otherComment.value})
                })
            .then(resp => resp.json())
            .then((data) => {
                props.showFlash(data.message, data.success)
                showUpdateInputFalse()
                getComments()
            })    
            .catch(error => {
                console.log(error)
            })
        }


        function getUser() {
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
                    username.value = data.username
                })
                .catch(error => {
                    console.log(error)
                })
            }   
        }


        onBeforeMount(() => {
            getPostDetails()
        })

        return { comments, newComment, newComObj, getPostDetails, postDetails, getComments,
        addComment, route, router, deleteComment, showUpdateInput, showUpdateInputTrue, 
        showUpdateInputFalse, updateComment, otherComment, count, meta, getUser, username,
        user }
    }
}
</script>

<style>

</style>