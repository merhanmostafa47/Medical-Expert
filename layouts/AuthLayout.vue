<script setup>
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
