<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const route = useRoute();
</script>
<template>
  <div class="relative">
    <DocSidebar />
    <!-- Static Sidebar -->
    <v-main class="max-h-screen mx-3 overflow-y-auto lg:mx-6">
      <TopBar :title="t(`TITLES.doctor.${route.name.includes('doctor-clinics_') ? 'clinics' : 'patients'}`)" />
      <!-- Top bar with title -->
      <NuxtPage /> <!-- Dynamically render child pages here -->
    </v-main>
  </div>
</template>

