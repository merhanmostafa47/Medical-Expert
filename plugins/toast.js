// toast.js
import Toast ,{ POSITION }  from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    hideProgressBar: true,
    position: POSITION.BOTTOM_LEFT,
  });
  nuxtApp.provide("toast", useToast());
});
