import { createApp } from 'vue'
import './style.styl'
import App from './App.vue'
import router from './router'
import {i18n} from './i18n'
import { register } from 'swiper/element/bundle'

createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app')

// For swiper.js
register()
