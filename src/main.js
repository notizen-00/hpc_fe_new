import { createApp } from 'vue'
import '@/style.css'
import App from './App.vue'
import router from '@/router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { pinia } from './store/pinia'
import { useStore } from '@/Store/modules'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueApexCharts from "vue3-apexcharts";


const vuetify = createVuetify({
  components,
  directives,
})
const options = {
    // You can set your default options here
  position: "bottom-right",
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  closeButton: "button",
  icon: true,
  rtl: false
};


createApp(App)
    .use(vuetify)
    .use(Toast, options)
    .use(router)
    .use(pinia)
    .use(VueApexCharts)
    .provide('store', useStore())
    .mount('#app')
