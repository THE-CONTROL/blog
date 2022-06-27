<template>
  <HomeWorld v-if="showApp"/>
  <div class="w-screen h-screen bg-slate-900 pt-44" v-else>
    <h1 class="border-4 border-slate-100 rounded-full w-fit m-auto p-1
    text-2xl font-bold text-slate-100 hover:bg-slate-700">Control</h1>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import HomeWorld from './components/Home.vue'

export default {
  components: {
    HomeWorld
  }, 
  setup() {
    const showApp = ref(false)

    function showAppFunc() {
      showApp.value = true
    }

    onMounted(() => {
      setTimeout(showAppFunc, 3000)
    })

    return { showApp, showAppFunc }
  }
}
</script>

<style>
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>

