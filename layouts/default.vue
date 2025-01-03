<script setup>
import {ref} from "vue";
import { useRouter, useRoute } from "vue-router";


const router = useRouter();
const route = useRoute();


// const currentPath = ref(window.location.hash)

// window.addEventListener('hashchange', () => {
//   currentPath.value = window.location.hash
// })

const url = useRequestURL();

onMounted(() => {
  console.log("Is Admin Module ?" + url.href.includes('admin'));
  console.log("Is Patient Module ?" + url.href.includes('patient'));
})

// I18n
const { locale, locales } = useI18n();
const alternativeLocale = computed(() => {
  return locales.value.find((item) => item.code !== locale.value);
});

// Auth Store
import { useAuthStore } from "@/stores/AuthData.js";
const authStore = useAuthStore();
authStore.loadAuthFromCookie();


</script>

<template>
  <v-locale-provider :rtl="locale === 'ar'">
    <v-app>
      <TheNavbar />
      <slot></slot>
    </v-app>
  </v-locale-provider>
</template>
