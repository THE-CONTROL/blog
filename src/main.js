import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faNavicon } from '@fortawesome/free-solid-svg-icons'

library.add(faNavicon)

createApp(App)
.component('fa', FontAwesomeIcon)
.use(router)
.mount('#app')
