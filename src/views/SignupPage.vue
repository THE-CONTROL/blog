<template>
  <div class="w-full text-slate-900 border-t-2">
        <div class="bg-slate-400 m-auto h-full rounded-md
        w-10/12 sm:w-6/12 pb-4 mt-5">
            <h1 class="text-center text-2xl font-semibold pt-4">Sign Up</h1>
            <p class="text-lg font-medium mt-4 ml-3">Username:</p>
            <div class="w-full flex justify-center">
                <input class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200
                text-sm p-1" v-model="username"
                placeholder="Type in your username..." type="text">
            </div>
            <p class="text-lg font-medium mt-4 ml-3">Email:</p>
            <div class="w-full flex justify-center">
                <input class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200
                text-sm p-1" v-model="email"
                placeholder="Type in your email..." type="text">
            </div>
            <p class="text-lg font-medium mt-4 ml-3">About:</p>
            <div class="w-full flex justify-center">
                <input class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200
                text-sm p-1" v-model="about"
                placeholder="Tell us about you..." type="text">
            </div>
            <p class="text-lg font-medium mt-2 ml-3">Gender:</p>
            <div class="w-full flex justify-center">
                <select class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200 p-2 text-sm"
                v-model="gender" placeholder="Gender" name="Gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">I don't Identify as either</option>
                </select>
            </div>
            <p class="text-lg font-medium mt-4 ml-3">Pronouns:</p>
            <div class="w-full flex justify-center">
                <input class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200
                text-sm p-1" v-model="pronouns"
                placeholder="What are your pronouns?" type="text">
            </div>
            <p class="text-lg font-medium mt-2 ml-3">Profile Picture:</p>
            <div class="w-full flex justify-center">
                <input class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200 p-2 text-sm"
                placeholder="Type in the content..." type="file" @change="onFileChange">
            </div>
            <div v-if="picture" class="w-full">
                <img :src="picture" alt="" class="w-20 h-20 m-auto mt-2">
                <div class="w-full flex justify-center">
                    <button class="px-1 rounded-md mt-2 bg-red-700 hover:bg-red-500"
                    @click="clearImage()">X</button>
                </div>               
            </div>
            <p class="text-lg font-medium mt-2 ml-3">Password:</p>
            <div class="w-full flex justify-center">
                <input class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200 p-1 text-sm" 
                type="password" v-model="password1" placeholder="Type in your password...">
            </div>
            <p class="text-lg font-medium mt-2 ml-3">Confirm Password:</p>
            <div class="w-full flex justify-center">
                <input class="w-11/12 rounded-md bg-slate-100 focus:bg-slate-200 p-1 text-sm" 
                type="password" v-model="password2" placeholder="Type in your password...">
            </div>
            <div class="w-full flex justify-center mt-4">
                <button class="bg-green-700 hover:bg-green-500
                rounded-md p-1" @click="signup()">Sign Up</button>
            </div> 
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
    name: "SignupPage",
    props: {
        isLoggedInTrue: { type: Function },
        showFlash: { type: Function }
    }, 
    setup( props ) {
        const username = ref("")
        const password1 = ref("")
        const password2 = ref("")
        const email = ref("")
        const about = ref("")
        const picture = ref("")
        const gender = ref("Male")
        const pronouns = ref("")
        const imageArray = ref(["jpg", "png", "jpeg"])
        const route = useRoute()
        const router = useRouter()

        function signup() {
            fetch("https://osamamwen.pythonanywhere.com/user/register", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({username: username.value, password1: password1.value, 
                password2: password2.value, picture: picture.value, about: about.value,
                email: email.value, gender: gender.value, pronouns: pronouns.value})
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.success) {
                    router.push({
                        name: "LoginPage",
                        query: {
                            ...route.query
                        }
                    })
                }
                props.showFlash(data.message, data.success)
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
            picture.value = new Image()
            var reader = new FileReader()
            const check = file.name.toString()
            const imageType = check.split(".")[1]
            if (imageArray.value.includes(imageType)) {
                reader.onload = (e) => {
                    picture.value = e.target.result
                };
                reader.readAsDataURL(file)
            }
            else {
                alert("Only .jpg, .jpeg and .png files are allowed")
                picture.value = ""
            }
        }

        function clearImage() {
            picture.value = ""
        }

        return { username, password1, password2, picture, signup, onFileChange, createImage, imageArray,
        route, router, about, email, gender, pronouns, clearImage }
    }
}
</script>

<style>

</style>