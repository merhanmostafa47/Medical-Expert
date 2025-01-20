<script setup>
// I18n
const { locale, locales } = useI18n();

const { t } = useI18n();

// Auth Store
import { useAuthStore } from "@/stores/AuthData.js";
const authStore = useAuthStore();
authStore.loadAuthFromCookie();
</script>

<template>
  <v-locale-provider :rtl="locale === 'ar'">
    <v-app class="bg-opacity-bg">
      <slot />
    </v-app>
  </v-locale-provider>
</template>
