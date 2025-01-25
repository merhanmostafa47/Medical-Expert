<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<template>
  <div class="relative">
    <DocSidebar />
    <!-- Static Sidebar -->
    <v-main class="max-h-screen mx-3 overflow-y-auto lg:mx-6">
      <TopBar :title="t('TITLES.doctor.clinics')" />
      <!-- Top bar with title -->
      <NuxtPage/> <!-- Dynamically render child pages here -->
    </v-main>
  </div>
</template>
