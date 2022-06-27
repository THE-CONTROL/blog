<template>
    <div class="w-full text-slate-900">
        <div class="bg-slate-400 m-auto h-full rounded-md
        w-10/12 lg:w-9/12 pb-4">
            <button class="bg-red-700 hover:bg-red-500 float-right font-semibold text-slate-100
            p-1 rounded-tr-md" 
            @click="showModalFalse2()">
                <router-link to="/posts">X</router-link>
            </button>
            <h1 class="text-center text-2xl font-semibold pt-4">Update Post</h1>
            <p class="text-lg font-medium mt-4 ml-3">Heading:</p>
            <div class="w-full flex justify-center">
                <input class="w-11/12 text-center rounded-md bg-slate-100 focus:bg-slate-200
                border-2 border-slate-900 focus:border-0" placeholder="Type in the heading..." 
                v-model="newHeading">
            </div>
            <p class="text-lg font-medium mt-2 ml-3">Content:</p>
            <div class="w-full flex justify-center">
                <textarea class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200 p-2 text-sm
                border-2 border-slate-900 focus:border-0" placeholder="Type in the content..." 
                v-model="newContent"></textarea>
            </div>
            <p class="text-lg font-medium mt-2 ml-3">Image:</p>
            <div class="w-full flex justify-center">
                <input class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200 p-2 text-sm"
                placeholder="Type in the content..." type="file" @change="onFileChange">
            </div>
            <div v-if="oldImage" class="w-full">
                <img :src="oldImage" alt="" class="w-20 h-20 m-auto mt-2">
                <div class="w-full flex justify-center">
                    <button class="px-1 rounded-md mt-2 bg-red-700 hover:bg-red-500"
                    @click="clearImage()">X</button>
                </div>               
            </div>
            <div class="w-full flex justify-center mt-4">
                <button @click="updatePost()" class="bg-blue-700 hover:bg-blue-500
                rounded-md p-1 text-slate-100">Update</button>
            </div> 
        </div>
    </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
    name: "UpdatePost",
    props: {
        showModalFalse2: { type: Function },
        postId: { type: [Object, Number] },
        fetchNewToken: { type: Function },
        isLoggedIn: { type: Boolean },
        showFlash: { type: Function }
    }, 
    setup( props ) {
        const newHeading = ref("")
        const newContent = ref("")
        const newImage = ref(null)
        const oldImage = ref(null)
        const imageArray = ref(["jpg", "png", "jpeg"])
        const route = useRoute()
        const router = useRouter()


        function getPostDetails() {
            fetch(`https://osamamwen.pythonanywhere.com/posts/${props.postId}`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .then(resp => resp.json())
            .then((data) => {
                newHeading.value = data.result.heading
                newContent.value = data.result.content
                oldImage.value = data.result.image
            })
            .catch(error => {
                console.log(error)
            })
        }  


        function updatePost() {
            fetch(`https://osamamwen.pythonanywhere.com/posts/update/${props.postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('user-access')}`
                },
                body: JSON.stringify({heading: newHeading.value, 
                content: newContent.value, image: oldImage.value})
            })
            .then(resp => resp.json())
            .then((data) => {
                router.push({
                    name: "DeletePage",
                    query: {
                        ...route.query
                    }
                })
                props.showFlash(data.message, data.success)
                props.showModalFalse2()
            })
            .catch(error => {
                console.log(error)
            })
        }

        function onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files
            if (!files.length) {return}
            this.createImage(files[0])
        }

        function createImage(file) {
            newImage.value = new Image()
            var reader = new FileReader()
            const check = file.name.toString()
            const imageType = check.split(".")[1]
            if (imageArray.value.includes(imageType)) {
                reader.onload = (e) => {
                    newImage.value = e.target.result
                    oldImage.value = newImage.value
                };
                reader.readAsDataURL(file)
            }
            else {
                alert("Only .jpg, .jpeg and .png files are allowed")
                newImage.value = oldImage.value
            }
        }

        function clearImage() {
            oldImage.value = null
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

        return { newHeading, newContent, newImage, onFileChange, createImage, imageArray,
        updatePost, route, router, oldImage, getPostDetails, clearImage }
    }
}
</script>

<style>

</style>