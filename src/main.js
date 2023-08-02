import { createApp } from 'vue'
import './style.css'
import VWave from 'v-wave'
import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core'
import App from './App.vue'

createApp(App)
.use(VWave)
.use(VueAnimXyz)
.mount('#app')
