import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import _ from 'underscore'

const app = createApp(App)
app.config.globalProperties._ = _
app.mount('#app')





