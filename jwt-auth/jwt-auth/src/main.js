import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import { initializeApp } from 'firebase/app'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyAr5NIglH9JW4iCgUaFNJEPaSkTQ_V195A',
  authDomain: 'jwt-auth-9b321.firebaseapp.com',
  projectId: 'jwt-auth-9b321',
  storageBucket: 'jwt-auth-9b321.appspot.com',
  messagingSenderId: '600651914464',
  appId: '1:600651914464:web:91722117c9e5e28a1cc485'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(PrimeVue)

app.use(createPinia())
app.use(router)

app.mount('#app')
